import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FavoritesList } from "../Context/Context";
import './Navbar.css'

function Navbar() {
  const { setIsAuth } = useContext(FavoritesList);
  let activeStyle = {
    color: "white",
    fontWeight: "bold",
    fontSize: "1.2rem",
    transition: "0.1s ease-in",
  };

  let activeClassName =
    "text-sm font-medium flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-red hover:text-grayish";

  let nesto =
    "text-sm font-medium flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-grayish hover:text-grayish";

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      />

      <div class="min-h-screen flex flex-row bg-dark w-full pl-3">
        <div class="flex flex-col bg-dark overflow-hidden w-full ">
          <ul class="flex flex-col py-4">
            <li>
              <NavLink
                to="/home"
                end
                className={({ isActive }) =>
                  isActive ? activeClassName : nesto
                }
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/anime"
                className={nesto}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Anime
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manga"
                className={nesto}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Manga
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={nesto}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorites"
                className={nesto}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Favorites
              </NavLink>
            </li>
            <hr className="text-white" />
            <li id="options">
              <NavLink
                to="/changepass"
                className={nesto}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Change Password
              </NavLink>
            </li>
            <li id="options">
              <NavLink
                to="/"
                className={nesto}
                // style={({ isActive }) => (isActive ? activeStyle : undefined)}
                onClick={(e) => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  setIsAuth(false);
                }}
              >
                Log Out
              </NavLink>
            </li>
            <hr className="text-white" />
            <li id="options">
              <NavLink
                to="/deleteacc"
                className={nesto}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Delete Account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
