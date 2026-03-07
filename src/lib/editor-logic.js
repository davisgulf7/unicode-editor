import { applyUnicodeMap, applyCombiningMark, clearAllFormatting, combiners } from './unicode-maps.js';

/**
 * Gets the current active text selection within a contenteditable element.
 * Retains range information to restore cursor position after modifying text.
 */
export const getActiveSelection = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    // Ensure the selection is actually inside our editor
    const editor = document.getElementById('editor');
    if (!editor.contains(range.commonAncestorContainer)) return null;

    return { selection, range };
};

/**
 * Validates that the selection is valid and has actual text.
 */
export const hasValidSelection = () => {
    const sel = getActiveSelection();
    return sel && !sel.selection.isCollapsed && sel.selection.toString().trim().length > 0;
};

/**
 * Extracts pure text from selection, passes it to the map engine, 
 * and replaces the selected node in the DOM.
 */
export const transformSelection = (styleName) => {
    const selData = getActiveSelection();
    if (!selData || selData.selection.isCollapsed) return;

    const { selection, range } = selData;
    const selectedText = selection.toString();

    // Transform text
    let transformedText;
    if (Object.keys(combiners).includes(styleName)) {
        // Toggle behavior for combining marks:
        // If the selection already contains the combining mark heavily, we should remove it instead.
        const mark = combiners[styleName];
        const markCount = (selectedText.match(new RegExp(mark, 'g')) || []).length;

        if (markCount > (selectedText.replace(/\s/g, '').length / 2)) {
            // More than half characters are marked, let's toggle it OFF
            transformedText = selectedText.replace(new RegExp(mark, 'g'), '');
        } else {
            transformedText = applyCombiningMark(selectedText, styleName);
        }
    } else if (styleName === 'clear') {
        transformedText = clearAllFormatting(selectedText);
    } else {
        const potentialTransformation = applyUnicodeMap(selectedText, styleName);

        // If applying the style results in the exact same string as what we started with, 
        // it means the text is already fully formatted to this exact style.
        // In this case, act as a toggle and clear the formatting instead.
        if (potentialTransformation === selectedText) {
            transformedText = clearAllFormatting(selectedText);
        } else {
            transformedText = potentialTransformation;
        }
    }

    if (transformedText === selectedText) return; // No change needed at all

    // Replace the DOM selection with our new text node
    range.deleteContents();
    const textNode = document.createTextNode(transformedText);
    range.insertNode(textNode);

    // Reselect the newly inserted text to keep user flow
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(textNode);
    selection.addRange(newRange);

    // Manually trigger an input event so any autosave listeners grab this update
    const editor = document.getElementById('editor');
    editor.dispatchEvent(new Event('input', { bubbles: true }));
};

/**
 * Handles List Prefixing
 * This requires block-level parsing, not just string character replacing.
 */
export const applyListFormatting = (listType) => {
    const selData = getActiveSelection();
    if (!selData) return;

    const { selection, range } = selData;
    let selectedText = selection.toString();

    if (selection.isCollapsed) {
        // If no selection, apply list prefix to the start of the current line? Let's keep it simple: require selection first for V1.
        console.warn("List formatting currently requires a text selection.");
        return;
    }

    const lines = selectedText.split('\n');
    let transformedLines = [];

    if (listType === 'bullet') {
        transformedLines = lines.map(line => `•\u2003${line.replace(/^(?:•|▪|◦|▸|▹|◆|▶)?[\u2003\s]*/, '')}`);
    } else if (listType === 'number') {
        transformedLines = lines.map((line, index) => `${index + 1}.\u2003${line.replace(/^\d+\.[\u2003\s]*/, '')}`);
    }

    const transformedText = transformedLines.join('\n');

    range.deleteContents();
    const textNode = document.createTextNode(transformedText);
    range.insertNode(textNode);

    // Reselect
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(textNode);
    selection.addRange(newRange);

    document.getElementById('editor').dispatchEvent(new Event('input', { bubbles: true }));
};

/**
 * Walks the contenteditable DOM tree and cleans it for pure plain-text export.
 * Browser behavior means `<br>` or `<div>...</div>` wraps new lines.
 * This function extracts all text and forces semantic returns (\n) instead of HTML.
 */
