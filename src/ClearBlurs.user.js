// ==UserScript==
// @name         Clear Blurs
// @namespace    net.englard.shmuelie
// @version      1.0.0
// @description  Remove blurred items from DeviantArt notifications
// @author       Shmuelie
// @match        https://www.deviantart.com/notifications/watch/deviations*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deviantart.com
// @grant        none
// @website      https://github.com/shmuelie/user-scripts/blob/main/src/ClearBlurs.user.js
// @updateURL    https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/ClearBlurs.user.js
// @supportURL   https://github.com/shmuelie/user-scripts/issues
// ==/UserScript==

(function() {
    'use strict';
    const toolbar = document.querySelector("span[role=button].reset-button").parentNode;
    const clearbtn = document.createElement("button");
    clearbtn.innerText = "Clear";
    clearbtn.addEventListener("click", function () {
        Array.from(document.querySelectorAll("section div[data-testid=thumb] img")).filter(function (img) {
            return img.src.indexOf("blur_30") != -1;
        }).map(function (img) {
            return img.parentNode.parentNode.parentNode.lastChild.querySelector("button:not([aria-label=Favourite])");
        }).forEach(function (btn) {
            btn.click();
        });
    });
    toolbar.appendChild(clearbtn);
})();