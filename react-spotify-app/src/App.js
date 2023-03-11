import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  NavLink,
} from 'react-router-dom';

import { accessToken, logout } from './spotify';
import { Root, Login, Data, Profile, Information } from './pages';

import './App.css';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
        {!token ? (
          <>
            <Login />
          </>
        ) : (
          <>
          <Router>
            <Routes>
              <Route path="/" element={<Root />}>
                <Route path="/data" element={<Data />} />
                <Route path="/information" element={<Information />} />
                <Route path="/lyrics" element={<Lyrics />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
              </Route>
            </Routes>
          </Router>
          </>
        )}  
    </div>
  );

  function Lyrics() {
    return (
      <>
        <h1>Lyrics</h1>
      </>
    )
  }

  function Logout() {
    console.log("Logging out...");
    return (
      <>
        {logout()}
      </>
    )
  }
}

export default App;