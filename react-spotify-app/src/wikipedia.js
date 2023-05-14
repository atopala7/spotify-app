import axios from 'axios';

export const getArtistsInformation = async artistName => {
    const info = [];

    for (let artist of artistName) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${artist}`;
        //const url2 = `https://en.wikipedia.org/w/api.php?action=parse&&format=json&origin=*&page=${artistName}`;
        const res = await fetch(url)
        const json = await res.json();

        const pages = json.query.pages;

        // Create arrays of titles and extracts using each id in the pages object
        // There should only be one id in each pages object, so title and contents should both be single-element arrays
        const title = Object.keys(pages).map(id => pages[id].title);
        const contents = Object.keys(pages).map(id => pages[id].extract);

        const newInfo = {
            'title': title,
            'contents': contents,
        };

        info.push(newInfo);
    }

    console.log(info);
    return info;
}

export const getArtistInformation = async artistName => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${artistName}`;
    const res = await fetch(url)
    const info = await res;
    console.log(`Artist's name is ${artistName}`);

    return info;

    // return axios({
	// 	method: 'get',
	// 	url: `https://en.wikipedia.org/w/api.php?action=parse&origin=*&page=${artistName}`,
	// 	headers: {
	// 		"content-type": "application/json",
    //         "Access-Control-Allow-Origin": '*',
	// 	}
	// });

    return axios.get(`https://en.wikipedia.org/w/api.php?action=parse&origin=*&page=${artistName}`);
}