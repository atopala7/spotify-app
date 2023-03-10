import { React, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { Outlet } from 'react-router-dom';

import { getCurrentlyPlaying } from '../spotify';
import { catchErrors } from '../utils';

import '../styles/data.css'

const Data = data => {
    const location = useLocation();
    const { state } = location;
    //console.log(state.song);
    // console.log(data);
    let song;
    if (data && data.song) {
        song = data.song;
    }
    else {
        song = state.song;
    }
    console.log(song);

    return (
        <>
            {song && (
                <>
                <div className='data'>
                   <img className='data-image' src={song.item.album.images[1].url} />
                    <div className='data-info'>
                        <h1>{song.item.name}</h1>
                        <h2>{song.item.artists[0].name}</h2>
                        <h2>{song.item.album.name}</h2>
                    </div>
                </div>
                <Outlet />
                </>
            ) ||
            (<p>Loading currently playing song...</p>)}
        </>
    )
};

export default Data;