// ==UserScript==
// @name         Select Blurs
// @namespace    net.englard.shmuelie
// @version      1.2.1
// @description  Select blurred items from DeviantArt notifications
// @author       Shmuelie
// @match        https://www.deviantart.com/notifications/watch/deviations*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deviantart.com
// @grant        none
// @supportURL   https://github.com/shmuelie/user-scripts/issues
// @website      https://github.com/shmuelie/user-scripts/blob/main/src/SelectBlurs.user.js
// @downloadURL  https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/SelectBlurs.user.js
// @updateURL    https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/SelectBlurs.user.js
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Select images that are blurred based on the URL containing "blur_30"
     * @param {HTMLImageElement} img
     * @returns {boolean}
     */
    function blur30Filter(img){
        return img.src.indexOf("blur_30") != -1;
    }

    /**
     * Select the checkbox for the given image
     * @param {HTMLImageElement} img
     * @returns {void}
     */
    function selectBlur30(img) {
        /**
         * @type {HTMLInputElement|undefined|null}
         */
        const checkbx = img.parentNode?.parentNode?.parentNode?.querySelector("input[type=checkbox]");
        if (checkbx && !checkbx.checked) {
            checkbx.click();
        }
    }

    /**
     * Filter for premium blurred items
     * @param {HTMLDivElement} div
     * @returns {boolean}
     */
    function premiumFilter(div) {
        return div.innerHTML == 'Unlock the artist’s Premium Gallery to watch this video.';
    }

    /**
     * Select the checkbox for the given premium div
     * @param {HTMLDivElement} div
     * @returns {void}
     */
    function selectPremium(div) {
        /**
         * @type {HTMLInputElement|undefined|null}
         */
        const checkbx = div.parentNode?.parentNode?.querySelector("input[type=checkbox]");
        if (checkbx && !checkbx.checked) {
            checkbx.click();
        }
    }

    /**
     * Select all blurred items on the page and scroll down to load more
     * @returns {void}
     */
    function selectBlured() {
        Array.from(
            /** @type {NodeListOf<HTMLImageElement>} */
            (document.querySelectorAll("section div[data-testid=thumb] img"))
        ).filter(blur30Filter).forEach(selectBlur30);
        Array.from(document.querySelectorAll('div')).filter(premiumFilter).forEach(selectPremium);
        setTimeout(function () {
            window.scrollTo(0, document.body.scrollHeight);
        }, 2000);
    };

    const startSelectingText = "Start Selecting Blured";
    const stopSelectingText = "Stop Selecting Blured";

    const clearbtn = document.createElement("button");
    clearbtn.innerText = startSelectingText;
    const selectionClearbtn = document.createElement("button");
    selectionClearbtn.innerText = startSelectingText;

    const thumbContainer = document.querySelector("div[data-testid=content_row]")?.parentElement?.parentElement;

    if (!thumbContainer) {
        return;
    }

    /**
     * @type {MutationObserver|null}
     */
    let observer = null;
    function selectClicked() {
        if (!thumbContainer) {
            return;
        }

        if (observer) {
            observer.disconnect();
            observer = null;
            clearbtn.innerText = startSelectingText;
            selectionClearbtn.innerText = startSelectingText;
        }
        else {
            clearbtn.innerText = stopSelectingText;
            selectionClearbtn.innerText = stopSelectingText;
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

    clearbtn.addEventListener("click", selectClicked);
    selectionClearbtn.addEventListener("click", selectClicked);

    document.querySelector("span[role=button].reset-button")?.parentNode?.appendChild(clearbtn);
    document.querySelector("input[type=checkbox][aria-label='Select All']")?.parentNode?.parentNode?.appendChild(selectionClearbtn);
})();