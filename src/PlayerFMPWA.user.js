// ==UserScript==
// @name        PlayerFM PWA
// @namespace   net.englard.shmuelie
// @version     1.1.1
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

    if (window.player) {
        const p = window.player;
        const ms = navigator.mediaSession;

        function onPlay() {
            ms.playbackState = "playing";
            ms.metadata = new MediaMetadata({
                album: p.currentEpisode.series.title,
                artist: p.currentEpisode.series.network.name || p.currentEpisode.series.owner,
                artwork: [
                    {
                        src: p.currentEpisode.series.imageModel.url
                    }
                ],
                title: p.currentEpisode.title
            });
            if (ms.setPositionState) {
                ms.setPositionState({
                    duration: p.currentEpisode.duration,
                    position: this.player.getCurrentTime(),
                    playbackRate: player.getSpeed()
                });
            }
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
        ms.setActionHandler("seekforward", function () {
            p.seekIncrement(p.getForwardJumpDuration());
        });
        ms.setActionHandler("seekbackward", function () {
            p.seekIncrement(-p.getBackwardJumpDuration());
        })
        ms.setActionHandler("nexttrack", function () {
            p.gotoNext(false);
        });
        ms.setActionHandler("previoustrack", function () {
            p.gotoPrev();
        });

    }
})();