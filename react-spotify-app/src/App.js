import { React, useState, useEffect } from 'react';
import ReactDom from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  NavLink,
} from 'react-router-dom';

import { accessToken, getCurrentUserProfile, logout } from './spotify';
import { catchErrors } from './utils';

import logo from './logo.svg';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Spotify App
            </p>
            <a
            className="Login-button"
            // className="App-link"
            href="http://192.168.4.158:8888/login"
            rel="noopener noreferrer"
          >
            Log in to Spotify
          </a>
        </>
        ) : (
          <>
          <Router>
            <Routes>
              <Route path="/" element={<Root />}>    
                <Route path="/data" element={<Data />} />
                <Route path="/information" element={<Information />} />
                <Route path="/lyrics" element={<Lyrics />} />
                <Route path="/logout" element={<Logout />} />
              </Route>
            </Routes>
          </Router>
          </>
        )}
      </header>
    </div>
  );

  function Root() {
    return (
      <>
        {/* <button className="Login-button" onClick={logout}>Log Out</button> */}
        {profile && (
          <div>
            {/* <h1>{profile.display_name}</h1>
            {profile.images.length && profile.images[0].url && (
              <img src={profile.images[0].url} alt="Avatar" />
            )} */}
          </div>
        )}

        <nav>
          <NavLink to="/" className="Styled-button">Home</NavLink>
          <NavLink to="/data" className="Styled-button">Data</NavLink>
          <NavLink to="/information" className="Styled-button">Information</NavLink>
          <NavLink to="/lyrics" className="Styled-button">Lyrics</NavLink>
          <NavLink to="/logout" className="Styled-button Logout-button">Log Out</NavLink>
        </nav>

        <Outlet />
      </>
    )
  }

  function Data() {
    return (
      <>
        <h1>Data</h1>
      </>
    )
  }

  function Information() {
    return (
      <>
        <h1>Information</h1>
      </>
    )
  }

  function Lyrics() {
    return (
      <>
        <h1>Lyrics</h1>
      </>
    )
  }

  function Logout() {
    return (
      <>
        {logout()}
      </>
    )
  }
}

export default App;