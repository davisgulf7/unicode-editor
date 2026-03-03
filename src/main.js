import './style.css';
import { transformSelection, applyListFormatting, cleanTextForExport } from './lib/editor-logic';

document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  const copyBtn = document.getElementById('btn-copy');
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
      showToast();
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers could go here
      alert("Copy failed. Check console or select manually.");
    }
  });

  // Toast animation
  let toastTimeout;
  function showToast() {
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // --- State Persistence (Auto-save) ---
  // Load draft if exists
  const savedDraft = localStorage.getItem('unicode_editor_draft');
  if (savedDraft) {
    editor.innerHTML = savedDraft;
  }

  // Save on input (debounced slightly for performance if needed, but direct is fine for small inputs)
  editor.addEventListener('input', () => {
    // We save the HTML structure so that line breaks and cursor positions are preserved
    // strictly for the local session. The export function strips this later.
    localStorage.setItem('unicode_editor_draft', editor.innerHTML);
  });

  // PWA Service Worker Registration
  if ('serviceWorker' in navigator) {
    import('virtual:pwa-register').then(({ registerSW }) => {
      registerSW({ immediate: true });
    }).catch((error) => console.error('Service worker registration failed:', error));
  }
});
