// ==UserScript==
// @name        Funimation PWA
// @namespace   net.englard.shmuelie
// @version     1.1.0
// @description Enables PWA features in Funimation web.
// @author      Shmuelie
// @match       https://www.funimation.com/player/*
// @grant       none
// @website     https://github.com/shmuelie/user-scripts/blob/main/src/FunimationPWA.user.js
// @updateURL   https://raw.githubusercontent.com/shmuelie/user-scripts/main/src/FunimationPWA.user.js
// @supportURL  https://github.com/shmuelie/user-scripts/issues
// ==/UserScript==

(function () {
    'use strict';

    if (window.fp && navigator.mediaSession && window.videojs) {
        const p = window.fp;
        const ms = navigator.mediaSession;
        const vjs = window.videojs;

        function onPlay() {
            ms.playbackState = "playing";
            ms.metadata = new MediaMetadata({
                album: p.show.showTitle,
                title: p.episode.title
            });
        }

        function onPause() {
            ms.playbackState = "paused";
        }

        function onEnded() {
            ms.playbackState = "none";
        }

        function onTimeupdate() {
            if (ms.setPositionState) {
                ms.setPositionState({
                    duration: p.episode.duration
                });
            }
        }

        function onSeekForward() {
            p.goForward10();
        }

        function onSeekBackward() {
            p.goBack10();
        }

        p.player.ready(function () {
            p.videoTag.addEventListener("play", onPlay);
            p.videoTag.addEventListener("pause", onPause);
            p.videoTag.addEventListener("ended", onEnded);
            p.videoTag.addEventListener("timeupdate", onTimeupdate);

            ms.setActionHandler("pause", function () {
                p.toggleVideoPlayback("off");
            });
            ms.setActionHandler("play", function () {
                p.toggleVideoPlayback("on");
            });
            ms.setActionHandler("seekforward", onSeekForward);
            ms.setActionHandler("seekbackward", onSeekBackward);
        });
    }
})();