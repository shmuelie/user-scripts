// ==UserScript==
// @name         Select Blurs
// @namespace    net.englard.shmuelie
// @version      1.4.0
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

    const startSelectingText = "Start Selecting Blured";
    const stopSelectingText = "Stop Selecting Blured";

    const clearbtn = document.createElement("button");
    clearbtn.innerText = startSelectingText;
    const selectionClearbtn = document.createElement("button");
    selectionClearbtn.innerText = startSelectingText;

    /** @type {MutationObserver|null} */
    let observer = null;
    /** @type {number|null} */
    let scrollTimer = null;
    /** @type {number|null} */
    let endCheckTimer = null;
    let noGrowthCount = 0;

    function stopSelecting() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
            scrollTimer = null;
        }
        if (endCheckTimer !== null) {
            clearTimeout(endCheckTimer);
            endCheckTimer = null;
        }
        noGrowthCount = 0;
        clearbtn.innerText = startSelectingText;
        selectionClearbtn.innerText = startSelectingText;
    }

    /**
     * After scrolling, check if the page grew. If not, retry a few times before stopping.
     * @param {number} heightBeforeScroll
     */
    function checkForEnd(heightBeforeScroll) {
        endCheckTimer = setTimeout(function () {
            endCheckTimer = null;
            if (document.body.scrollHeight > heightBeforeScroll) {
                noGrowthCount = 0;
                selectBlured();
            } else {
                noGrowthCount++;
                if (noGrowthCount >= 3) {
                    stopSelecting();
                } else {
                    window.scrollTo(0, document.body.scrollHeight);
                    checkForEnd(heightBeforeScroll);
                }
            }
        }, 3000);
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
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        if (endCheckTimer !== null) {
            clearTimeout(endCheckTimer);
            endCheckTimer = null;
        }
        noGrowthCount = 0;
        scrollTimer = setTimeout(function () {
            scrollTimer = null;
            const heightBeforeScroll = document.body.scrollHeight;
            window.scrollTo(0, document.body.scrollHeight);
            checkForEnd(heightBeforeScroll);
        }, 2000);
    }

    /**
     * @param {HTMLElement} thumbContainer
     */
    function selectClicked(thumbContainer) {
        if (observer) {
            stopSelecting();
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

    /**
     * Set up buttons once the page content is available
     * @returns {boolean}
     */
    function initialize() {
        const thumbContainer = document.querySelector("div[data-testid=content_row]")?.parentElement?.parentElement;
        if (!thumbContainer) {
            return false;
        }

        const resetButtonParent = document.querySelector("span[role=button].reset-button")?.parentNode;
        const selectAllParent = document.querySelector("input[type=checkbox][aria-label='Select All']")?.parentNode?.parentNode;
        if (!resetButtonParent && !selectAllParent) {
            return false;
        }

        function handleClick() { selectClicked(thumbContainer); }
        clearbtn.addEventListener("click", handleClick);
        selectionClearbtn.addEventListener("click", handleClick);

        if (resetButtonParent) {
            resetButtonParent.appendChild(clearbtn);
        }
        if (selectAllParent) {
            selectAllParent.appendChild(selectionClearbtn);
        }
        return true;
    }

    // Try immediately; if the page hasn't loaded content yet, watch for it
    if (!initialize()) {
        const pageObserver = new MutationObserver(function () {
            if (initialize()) {
                pageObserver.disconnect();
            }
        });
        pageObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();