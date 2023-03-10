import logo from '../images/logo.svg';

const Login = () => (
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
);

export default Login;