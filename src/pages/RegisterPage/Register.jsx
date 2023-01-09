import Logo from "../../img/fuji-logo.png";
import Poster from "../../img/all-anime-poster.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FavoritesList } from "../../components/Context/Context";
import { useContext } from "react";
import { useEffect } from "react";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

function Login() {
  let navigate = useNavigate();
  let status;
  const [conPass, setConPass] = useState();
  const [pass, setPass] = useState();
  const [mail, setMail] = useState();
  const [errors, setErrors] = useState();
  const [username, setUsername] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [LoginRegister, setLoginRegister] = useState("");
  const link = process.env.REACT_APP_BACKEND_LINK;
  const { logout } = useContext(FavoritesList);

  const googleSignUp = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  function Register(em, pass, confirmpass, user) {
    setErrors();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user,
        email: em,
        password: pass,
        confirmPassword: confirmpass,
      }),
    };
    fetch(link + "User/register", requestOptions)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        if (status === 200) {
          NotificationManager.success(
            "Verification email sent!",
            "Success",
            3000
          );
          navigate("/", {});
        } else {
          setErrors(e.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const handleGoogleSignUp = async () => {
    try {
      await googleSignUp();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserObj(user);
    });
  }, []);

  useEffect(() => {
    setLoginRegister("register");
    if(userObj && LoginRegister === "register"){
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
        fetch(link + "User/register-google", requestOptions)
          .then((res) => {
            status = res.status;
            return res.json();
          })
          .then((e) => {
            if (status === 200) {
              NotificationManager.success(
                "Verification mail sent!",
                "Success!"
              );
              logout();
              navigate("/", {});
            } else {
              NotificationManager.error(e.message, "Error!");
            }
          })
          .catch((e) => console.log(e));
      }
  }, [userObj]);

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
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Make your new account
              </h1>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
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
              {errors && <p className="text-lightred">{errors}</p>}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
                  )
                    if (
                      username &&
                      conPass?.length >= 6 &&
                      pass?.length >= 6 &&
                      mail
                    )
                      Register(mail, pass, conPass, username);
                    else NotificationManager.error("", "Something is wrong!");
                }}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    autoComplete="off"
                    type="username"
                    name="username"
                    id="username"
                    onChange={(e) => {
                      setUsername(e.target.value.trim());
                    }}
                    className={`bg-dark border border-logored text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                      errors?.Username ? "border-lightred" : ""
                    }`}
                    placeholder="username"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    data-testid="email"
                    autoComplete="off"
                    onChange={(e) => {
                      setMail(e.target.value.trim());
                    }}
                    className={`bg-dark border border-logored text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                      errors?.Email ? "border-lightred" : ""
                    }`}
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
                  <div className="flex bg-dark border border-logored text-white sm:text-sm rounded-lg focus:none w-full focus:outline-none items-center">
                    <input
                      type={`${showPassword ? "text" : "password"}`}
                      name="password"
                      data-testid="password"
                      id="password"
                      onChange={(e) => {
                        setPass(e.target.value.trim());
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
                <div>
                  <label
                    for="confirmpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <div className="flex bg-dark border border-logored text-white sm:text-sm rounded-lg focus:none w-full focus:outline-none items-center">
                    <input
                      type={`${showPassword ? "text" : "password"}`}
                      name="password"
                      id="password"
                      onChange={(e) => {
                        setConPass(e.target.value.trim());
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
                <button
                  type="submit"
                  data-testid="submit"
                  className="w-full text-white bg-logored focus:ring-4 focus:outline-none font-medium rounded-lg opacity-90 text-sm px-5 py-2.5 text-center hover:opacity-100"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
