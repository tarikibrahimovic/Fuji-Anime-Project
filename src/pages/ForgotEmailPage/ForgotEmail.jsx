import Logo from "../../img/fuji-logo.png";
import Poster from "../../img/all-anime-poster.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  let status;
  const link = process.env.REACT_APP_BACKEND_LINK;

  const SendEmail = (em) => {
    setError();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: em,
      }),
    };
    fetch(
      link + `User/forgot-password/${email}`,
      requestOptions
    )
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        if (status === 200) {
          notify();
          navigate("/", {});
        } else {
          setError(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const notify = () => {
    NotificationManager.success("", "Chenck your email!");
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
            href=""
            className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-10 h-10 mr-2" src={Logo} alt="logo" />
            Fuji
          </a>
          <div className="w-full bg-dark rounded-lg shadow-logored shadow-md border-logored border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter your Email
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  SendEmail(email);
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
                <button
                  type="submit"
                  className="w-full text-white bg-logored focus:ring-4 focus:outline-none font-medium rounded-lg opacity-90 text-sm px-5 py-2.5 text-center hover:opacity-100"
                >
                  Send Email
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
