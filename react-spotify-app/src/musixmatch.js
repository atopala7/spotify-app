import axios from 'axios';

export const getLyrics = async (trackName, artistName) => {
    const lyrics = [];

    // Await the completion of the `/musixmatch` endpoint from the Node app
    const apiKey = await axios({
		method: "get",
		url: "http://192.168.4.158:8888/musixmatch",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
		}
	})
		.then(response => {
			// if (response.status === 200) {
			// 	const { access_token, refresh_token, expires_in } = response.data;

			// 	const queryParams = querystring.stringify({
			// 		access_token,
			// 		refresh_token,
			// 		expires_in,
			// 	});

			// 	// Redirect the user to the React app, with the access and refresh tokens as parameters
			// 	res.redirect(`${reactURI}:3000/?${queryParams}`);
			// }
			// else {
			// 	res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
			// }
		})
		.catch(error => {
			// res.send(error);
		});

    console.log(apiKey);

    let url = `https://api.musixmatch.com/ws/1.1/track.search?apikey=${apiKey}`;

}