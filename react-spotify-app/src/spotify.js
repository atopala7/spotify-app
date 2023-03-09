import axios from 'axios';

// const LOCALSTORAGE_KEYS = {
//     accessToken: 'spotify_access_token',
//     refreshToken: 'spotify_refresh_token',
//     expireTime: 'spotify_token_expire_time',
//     timestamp: 'spotify_token_timestamp',
// }
// const LOCALSTORAGE_VALUES = {
//     accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
//     refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
//     expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
//     timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
// };

const SESSIONSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}
const SESSIONSTORAGE_VALUES = {
    accessToken: window.sessionStorage.getItem(SESSIONSTORAGE_KEYS.accessToken),
    refreshToken: window.sessionStorage.getItem(SESSIONSTORAGE_KEYS.refreshToken),
    expireTime: window.sessionStorage.getItem(SESSIONSTORAGE_KEYS.expireTime),
    timestamp: window.sessionStorage.getItem(SESSIONSTORAGE_KEYS.timestamp),
}

/**
 * Retrieves the Spotify access token from session storage or from the URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = () => {
    const querystring = window.location.search;
    const urlParams = new URLSearchParams(querystring);
    const queryParams = {
        [SESSIONSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [SESSIONSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [SESSIONSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');

    // If there's an error or if the access token in storage has expired, refresh the token
    if (hasError || hasTokenExpired() || SESSIONSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
    }

    // If there's a valid access token in storage, use that
    if (SESSIONSTORAGE_VALUES.accessToken && SESSIONSTORAGE_VALUES.accessToken !== 'undefined') {
        console.log("Found a valid access token in session storage!");
        console.log(`Access token: ${SESSIONSTORAGE_VALUES.accessToken}`);
        return SESSIONSTORAGE_VALUES.accessToken;
    }

    // If there's a token in the URL query parameters (and none in storage), store and use the given token
    if (queryParams[SESSIONSTORAGE_KEYS.accessToken]) {

        // Store the query parameters in session storage
        for (const property in queryParams) {
            window.sessionStorage.setItem(property, queryParams[property]);
        }

        // Set timestamp
        window.sessionStorage.setItem(SESSIONSTORAGE_KEYS.timestamp, Date.now());

        console.log("Set the access token from URL query parameters!");
        console.log(`Access token: ${queryParams[SESSIONSTORAGE_KEYS.accessToken]}`);

        // Return the access token from the query parameters
        return queryParams[SESSIONSTORAGE_KEYS.accessToken];
    }

    console.log("Failed to get access token!");
    return false;
};

/**
 * Checks if the amount of time between the timestamp in storage and the present moment exceeds the token's expiration time of 1 hour
 * @returns {boolean} Whether or not the access token in session storage has expired
 */
const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = SESSIONSTORAGE_VALUES;

    // If either the access token or timestamp is missing, there is no expired access token in storage
    if (!accessToken || !timestamp) {
        return false;
    }

    // If the amount of time that has passed since the token was set is greater than its expiration time, the token has expired
    const millisecondsElapsed = Date.now() - Number(timestamp);
    // Spotify's 'expires_in' parameter is measured in seconds
    return (millisecondsElapsed / 1000) > Number(expireTime);
};

/**
 * Use the refresh token in session storage to connect to the Node app's /refresh_token endpoint and update the value in session storage with the response
 * @returns {void}
 */
const refreshToken = async () => {
    try {
        // Log out if there's no refresh token stored
        if (!SESSIONSTORAGE_VALUES.refreshToken ||
            SESSIONSTORAGE_VALUES.refreshToken === 'undefined'
            // TODO: Check for infinite refresh loop
        ) {
            console.error("No refresh token available!");
            logout();
        }

        console.log("Refreshing access token...");
        console.log(`Refresh token: ${SESSIONSTORAGE_VALUES.refreshToken}`);

        // Await the completion of the `/refresh_token` endpoint from the Node app
        const { data } = await axios.get(`/refresh_token?refresh_token=${SESSIONSTORAGE_VALUES.refreshToken}`);

        // Update values in session storage
        window.sessionStorage.setItem(SESSIONSTORAGE_KEYS.accessToken, data.accessToken);
        window.sessionStorage.setItem(SESSIONSTORAGE_KEYS.timestamp, Date.now());

        // Reload the page so it reflects the changes to session storage
        window.location.reload();
    } catch (e) {
        console.error(e);
    }
}

export const logout = () => {
    // Clear all session storage items
    for (const property in SESSIONSTORAGE_KEYS) {
        console.log(`Clearing ${property} from session storage...`);
        window.sessionStorage.removeItem(SESSIONSTORAGE_KEYS[property]);
    }
    console.log("Cleared session storage!");

    // Navigate to the homepage
    window.location = window.location.origin;
};

export const accessToken = getAccessToken();