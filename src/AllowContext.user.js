// ==UserScript==
// @name         AllowContext
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds support for context menu on OnlyFans and Spotlightr
// @author       Shmuelie
// @match        https://onlyfans.com/*
// @match        https://*.spotlightr.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.body.addEventListener("contextmenu", function (e) { e.stopPropagation(); e.stopImmediatePropagation(); });
    document.body.addEventListener("contextmenu", function (e) { e.stopPropagation(); e.stopImmediatePropagation(); return false; }, true);
})();