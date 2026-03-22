// ==UserScript==
// @name         Search Deviations Notifications
// @namespace    net.englard.shmuelie
// @version      1.1.0
// @description  Adds a search box to filter DeviantArt deviations notifications by title
// @author       Shmuelie
// @match        https://www.deviantart.com/notifications/watch/deviations*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deviantart.com
// @grant        none
// @supportURL   https://github.com/shmuelie/user-scripts/issues
// @website      https://github.com/shmuelie/user-scripts/blob/main/src/SearchDeviationsNotifications.user.js
// @downloadURL  https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/SearchDeviationsNotifications.user.js
// @updateURL    https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/SearchDeviationsNotifications.user.js
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Style the search input to match the DeviantArt page
     * @param {HTMLInputElement} input
     * @param {Element|null} reference
     */
    function styleInput(input, reference) {
        const styles = reference ? getComputedStyle(reference) : null;
        if (styles) {
            input.style.fontFamily = styles.fontFamily;
            input.style.fontSize = styles.fontSize;
            input.style.fontWeight = styles.fontWeight;
            input.style.color = styles.color;
            input.style.lineHeight = styles.lineHeight;
        }
        input.style.background = "none";
        input.style.border = "none";
        input.style.borderBottom = "1px solid currentColor";
        input.style.borderRadius = "0";
        input.style.padding = "0";
        input.style.margin = "0";
        input.style.outline = "none";
        input.style.minWidth = "0";
        input.style.width = "12ch";
        input.style.flexShrink = "1";
        input.placeholder = "Filter\u2026";
    }

    /**
     * Apply the current search filter to all visible thumbnails.
     * Uses the same DOM traversal as SelectBlurs: from img, 3 levels
     * up is the item container that holds both the thumb and checkbox.
     * @param {string} query
     */
    function applyFilter(query) {
        const lowerQuery = query.toLowerCase().trim();
        /** @type {NodeListOf<HTMLImageElement>} */
        const images = document.querySelectorAll("section div[data-testid=thumb] img");
        images.forEach(function (img) {
            const itemContainer = img.parentNode?.parentNode?.parentNode;
            if (!(itemContainer instanceof HTMLElement)) {
                return;
            }
            if (!lowerQuery) {
                itemContainer.style.display = "";
                return;
            }
            const title = (img.alt || img.title || "").toLowerCase();
            itemContainer.style.display = title.includes(lowerQuery) ? "" : "none";
        });
    }

    /**
     * Set up the search input once the page content is available
     * @returns {boolean}
     */
    function initialize() {
        const thumbContainer = document.querySelector("div[data-testid=content_row]")?.parentElement?.parentElement;
        if (!thumbContainer) {
            return false;
        }

        const selectAllBtn = Array.from(document.querySelectorAll("button")).find(function (b) { return b.textContent?.trim() === "Select All"; });
        const selectAllParent = selectAllBtn?.parentNode?.parentNode;
        if (!selectAllParent) {
            return false;
        }

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        styleInput(searchInput, selectAllBtn || null);
        searchInput.style.marginLeft = "16px";

        /** @type {number|null} */
        let debounceTimer = null;
        searchInput.addEventListener("input", function () {
            if (debounceTimer !== null) {
                clearTimeout(debounceTimer);
            }
            debounceTimer = setTimeout(function () {
                debounceTimer = null;
                applyFilter(searchInput.value);
            }, 200);
        });

        selectAllParent.appendChild(searchInput);

        // Re-apply filter when new content loads from infinite scroll.
        // Disconnect while applying to avoid a feedback loop where
        // setting display triggers the observer again.
        let isApplying = false;
        const contentObserver = new MutationObserver(function () {
            if (isApplying) {
                return;
            }
            isApplying = true;
            applyFilter(searchInput.value);
            isApplying = false;
        });
        contentObserver.observe(thumbContainer, {
            childList: true,
            subtree: true
        });

        return true;
    }

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
