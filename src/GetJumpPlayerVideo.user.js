// ==UserScript==
// @name        Get Jump Player Video
// @namespace   net.englard.shmuelie
// @version     1.0.0
// @description Append video URLs to end of Jump Player pages.
// @author      Shmuelie
// @match       https://jwp.io/s/*
// @grant       none
// @website     https://github.com/shmuelie/user-scripts/blob/main/src/GetJumpPlayerVideo.user.js
// @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/GetJumpPlayerVideo.user.js
// @supportURL  https://github.com/shmuelie/user-scripts/issues
// @run-at      document-idle
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    document.body.innerHTML += "<ul>";
    window.__INITIAL_STATE__.media.playlist[0].sources.map(function (s) { return "<li><a target=\"_blank\" href=\"" + s.file + "\">" + s.label + "</a></li>"; }).forEach(function (s) { document.body.innerHTML += s; });
    document.body.innerHTML += "</ul>";
})();