import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  NavLink,
} from 'react-router-dom';

import { accessToken, logout } from './spotify';
import { catchErrors } from './utils';
import { Login, Data } from './pages';

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
                <Route path="/logout" element={<Logout />} />
              </Route>
            </Routes>
          </Router>
          </>
        )}  
    </div>
  );

  function Root() {
    return (
      <>
        <header className="App-header">
          <nav>
            <NavLink to="/" className="Styled-button">Home</NavLink>
            <NavLink to="/information" className="Styled-button">Information</NavLink>
            <NavLink to="/lyrics" className="Styled-button">Lyrics</NavLink>
            <NavLink to="/logout" className="Styled-button Logout-button">Log Out</NavLink>
          </nav>
        </header>
        <Data />

        <Outlet />
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