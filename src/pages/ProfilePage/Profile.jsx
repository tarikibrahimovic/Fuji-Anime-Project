import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesList } from "../../components/Context/Context";
import Footer from "../../components/Footer/Footer";
import Logo from "../../img/fuji-logo.png";
import { BsArrowLeft } from "react-icons/bs";
import ErrorPage from "../404Page/ErrorPage";
import Avatar from "../../img/avatar.png";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#343338",
  },
};

function Profile() {
  const [changeUsername, setChangeUsername] = useState(true);
  const [changePassword, setChangePassword] = useState();
  const [conPass, setConPass] = useState();
  const [pass, setPass] = useState();
  const [errors, setErrors] = useState();
  const [error, setError] = useState();
  const [err, setErr] = useState();
  const [password, setPassword] = useState();
  const [NewUsername, setNewUsername] = useState();
  const [accDelete, setAccDelete] = useState();
  const [newImage, setNewImage] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);

  let status;
  const {
    token,
    setIsAuth,
    setUsername,
    username,
    id,
    email,
    verifiedAt,
    admin,
    isAuth,
    imageUrl,
    setImageUrl,
  } = useContext(FavoritesList);
  let navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen2(false);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  function afterOpenModal2() {}

  function closeModal2() {
    setIsOpen2(false);
  }

  const DeleteUser = (pass) => {
    setErr();
    let requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };
    fetch(
      `https://localhost:7098/api/User/delete-acc?password=${pass}`,
      requestOptions
    )
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        if (status === 200) {
          navigate("/", {});
          setIsAuth(false);
          localStorage.removeItem("token");
          localStorage.removeItem("username");
        } else {
          setErr(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  function Forgot(pass, confirmpass) {
    setErrors();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        password: pass,
        confirmPassword: confirmpass,
      }),
    };
    fetch("https://localhost:7098/api/User/change-password", requestOptions)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        if (status === 200) {
          setIsAuth(false);
          localStorage.removeItem("token");
          navigate("/", {});
        } else {
          setErrors(e.errors);
        }
      })
      .catch((e) => console.log(e));
  }

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

  async function PostImage() {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("ProfilePicture", newImage);
      let res = await axios.post(
        "https://localhost:7098/api/User/add-image",
        bodyFormData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setImageUrl(res.data.pictureUrl);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(imageUrl)

  async function DeleteImage() {
    try {
      let res = await axios.delete(
        "https://localhost:7098/api/User/delete-image",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setImageUrl("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isAuth ? (
        <div className="bg-dark p-5 h-full w-full">
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload file
            </label>
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-dark focus:outline-none text-white"
              id="file_input"
              type="file"
              onChange={(e) => {
                setNewImage(e.target.files[0]);
              }}
            />
            <div className="flex justify-around my-4 text-white">
              <button
                onClick={closeModal}
                className="bg-grayish rounded-lg px-5 py-1 opacity-100 hover:opacity-90"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-logored rounded-lg px-5 py-1 opacity-100 hover:opacity-90"
                onClick={(e) => {
                  e.preventDefault();
                  PostImage();
                }}
              >
                Upload
              </button>
            </div>
          </Modal>

          <Modal
            isOpen={modalIsOpen2}
            onAfterOpen={afterOpenModal2}
            onRequestClose={closeModal2}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h1 class="block mb-10 text-xl font-medium text-gray-900 dark:text-white">
              Do you want to delete your profile picture?
            </h1>

            <div className="flex justify-around my-4 text-white">
              <button
                onClick={closeModal}
                className="bg-grayish rounded-lg px-10 py-2 opacity-100 hover:opacity-90"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-logored rounded-lg px-10 py-2 opacity-100 hover:opacity-90"
                onClick={(e) => {
                  e.preventDefault();
                  DeleteImage();
                }}
              >
                Delete
              </button>
            </div>
          </Modal>
          <div className="flex justify-center mb-6 border-b border-logored pb-4">
            <img src={Logo} alt="" className="w-14" />
            <h1 className="text-white text-3xl my-auto">FUJI</h1>
          </div>
          <div className="text-white flex mt-4">
            <BsArrowLeft
              className="text-white text-3xl m-5 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate("/layout/home", {});
              }}
            />
            <p className="my-auto text-2xl">To Home</p>
          </div>
          <div className="md:flex no-wrap md:-mx-2 mt-4">
            {/* <!-- Left Side --> */}
            <div className="w-full md:w-3/12 md:mx-2">
              {/* <!-- Profile Card --> */}
              <div className="bg-dark text-white p-3 border-t-4 border-logored">
                <div className="image overflow-hidden">
                  {/* avatar */}
                  <img
                    src={imageUrl ? imageUrl : Avatar}
                    alt=""
                    className="rounded-full cursor-pointer hover:opacity-80"
                    onClick={() => {
                      openModal();
                    }}
                  />
                </div>
                <div
                  className="w-full flex justify-center my-5 bg-grayish rounded-lg hover:bg-logored py-2 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal2();
                  }}
                >
                  <button>Delete Picutre</button>
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  {username}
                </h1>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="text-white py-1 px-2 rounded text-sm">
                        Active
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">{verifiedAt.slice(0, 10)}</span>
                  </li>
                </ul>
              </div>
              {/* <!-- End of profile card --> */}
            </div>
            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              {/* <!-- Profile tab --> */}
              {/* <!-- About Section --> */}
              <div className="bg-dark text-white p-3 shadow-md rounded-sm shadow-logored border border-logored">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700 w-full">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Username</div>
                      <div className="px-4 py-2">{username}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">{email}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Id</div>
                      <div className="px-4 py-2">{id}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Verified</div>
                      <div className="px-4 py-2">True</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Verified At</div>
                      <div className="px-4 py-2">{verifiedAt.slice(0, 10)}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Role</div>
                      <div className="px-4 py-2">{admin}</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- End of about section --> */}
            </div>
          </div>
          <hr className="text-logored" />
          <div className="border-b border-logored text-white">
            <button
              className={`text-2xl my-4 w-full text-left ${
                changeUsername && "font-bold"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setChangeUsername(!changeUsername);
              }}
            >
              Change Username
            </button>
            {changeUsername && (
              <div className="flex justify-center my-4">
                {error && <p className="text-lightred">{error}</p>}
                <form
                  className="space-y-4 md:space-y-6 w-9/12"
                  onSubmit={(e) => {
                    e.preventDefault();
                    ChangeName();
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
            )}
          </div>
          <div className="border-b border-logored text-white">
            <button
              className={`text-2xl my-4 w-full text-left ${
                changePassword && "font-bold"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setChangePassword(!changePassword);
              }}
            >
              Change Password
            </button>
            {changePassword && (
              <div className="flex justify-center my-4">
                <form
                  className="space-y-4 md:space-y-6 w-9/12"
                  onSubmit={(e) => {
                    e.preventDefault();
                    Forgot(pass, conPass);
                  }}
                >
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
                        setPass(e.target.value);
                      }}
                      placeholder="••••••••"
                      className={`bg-dark border border-logored text-white sm:text-sm rounded-lg focus:none w-full p-2.5 focus:outline-none ${
                        errors?.Password ? "border-lightred" : ""
                      }`}
                      required=""
                    />
                    {errors?.Password?.map((e) => {
                      return <p className="text-lightred">{e}</p>;
                    })}
                  </div>
                  <div>
                    <label
                      for="confirmpassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmpassword"
                      id="confirmpassword"
                      onChange={(e) => {
                        setConPass(e.target.value);
                      }}
                      placeholder="••••••••"
                      className={`bg-dark border border-logored text-white sm:text-sm rounded-lg focus:none w-full p-2.5 focus:outline-none ${
                        errors?.ConfirmPassword ? "border-lightred" : ""
                      }`}
                      required=""
                    />
                    {errors?.ConfirmPassword?.map((e) => {
                      return <p className="text-lightred">{e}</p>;
                    })}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-logored focus:ring-4 focus:outline-none font-medium rounded-lg opacity-90 text-sm px-5 py-2.5 text-center hover:opacity-100"
                  >
                    Reset
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className="border-b border-logored text-white">
            <button
              className={`text-2xl my-4 w-full text-left ${
                accDelete && "font-bold"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setAccDelete(!accDelete);
              }}
            >
              Delete Account
            </button>
            {accDelete && (
              <div className="flex justify-center my-4">
                <form
                  className="space-y-4 md:space-y-6 w-9/12"
                  onSubmit={(e) => {
                    e.preventDefault();
                    DeleteUser(password);
                  }}
                >
                  {err && <p className="text-lightred">{err}</p>}
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
            )}
          </div>
          <Footer />
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default Profile;
