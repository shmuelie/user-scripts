// ==UserScript==
// @name         DeviantArt Video Context Menu
// @namespace    net.englard.shmuelie
// @version      1.0.0
// @description  Removes the overlay that blocks the context menu on DeviantArt videos
// @author       Shmuelie
// @match        https://www.deviantart.com/*/art/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deviantart.com
// @grant        none
// @website     https://github.com/shmuelie/user-scripts/blob/main/src/DeviantArtVideoContextMenu.user.js
// @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/DeviantArtVideoContextMenu.user.js
// @supportURL  https://github.com/shmuelie/user-scripts/issues
// ==/UserScript==

(function() {
    'use strict';

    const customStyle = document.createElement('style');
    customStyle.innerHTML = 'div.v-overlay { display: none; }';
    document.head.appendChild(customStyle);
})();