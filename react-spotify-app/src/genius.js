import axios from 'axios';

// Genius environment variables saved onto the server
const GENIUS_CLIENT_ACCESS_TOKEN = process.env.CENIUS_CLIENT_ACCESS_TOKEN;
// const accessToken = GENIUS_CLIENT_ACCESS_TOKEN;

const accessToken = "5psRWtPtLvR9hYZ1DEd84KFKcI-54iXoH-TyOGlugWlZ2SloxIj3UOzulaQXTEV0";
export const getLyrics = () => {
    // return axios.get('/songs/378195');
    return axios.get(`https://api.genius.com/songs/378195?access_token=${accessToken}`);
};

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
// axios.defaults.baseURL = 'https://api.genius.com/';
// axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
// axios.defaults.headers['Content-Type'] = 'application/json';