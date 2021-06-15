// ==UserScript==
// @name        YouTube Skip
// @namespace   net.englard.shmuelie
// @version     1.1.0
// @description Skip YouTube redirect permission page.
// @author      Shmuelie
// @match       https://www.youtube.com/redirect*
// @grant       none
// @website     https://github.com/shmuelie/user-scripts/blob/main/src/YtSkip.user.js
// @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/YtSkip.user.js
// @supportURL  https://github.com/shmuelie/user-scripts/issues
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    window.location = document.getElementById("invalid-token-redirect-goto-site-button").href;
})();