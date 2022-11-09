import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { FavoritesList } from "../../components/Context/Context";
import { Link } from "react-router-dom";
import { useState } from "react";
import CommentBox from "../../components/CommentBox/CommentBox";
import CommentAdd from "../../components/CommentBox/CommentAdd";

export default function AnimeInfo() {
  const { addToFavorites, removeFromFav, favItems, isAuth } =
    useContext(FavoritesList);
  const { state } = useLocation();
  const [comments, setComments] = useState([]);
  const [optionCom, setOptionCom] = useState(true);
  const [optionLink, setOptionLink] = useState(false);

  useEffect(() => {
    fetch(
      `https://localhost:7098/api/User/get-comments?tip=anime&idSadrzaja=${state.anime.id}`
    )
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setComments(e);
      });
  }, []);

  return (
    <>
      <div className="flex flex-row justify-center items-start w-full h-auto bg-dark text-white">
        <div className="flex flex-col w-1/4 justify-center items-center pt-4">
          <img
            className="rounded-lg w-64 cursor-pointer"
            src={state.anime.attributes.posterImage.small}
            alt=""
          />
        </div>
        <div className="flex flex-col w-3/4 pt-4 gap-5 h-full">
          <div>
            <p className="text-4xl font-bold">
              {state.anime.attributes.canonicalTitle}
            </p>
            <br />
            <h4>{state.anime.attributes.description}</h4>
          </div>
          <div>
            {!isAuth ? (
              <div className="text-lightred my-7">
                <p className="">
                  You are not Authorised, Please log in or make an Account
                </p>
              </div>
            ) : (
              ""
            )}
            <Link to="/anime">
              {favItems.some(
                (el) => el.id === state.anime.id && el.type === state.anime.type
              ) ? (
                <button
                  className="bg-transparent py-2 px-4 font-semibold border hover:scale-105 hover:border-2 transition ease-out rounded absolute"
                  onClick={() => removeFromFav(state.anime)}
                >
                  Remove from favorites
                </button>
              ) : (
                <button
                  className="bg-transparent py-2 px-4 font-semibold border hover:scale-105 hover:border-2 transition ease-out rounded absolute"
                  onClick={() => {
                    if (isAuth) addToFavorites(state.anime);
                  }}
                >
                  Add to favorites
                </button>
              )}
            </Link>
          </div>
        </div>
      </div>
      <hr className="text-white mt-10 w-9/12" />
      <div 
      onClick={(e) => {
        e.preventDefault();
        setOptionCom(!optionCom);
      }}
      className="border-b border-white cursor-pointer">
        <button
          className={`ml-3 text-white px-5 py-3 text-2xl ${
            optionCom ? "font-bold" : ""
          }`}
        >
          Comments
        </button>
        {optionCom ? (
          <div className="">
            {isAuth ? (
              <CommentAdd
                info={state.anime}
                setComments={setComments}
                comments={comments}
                anime={state.anime}
              />
            ) : (
              ""
            )}
            <div className="flex flex-col lg:flex-row flex-wrap">
              {comments.map((comment) => {
                return (
                  <CommentBox
                    comment={comment}
                    info={state.anime}
                    setComments={setComments}
                    comments={comments}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div 
      onClick={(e) => {
        e.preventDefault();
        setOptionLink(!optionLink);
      }}
      className="border-b border-white cursor-pointer">
        <button
          className={`ml-3 text-white px-5 py-3 text-2xl ${
            optionLink ? "font-bold" : ""
          }`}
        >
          Links
        </button>
        {optionLink ? (
          <div className="">
            {isAuth ? (
              <CommentAdd
                info={state.anime}
                setComments={setComments}
                comments={comments}
                anime={state.anime}
              />
            ) : (
              ""
            )}
            <div className="flex flex-col lg:flex-row flex-wrap">
              {comments.map((comment) => {
                return (
                  <CommentBox
                    comment={comment}
                    info={state.anime}
                    setComments={setComments}
                    comments={comments}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
