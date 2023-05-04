// ==UserScript==
// @name        ADO Collapse All Button
// @namespace   net.englard.shmuelie
// @version     1.0.0
// @description Adds a collapse all button to ADO PR Reviews
// @author      Shmuelie
// @match       https://*.visualstudio.com/U*/_git/*/pullrequest/*
// @grant       none
// @website     https://github.com/shmuelie/user-scripts/blob/main/src/AdoCollapseAll.user.js
// @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/AdoCollapseAll.user.js
// @supportURL  https://github.com/shmuelie/user-scripts/issues
// ==/UserScript==

(function() {
    'use strict';

    function addCollapseAllButton() {
        setTimeout(function () {
            var toolbar = document.querySelector("div.repos-compare-toolbar").firstElementChild
            let collapseAllIcon = document.createElement("span");
            collapseAllIcon.ariaHidden = true;
            collapseAllIcon.classList.add("left-icon", "medium", "flex-noshrink", "fabric-icon", "ms-Icon--DoubleChevronDown");

            let collapseAllButton = document.createElement("button");
            collapseAllButton.ariaLabel = "Collapse All";
            collapseAllButton.ariaRoleDescription="button";
            collapseAllButton.classList.add("bolt-header-command-item-button", "bolt-button", "bolt-icon-button", "enabled", "subtle", "icon-only", "bolt-focus-treatment");
            collapseAllButton.dataset.focuszone = "focuszone-60";
            collapseAllButton.dataset.isFocusable = "true";
            collapseAllButton.id = "__bolt-collapseAll";
            collapseAllButton.role = "menuitem";
            collapseAllButton.tabInde= 0;
            collapseAllButton.type = "button";
            collapseAllButton.appendChild(collapseAllIcon);
            collapseAllButton.addEventListener("click", function() { 
                document.querySelectorAll("button[aria-label=Collapse]").forEach(function (e) { 
                    e.click(); 
                }); 
            });

            let collapseAllButtonWrapper = document.createElement("div");
            collapseAllButtonWrapper.classList.add("repos-compare-header-commandbar", "flex-row", "flex-center", "flex-grow", "scroll-hidden", "rhythm-horizontal-8");
            collapseAllButtonWrapper.appendChild(collapseAllButton);
            collapseAllButtonWrapper.appendChild(document.createElement("div"));

            let collapseAllMenubar = document.createElement("div");
            collapseAllMenubar.appendChild(collapseAllButtonWrapper);
            toolbar.appendChild(collapseAllMenubar);
        }, 0);
    }

    document.querySelector("a#__bolt-tab-files").addEventListener("click", addCollapseAllButton);
    if (document.location.search.indexOf("_a=files") != -1) {
        addCollapseAllButton();
    }
})();