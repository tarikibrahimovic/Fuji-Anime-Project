import Logo from "../../img/fuji-logo.png";
import Poster from "../../img/all-anime-poster.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  let navigate = useNavigate();
  let status;
  const [conPass, setConPass] = useState();
  const [pass, setPass] = useState();
  const [mail, setMail] = useState();
  const [errors, setErrors] = useState();
  const [username, setUsername] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const link = process.env.REACT_APP_BACKEND_LINK;

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
          navigate("/", {});
        } else {
          setErrors(e.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function GoogleRegister(userObject) {
    setErrors();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userObject.name,
        email: userObject.email,
        sub: userObject.sub,
      }),
    };
    fetch(link + "User/register-google", requestOptions)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        if (status === 200) {
          navigate("/", {});
        } else {
          setErrors(e.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  const handleCallbackResponse = (response) => {
    let userObject = jwtDecode(response.credential);
    GoogleRegister(userObject);
  };

  useEffect(() => {
    /* global google */
    const google = window.google;
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", height: "50px", width: "200px" }
    );
  }, []);

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
              <div
                id="google-signin-button"
                className="flex justify-center"
              ></div>
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
                    for="username"
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
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
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
