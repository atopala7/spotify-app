import axios from 'axios';

const URL = "http://192.168.4.158:8888/musixmatch";

export const getLyrics = async (trackName, artists, albumName) => {
    console.log(`Getting lyrics for ${trackName} by ${artists[0].name}`);
    const lyrics = [];

    const paramaters = new URLSearchParams([["trackName", trackName], ["artistName", artists[0].name], ["albumName", albumName]]);

    // Await the completion of the `/musixmatch` endpoint from the Node app
    const response = await axios({
        method: "get",
        url: URL,
        params: paramaters,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        }
    });

    return response;
}