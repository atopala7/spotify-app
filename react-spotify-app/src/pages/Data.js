import { React, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { Outlet } from 'react-router-dom';

import { getCurrentlyPlaying } from '../spotify';
import { catchErrors } from '../utils';

import '../styles/data.css'

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

    const getSong = () => {
        window.alert("Getting the song...");
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
                   <img className='data-image' src={data.item.album.images[1].url} onClick={getSong} />
                    <div className='data-info'>
                        <h1>{data.item.name}</h1>
                        <h2>{data.item.artists[0].name}</h2>
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