import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Spotify App
        </p>
        {!token ? (
          <a
          className="App-link"
          href="http://192.168.4.158:8888/login"
          rel="noopener noreferrer"
        >
          Log in to Spotify
        </a>
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Root />} />    
              <Route path="/information" element={<Information />} />
            </Routes>
          </Router>
        )}
      </header>
    </div>
  );

  function Root() {
    return (
      <>
        <h1>Logged in!</h1>
        <button onClick={logout}>Log Out</button>
  
        {profile && (
          <div>
            <h1>{profile.display_name}</h1>
            {profile.images.length && profile.images[0].url && (
              <img src={profile.images[0].url} alt="Avatar" />
            )}
          </div>
        )}
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
}

export default App;