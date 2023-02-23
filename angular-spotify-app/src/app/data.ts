export interface Data {
    timestamp: number,
    context: {
        external_urls: {
            spotify: string
        },
        href: string,
        type: string,
        uri: string
    },
    progress_ms: number,
    item: {
        album: {
            album_type: string,
            artists: [
                {
                    external_urls: {
                        spotify: string; 
                    },
                    href: string,
                    id: string,
                    name: string,
                    type: string,
                    uri: string
                }
            ],
            available_markets: object,
            external_urls: {
                spotify: string;
            },
            href: string,
            id: string,
            images: object,
            name: string,
            release_date: string,
            release_date_precision: string,
            total_tracks: number,
            type: string,
            uri: string,
        },
        artists: object,
        available_markets: object,
        disc_number: number,
        duration_ms: number,
        explicit: boolean,
        external_ids: {
            isrc: string
        },
        external_urls: {
            spotify: string;
        },
        href: string,
        id: string,
        is_local: boolean,
        name: string,
        popularity: number,
        preview_url: string,
        track_number: number,
        type: number,
        uri: string
    },
    currently_playing_type: string,
    actions: {
        disallows: {
            pausing: boolean,
            skipping_prev: boolean
        }
    },
    is_playing: boolean
}