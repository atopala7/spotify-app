import axios from 'axios';

export const getArtistInformation = async artistName => {
    // const extractAPIContents = json => {
    //     const { pages } = json.query;
    //     return Object.keys(pages).map(id => pages[id].extract);
    // };

    // const getContents = async () => {
    //     let resp;
    //     let contents = [];
    //     setLoading(true);
    //     try {
    //         resp = await fetch(url);
    //         const json = await resp.json();
    //         contents = extractAPIContents(json);
    //     } catch (err) {
    //         setError(err);
    //     } finally {
    //         setLoading(false);
    //     }
    //     setContents(contents);
    // };

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