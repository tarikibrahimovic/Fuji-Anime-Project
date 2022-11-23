import { useContext, useState } from "react"
import { FavoritesList } from "../../components/Context/Context"
import { NotificationManager } from "react-notifications";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#343338"
  },
};

export default function AdminShow({ data, getAdmin }) {
    const {id} = useContext(FavoritesList);
    const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }

    async function deleteAdmin(){
        let requestOptions = {
            method: "Delete",
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          };
          try {
            let res = await fetch(
              `https://localhost:7098/api/User/admin-delete?id=${data.id}`,
              requestOptions
            );
            res = await res.json();
            NotificationManager.success("", res.message);
            getAdmin()
          } catch (error) {
            console.log(error);
          }
      }

  return (
    <div className="flex text-white border border-white">
      <p className="mx-2 my-1 w-full">User Id: {data.id}</p>
      <p className="mx-2 my-1 w-full">User Username: {data.username}</p>
      <p className="mx-2 my-1 w-full">User Email: {data.email}</p>
      <p className="mx-2 my-1 w-full">
        User is Varified At: {data.verifiedAt?.slice(0, 10)}
      </p>
      {(data.id != id)&&(<div class="flex space-x-2 justify-center">
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
      </div>)}
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
            <button onClick={closeModal} className="bg-grayish rounded-lg px-5 py-1 opacity-80 hover:opacity-100">Close</button>
            <button onClick={() => deleteAdmin()} className="bg-logored rounded-lg px-5 py-1 opacity-80 hover:opacity-100">Delete</button>
          </div>
        </Modal>
    </div>
  );
}
