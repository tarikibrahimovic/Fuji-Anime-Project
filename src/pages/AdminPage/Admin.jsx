import { useState } from "react";
import { useEffect } from "react";
import AdminShow from "./AdminShow";

export default function Admin() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  let searchValue = "";
  const [searchData ,setSearchData] = useState([]);


  async function getAdmin() {
    let requestOptions = {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      let res = await fetch(
        "https://localhost:7098/api/User/admin",
        requestOptions
      );
      res = await res.json();
      setData(res);
      setSearchData(res);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getAdmin();
  }, []);

  useEffect(() => {
    setData((prev) => {
      return prev.filter((e) => {
        return e.username == value;
      });
    });
  }, [value]);


  console.log(data, searchData);
  return (
    <div>
      <form
        className="flex items-center my-3 px-3"
        onSubmit={(e) => {
          e.preventDefault();
          setData(searchData)
          setValue(searchValue);
        }}
      >
        <label for="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search Username"
            required
            onChange={(e) => {
              searchValue = e.target.value;
            }}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2 -ml-1"
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
          Search
        </button>
      </form>

      {data?.map((e) => {
        return <AdminShow data={e} setData={setData} setSearchData={setSearchData} getAdmin={getAdmin}/>;
      })}
    </div>
  );
}
