import axios from 'axios';

// Genius environment variables saved onto the server
const GENIUS_CLIENT_ACCESS_TOKEN = process.env.CENIUS_CLIENT_ACCESS_TOKEN;
// const accessToken = GENIUS_CLIENT_ACCESS_TOKEN;

const accessToken = "5psRWtPtLvR9hYZ1DEd84KFKcI-54iXoH-TyOGlugWlZ2SloxIj3UOzulaQXTEV0";
export const getLyrics = () => {
    // return axios.get('/songs/378195');
    // return axios.get(`http://192.168.4.158:8888/genius`);
    return axios.get(`https://api.genius.com/songs/378195?access_token=${accessToken}`);
};