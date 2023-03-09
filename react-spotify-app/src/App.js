import { useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const querystring = window.location.search;
    const urlParams = new URLSearchParams(querystring);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    console.log("Access token: " + accessToken);
    console.log("Refresh token: " + refreshToken);

    if (refreshToken) {
      fetch(`/refresh_token?refresh_token=${refreshToken}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Spotify App
        </p>
        <a
          className="App-link"
          href="http://localhost:8888/login"
          rel="noopener noreferrer"
        >
          Log in to Spotify
        </a>
      </header>
    </div>
  );
}

export default App;