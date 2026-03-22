// ==UserScript==
// @name         Search Deviations Notifications
// @namespace    net.englard.shmuelie
// @version      1.0.0
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
            input.style.color = styles.color;
        }
        input.style.background = "none";
        input.style.border = "1px solid currentColor";
        input.style.borderRadius = "4px";
        input.style.padding = "4px 8px";
        input.style.margin = "0 8px";
        input.style.outline = "none";
        input.style.opacity = "0.7";
        input.placeholder = "Search deviations\u2026";
    }

    /**
     * Get the title text for a deviation thumbnail element
     * @param {Element} thumb
     * @returns {string}
     */
    function getThumbTitle(thumb) {
        const img = thumb.querySelector("img");
        if (img) {
            return img.alt || img.title || "";
        }
        const link = thumb.querySelector("a[href]");
        if (link) {
            return link.textContent || link.getAttribute("title") || "";
        }
        return thumb.textContent || "";
    }

    /**
     * Get the notification row ancestor that should be shown/hidden
     * @param {Element} thumb
     * @returns {HTMLElement|null}
     */
    function getNotificationRow(thumb) {
        let el = thumb.parentElement;
        while (el) {
            if (el.querySelector("input[type=checkbox]")) {
                return el;
            }
            el = el.parentElement;
        }
        return null;
    }

    /**
     * Apply the current search filter to all visible thumbnails
     * @param {string} query
     */
    function applyFilter(query) {
        const lowerQuery = query.toLowerCase().trim();
        const thumbs = document.querySelectorAll("section div[data-testid=thumb]");
        thumbs.forEach(function (thumb) {
            const row = getNotificationRow(thumb);
            if (!row) {
                return;
            }
            if (!lowerQuery) {
                row.style.display = "";
                return;
            }
            const title = getThumbTitle(thumb).toLowerCase();
            row.style.display = title.indexOf(lowerQuery) !== -1 ? "" : "none";
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

        const resetButton = document.querySelector("span[role=button].reset-button");
        const toolbar = resetButton?.parentNode;
        if (!toolbar) {
            return false;
        }

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        styleInput(searchInput, resetButton);

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

        toolbar.appendChild(searchInput);

        // Re-apply filter when new content loads from infinite scroll
        const contentObserver = new MutationObserver(function () {
            applyFilter(searchInput.value);
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
