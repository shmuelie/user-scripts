# Copilot Instructions

## Project Overview

This is a collection of [Tampermonkey](https://www.tampermonkey.net/) userscripts. Each `.user.js` file in `src/` is a standalone browser userscript — there is no build step, bundler, or package manager. Scripts are installed directly from raw GitHub URLs.

## Architecture

- `src/*.user.js` — Standalone userscripts, each targeting a specific website
- `src/*.d.ts` — TypeScript type definitions for external APIs (PlayerFM, Media Session, BrightCove/Video.js) used for IDE type checking only, not runtime
- `jsconfig.json` — Enables TypeScript-powered checking (`checkJs`, `strict`) targeting ES2024
- `.eslintrc.json` — ESLint configured with `greasemonkey` environment globals

The [monkey-wrench](https://marketplace.visualstudio.com/items?itemName=coyote-studios.monkey-wrench) VS Code extension is used for userscript development support.

## Userscript Conventions

Every script must follow this structure:

1. **Metadata block** with these required fields:
   ```javascript
   // ==UserScript==
   // @name        Script Name
   // @namespace   net.englard.shmuelie
   // @version     X.Y.Z
   // @description Brief description
   // @author      Shmuelie
   // @match       https://target-site.com/*
   // @grant       none
   // @website     https://github.com/shmuelie/user-scripts/blob/main/src/FileName.user.js
   // @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/FileName.user.js
   // @supportURL  https://github.com/shmuelie/user-scripts/issues
   // ==/UserScript==
   ```

2. **IIFE wrapper** with strict mode:
   ```javascript
   (function() {
       'use strict';
       // script code
   })();
   ```

3. All scripts use `@grant none` — no Tampermonkey privileged APIs.

## Code Style

- `const`/`let` only, no `var`
- Traditional `function()` syntax preferred over arrow functions
- JSDoc type annotations for function parameters (e.g., `@param {HTMLImageElement} img`)
- `querySelector`/`querySelectorAll` with `Array.from()` for DOM queries
- `MutationObserver` for reacting to dynamically loaded content
- Functional style — no classes

## Adding a New Script

1. Create `src/NewScript.user.js` with the metadata block and IIFE wrapper above
2. Add a section to `README.md` with a description and install badge:
   ```markdown
   ## Script Name

   Description of what it does.

   [![Install Script Name](https://img.shields.io/badge/install-Script%20Name-green?style=for-the-badge)](https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/NewScript.user.js)
   ```
