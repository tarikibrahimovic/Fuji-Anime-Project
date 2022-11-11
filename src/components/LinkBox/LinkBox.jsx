import { useState } from "react";
import { useContext } from "react";
import { FavoritesList } from "../Context/Context";

export default function LinkBox({ link, info, setLinks, links }){
    const { token, id } = useContext(FavoritesList);
    const [edit, setEdit] = useState(false);
    const [newL, setNewL] = useState();
    let date = new Date();
  
    function Delete() {
      let requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      };
      fetch(
        `https://localhost:7098/api/User/delete-comment?idSadrzaja=${info.id}&tip=${info.type}`,
        requestOptions
      )
        .then((e) => {
          return e.json();
        })
        .then((e) => {
          setLinks((curr) => {
            return curr.filter((e) => e.id !== link.id);
          });
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
      fetch(`https://localhost:7098/api/User/edit-link`, requestOptions)
        .then((e) => {
          return e.json();
        })
        .then((e) => {
          setEdit(false);
          setLinks(
            links.map((e) => {
              if (e.id == link.id) {
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
        <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-dark w-full shadow-lg ml-3">
          <div class="relative flex gap-4">
            <div class="flex flex-col w-full">
              <div class="flex flex-row justify-between">
                <p class="relative text-xl whitespace-nowrap font-bold  overflow-hidden">
                  {link.username.toUpperCase()}
                </p>
                {id === link.userId && (
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
                        Delete();
                      }}
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
              <p class="text-sm opacity-70">{link.date.slice(0,24)}</p>
            </div>
          </div>
          {!edit ? (
            <a class="mt-4 font-bold text-linkblue">{link.link}</a>
          ) : (
            <>
              <textarea
                onChange={(e) => {
                  setNewL(e.target.value);
                }}
                className="bg-dark border border-white"
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