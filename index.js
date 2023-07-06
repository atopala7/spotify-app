// This express app gets authorization and refresh tokens from Spotify

// Spotify environment variables saved onto the server
require("dotenv").config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Genius environment variables saved onto the server
const GENIUS_CLIENT_ID = process.env.GENIUS_CLIENT_ID;
const GENIUS_CLIENT_SECRET = process.env.GENIUS_CLIENT_SECRET;
const GENIUS_REDIRECT_URI = process.env.GENIUS_REDIRECT_URI;
const GENIUS_CLIENT_ACCESS_TOKEN = process.env.CENIUS_CLIENT_ACCESS_TOKEN;

const express = require("express");
const app = express();
const port = 8888;

const reactURI = REDIRECT_URI.substring(0, REDIRECT_URI.indexOf(":8888"));

const querystring = require("querystring");

const axios = require("axios");

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
