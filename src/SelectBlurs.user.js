// ==UserScript==
// @name         Select Blurs
// @namespace    net.englard.shmuelie
// @version      1.1.0
// @description  Select blurred items from DeviantArt notifications
// @author       Shmuelie
// @match        https://www.deviantart.com/notifications/watch/deviations*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deviantart.com
// @grant        none
// @supportURL   https://github.com/shmuelie/user-scripts/issues
// @website      https://github.com/shmuelie/user-scripts/blob/main/src/SelectBlurs.user.js
// @updateURL    https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/SelectBlurs.user.js
// ==/UserScript==

(function() {
    'use strict';
    function selectBlured() {
        Array.from(document.querySelectorAll("section div[data-testid=thumb] img")).filter(function (img) {
            return img.src.indexOf("blur_30") != -1;
        }).forEach(function (img) {
            const checkbx = img.parentNode.parentNode.parentNode.querySelector("input[type=checkbox]");
            if (!checkbx.checked) {
                checkbx.click();
            }
        });
        Array.from(document.querySelectorAll('div')).filter(function (e) {
            return e.innerHTML == 'Unlock the artist’s Premium Gallery to watch this video.';
        }).forEach(function (div) {
            const checkbx = div.parentNode.parentNode.querySelector("input[type=checkbox]");
            if (!checkbx.checked) {
                checkbx.click();
            }
        });
    };

    const clearbtn = document.createElement("button");
    const selectionClearbtn = document.createElement("button");

    const thumbContainer = document.querySelector("div[data-testid=content_row]").parentElement.parentElement;
    let observer = null;

    function selectClicked() {
        if (observer) {
            observer.disconnect();
            observer = null;
            clearbtn.innerText = "Start Selecting Blured";
            selectionClearbtn.innerText = "Start Selecting Blured";
        }
        else {
            clearbtn.innerText = "Stop Selecting Blured";
            selectionClearbtn.innerText = "Stop Selecting Blured";
            selectBlured();
            observer = new MutationObserver(function () {
                selectBlured();
            });
            observer.observe(thumbContainer, {
                attributes: false,
                childList: true,
                subtree: true
            });
        }
    }

    const toolbar = document.querySelector("span[role=button].reset-button").parentNode;
    clearbtn.innerText = "Start Selecting Blured";
    clearbtn.addEventListener("click", selectClicked);
    toolbar.appendChild(clearbtn);

    const selectionToolbar = document.querySelector("input[type=checkbox][aria-label='Select All']").parentNode.parentNode;
    selectionClearbtn.innerText = "Start Selecting Blured";
    selectionClearbtn.addEventListener("click", selectClicked);
    selectionToolbar.appendChild(selectionClearbtn);
})();