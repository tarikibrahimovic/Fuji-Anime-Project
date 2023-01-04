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
import { NotificationManager } from "react-notifications";
import Loader from "../../components/scroll/Loader";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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
  const [loading, setLoading] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const link = process.env.REACT_APP_BACKEND_LINK;

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
    tip,
    isLoading,
    logout,
    logoutSetup
  } = useContext(FavoritesList);
  let navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function afterOpenModal() {}

  function openModal2() {
    setIsOpen2(true);
  }

  function afterOpenModal2() {}

  function closeModal2() {
    setIsOpen2(false);
  }

  const DeleteGoogleUser = (pass) => {
    setErr();
    let requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };
    fetch(link + `User/delete-google`, requestOptions)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        if (status === 200) {
          logout();
        } else {
          setErr(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const DeleteUser = (pass) => {
    setErr();
    let requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };
    fetch(link + `User/delete-acc/${pass}`, requestOptions)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        if (status === 200) {
          logoutSetup();
          NotificationManager.success("Account deleted successfully");
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
    fetch(link + "User/change-password", requestOptions)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        if (status === 200) {
          setIsAuth(false);
          localStorage.removeItem("token");
          navigate("/", {});
          NotificationManager.success("Password changed successfully");
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
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        username: NewUsername,
      }),
    };
    fetch(link + `User/change-username`, requestOptions)
      .then((e) => {
        status = e.status;
        return e.json();
      })
      .then((res) => {
        if (status === 200) {
          setUsername(NewUsername);
          localStorage.setItem("username", NewUsername);
          navigate("/layout/home", {});
          NotificationManager.success("Username changed successfully");
        } else {
          setError(res.message);
        }
      })
      .catch((e) => console.log(e));
  }

  async function PostImage() {
    setLoading(true);
    try {
      const fileExtension = newImage.name.split(".").pop();

      if (
        fileExtension.toLowerCase() !== "jpg" &&
        fileExtension.toLowerCase() !== "png"
      ) {
        throw new Error("Please select a JPEG or PNG file");
      }

      const bodyFormData = new FormData();
      bodyFormData.append("ProfilePicture", newImage);
      let res = await axios.post(link + "User/add-image", bodyFormData, {
        headers: {
          Authorization: token,
        },
      });
      NotificationManager.success("", "Image Succesfully Added!");
      setImageUrl(res.data.pictureUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      NotificationManager.error("", `${error}`);
    }
  }

  async function DeleteImage() {
    setLoading(true);
    try {
      let res = await axios.delete(link + "User/delete-image", {
        headers: {
          Authorization: token,
        },
      });
      setImageUrl("");
      NotificationManager.succes("", "Image Succesfully Deleted!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  console.log(tip);
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
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-dark focus:outline-none text-white"
              id="file_input"
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) setNewImage(e.target.files[0]);
                else {
                  NotificationManager.error("", "Uploud something!");
                }
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
                className="bg-logored rounded-lg px-5 py-1 opacity-100 hover:opacity-90"
                onClick={(e) => {
                  e.preventDefault();
                  closeModal();
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
            <h1 className="block mb-10 text-xl font-medium text-gray-900 dark:text-white">
              Do you want to delete your profile picture?
            </h1>

            <div className="flex justify-around my-4 text-white">
              <button
                onClick={closeModal2}
                className="bg-grayish rounded-lg px-10 py-2 opacity-100 hover:opacity-90"
              >
                Close
              </button>
              <button
                className="bg-logored rounded-lg px-10 py-2 opacity-100 hover:opacity-90"
                onClick={(e) => {
                  e.preventDefault();
                  closeModal2();
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
          {loading && <Loader />}
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
          <div
            id="profile"
            className="md:flex no-wrap md:-mx-2 mt-4 mb-4 gap-3"
          >
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
                {imageUrl && (
                  <div
                    className="w-full flex justify-center my-5 bg-grayish rounded-lg hover:bg-logored py-2 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      openModal2();
                    }}
                  >
                    <button>Delete Picutre</button>
                  </div>
                )}
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
              <div className="bg-dark text-white p-3 shadow-md rounded-sm shadow-logored border border-logored gap-4">
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
                  <span className="tracking-wide">
                    About
                    <hr className="text-logored" />
                  </span>
                </div>
                <div className="text-gray-700 w-full">
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="grid grid-cols-3">
                      <div className="px-4 py-2 font-semibold">Username</div>
                      <div className="px-4 py-2">{username}</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">{email}</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="px-4 py-2 font-semibold">Id</div>
                      <div className="px-4 py-2">{id}</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="px-4 py-2 font-semibold">Verified</div>
                      <div className="px-4 py-2">True</div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="px-4 py-2 font-semibold">Verified At</div>
                      <div className="px-4 py-2">{verifiedAt.slice(0, 10)}</div>
                    </div>
                    <div className="grid grid-cols-3">
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
          {tip !== "Google" && (
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
                      <div className="flex bg-dark border border-logored text-white sm:text-sm rounded-lg focus:none w-full focus:outline-none items-center">
                        <input
                          type={`${showPassword ? "text" : "password"}`}
                          name="password"
                          id="password"
                          onChange={(e) => {
                            setPass(e.target.value.trim());
                          }}
                          placeholder="••••••••"
                          className={`bg-dark text-white sm:text-sm rounded-lg focus:none w-full p-2.5 focus:outline-none ${
                            errors?.Password ? "border-lightred" : ""
                          }`}
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
                      <div className="flex bg-dark border border-logored text-white sm:text-sm rounded-lg focus:none w-full focus:outline-none items-center">
                        <input
                          type={`${showPassword ? "text" : "password"}`}
                          name="password"
                          id="password"
                          onChange={(e) => {
                            setConPass(e.target.value.trim());
                          }}
                          placeholder="••••••••"
                          className={`bg-dark text-white sm:text-sm rounded-lg focus:none w-full p-2.5 focus:outline-none ${
                            errors?.ConfirmPassword ? "border-lightred" : ""
                          }`}
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
          )}
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
                {tip === "Form" ? (
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
                        Your Password
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
                ) : (
                  <button
                    type="submit"
                    className="w-full text-white bg-logored focus:ring-4 focus:outline-none font-medium rounded-lg opacity-90 text-sm px-5 py-2.5 text-center hover:opacity-100"
                    onClick={(e) => {
                      e.preventDefault();
                      DeleteGoogleUser();
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
          <Footer />
        </div>
      ) : (
        isLoading && <ErrorPage />
      )}
    </>
  );
}

export default Profile;
