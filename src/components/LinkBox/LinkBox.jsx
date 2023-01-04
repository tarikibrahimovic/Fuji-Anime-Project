import { useState } from "react";
import { useContext } from "react";
import { NotificationManager } from "react-notifications";
import { FavoritesList } from "../Context/Context";
import Votes from "../Votes/Votes";
import Modal from "react-modal";

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

export default function LinkBox({ link, info, setLinks, links }) {
  const { token, id, admin } = useContext(FavoritesList);
  const [edit, setEdit] = useState(false);
  const [newL, setNewL] = useState();
  let date = new Date();
  const [modalIsOpen, setIsOpen] = useState(false);
  const url = process.env.REACT_APP_BACKEND_LINK;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  function Delete() {
    console.log(link.id)
    let requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };
    fetch(
      url + `User/delete-link/${link.id}`,
      requestOptions
    )
      .then((e) => {
        console.log(e);
        return e.json();
      })
      .then((e) => {
        console.log(e);
        setLinks((curr) => {
          return curr.filter((e) => e.id !== link.id);
        });
        NotificationManager.success("", "Succesfully deleted!");
      });
  }
  function Edit() {
    let requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: newL,
        idSadrzaja: info.id,
        tipSadrzaja: info.type,
        date: date.toString(),
      }),
    };
    fetch(url + `User/edit-link`, requestOptions)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setEdit(false);
        setLinks(
          links.map((e) => {
            if (e.id === link.id) {
              return { ...e, link: newL, date: date.toString() };
            } else {
              return { ...e };
            }
          })
        );
      })
      .catch((e) => console.log(e));
  }
  return (
    <div class="flex text-white relative top-1/3 w-3/4 m-auto">
      <div class="relative flex flex-col p-4 mb-8 border rounded-lg bg-dark w-full shadow-lg ml-3">
        <div class="relative flex flex-row">
          <Votes link={link} />
          <div class="flex flex-col w-full pt-2">
            <div class="flex flex-row justify-between">
              <p class="relative text-xl whitespace-nowrap font-bold overflow-hidden flex items-center">
                {link.pictureUrl && (
                  <div className="w-10 h-10">
                    <img src={link.pictureUrl} alt="picurl" />
                  </div>
                )}
                {link.username.toUpperCase()}
              </p>
              {(id === link.userId || admin === "Admin") && (
                <div className="flex">
                  <p
                    className="px-3 opacity-70 hover:opacity-100 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setEdit(true);
                    }}
                  >
                    Edit
                  </p>
                  <p
                    className="px-3 opacity-70 hover:opacity-100 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      openModal();
                    }}
                  >
                    Delete
                  </p>
                </div>
              )}
            </div>
            <p class="text-sm opacity-70">{link.date.slice(0, 24)}</p>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="">
            <h2 className="text-center text-2xl text-white">
              Do you want to Delete this Link?
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
              onClick={() => Delete()}
              className="bg-logored rounded-lg px-5 py-1 opacity-80 hover:opacity-100"
            >
              Delete
            </button>
          </div>
        </Modal>
        {!edit ? (
          <a href={link.link} class="mt-4 font-bold text-linkblue">{link.link}</a>
        ) : (
          <>
            <textarea
              onChange={(e) => {
                setNewL(e.target.value);
              }}
              className="bg-dark border border-white mb-2"
            >
              {link.link}
            </textarea>
            <div className="flex">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  Edit();
                }}
                className="bg-logored w-1/2 h-auto rounded-md opacity-90 hover:opacity-100 mx-2"
              >
                Add Link
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(false);
                }}
                className="bg-dark w-1/2 h-auto rounded-md hover:opacity-100 opacity-80 border border-white mx-2"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
