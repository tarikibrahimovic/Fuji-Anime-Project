import Logo from "../../img/fuji-logo.png";
import Poster from "../../img/all-anime-poster.jpg";
import { useState } from "react";
import { useContext } from "react";
import { FavoritesList } from "../../components/Context/Context";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const { setIsAuth, setToken, setUsername, setId } = useContext(FavoritesList);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  let status;

  const Login = (em, pass) => {
    setError();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: em,
        password: pass,
      }),
    };
    fetch("https://localhost:7098/api/User/login", requestOptions)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        localStorage.setItem("token", "Bearer " + e.token);
        localStorage.setItem("username", e.username);
        setToken("Bearer " + e.token);
        if (status === 200) {
          setIsAuth(true);
          setId(e.id)
          setUsername(e.username)
        } else {
          setError(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <section className="bg-dark w-full">
      <div>
        <img
          src={Poster}
          className="opacity-10 bg-cover absolute w-full h-full object-cover"
          alt="poster"
        />
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-10 h-10 mr-2" src={Logo} alt="logo" />
            Fuji
          </a>
          <div className="w-full bg-dark rounded-lg shadow-logored shadow-md border-logored border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Log in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  Login(email, password);
                }}
              >
                {error && <p className="text-lightred">{error}</p>}
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="bg-dark border border-logored text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="••••••••"
                    className="bg-dark border border-logored text-white sm:text-sm rounded-lg focus:none w-full p-2.5 focus:outline-none"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href="/forgotpassword"
                    className="text-sm font-medium hover:underline text-linkblue"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-logored focus:ring-4 focus:outline-none font-medium rounded-lg opacity-90 text-sm px-5 py-2.5 text-center hover:opacity-100"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-linkblue">
                  Don’t have an account yet?{" "}
                  <a
                    href="/register"
                    className="text-sm font-medium hover:underline text-linkblue"
                  >
                    Sign up
                  </a>
                </p>
              </form>
              <hr className="text-white" />
              <div className="flex justify-center flex-col">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center pb-6">
                  Log in like a Guest
                </h1>
                <button
                onClick={(e) => {
                  localStorage.setItem('username', "Guest");
                  setId('');
                  setUsername('Guest');
                  navigate('/home', {});
                }}
                className="w-full text-white bg-logored focus:ring-4 focus:outline-none font-medium rounded-lg opacity-90 text-sm px-5 py-2.5 text-center hover:opacity-100">
                  Log in Like a Guest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
