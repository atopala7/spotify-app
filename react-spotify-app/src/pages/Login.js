import logo from "../images/logo.svg";

const Login = () => (
  <>
    <main class="container-lg">
      <div class="justify-content-center align-items-center">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Spotify App</p>
        <a
          className="Login-button"
          href="http://192.168.4.158:8888/login"
          rel="noopener noreferrer"
        >
          Log in to Spotify
        </a>
      </div>
    </main>
  </>
);

export default Login;
