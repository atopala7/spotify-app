import { React, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getCurrentlyPlaying } from '../spotify';
import { catchErrors } from '../utils';

import '../styles/data.css'
import refresh from '../images/refresh.png';

const Data = props => {
    /**
     * STATE VARIABLES
     * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/currently-playing endpoint
     * Status is the response status, which if 204 indicates that no song is currently playing
     */
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [song, setSong] = useState(null);

    useEffect(() => {
        console.log("Data component's useEffect!");
        getSong(props.selectedSong);
    }, [props.selectedSong]);

    useEffect(() => {
        if (data) {
            const thisSong = {
                albumArt: data.item.album.images[1].url,
                songName: data.item.name,
                artists: data.item.artists,
                albumName: data.item.album.name
            };

            console.log("Got the song!");

            setSong(thisSong);

            console.log("The song has been set");

            props.rootSelectSong(thisSong);
        }
    }, [data]);

    // Awaits the song that's currently playing and sets state variables accordingly
    const getSong = (select) => {
        // Clear the previous state variables
        setData(null);
        setStatus(null);

        if (!select) {
            console.log("Getting the song...");
            const fetchData = async () => {
                const currentlyPlaying = await getCurrentlyPlaying();
                setData(currentlyPlaying.data);
                setStatus(currentlyPlaying.status);

                console.log(data);
            };
            catchErrors(fetchData());
        }
        else {
            console.log(select);

            const thisSong = {
                albumArt: select.albumArt,
                songName: select.name,
                artists: select.artists,
                albumName: select.albumName
            };

            setSong(thisSong);

            console.log("The song has been set");
            //setData(select);
        }
    }

    // console.log("Data component start---------------------------");
    // console.log(data);
    // console.log(props.selectedSong);
    // console.log("Data component end---------------------------");

    return (
        <>
            {song && (
                <>
                <div className='data'>
                    <div className='data-image-container' onClick={() => {
                        getSong(null);
                    }}>
                        <img className='data-image' src={song.albumArt} />
                        <img className='data-refresh' src={refresh} />
                    </div>
                    <div className='data-info'>
                        <h1>{song.songName}</h1>
                        <h2>{song.artists.map(artist => artist.name).join(', ')}</h2>
                        <h2>{song.albumName}</h2>
                    </div>
                </div>
                <Outlet context={song}/>
                </>
            ) ||
            status == 204 && (
                <>
                    <p>No song is currently playing.</p>
                    <Outlet />
                </>
            ) ||
            (
                <>
                    <p>Loading currently playing song...</p>
                    <Outlet />
                </>
            )}
        </>
    )
};

export default Data;