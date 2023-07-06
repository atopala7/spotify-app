import axios from 'axios';

export const getLyrics = async (trackName, artistName) => {
    const lyrics = [];

    let url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${apiKey}`;

}