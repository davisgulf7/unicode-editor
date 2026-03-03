# Unicode Editor - PWA Planning

## Project Overview

Briefly describe the purpose and goals of the Unicode Editor application.

## Core Features

1.
2.
3.

## Technical Considerations

* **Architecture Flow:** Client-side processing vs. server-side.
* **Data Storage:** IndexedDB, LocalStorage, etc., for offline capabilities.
* **PWA Specifics:** Caching strategies (stale-while-revalidate, network-first, etc.).

## UI / UX Design

* **Color Palette:**
* **Typography:**
* **Layout:** Flexible, mobile-first design.

## Milestones & Tasks

* [ ] Phase 1: Core functionality
* [ ] Phase 2: Offline support and PWA features
* [ ] Phase 3: Polish and refine styling

App Title: GulfStudios Unicode Editor

Project Specification
Unicode Style Composer (PWA)

1. Project Overview

Build a Progressive Web App (PWA) that allows users to compose text using familiar formatting controls (bold, italic, underline, lists, font styles, etc.), but instead of producing HTML or rich text, the output must be pure Unicode text.

All formatting must be represented using Unicode characters and combining marks.
No HTML formatting should be preserved in exported content.

The editor is a visual transformer, not a traditional rich-text editor.

1. Core Concept

The app behaves like a lightweight word processor:

Users type normally.

Users select text.

Users apply formatting from a toolbar.

But instead of wrapping text in tags like <strong> or <em>, the system:

Replaces characters with Unicode equivalents.

Applies combining marks where appropriate.

Outputs plain-text Unicode only.

Exported text must paste correctly into:

Social media

LMS fields

Email

Notes apps

Messaging apps

No HTML, no CSS styles in output.

1. Technical Architecture
Platform

Progressive Web App (PWA)

Offline-capable

Installable on desktop & mobile

No backend required (local-only storage)

Stack

Vanilla JS or lightweight framework (React optional but not required)

No server required

Service Worker for offline capability

LocalStorage or IndexedDB for saved drafts

1. Core Features
4.1 Text Input Area

Standard editable text area (contenteditable div recommended)

Must preserve cursor position during transformations

Must allow:

Typing

Selection

Multi-line input

Keyboard shortcuts

4.2 Formatting Toolbar (Unicode-Based)

Buttons must transform selected text into Unicode equivalents.

Bold

Convert selected characters to:

Mathematical Sans-Serif Bold (U+1D5D4 block preferred)

Example:

Bold → 𝗕𝗼𝗹𝗱
Italic

Convert to:

Mathematical Sans-Serif Italic OR

Mathematical Italic (choose one consistent block)

Example:

Italic → 𝘪𝘵𝘢𝘭𝘪𝘤
Bold Italic

Optional but recommended:

𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘
Script

Convert to script Unicode block.

Monospace

Convert to monospace Unicode.

4.3 Underline

Apply combining low line:
U+0332

Transform:

underline → u̲n̲d̲e̲r̲l̲i̲n̲e̲

Must:

Apply combining mark after each character

Avoid stacking duplicate combining marks

4.4 Strikethrough (Optional)

Use combining long stroke overlay:
U+0336

4.5 Lists
Bullet List

Prefix selected lines with:
• (U+2022)

Numbered List

Prefix selected lines with:
1.
2.
3.

Must auto-increment.

4.6 Unicode Font Families Supported

The system must include a mapping table for:

Sans Serif

Sans Serif Bold

Sans Serif Italic

Sans Serif Bold Italic

Serif

Serif Bold

Script

Monospace

Small Caps (if supported)

Circled letters (optional)

Mapping must:

Preserve punctuation

Preserve numbers

Leave unsupported characters unchanged

1. Text Transformation Engine

Create a transformation module:

Requirements:

Map A–Z, a–z, 0–9

Leave spaces unchanged

Leave unsupported characters untouched

Work on selected text only

Preserve cursor/selection position after transformation

Important:

Do not nest styles.
If text is already Unicode-styled, applying another style must:

Either strip to base text first

Or prevent stacking incompatible styles

1. Internal Data Model

The editor must NOT store HTML.

Instead:

Maintain plain text state

Perform in-place Unicode substitution

Store only transformed Unicode text

1. Output Options

Provide:

Copy Button

Copies raw Unicode text to clipboard.

Export Options

.txt file download

Optional: Markdown export (still Unicode styled)

1. Additional Functional Features
Clear Formatting

Convert selected text back to base ASCII.

Requires:

Reverse mapping table

Remove combining marks

Normalize Button

Convert entire document to plain ASCII.

Undo/Redo

Basic history stack required.

1. UI Design Requirements

Clean minimal interface

Implement a "Liquid Glass" (glassmorphism) visual aesthetic

Toolbar above text area

Fully responsive, flexible layout for desktop and mobile

Accessible (clear focus states, semantic roles)

