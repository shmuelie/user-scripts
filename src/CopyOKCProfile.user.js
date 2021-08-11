// ==UserScript==
// @name        Copy OKC Profile
// @namespace   net.englard.shmuelie
// @version     2.2.0
// @description Open new window with profile in plain text form.
// @author      Shmuelie
// @match       https://www.okcupid.com/profile/*
// @match       https://okcupid.com/profile/*
// @grant       none
// @website     https://github.com/shmuelie/user-scripts/blob/main/src/CopyOKCProfile.user.js
// @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/CopyOKCProfile.user.js
// @supportURL  https://github.com/shmuelie/user-scripts/issues
// @run-at      document-idle
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    const profileUserdropdownButton = document.createElement("button");
    profileUserdropdownButton.classList.add("profile-userdropdown-button");
    profileUserdropdownButton.textContent = "Copy";
    const profileUserdropdownItem = document.createElement("li");
    profileUserdropdownItem.classList.add("profile-userdropdown-dropdown-item");
    profileUserdropdownItem.appendChild(profileUserdropdownButton);

    profileUserdropdownButton.addEventListener("click", function () {
        const profile = document.createElement("div");
        const profileEssaysElement = document.querySelector(".profile-essays");
        if (profileEssaysElement) {
            profile.appendChild(profileEssaysElement.cloneNode(true));
        }
        const profileThumbElement = document.querySelector(".profile-thumb");
        if (profileThumbElement) {
            profile.appendChild(profileThumbElement.cloneNode(true));
        }
        const blob = new Blob([profile.outerHTML], { type: "text/html" });
        const item = new ClipboardItem({
            "text/html": blob
        });
        const data = [item];
        navigator.clipboard.write(data).then(function() {
            console.log("Copied to clipboard successfully!");
        }, function(e) {
            console.error("Unable to write to clipboard.", e);
        });
    });

    const observer = new MutationObserver(function (mutations, obs) {
        const profileUserdropdown = document.getElementById("profile-userdropdown");
        if (profileUserdropdown) {
            profileUserdropdown.appendChild(profileUserdropdownItem);
            observer.disconnect();
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();