export const cleanTextForExport = (rootElement) => {
    let result = '';

    const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            result += node.nodeValue.replace(/\u200B/g, ''); // Remove Zero-Width Spaces
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Block level elements should prepend a newline if they aren't the first element
            if (node.tagName === 'DIV' || node.tagName === 'P') {
                // Only add newline if result isn't empty and doesn't already end with a newline
                if (result.length > 0 && !result.endsWith('\n')) {
                    result += '\n';
                }
            } else if (node.tagName === 'BR') {
                result += '\n';
            }

            // Traverse children
            for (const child of node.childNodes) {
                walk(child);
            }
        }
    };

    walk(rootElement);
    return result;
};

/**
 * Intercepts the Enter key to explicitly insert a <br> and handle "Smart List" auto-continuation.
 */
export const handleEnterKey = (e) => {
    e.preventDefault();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);

    if (!selection.isCollapsed) {
        range.deleteContents();
    }

    let node = range.startContainer;
    let textBefore = node.nodeType === Node.TEXT_NODE ? node.textContent.substring(0, range.startOffset) : '';

    // Walk back siblings to construct the visual line
    let current = node.previousSibling;
    while (current) {
        if (current.nodeName === 'BR' || current.nodeName === 'DIV' || current.nodeName === 'P') break;
        textBefore = (current.textContent || '') + textBefore;
        current = current.previousSibling;
    }

    const parts = textBefore.split('\n');
    const lineText = parts[parts.length - 1] || '';

    // Regex to detect indent + optional bullet
    const listRegex = /^([\u2003\s]*)(?:([•▪◦▸▹◆▶]|\d+\.)[\u2003\s]+)?/;
    const match = lineText.match(listRegex);

    let indent = match ? match[1] || '' : '';
    let bullet = match && match[2] ? match[2] : '';
    let prefixToInsert = '';

    if (bullet || indent) {
        // If the entire line is JUST the prefix (empty bullet/indent), breakout
        const isPrefixOnly = new RegExp(`^([\\u2003\\s]*)(?:([•▪◦▸▹◆▶]|\\d+\\.)[\\u2003\\s]+)?$`).test(lineText);

        if (isPrefixOnly) {
            // Breakout: delete the prefix from the DOM
            if (node.nodeType === Node.TEXT_NODE && range.startOffset >= lineText.length) {
                range.setStart(node, range.startOffset - lineText.length);
                range.deleteContents();
            } else {
                for (let i = 0; i < lineText.length; i++) {
                    document.execCommand('delete', false, null);
                }
            }
            insertNewlineAndPrefix('');
            return;
        }

        if (bullet) {
            if (/^\d+\.$/.test(bullet)) {
                bullet = `${parseInt(bullet, 10) + 1}.`;
            }
            prefixToInsert = `${indent}${bullet}\u2003`;
        } else {
            prefixToInsert = indent;
        }
    }

    insertNewlineAndPrefix(prefixToInsert);
};

const insertNewlineAndPrefix = (prefix = '') => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    const frag = document.createDocumentFragment();
    const br = document.createElement('br');
    frag.appendChild(br);

    let textNode = null;
    if (prefix) {
        textNode = document.createTextNode(prefix);
        frag.appendChild(textNode);
    }

    const zws = document.createTextNode('\u200B');
    frag.appendChild(zws);

    range.insertNode(frag);

    range.setStartBefore(zws);
    range.setEndBefore(zws);
    selection.removeAllRanges();
    selection.addRange(range);

    document.getElementById('editor').dispatchEvent(new Event('input', { bubbles: true }));
};

/**
 * Intercepts the Tab key to insert two EM Spaces for hanging indents.
 */
export const handleTabKey = (e) => {
    e.preventDefault();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);

    if (!selection.isCollapsed) {
        range.deleteContents();
    }

    const indent = document.createTextNode('\u2003\u2003');
    range.insertNode(indent);
    range.setStartAfter(indent);
    range.setEndAfter(indent);

    selection.removeAllRanges();
    selection.addRange(range);

    document.getElementById('editor').dispatchEvent(new Event('input', { bubbles: true }));
};
