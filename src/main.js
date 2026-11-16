import './style.css';
import { transformSelection, applyListFormatting, cleanTextForExport, handleEnterKey, handleTabKey } from './lib/editor-logic';

document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  const copyBtn = document.getElementById('btn-copy');
  const clearBtn = document.getElementById('btn-clear');
  const toast = document.getElementById('toast');

  // Wire up formatting buttons
  const styleButtons = document.querySelectorAll('.tool-btn[data-style]');
  styleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent focus loss
      const style = btn.getAttribute('data-style');
      transformSelection(style);
      editor.focus(); // Ensure focus returns to editor
    });
  });

  // Wire up list buttons
  const listButtons = document.querySelectorAll('.tool-btn[data-list]');
  listButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const listType = btn.getAttribute('data-list');
      applyListFormatting(listType);
      editor.focus();
    });
  });

  // Copy to Clipboard logic
  copyBtn.addEventListener('click', async () => {
    // We clean the DOM into pure text (handling div/br newlines)
    const pureText = cleanTextForExport(editor);

    try {
      await navigator.clipboard.writeText(pureText);
      showToast('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert("Copy failed. Check console or select manually.");
    }
  });

  // Toast animation
  let toastTimeout;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // No auto-save: every load (refresh) starts with an empty editor.
  // Remove any draft saved by earlier versions so it stops coming back.
  try {
    localStorage.removeItem('unicode_editor_draft');
  } catch {
    // Storage blocked (private mode, site data disabled): nothing was saved.
  }

  // Clear button: empties the editor. Done as an editing command where the
  // browser supports it, so Ctrl/Cmd+Z can bring the text back.
  clearBtn.addEventListener('click', () => {
    editor.focus();
    const undoable = document.execCommand('selectAll') && document.execCommand('delete');
    if (!undoable || editor.textContent !== '') {
      editor.textContent = '';
    }
    showToast('Text cleared');
  });

  // Editor Keydown Overrides (Smart Lists & Space Indenting)
  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleEnterKey(e);
    } else if (e.key === 'Tab') {
      handleTabKey(e);
    } else if (e.key === 'Escape') {
      editor.blur(); // Accessibility escape hatch from Focus Trap
    }
  });

  // PWA Service Worker Registration
  if ('serviceWorker' in navigator) {
    import('virtual:pwa-register').then(({ registerSW }) => {
      registerSW({ immediate: true });
    }).catch((error) => console.error('Service worker registration failed:', error));
  }
});
