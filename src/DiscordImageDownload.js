// ==UserScript==
// @name         DiscordImageDownload
// @namespace    net.englard.shmuelie
// @version      1.1
// @description  Extract images from discord channel
// @author       Shmuelie
// @match        https://*.discord.com/*
// @grant        none
// @updateURL    https://gist.githubusercontent.com/SamuelEnglard/9d4ea7c521433d2194f382758e59d3a1/raw/DiscordImageDownload.js
// @run-at       context-menu
// @website      https://gist.github.com/SamuelEnglard/9d4ea7c521433d2194f382758e59d3a1
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