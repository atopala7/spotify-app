import { React, useState, useEffect } from 'react';

import { getCurrentlyPlaying } from '../spotify';
import { catchErrors } from '../utils';

import '../styles/data.css'

const Data = () => {
    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentlyPlaying = await getCurrentlyPlaying();
            setSong(currentlyPlaying.data);
        };

        catchErrors(fetchData());
    }, []);

    return (
        <>
            {song && (
                <div className='data'>
                    <img className='data-image' src={song.item.album.images[1].url} />
                    <div className='data-info'>
                        <h1>{song.item.name}</h1>
                        <h2>{song.item.artists[0].name}</h2>
                        <h2>{song.item.album.name}</h2>
                    </div>
                </div>
            )}
        </>
    )
};

export default Data;