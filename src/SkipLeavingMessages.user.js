// ==UserScript==
// @name        Skip Leaving Messages
// @namespace   net.englard.shmuelie
// @version     1.0.0
// @description Skip redirect permission pages.
// @author      Shmuelie
// @match       https://www.youtube.com/redirect*
// @match       https://steamcommunity.com/linkfilter/*
// @grant       none
// @website     https://github.com/shmuelie/user-scripts/blob/main/src/SkipLeavingMessages.user.js
// @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/SkipLeavingMessages.user.js
// @supportURL  https://github.com/shmuelie/user-scripts/issues
// @run-at      document-idle
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    var link = document.getElementById("invalid-token-redirect-goto-site-button") ||
               document.getElementById("proceedButton");
    if (link) {
        window.location = link.href;
    }
})();