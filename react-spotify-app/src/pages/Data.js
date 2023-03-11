import { React, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getCurrentlyPlaying } from '../spotify';
import { catchErrors } from '../utils';

import '../styles/data.css'
import refresh from '../images/refresh.png';

const Data = () => {
    /**
     * STATE VARIABLES
     * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/currently-playing endpoint
     * Status is the response status, which if 204 indicates that no song is currently playing
     */
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        getSong();
    }, []);

    // Awaits the song that's currently playing and sets state variables accordingly
    const getSong = () => {
        // Clear the previous state variables
        setData(null);
        setStatus(null);

        console.log("Getting the song...");
        const fetchData = async () => {
            const currentlyPlaying = await getCurrentlyPlaying();
            setData(currentlyPlaying.data);
            setStatus(currentlyPlaying.status);
        };
        
        catchErrors(fetchData());
    }

    console.log("Data component---------------------------");
    console.log(data);
    console.log("Data component---------------------------");

    return (
        <>
            {data && (
                <>
                <div className='data'>
                    <div className='data-image-container' onClick={getSong}>
                        <img className='data-image' src={data.item.album.images[1].url} />
                        <img className='data-refresh' src={refresh} />
                    </div>
                    <div className='data-info'>
                        <h1>{data.item.name}</h1>
                        <h2>{data.item.artists.map(artist => artist.name).join(', ')}</h2>
                        <h2>{data.item.album.name}</h2>
                    </div>
                </div>
                <Outlet context={data}/>
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