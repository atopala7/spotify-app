import axios from 'axios';

export const getLyrics = async (trackName, artistName) => {
    const lyrics = [];

    const API_KEY = process.env.REACT_MUSIXMATCH_API_KEY;

    console.log(API_KEY);

    let url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${API_KEY}`;

}