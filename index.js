// This express app gets authorization and refresh tokens from Spotify

// Spotify environment variables saved onto the server
require("dotenv").config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Musixmatch API key saved onto the server
const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY;

const ORIGIN = "http://192.168.4.158:3000";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 8888;

app.use(cors())

const axios = require("axios");

const reactURI = REDIRECT_URI.substring(0, REDIRECT_URI.indexOf(":8888"));

const querystring = require("querystring");

const corsOptions = {
	origin: ORIGIN,
	optionSuccessStatus: 200
}

console.log("CLIENT_ID: " + process.env.CLIENT_ID);

// Creates a random string, to be used as the state in the initial login request to Spotify
const generateRandomString = (length) => {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

const stateKey = "spotify_auth_state";

app.get('/', (req, res) => {
	res.send("<a href='/login'>Login</a>");
});

// Return data from the Musixmatch API endpoint
app.get("/musixmatch", async (req, res) => {
	const apiKey = MUSIXMATCH_API_KEY;

	const { artistName, trackName, albumName } = req.query;

	let url = encodeURI(`https://api.musixmatch.com/ws/1.1/track.search?apikey=${apiKey}&q_track=${trackName}&q_artist=${artistName}`);

	let statusCode = null;

	console.log(url);

	// Await a response from the Musixmatch server and convert it to a JSON object
	let response = await fetch(url);
	let json = await response.json();

	console.log(json);
	statusCode = json.message.header.status_code;
	console.log(statusCode);

	if (statusCode != '200') {
		res.send(json);
		return;
	}

	const tracks = json.message.body.track_list;
	
    let song = null;

    // The Musixmatch API returns an array of tracks matching (to some degree) the given song name and artist
    // Loop through the array to find the one closest to the song we're looking for
    // TODO: Account for differences in puctuation or superfluous labels in track names (e.g. (Live), (Remix), etc.)
    for (let currentTrack of tracks) {
        const current = currentTrack.track;
		console.log(current.track_name + " by " + current.artist_name);
		
        // if (current.track_name.replace(/[^\w\']|_/g, "").replace(/\s+/g, " ") === trackName.replace(/[^\w\']|_/g, "").replace(/\s+/g, " ") 
		if (current.track_name === trackName && current.artist_name.includes(artistName) && current.has_lyrics === 1) {
			song = current;
        }
    }

	const trackID = song.track_id;
	
	console.log(trackID);

	url = encodeURI(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${apiKey}&track_id=${trackID}`);

	console.log(url);

	// Await a response from the Musixmatch server and convert it to a JSON object
	response = await fetch(url);
	json = await response.json();

	if (statusCode != '200') {
		res.send(json);
		return;
	}

	// Send back an object containing the song lyrics as well as additional copyright information
	// res.send(json.message.body.lyrics);

	res.send(json);
});

// Log in with OAuth to receive an authorization code
app.get("/login", (req, res) => {
	const state = generateRandomString(16);
	console.log("state: " + state);
	res.cookie(stateKey, state);

	// The scopes required for the requests
	const scope = [
		"user-read-currently-playing",
		"user-read-recently-played",
	].join(' ');

	const queryParams = querystring.stringify({
		client_id: CLIENT_ID,
		response_type: "code",
		redirect_uri: REDIRECT_URI,
		state: state,
		scope: scope
	});

	// Redirect to the Spotify authorization endpoint, which will in turn redirect to REDIRECT_URI
	res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// The Spotify authorization endpoint will send the user here, where we'll exchange the authorization code for an access token
app.get("/callback", (req, res) => {
	// Get the authorization code from Spotify's request
	const code = req.query.code || null;
	console.log("code: " + code);

	// Send a POST request to the Spotify Accounts Service /api/token endpoint
	axios({
		method: "post",
		url: "https://accounts.spotify.com/api/token",
		data: querystring.stringify({
			grant_type: "authorization_code",
			code: code,
			redirect_uri: REDIRECT_URI
		}),
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			// The Authorization header needs to be a base 64 encoded string in this format: "Authorization: Basic <base 64 encoded client_id:client_secret>"
			Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`
		}
	})
		.then(response => {
			if (response.status === 200) {
				const { access_token, refresh_token, expires_in } = response.data;

				const queryParams = querystring.stringify({
					access_token,
					refresh_token,
					expires_in,
				});

				// Redirect the user to the React app, with the access and refresh tokens as parameters
				res.redirect(`${reactURI}:3000/?${queryParams}`);
			}
			else {
				res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
			}
		})
		.catch(error => {
			res.send(error);
		});
});

// Request a new access token using the refresh token we got from the POST request
app.get("/refresh_token", (req, res) => {
	const { refresh_token } = req.query;
	console.log("refresh_token: " + refresh_token);

	// Send a POST request to the Spotify Accounts Service /api/token endpoint
	axios({
		method: "post",
		url: "https://accounts.spotify.com/api/token",
		data: querystring.stringify({
			grant_type: "refresh_token",
			refresh_token: refresh_token
		}),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`
		}
	})
		.then(response => {
			res.send(response.data);
		})
		.catch(error => {
			res.send(error);
		});
});

app.listen(port, () => {
	console.log(`Express app listening at http://localhost:${port}`);
});
