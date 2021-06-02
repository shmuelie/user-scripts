// ==UserScript==
// @name        YtSkip
// @namespace   net.englard.shmuelie
// @version     1.1
// @description Skip YouTube redirect permission page.
// @author      Shmuelie
// @match       https://www.youtube.com/redirect*
// @grant       none
// @website     https://github.com/SamuelEnglard/user-scripts/blob/main/src/YtSkip.user.js
// @updateURL   https://raw.githubusercontent.com/SamuelEnglard/user-scripts/main/src/YtSkip.user.js
// @supportURL  https://github.com/SamuelEnglard/user-scripts/issues
// ==/UserScript==

(function() {
    'use strict';

    window.location = document.getElementById("invalid-token-redirect-goto-site-button").href;
})();