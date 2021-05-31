// ==UserScript==
// @name         YtSkip
// @namespace    net.englard.shmuelie
// @version      1.1
// @description  Skip YouTube redirect permission page.
// @author       Shmuelie
// @match        https://www.youtube.com/redirect*
// @grant        none
// @updateURL    https://gist.githubusercontent.com/SamuelEnglard/9d4ea7c521433d2194f382758e59d3a1/raw/YtSkip.js
// @website      https://gist.github.com/SamuelEnglard/9d4ea7c521433d2194f382758e59d3a1
// ==/UserScript==

(function() {
    'use strict';

    window.location = document.getElementById("invalid-token-redirect-goto-site-button").href;
})();