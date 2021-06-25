interface Player {
    readonly currentEpisode?: Episode;
    readonly playCount: number;
    readonly audio: HTMLAudioElement;
    readonly autoplaying: boolean;
    readonly currentPlaylist?: Playlist;
    readonly currentTrackIsAuto: boolean;

    /**
     * In seconds
     */
    getBackwardJumpDuration(): number;
    /**
     * In seconds
     */
    getCurrentTime(): number;
    /**
     * In seconds
     */
    getDuration(): number;
    /**
     * In seconds
     */
    getForwardJumpDuration(): number;
    getSpeed(): number;
    getVolume(): number;
    gotoNext(b: false): void;
    gotoPrev(): void;
    handleAutoplayFromDOMDetail(): any;
    handleAutoplayFromUserPlayHistory(): any | undefined;
    isPlaying(): boolean;
    keepCheckingBufferStateUntilPlaying(): number;
    listen(event: "loadstart"|"playing"|"loadedmetadata"|"timeupdate"|"pause"|"play"|"seeking"|"ended"|"volumechange"|"error", f: Function): void;
    pause(): void;
    populateFromPlayHistory(): any;
    repaintPageContent(): any;
    seek(t: number, options?: SeekOptions): void;
    seekIncrement(increment: number): void;
    setPlayableElement(t: any, e: any): any;
    setSpeed(speed: number): void;
    setVolume(volume: number): void;
    startOrPauseOrResume(t: any, e: any): any;
    toggleMute(): 1 | 0;
    togglePlayback(play: boolean): boolean;
    volumeIncrement(inc: number): void;
    getPositionFromSecsOrRatio(t: number, asRatio: boolean): number;
}

interface Playlist {
    readonly index: number;

    toString(): string;
    length(): number;
    current(): Episode;
    indexOf(id: number): number;
    prev(t: boolean): boolean;
    next(t: boolean): boolean;
    autoNext(): Episode | undefined;
}

interface SeekOptions {
    asRatio: boolean;
    play: boolean;
}

interface Episode {
    description: string;
    /**
     * In seconds
     */
    duration: number;
    explicit: boolean;
    id?: number;
    publishedAt: number;
    series: Series;
    title: string;
}

interface Series {
    access: "protected" | "public";
    backgroundColor: string;
    fetchStatus: string;
    id?: number;
    imageModel: ImageModel;
    network: Network;
    owner: string;
    title: string;
}

interface ImageModel {
    blank: boolean;
    id?: number;
    palette: [string,string];
    suffix: string;
    url: string;
    urlBase: string;
}

interface Network {
    name: string;
}

interface Window {
    player?: Player;
}
