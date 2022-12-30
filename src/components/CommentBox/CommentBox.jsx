import { useState } from "react";
import { useContext } from "react";
import { NotificationManager } from "react-notifications";
import { FavoritesList } from "../Context/Context";
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

export default function CommentBox({ comment, info, setComments, comments }) {
  const { token, id, admin } = useContext(FavoritesList);
  const [edit, setEdit] = useState(false);
  const [newCom, setNewCom] = useState();
  let date = new Date();
  const [modalIsOpen, setIsOpen] = useState(false);
  const link = process.env.REACT_APP_BACKEND_LINK;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }

  function Delete() {
    let requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };
    fetch(
      link + `User/delete-comment/${comment.id}`,
      requestOptions
    )
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setComments((curr) => {
          return curr.filter((e) => e.id !== comment.id);
        });
        NotificationManager.success("", "Succesfully removed!");
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
        komentar: newCom,
        idSadrzaja: info.id,
        tipSadrzaja: info.type,
        date: date.toString(),
      }),
    };
    fetch(link + `User/edit-comment`, requestOptions)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setEdit(false);
        setComments(
          comments.map((e) => {
            if (e.id == comment.id) {
              return { ...e, komentar: newCom, date: date.toString() };
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
      <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-dark w-full shadow-lg ml-3">
        <div class="relative flex gap-4">
          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-between">
            <p class="relative text-xl whitespace-nowrap font-bold overflow-hidden flex items-center">
                {comment.pictureUrl && (
                  <div className="w-10 h-10">
                    <img src={comment.pictureUrl} alt="picture" />
                  </div>
                )}
                {comment.username.toUpperCase()}
              </p>
              {(id === comment.userId || admin === "Admin") && (
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
            <p class="text-sm opacity-70">{comment.date.slice(0,24)}</p>
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
            Do you want to Delete this Comment?
          </h2>
          </div>
          <div className="flex justify-around my-4 text-white">
            <button onClick={closeModal} className="bg-grayish rounded-lg px-5 py-1 opacity-80 hover:opacity-100">Close</button>
            <button onClick={() => Delete()} className="bg-logored rounded-lg px-5 py-1 opacity-80 hover:opacity-100">Delete</button>
          </div>
        </Modal>
        {!edit ? (
          <p class="mt-4 font-bold">{comment.komentar}</p>
        ) : (
          <>
            <textarea
              onChange={(e) => {
                setNewCom(e.target.value);
              }}
              className="bg-dark border border-white"
            >
              {comment.komentar}
            </textarea>
            <div className="flex">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  Edit();
                }}
                className="bg-logored w-1/2 h-auto rounded-md opacity-90 hover:opacity-100 mx-2"
              >
                Add Comment
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
