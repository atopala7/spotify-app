import { React, useState, useEffect, createContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    NavLink,
    useNavigate,
  } from 'react-router-dom';

import { Data } from '.';

import { getCurrentlyPlaying } from '../spotify';
import { accessToken, logout } from '../spotify';
import { catchErrors } from '../utils';

const Root = () => {   
    return (
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
                {/* <NavLink to="/logout" className="Styled-button Logout-button" onClick={logout}>Log Out</NavLink> */}
                </nav>
            </header>
            <Data />
        </>
    )
};

export default Root;