import logo from "../images/logo.svg";

const Login = () => (
  <>
    <main className="bg-dark vh-100 align-items-center d-flex">
      <div className="text-center container-lg">
        <span
          className="bi bi-music-note-beamed text-light"
          style={{ fontSize: "10rem" }}
        />
        <h1 className="fw-bold text-light">This Song</h1>
        <a
          className="Login-button"
          // href="http://192.168.4.158:8888/login"
          href="https://mysterious-garden-90298-d115e921537b.herokuapp.com/login"
          rel="noopener noreferrer"
        >
          Log in to Spotify
        </a>
      </div>
    </main>
  </>
);

export default Login;
