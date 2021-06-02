// ==UserScript==
// @name        Allow Context
// @namespace   net.englard.shmuelie
// @version     1.0.0
// @description Adds support for context menu on OnlyFans and Spotlightr
// @author      Shmuelie
// @match       https://onlyfans.com/*
// @match       https://*.spotlightr.com/*
// @grant       none
// @website     https://github.com/SamuelEnglard/user-scripts/blob/main/src/AllowContext.user.js
// @updateURL   https://raw.githubusercontent.com/SamuelEnglard/user-scripts/main/src/AllowContext.user.js
// @supportURL  https://github.com/SamuelEnglard/user-scripts/issues
// @run-at      document-idle
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    document.body.addEventListener("contextmenu", function (e) { e.stopPropagation(); e.stopImmediatePropagation(); });
    document.body.addEventListener("contextmenu", function (e) { e.stopPropagation(); e.stopImmediatePropagation(); return false; }, true);
})();