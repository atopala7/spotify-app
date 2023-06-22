// Genius environment variables saved onto the server
require("dotenv").config();
const GENIUS_CLIENT_ID = process.env.GENIUS_CLIENT_ID;
const GENIUS_CLIENT_SECRET = process.env.GENIUS_CLIENT_SECRET;
// const GENIUS_REDIRECT_URI = process.env.GENIUS_REDIRECT_URI;

const client_token = "NPfa4dvGEVBq9tbjiR-9yoOBb9HfRSgE_I_uBcwsdef1TZxs2zDUToh082pMvmwf";

/**
 * Retrieves the Genius access token from local storage or from the URL query params
 * @returns {string} A Genius access token
 */
const getAccessToken = () => {
    const querystring = window.location.search;
    const urlParams = new URLSearchParams(querystring);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');

    // If there's an error or if the access token in storage has expired, refresh the token
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        console.log("Getting a refresh token...");
        refreshToken();
    }

    // If there's a valid access token in storage, use that
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        console.log("Found a valid access token in local storage!");
        console.log(`Access token: ${LOCALSTORAGE_VALUES.accessToken}`);
        return LOCALSTORAGE_VALUES.accessToken;
    }

    // If there's a token in the URL query parameters (and none in storage), store and use the given token
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {

        // Store the query parameters in local storage
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }

        // Set timestamp
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        console.log("Set the access token from URL query parameters!");
        console.log(`Access token: ${queryParams[LOCALSTORAGE_KEYS.accessToken]}`);

        // Return the access token from the query parameters
        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    console.log("Failed to get access token!");
    return false;
};