export interface Song {
    id: number;
    name: string;
    artist: {artists: string[], artistString: string};
    album: {name: string, art: string};
    duration: number;
    progress: number;
}