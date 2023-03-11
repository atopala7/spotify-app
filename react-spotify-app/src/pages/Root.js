import { React, useState, useEffect, createContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    NavLink,
  } from 'react-router-dom';

import { Data } from '.';

import { getCurrentlyPlaying } from '../spotify';
import { catchErrors } from '../utils';

const Root = () => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const currentlyPlaying = await getCurrentlyPlaying();
            setData(currentlyPlaying.data);
            setStatus(currentlyPlaying.status);
        };
        
        catchErrors(fetchData());
    }, []);
    
    return (
        <>
        {data && (
        <>
            <header className="App-header">
                <nav>
                <NavLink to="/" className="Styled-button">Home</NavLink>
                {/* <NavLink to={{pathname: "/data"}}
                            state={{ song: data }}
                             className="Styled-button">Data</NavLink> */}
                <NavLink to="/information" className="Styled-button">Information</NavLink>
                <NavLink to="/lyrics" className="Styled-button">Lyrics</NavLink>
                <NavLink to="/profile" className="Styled-button">Profile</NavLink>
                <NavLink to="/logout" className="Styled-button Logout-button">Log Out</NavLink>
                </nav>
            </header>
            <Data song = {data} />
        </>
        ) || status == 204 && (
            <p>No song is currently playing.</p>
        ) || (
            <p>Loading...</p>
        )}
        </>
    )
};

export default Root;