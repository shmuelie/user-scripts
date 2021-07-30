interface Episode {
    readonly mediaCategory: string;
    readonly episodeTitle: string;
    readonly devices: string[];
    readonly episodeId: string;
    readonly territories: string[];
    readonly episodeSummary: string;
    readonly episodePk: number;
    readonly slug: string;
}

interface Season {
    readonly seasonPk: number;
    readonly seasonId: number;
    readonly episodes: Episode[];
    readonly seasonTitle: string;
    readonly totalEpisodes: number;
}

interface Show {
    readonly showId: number;
    readonly showTitle: string;
    readonly totalSeasons: number;
    readonly showSlug: string;
    readonly estOnlyExperience: boolean;
    readonly seasons: Season[];
    readonly watchHistoryInterval: number;
    readonly inQueue: boolean;
}

/**
 * A class for extending the capabilities of the Brightcove video player.
 *
 * @author Rob Marston <rob@giantsource.com>
 */
interface FunimationPlayer {
    readonly episode: Episode;
    readonly season: Season;
    readonly show: Show;
    readonly episodeIndex: number;
    readonly seasonIndex: number;
    readonly videoTag: HTMLVideoElement;
    /**
     * Plays the next episode.
     *
     * @param _increment Whether or not to try icrementing the season and/or episode indices
     * @param _marathoned Whether or not to set the marathon localStorage variable
     */
    playNext(_increment: boolean, _marathoned: boolean): void;
    /**
     * Plays the prev episode.
     *
     * @param _decrement Whether or not to try decrement the season and/or episode indices
     * @param _marathoned Whether or not to set the marathon localStorage variable
     */
    playPrev(_decrement: boolean, _marathoned: boolean): void;
    /**
     * Moves the playhead back 10 seconds.
     */
    goBack10(): void;
    /**
     * Moves the playhead forward 10 seconds.
     */
    goForward10(): void;
    /**
     * Plays the last episode.
     */
    playLast(): void;
    /**
     * Replays the current video.
     */
    replay(): void;
    /**
     * Mute / Unmute player on icon click.
     */
    muteUnMute(): void;
    /**
     * Toggles the value of the autoplay property (not the video's autoplay feature).
     *
     * @param state The current state of the toggle (on or off).
     */
    toggleAutoplay(state: "on" | "off"): void;
    /**
     * Toggles the player size.
     *
     * @param state The current state of the toggle (on or off).
     */
    toggleFullscreen(state: "on" | "off"): void;
    /**
     * Toggles regular video playback.
     *
     * @param state The current state of the toggle (on or off).
     */
    toggleVideoPlayback(state: "on" | "off"): void;
}

interface Window {
    fp?: FunimationPlayer;
}
