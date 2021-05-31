// ==UserScript==
// @name         Get Jump Player Video
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://jwp.io/s/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.body.innerHTML += "<ul>";
    window.__INITIAL_STATE__.media.playlist[0].sources.map(function (s) { return "<li><a target=\"_blank\" href=\"" + s.file + "\">" + s.label + "</a></li>"; }).forEach(function (s) { document.body.innerHTML += s; });
    document.body.innerHTML += "</ul>";
})();