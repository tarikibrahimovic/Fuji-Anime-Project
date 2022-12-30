import { useContext, useState } from "react";
import { FavoritesList } from "../../components/Context/Context";
import { NotificationManager } from "react-notifications";
import Modal from "react-modal";
import axios from "axios";
import Loader from "../../components/scroll/Loader";

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

export default function AdminShow({ data, getAdmin, setData }) {
  const { id } = useContext(FavoritesList);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deletePic, setDeletePic] = useState(false);
  const [loading, setLoading] = useState(false);
  const link = process.env.REACT_APP_BACKEND_LINK;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  function openPicModal() {
    setDeletePic(true);
  }

  function afterOpenPicModal() {}

  function closePicModal() {
    setDeletePic(false);
  }

  async function deleteAdmin() {
    let requestOptions = {
      method: "Delete",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      let res = await fetch(
        link + `User/admin-delete/${data.id}`,
        requestOptions
      );
      res = await res.json();
      NotificationManager.success("", res.message);
      getAdmin();
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteImage() {
    setLoading(true);
    try {
      let res = await axios.delete(
        link + `User/admin-delete-image/${data.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      NotificationManager.success("", "Image Succesfully Deleted!");
      setLoading(false);
      setDeletePic(false);
      setData((el) => {
        return el.pictureUrl = null;
      });
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className="flex text-white border border-white">
      {loading && <Loader />}
      <Modal
        isOpen={deletePic}
        onAfterOpen={afterOpenPicModal}
        onRequestClose={closePicModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="">
          <h2 className="text-center text-2xl text-white">
            Do you want to Delete this users picture?
          </h2>
        </div>
        <div className="flex justify-around my-4 text-white">
          <button
            onClick={closePicModal}
            className="bg-grayish rounded-lg px-5 py-1 opacity-80 hover:opacity-100"
          >
            Close
          </button>
          <button
            onClick={() => {
              closePicModal();
              DeleteImage();
            }}
            className="bg-logored rounded-lg px-5 py-1 opacity-80 hover:opacity-100"
          >
            Delete
          </button>
        </div>
      </Modal>

      <p className="mx-2 my-1 w-full">User Id: {data.id}</p>
      <p className="mx-2 my-1 w-full">User Username: {data.username}</p>
      {data.pictureUrl ? (
        <div className="mx-2 my-1 w-full flex justify-center">
          {" "}
          <img
            className="w-11 h-11 cursor-pointer"
            src={data.pictureUrl}
            onClick={(e) => {
              openPicModal();
            }}
          />
        </div>
      ) : (
        <p className="mx-2 my-1 w-full">No Image</p>
      )}
      <p className="mx-2 my-1 w-full">User Email: {data.email}</p>
      <p className="mx-2 my-1 w-full">
        User is Varified At: {data.verifiedAt?.slice(0, 10)}
      </p>
      {data.id != id && (
        <div class="flex space-x-2 justify-center">
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-logored opacity-90 text-white font-medium text-xs leading-tight uppercase rounded shadow-md mx-2 my-1
           hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 hover:opacity-100 active:shadow-lg transition duration-150 ease-in-out"
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
          >
            Delete User
          </button>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="">
          <h2 className="text-center text-2xl text-white">
            Do you want to Delete this user?
          </h2>
        </div>
        <div className="flex justify-around my-4 text-white">
          <button
            onClick={closeModal}
            className="bg-grayish rounded-lg px-5 py-1 opacity-80 hover:opacity-100"
          >
            Close
          </button>
          <button
            onClick={() => deleteAdmin()}
            className="bg-logored rounded-lg px-5 py-1 opacity-80 hover:opacity-100"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
