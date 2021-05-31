// ==UserScript==
// @name         Crunchyroll Download
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Shmuelie
// @match        https://www.crunchyroll.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const baseCommand = 'youtube-dl --add-metadata --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.0.0 Safari/537.36 Edg/75.0.131.0" -u "**" -p "**" --cookies crunchyroll.com_cookies.txt';
    function getConfig() {
        const scriptElement = Array.from(document.getElementsByTagName("script")).filter(function (elm) { return elm.src == ""; }).find(function (elm) { return elm.text.indexOf("vilos.config.media") != -1; });
        if (scriptElement) {
            let index = scriptElement.text.indexOf("vilos.config.media");
            if (index == -1) {
                return null;
            }
            let code = scriptElement.text.substr(index);
            index = code.indexOf("\n");
            if (index == -1) {
                return null;
            }
            code = code.substr(0, index - 1);
            index = code.indexOf("{");
            if (index == -1) {
                return null;
            }
            code = code.substr(index);
            return JSON.parse(code);
        }
        return null;
    }
    function getLang(audio_lang, hardsub_lang) {
        if (audio_lang === "jaJP" && hardsub_lang === "enUS") {
            return " (Sub)";
        }
        if (audio_lang === "enUS" && hardsub_lang === null) {
            return " (Dub)";
        }
        if (audio_lang === "jaJP" && hardsub_lang === null) {
            return "";
        }
        return null;
    }
    function getSeriesName() {
        return document.getElementById("showmedia_about_episode_num").innerText;
    }
    const config = getConfig();
    if (config) {
        const ul = document.createElement("ul");
        for (const stream of config.streams) {
            if (stream.format !== "adaptive_hls") {
                continue;
            }
            const lang = getLang(stream.audio_lang, stream.hardsub_lang);
            if (lang !== null) {
                const li = document.createElement("li");
                li.innerText = baseCommand + '-o "' + getSeriesName() + " - " + config.metadata.title + lang + '.mp4"' + ' "' + stream.url + '"';
                li.append(document.createElement("br"));
                li.append(document.createElement("br"));
                ul.append(li);
            }
        }
        document.body.append(ul);
    }
})();