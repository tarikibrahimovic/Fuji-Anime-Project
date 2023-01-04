import Logo from "../../img/fuji-logo.png";
import Poster from "../../img/all-anime-poster.jpg";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { FavoritesList } from "../../components/Context/Context";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const {
    setToken,
    setIsAuth,
    setUsername,
    setId,
    setEmail,
    setAdmin,
    setVerifiedAt,
    setImageUrl,
    setTip,
    logout,
  } = useContext(FavoritesList);
  const [userObj, setUserObj] = useState({});
  const [LoginRegister, setLoginRegister] = useState("");
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  let status;
  const [showPassword, setShowPassword] = useState(false);
  const link = process.env.REACT_APP_BACKEND_LINK;

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    logout();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserObj(user);
    });
  }, []);

  useEffect(() => {
    setLoginRegister("login");
    if (userObj && LoginRegister === "login") {
      let status;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userObj.displayName,
          email: userObj.email,
          sub: userObj.uid,
        }),
      };
      fetch(link + "User/login-google", requestOptions)
        .then((res) => {
          status = res.status;
          console.log(res);
          return res.json();
        })
        .then((e) => {
          localStorage.setItem("token", "Bearer " + e.token);
          localStorage.setItem("username", e.username);
          setToken("Bearer " + e.token);
          if (status === 200) {
            setIsAuth(true);
            setId(e.id);
            setUsername(e.username);
            setAdmin(e.role);
            setEmail(e.email);
            setVerifiedAt(e.verifiedAt);
            setImageUrl(e.pictureUrl);
            setTip(e.type);
            NotificationManager.success("", `Welcome back! ${e.username}`);
          } else {
            NotificationManager.error("", e.message);
            logout();
          }
        })
        .catch((e) => console.log(e));
    }
  }, [userObj]);

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
    fetch(link + "User/login", requestOptions)
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
          setId(e.id);
          setUsername(e.username);
          setAdmin(e.role);
          setEmail(e.email);
          setVerifiedAt(e.verifiedAt);
          setImageUrl(e.pictureUrl);
          setTip(e.type);
          NotificationManager.success("", `Welcome back! ${e.username}`);
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
            href="https:..."
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
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  class="text-white bg-logored hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                >
                  <svg
                    class="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Sign in with Google
                </button>
              </div>
              <hr className="border-white" />
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  Login(mail, password);
                }}
              >
                {error && <p className="text-lightred">{error}</p>}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    data-testid="email-input"
                    autoComplete="off"
                    onChange={(e) => {
                      setMail(e.target.value.trim());
                    }}
                    className="bg-dark border border-logored text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="flex bg-dark border border-logored text-white sm:text-sm rounded-lg focus:none w-full focus:outline-none items-center">
                    <input
                      type={`${showPassword ? "text" : "password"}`}
                      name="password"
                      id="password"
                      data-testid="password-input"
                      onChange={(e) => {
                        setPassword(e.target.value.trim());
                      }}
                      placeholder="••••••••"
                      className="text-white bg-dark rounded-lg w-full p-2.5 focus:outline-none"
                      required=""
                    />
                    <div className="flex justify-center pr-1">
                      {showPassword ? (
                        <AiFillEyeInvisible
                          className="text-2xl"
                          onClick={(e) => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      ) : (
                        <AiFillEye
                          className="text-2xl"
                          onClick={(e) => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      )}
                    </div>
                  </div>
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
                  data-testid="submit-button"
                  id="submit-button"
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
                    localStorage.setItem("username", "Guest");
                    setId("");
                    setUsername("Guest");
                    navigate("/layout/home", {});
                  }}
                  className="w-full text-white bg-logored focus:ring-4 focus:outline-none font-medium rounded-lg opacity-90 text-sm px-5 py-2.5 text-center hover:opacity-100"
                >
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
