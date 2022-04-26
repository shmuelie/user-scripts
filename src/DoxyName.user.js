// ==UserScript==
// @name        Doxy.me Check In
// @namespace   net.englard.shmuelie
// @version     1.0.0
// @description Makes Doxy.me check in auto complete for first name.
// @author      Shmuelie
// @match       https://doxy.me/*
// @grant       none
// @website     https://github.com/shmuelie/user-scripts/blob/main/src/DoxyName.user.js
// @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/DoxyName.user.js
// @supportURL  https://github.com/shmuelie/user-scripts/issues
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    const observer = new MutationObserver(function () {
        const checkInName = document.querySelector("input[data-test-id=check-in-name-input");
        if (checkInName) {
            checkInName.autocomplete = "firstname";
            observer.disconnect();
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();