// ==UserScript==
// @name        BookWalker Save
// @namespace   net.englard.shmuelie
// @version     1.0.0
// @description Allow saving BookWalker Canvas images.
// @author      Shmuelie
// @match       https://viewer.bookwalker.jp/*
// @grant       none
// @website     https://github.com/shmuelie/user-scripts/blob/main/src/BookWalkerSave.user.js
// @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/BookWalkerSave.user.js
// @supportURL  https://github.com/shmuelie/user-scripts/issues
// @run-at      document-idle
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    document.body.addEventListener("contextmenu", function (e) { e.stopPropagation(); e.stopImmediatePropagation(); });
    document.body.addEventListener("contextmenu", function (e) { e.stopPropagation(); e.stopImmediatePropagation(); return false; }, true);

    const viewportW = document.getElementById("viewportW");
    if (viewportW) {
        viewportW.style.display = "none";
    }
})();