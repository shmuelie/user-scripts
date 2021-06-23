interface Player {
    listen(event: "loadstart"|"playing"|"loadedmetadata"|"timeupdate"|"pause"|"play"|"seeking"|"ended"|"volumechange"|"error",f: Function): void;
    isPlaying(): boolean;
    currentEpisode?: Episode;
    togglePlayback(play: boolean): boolean;
}

interface Episode {
    description: string;
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
