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

// import '../styles/root.css'

const Root = () => {
    const [song, setSong] = useState(null);

    const selectSong = select => {
        setSong(select);
    }

    const openSidebar = () => {
        //document.querySelector("#sidebar").style.width = "20rem";
        document.querySelector("#sidebar").style.overflowY = "scroll";
        document.querySelector("#recent-header").innerHTML = "Recently Played";
    }

    const closeSidebar = () => {
        //document.querySelector("#sidebar").style.width = "64px";
        document.querySelector("#sidebar").style.overflowY = "hidden";
        document.querySelector("#recent-header").innerHTML = "Recent";
    }

    return (
        <>
        <main>
            {/* Navbar */}
            <nav className="navbar navbar-expand-md navbar-light bg-secondary sticky-top">
                <div className="container-xxl">
                    <a href="#" className="navbar-brand">
                        <i className="bi bi-music-note-beamed text-dark"></i>
                        <span className="fw-bold text-light">
                            This Song
                        </span>
                    </a>
                    {/* Toggle button for mobile nav */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar links */}
                    {/* <div className="collapse navbar-collapse justify-content-start align-center" id="main-nav"> */}
                    <div className="nav nav-underline border-0 collapse navbar-collapse justify-content-start align-center" id="main-nav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/information" className="nav-link">Information</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/lyrics" className="nav-link">Lyrics</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/profile" className="nav-link">Profile</NavLink>
                            </li>
                            <li className="nav-item d-md-none">
                                <NavLink to="/logout" className="nav-link">Log out</NavLink>
                            </li>
                            <li className="nav-item ms-2 d-none d-md-inline">
                                <NavLink to="/logout" className="btn btn-outline-danger">Log out</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main data component */}
            <section id="data" className="bg-light">
                <div className="container-lg">
                    <div className="rounded">
                        <Data selectedSong={song} rootSelectSong={selectSong} />
                    </div>
                </div>
            </section>

            <div id="sidebar" onMouseOver={() => {
                openSidebar();
            }}
            onMouseOut={() => {
                closeSidebar();
            }}>
                <Recent rootSelectSong={selectSong} />
            </div>
        </main>
        </>
    )
};

export default Root;