Large tap targets

Dark mode optional

1. Edge Cases to Handle

Emojis must remain untouched

Accented characters should remain unchanged

Do not break surrogate pairs

Prevent duplicate combining mark stacking

Maintain line breaks

Maintain copy/paste compatibility

1. Offline Requirements

Full offline functionality

Draft auto-save

Service worker caching

1. Performance

Must handle up to 10,000 characters smoothly

No re-render flicker on transform

Efficient character mapping

1. Testing Criteria

The agent must verify:

Styled text copies cleanly into:

Gmail

Instagram

Canvas LMS

Notes app

Text remains searchable in plain-text environments

Combining marks render correctly

1. Stretch Features (Optional)

Unicode preview toggle (styled view vs base view)

Style inspector (detect applied Unicode block)

Style strip tool

Save multiple documents locally

Share link (if later backend added)

Final Summary for the AI Agent

You are building:

A lightweight PWA text editor that visually resembles a rich-text editor but outputs only Unicode-transformed plain text. All formatting must be represented by Unicode characters or combining marks. No HTML formatting may be included in exported content. The app must work offline, preserve cursor position, and allow reversible formatting.

GulfStudios Unicode Editor - Implementation Plan
Goal Description
Build a Progressive Web App (PWA) that functions as a visual text transformer. It provides a rich-text editing experience but outputs only plain text with Unicode characters and combining marks (e.g., transforming text into Mathematical Sans-Serif Bold or applying underline combining marks). The app will operate entirely client-side, require no backend, and work offline.

Proposed Changes
Core Architecture & State Management
Editor Element (<div contenteditable="true">): The primary text input area. It will handle standard browser text entry, selection ranges, and line breaks naturally.
Transformation Engine (src/lib/unicode-transforms.js): A dedicated module containing character mapping tables (ASCII -> Unicode blocks) and combining mark logic. It will provide functions to transform selected strings based on requested styles.
State / Local Storage Tracker: We will attach an event listener to the editor to auto-save its innerText (or lightweight HTML for line breaks) to LocalStorage/IndexedDB whenever content changes.
File Structure & Components
[NEW] src/lib/unicode-maps.js
Define comprehensive dictionary mappings for:
Math Sans-Serif Bold (A-Z, a-z, 0-9)
Math Sans-Serif Italic (A-Z, a-z, 0-9)
Math Sans-Serif Bold Italic (A-Z, a-z, 0-9)
Monospace (A-Z, a-z, 0-9)
Serif Bold (A-Z, a-z, 0-9)
Script (A-Z, a-z)
Define combining mark constants (e.g., COMBINING_LOW_LINE = '\u0332').
Include a reverse map to strip Unicode styles back to ASCII.
[NEW] src/lib/editor-logic.js
Functions to reliably get and set the active selection range within a contenteditable div, accounting for nested text nodes.
applyStyle(styleType): Extracts text from the active selection, passes it to the map engine, replaces the selection with the new text node, and restores cursor position.
cleanTextForExport(htmlContent): A utility that walks the editor's DOM, replacing <br> and <div> tags with pure \n characters and removing all HTML tags to produce the final plain text payload for copying/exporting.
[MODIFY] index.html
Build the main UI layout:
A sticky toolbar holding formatting action buttons with basic SVG icons (Lucide/Phosphor).
The contenteditable div editor area below the toolbar.
A floating "Copy Unicode" action button.
[MODIFY] src/style.css
Implement a fully responsive, flexible flexbox/grid layout that adapts perfectly to both mobile and desktop screens.
Incorporate strong accessibility features (clear focus states, high contrast text where appropriate, semantic ARIA roles on buttons).
Implement a "Liquid Glass" (glassmorphism) visual aesthetic:
Semi-transparent, blurred backgrounds (backdrop-filter: blur()).
Subtle highlights and inner borders to simulate glass volume.
Elegant, smooth transitions on interactive elements.
Ensure buttons and tap targets are large and accessible.
[MODIFY] src/main.js
Wire up event listeners:
Toolbar buttons -> trigger editor-logic functions.
Input/Keyup events -> trigger auto-save logic.
Copy button -> trigger cleanTextForExport -> write to clipboard using navigator.clipboard.writeText(...) and show a temporary success toast/notification.
Verification Plan
Automated/Manual Validation Steps
Style Application: Select a word -> Click Bold -> Verify characters shift to Mathematical Sans-Serif Bold while surrounding text remains untouched.
Combining Marks: Apply underline to "hello" -> verify output is h̲e̲l̲l̲o̲ without doubling marks if clicked twice.
Style Swapping: Select bold text -> click Monospace -> Verify characters successfully jump block ranges instead of resulting in garbled combinations.
Export Fidelity: Write multi-line styled text -> Click Export/Copy -> Open a basic text editor or web form (like Google Search) -> paste -> verify formatting persists and no HTML traces exist.
