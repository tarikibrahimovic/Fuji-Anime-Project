import { useEffect, useState } from "react";
import { useContext } from "react";
import { FavoritesList } from "../Context/Context";

export default function CommentBox({ comment, info, setComments }) {
  const { token } = useContext(FavoritesList);
  console.log(info);

  function Delete() {
    let requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };
    fetch(
      `https://localhost:7098/api/User/delete-comment?idSadrzaja=${info.id}&tip=${info.type}`,requestOptions
    )
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        fetch(
            `https://localhost:7098/api/User/get-comments?tip=anime&idSadrzaja=${info.id}`
          )
            .then((e) => {
              return e.json();
            })
            .then((e) => {
              setComments(e);
            });
      });
  }

  return (
    <div class="flex text-white relative top-1/3 w-1/2">
      <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-dark w-full shadow-lg ml-3">
        <div class="relative flex gap-4">
          <div class="flex flex-col w-full">
            <div class="flex flex-row justify-between">
              <p class="relative text-xl whitespace-nowrap font-bold  overflow-hidden">
                {comment.username.toUpperCase()}
              </p>
              <div className="flex">
                <p className="px-3 opacity-70 hover:opacity-100 cursor-pointer">Edit</p>
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
            </div>
            <p class="text-sm opacity-70">{comment.date}</p>
          </div>
        </div>
        <p class="mt-4 font-bold">{comment.komentar}</p>
      </div>
    </div>
  );
}
