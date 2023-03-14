import { React, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getRecentlyPlayed } from '../spotify';
import { catchErrors, shortenString } from '../utils';

import '../styles/recent.css'

const Recent = () => {
    /**
     * STATE VARIABLES
     * Data is the Spotify data returned by the https://api.spotify.com/v1/me/player/recently-played endpoint
     * Status is the response status
     */
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);

    const strLength = 25;

    useEffect(() => {
        getRecentSongs();
    }, []);

    // Awaits the song that's currently playing and sets state variables accordingly
    const getRecentSongs = () => {
        // Clear the previous state variables
        setData(null);
        setStatus(null);

        console.log("Getting recent songs...");
        const fetchData = async () => {
            const recentSongs = await getRecentlyPlayed();
            setData(recentSongs.data);
            setStatus(recentSongs.status);
        };
        
        catchErrors(fetchData());
    }

    const setSong = () => {
        return 0;
    }

    console.log("Recent component---------------------------");
    console.log(data);
    console.log("Recent component---------------------------");

    return (
        <>
            Recent
            {data && (
                <>
                    {data.items.map(((song, index) => (
                        <div className="recent-item" key={`song.track.id-${index}`} onClick={setSong}>
                            <img className='recent-image' src={song.track.album.images[2].url} />
                            <p className="recent-info">
                                <span className="recent-item-title">{song.track.name}</span><br />
                                {song.track.artists[0].name}<br />
                                {song.track.album.name}</p>
                        </div>
                    )))}
                </>
            ) ||
            status == 204 && (
                <>
                    <p>No content to display.</p>
                    <Outlet />
                </>
            ) ||
            (
                <>
                    <p>Loading recent songs...</p>
                    <Outlet />
                </>
            )}
        </>
    )
};

export default Recent;