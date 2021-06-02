// ==UserScript==
// @name        DiscordImageDownload
// @namespace   net.englard.shmuelie
// @version     1.1
// @description Extract images from discord channel
// @author      Shmuelie
// @match       https://*.discord.com/*
// @grant       none
// @run-at      context-menu
// @website     https://github.com/SamuelEnglard/user-scripts/blob/main/src/DiscordImageDownload.user.js
// @updateURL   https://raw.githubusercontent.com/SamuelEnglard/user-scripts/main/src/DiscordImageDownload.user.js
// @supportURL  https://github.com/SamuelEnglard/user-scripts/issues
// ==/UserScript==

(function() {
    'use strict';

    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    Promise.all(
        Array.from(document.getElementsByTagName("a")).
        filter((a) => a.className.indexOf("imageWrapper-") !== -1).
    map((a) => fetch(a.href).then((r) => r.blob()))
    ).
    then(async (arr) => {
        for (const b of arr) {
            const e = document.createElement("a");
            e.href = URL.createObjectURL(b);
            e.setAttribute("download", "");
            document.body.appendChild(e);
            e.click();
            document.body.removeChild(e);
            await sleep(1000);
        }
    });
})();