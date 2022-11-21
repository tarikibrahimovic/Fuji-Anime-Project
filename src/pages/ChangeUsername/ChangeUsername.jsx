import Logo from "../../img/fuji-logo.png";
import Poster from "../../img/all-anime-poster.jpg";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { useContext } from "react";
import { FavoritesList } from "../../components/Context/Context";
import { useNavigate } from "react-router-dom";

export default function ChangeUsername() {
  const [error, setError] = useState();
  const [NewUsername, setNewUsername] = useState();
  let value;
  const navigate = useNavigate();
  const { token, setUsername, username } = useContext(FavoritesList);

  function ChangeName() {
    let status;
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: token,
      },
    };
    fetch(
      `https://localhost:7098/api/User/change-username?newUsername=${NewUsername}`,
      requestOptions
    )
      .then((e) => {
        status = e.status;
        console.log(e);
        return e.json();
      })
      .then((res) => {
        console.log(res);
        if (status === 200) {
          setUsername(NewUsername);
          localStorage.setItem("username", NewUsername);
          navigate("/layout/home", {});
        } else {
          setError(res.message);
        }
      })
      .catch((e) => console.log(e));
  }

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
                Reset your Username
              </h1>
              {error && <p className="text-lightred">{error}</p>}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div>
                  <label
                    for="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    onChange={(e) => {
                      setNewUsername(e.target.value);
                    }}
                    placeholder="Enter your new Username"
                    className={`bg-dark border border-logored text-white sm:text-sm rounded-lg focus:none w-full p-2.5 focus:outline-none`}
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-logored focus:ring-4 focus:outline-none font-medium rounded-lg opacity-90 text-sm px-5 py-2.5 text-center hover:opacity-100"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
