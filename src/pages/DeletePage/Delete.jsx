import Logo from "../../img/fuji-logo.png";
import Poster from "../../img/all-anime-poster.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { FavoritesList } from "../../components/Context/Context";

function Delete() {
  let navigate = useNavigate();
  const {setIsAuth} = useContext(FavoritesList);
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  let status;
  let token = localStorage.getItem("token") || "";
  const link = process.env.REACT_APP_BACKEND_LINK;
  
  const DeleteUser = (pass) => {
    setError();
    let requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };
    fetch(
      link + `User/delete-acc/${pass}`,
      requestOptions
    )
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        if (status === 200) {
          navigate("/", {});
          setIsAuth(false)
          localStorage.removeItem('token');
          localStorage.removeItem('username');
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
            href=""
            className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-10 h-10 mr-2" src={Logo} alt="logo" />
            Fuji
          </a>
          <div className="w-full bg-dark rounded-lg shadow-logored shadow-md border-logored border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Delete your Account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  DeleteUser(password);
                }}
              >
                {error && <p className="text-lightred">{error}</p>}
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Passowrd
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="passowrd"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="bg-dark border border-logored text-white sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    placeholder="••••••••"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-logored focus:ring-4 focus:outline-none font-medium rounded-lg opacity-90 text-sm px-5 py-2.5 text-center hover:opacity-100"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Delete;
