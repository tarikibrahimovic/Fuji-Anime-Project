import { useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "./SearchBar.module.css";
import { CiSquareRemove } from "react-icons/ci";

export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("Anime");
  const [drop, setDrop] = useState(true);
  return (
    <>
      <form className={`w-96 mr-4`} id={classes.mainForm}>
        <div className="flex">
          <select
            value={type}
            id=""
            className="bg-dark rounded-l-lg border-l border-t border-b border-white text-white"
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="Anime">Anime</option>
            <option value="Manga">Manga</option>
          </select>
          <div className="relative w-full">
            <input
              type="text"
              id="location-search"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-dark rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search Anime or Manga"
              required
              autoComplete="off"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/layout/${type}`, {
                  state: {
                    search: search,
                    category: "",
                  },
                });
              }}
              className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <div className="w-1/3 flex justify-end" id={classes.secondForm}>
        <form
          className={`w-1/3 text-white flex justify-end`}
        //   id={classes.secondForm}
        >
          {drop ? (
            <div
              className="absolute w-screen h-3/4 top-2 flex bg-dark mr-4 left-0 items-center justify-center"
              id={classes.drop}
            >
              <select
                value={type}
                id=""
                className="bg-dark rounded-l-lg border-l border-t h-11 border-b border-white text-white"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="Anime">Anime</option>
                <option value="Manga">Manga</option>
              </select>
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  id="location-search"
                  className="block p-2.5 w-9/12 z-20 text-sm text-gray-900 h-11 bg-dark  border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search Anime or Manga"
                  required
                  autoComplete="off"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/layout/${type}`, {
                      state: {
                        search: search,
                        category: "",
                      },
                    });
                  }}
                  className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border h-11 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    // viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
                <CiSquareRemove
                  className="text-3xl"
                  onClick={(e) => {
                    e.preventDefault();
                    setDrop(!drop);
                  }}
                />
              </div>
            </div>
          ) : (
            <svg
              aria-hidden="true"
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={(e) => {
                e.preventDefault();
                setDrop(!drop);
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-7 h-7"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          )}
        </form>
      </div>
    </>
  );
}
