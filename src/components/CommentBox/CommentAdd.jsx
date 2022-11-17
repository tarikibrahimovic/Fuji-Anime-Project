import { useContext, useRef } from "react";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { FavoritesList } from "../Context/Context";

export default function CommentAdd({ info, setComments, sadrzaj }) {
  let com;
  const { token } = useContext(FavoritesList);
  let date = new Date();
  const ref = useRef();
  const [error, setError] = useState(false);

  function Add() {
    if (com) {
      let requestOptions = {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          komentar: com,
          idSadrzaja: info.id,
          tipSadrzaja: info.type,
          date: date.toString(),
        }),
      };
      fetch(`https://localhost:7098/api/User/add-comment`, requestOptions)
        .then((e) => {
          return e.json();
        })
        .then((e) => {
          fetch(
            `https://localhost:7098/api/User/get-comments?tip=${sadrzaj.type}&idSadrzaja=${sadrzaj.id}`
          )
            .then((e) => {
              return e.json();
            })
            .then((e) => {
              setComments(e);
            });
            NotificationManager.success("", "Succesfully added!");
        })
        .catch((e) => console.log(e));
    } else {
        setError(true);
    }
  }
  return (
    <div class="flex text-white relative top-1/3 w-3/4  m-auto">
      <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-dark w-full shadow-lg ml-3">
        <div class="relative flex gap-4">
          <div class="flex flex-col w-full">
            <div class="flex flex-col">
              <p class="relative text-xl whitespace-nowrap font-bold  overflow-hidden">
                Add your comment
              </p>
                {error && (<p class="relative text-xl whitespace-nowrap text-lightred overflow-hidden">
                Enter something before adding!
              </p>)}
            </div>
          </div>
        </div>
        <textarea
          ref={ref}
          onChange={(e) => {
            com = e.target.value;
          }}
          className="bg-dark border border-white"
          placeholder="Tell us what you think"
        ></textarea>
        <div className="flex">
          <button
            onClick={(e) => {
              e.preventDefault();
              Add();
            }}
            className="bg-logored w-1/2 h-auto rounded-md opacity-90 hover:opacity-100 mx-2"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}
