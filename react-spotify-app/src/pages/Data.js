import { React, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { Outlet } from 'react-router-dom';

import { getCurrentlyPlaying } from '../spotify';
import { catchErrors } from '../utils';

import '../styles/data.css'

const Data = data => {
    let song;
    if (data && data.song) {
        console.log("Data component is being initialized with data from Root.");
        song = data.song;
    }
    else {
        console.log("Failed to initialize Data component!");
    }
    // console.log(song);

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
                <Outlet context={song}/>
                </>
            ) ||
            (<p>Loading currently playing song...</p>)}
        </>
    )
};

export default Data;