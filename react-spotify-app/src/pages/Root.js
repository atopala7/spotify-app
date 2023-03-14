import { React, useState, useEffect, createContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    NavLink,
    useNavigate,
  } from 'react-router-dom';

import { Data, Recent } from '.';

import { getCurrentlyPlaying } from '../spotify';
import { accessToken, logout } from '../spotify';
import { catchErrors } from '../utils';

import '../styles/root.css'

const Root = () => {
    const [song, setSong] = useState(null);

    const selectSong = select => {
        setSong(select);
        // console.log(song);
    }

    return (
        <>
        <div className="root">
            <div className="contents">
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
                    {/* <NavLink to="/logout" className="Styled-button Logout-button" onClick={logout}>Log Out</NavLink> */}
                    </nav>
                </header>
                <Data selectedSong={song} rootSelectSong={selectSong} />
            </div>
            <div id="sidebar">
                <Recent rootSelectSong={selectSong} />
            </div>
        </div>
        </>
    )
};

export default Root;