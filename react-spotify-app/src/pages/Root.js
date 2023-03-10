import { React, useState, useEffect } from 'react';
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

    useEffect(() => {
        const fetchData = async () => {
            const currentlyPlaying = await getCurrentlyPlaying();
            setData(currentlyPlaying.data);
        };
        console.log(data);
        catchErrors(fetchData());
    }, []);
    
    return (
        <>
        {data && (
        <>
            <header className="App-header">
                <nav>
                <NavLink to="/" className="Styled-button">Home</NavLink>
                <NavLink to={{pathname: "/data"}}
                            state={{ song: data }}
                             className="Styled-button">Data</NavLink>
                <NavLink to={{pathname: "/information"}}
                            state={{ song: data }} className="Styled-button">Information</NavLink>
                <NavLink to="/lyrics" className="Styled-button">Lyrics</NavLink>
                <NavLink to="/profile" className="Styled-button">Profile</NavLink>
                <NavLink to="/logout" className="Styled-button Logout-button">Log Out</NavLink>
                </nav>
            </header>
            <Data song = {data} />
        </>
        )
        || (
            <p>Loading...</p>
        )}
        </>
    )
};

export default Root;