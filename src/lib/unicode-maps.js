// src/lib/unicode-maps.js

// Mathematical Sans-Serif Bold (A-Z, a-z, 0-9)
const mathSansBold = {
    A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭',
    a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
    0: '𝟬', 1: '𝟭', 2: '𝟮', 3: '𝟯', 4: '𝟰', 5: '𝟱', 6: '𝟲', 7: '𝟳', 8: '𝟴', 9: '𝟵'
};

// Mathematical Sans-Serif Italic (A-Z, a-z)
const mathSansItalic = {
    A: '𝘈', B: '𝘉', C: '𝘊', D: '𝘋', E: '𝘌', F: '𝘍', G: '𝘎', H: '𝘏', I: '𝘐', J: '𝘑', K: '𝘒', L: '𝘓', M: '𝘔', N: '𝘕', O: '𝘖', P: '𝘗', Q: '𝘘', R: '𝘙', S: '𝘚', T: '𝘛', U: '𝘜', V: '𝘝', W: '𝘞', X: '𝘟', Y: '𝘠', Z: '𝘡',
    a: '𝘢', b: '𝘣', c: '𝘤', d: '𝘥', e: '𝘦', f: '𝘧', g: '𝘨', h: '𝘩', i: '𝘪', j: '𝘫', k: '𝘬', l: '𝘭', m: '𝘮', n: '𝘯', o: '𝘰', p: '𝘱', q: '𝘲', r: '𝘳', s: '𝘴', t: '𝘵', u: '𝘶', v: '𝘷', w: '𝘸', x: '𝘹', y: '𝘺', z: '𝘻'
    // No distinct sans-serif italic numbers in standard block, map back to standard or leave alone.
};

// Mathematical Sans-Serif Bold Italic (A-Z, a-z)
const mathSansBoldItalic = {
    A: '𝘼', B: '𝘽', C: '𝘾', D: '𝘿', E: '𝙀', F: '𝙁', G: '𝙂', H: '𝙃', I: '𝙄', J: '𝙅', K: '𝙆', L: '𝙇', M: '𝙈', N: '𝙉', O: '𝙊', P: '𝙋', Q: '𝙌', R: '𝙍', S: '𝙎', T: '𝙏', U: '𝙐', V: '𝙑', W: '𝙒', X: '𝙓', Y: '𝙔', Z: '𝙕',
    a: '𝙖', b: '𝙗', c: '𝙘', d: '𝙙', e: '𝙚', f: '𝙛', g: '𝙜', h: '𝙝', i: '𝙞', j: '𝙟', k: '𝙠', l: '𝙡', m: '𝙢', n: '𝙣', o: '𝙤', p: '𝙥', q: '𝙦', r: '𝙧', s: '𝙨', t: '𝙩', u: '𝙪', v: '𝙫', w: '𝙬', x: '𝙭', y: '𝙮', z: '𝙯'
};

// Monospace (A-Z, a-z, 0-9)
const monospace = {
    A: '𝙰', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺', L: '𝙻', M: '𝙼', N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅', W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉',
    a: '𝚊', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝚏', g: '𝚐', h: '𝚑', i: '𝚒', j: '𝚓', k: '𝚔', l: '𝚕', m: '𝚖', n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛', s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚟', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣',
    0: '𝟶', 1: '𝟷', 2: '𝟸', 3: '𝟹', 4: '𝟺', 5: '𝟻', 6: '𝟼', 7: '𝟽', 8: '𝟾', 9: '𝟿'
};

// Serif Bold (A-Z, a-z, 0-9)
const serifBold = {
    A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉', K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙',
    a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳',
    0: '𝟎', 1: '𝟏', 2: '𝟐', 3: '𝟑', 4: '𝟒', 5: '𝟓', 6: '𝟔', 7: '𝟗', 8: '𝟖', 9: '𝟗' // Note: Math bold 7 is technically not standard in some blocks, but we map 0-9 here.
};

// Mathematical Script (A-Z, a-z)
const script = {
    // Be careful with script, some letters fallback to Letterlike Symbols instead of Math Alphanumeric.
    // E.g., Script 'B' is U+212C, 'E' is U+2130, 'F' is U+2131, 'H' is U+210B, 'I' is U+2110, 'L' is U+2112, 'M' is U+2133, 'R' is U+211B, 'e' is U+212F, 'g' is U+210A, 'o' is U+2134
    A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ', J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: 'ℛ', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵',
    a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: 'ℯ', f: '𝒻', g: 'ℊ', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: 'ℴ', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏'
};

const COMBINING_UNDERLINE = '\u0332';
const COMBINING_STRIKETHROUGH = '\u0336';

// Map all styled characters back to base ASCII for swapping and clearing styles
const reverseMap = new Map();

const buildReverseMap = () => {
    const maps = [mathSansBold, mathSansItalic, mathSansBoldItalic, monospace, serifBold, script];
    for (const styleMap of maps) {
        for (const [baseChar, styledChar] of Object.entries(styleMap)) {
            reverseMap.set(styledChar, baseChar);
            // also handle surrogate pair extraction if split somehow, though JS strings handle them reasonably well now
        }
    }
};

buildReverseMap();

export const unicodeStyles = {
    bold: mathSansBold,
    italic: mathSansItalic,
    boldItalic: mathSansBoldItalic,
    mono: monospace,
    serifBold: serifBold,
    script: script
};

export const combiners = {
    underline: COMBINING_UNDERLINE,
    strike: COMBINING_STRIKETHROUGH
};

// Strips existing unicode math styles back to standard ASCII
export const stripStylesToAscii = (text) => {
    let result = '';
    for (const char of text) { // Iterates correctly over surrogate pairs
        result += reverseMap.get(char) || char;
    }
    return result;
};

// Strips combining marks specifically (underline/strike)
export const stripCombiningMarks = (text) => {
    // Matches u0332 and u0336
    return text.replace(/[\u0332\u0336]/g, '');
};

// The core mapping function
export const applyUnicodeMap = (text, styleName) => {
    if (!styleName || !unicodeStyles[styleName]) return text;

    // Always strip existing style first before applying new one to prevent stacking errors
    const baseAscii = stripStylesToAscii(text);
    const targetMap = unicodeStyles[styleName];

    let result = '';
    for (const char of baseAscii) {
        result += targetMap[char] || char;
        // If target map doesn't exist (e.g. space, punctuation), keep original
    }
    return result;
};

export const applyCombiningMark = (text, markName) => {
    const mark = combiners[markName];
    if (!mark) return text;

    let result = '';
    // Strip existing marks of the SAME type first to avoid `x̲̲̲̲`
    let cleanText = text.replace(new RegExp(mark, 'g'), '');

    for (const char of cleanText) {
        // Only append mark to non-whitespace,非-control characters if desired, 
        // or just apply to everything. We will apply to non-spaces to mimic standard underline.
        if (char.trim() !== '') {
            result += char + mark;
        } else {
            result += char;
        }
    }
    return result;
};

// A clear formatting function that takes both text and combines both stripping tools
export const clearAllFormatting = (text) => {
    const noMarks = stripCombiningMarks(text);
    return stripStylesToAscii(noMarks);
}
