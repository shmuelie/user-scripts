// ==UserScript==
// @name        PlayerFM PWA
// @namespace   net.englard.shmuelie
// @version     1.0.0
// @description Enables PWA features in PlayerFM web.
// @author      Shmuelie
// @match       https://player.fm/*
// @grant       none
// @website     https://github.com/shmuelie/user-scripts/blob/main/src/PlayerFMPWA.user.js
// @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/PlayerFMPWA.user.js
// @supportURL  https://github.com/shmuelie/user-scripts/issues
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    function getMediaMeta(/** @type {Episode} */episode) {
        return new MediaMetadata({
            album: episode.series.title,
            artist: episode.series.network.name || episode.series.owner,
            artwork: [
                {
                    src: episode.series.imageModel.url
                }
            ],
            title: episode.title
        });
    }

    if (window.player) {
        const p = window.player;
        const ms = navigator.mediaSession;

        function onPlay() {
            ms.playbackState = "playing";
            ms.metadata = getMediaMeta(p.currentEpisode);
        }

        function onPause() {
            ms.playbackState = "paused";
        }

        function onEnded() {
            ms.playbackState = "none";
        }

        p.listen("play", onPlay);
        p.listen("pause", onPause);
        p.listen("ended", onEnded);

        ms.setActionHandler("pause", function () {
            p.togglePlayback(false);
        });
        ms.setActionHandler("play", function() {
            p.togglePlayback(true);
        });
    }
})();