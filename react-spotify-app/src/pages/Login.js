import logo from "../images/logo.svg";

const Login = () => (
  <>
    <main className="bg-dark vh-100">
      <div class="justify-content-center align-items-center text-center container-lg">
        <img src={logo} className="App-logo" alt="logo" />
        <p class="text-light">Spotify App</p>
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
