import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FavoritesList } from "../../components/Context/Context";
import { Link } from "react-router-dom";
import CommentBox from "../../components/CommentBox/CommentBox";
import CommentAdd from "../../components/CommentBox/CommentAdd";
import LinkBox from "../../components/LinkBox/LinkBox";
import LinkAdd from "../../components/LinkBox/LinkAdd";
import { NotificationManager } from "react-notifications";
import { BsArrowLeft } from "react-icons/bs";
import YoutubeEmbed from "../../components/Trailer/YouTubeEmbed";

export default function MangaInfo() {
  const { addToFavorites, removeFromFav, favItems, isAuth } =
    useContext(FavoritesList);
  const { state } = useLocation();
  const [comments, setComments] = useState([]);
  const [links, setLinks] = useState([]);
  const [optionCom, setOptionCom] = useState(true);
  const [optionLink, setOptionLink] = useState(false);
  const link = process.env.REACT_APP_BACKEND_LINK;

  useEffect(() => {
    fetch(
      link + `User/get-comments/manga/${state.manga.id}`
    )
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setComments(e);
      });

    fetch(
      link + `User/get-links/manga/${state.manga.id}`
    )
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setLinks(e);
      });
  }, []);

  return (
    <>
      <Link to="/layout/manga">
        <BsArrowLeft className="text-white text-3xl m-5" />
      </Link>
      <div className="flex flex-col justify-center items-start w-full h-auto bg-dark text-white">
        <div className="flex w-full pl-10 mb-10 ">
          <div className="flex">
            <p className="text-4xl font-bold">
              {state.manga.attributes.canonicalTitle}
              <hr />
              {state.manga.attributes.titles.ja_jp}
            </p>
            <div className="px-2 h-8 text-xl font-bold bg-logored text-white rounded-xl flex items-center">
              {state.manga.attributes.averageRating}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-evenly" id="prikaz">
          <img
            className="rounded-lg w-64 cursor-pointer"
            src={state.manga.attributes.posterImage.large}
            alt=""
          />
          <div className="">
            <YoutubeEmbed trailer={state.manga.attributes.youtubeVideoId} />
          </div>
        </div>
        <hr className="text-logored w-9/12 my-5 m-auto" />
        <div className="flex flex-col w-full px-10 mt-10 pb-10">
          <p className="my-1">
            {" "}
            <b className="text-logored ">Age Rating: </b>
            {state.manga.attributes.ageRatingGuide}{" "}
          </p>
          <p className="my-1">
            {" "}
            <b className="text-logored ">Status: </b>
            {state.manga.attributes.status}{" "}
            {state.manga.attributes.status === "finished"
              ? state.manga.attributes.endDate
              : ""}
          </p>
          <p className="my-1">
            {" "}
            <b className="text-logored ">Episode Count: </b>
            {state.manga.attributes.episodeCount}{" "}
          </p>
          <p className="my-1">
            {" "}
            <b className="text-logored ">Favorite Count: </b>
            {state.manga.attributes.favoritesCount}{" "}
          </p>
          <p className="my-1">
            {" "}
            <b className="text-logored ">Description: </b>
            {state.manga.attributes.synopsis}{" "}
          </p>
          <div>
            <div className="mt-5">
              {!isAuth && (
                <div className="text-lightred my-7">
                  <p className="">
                    You are not Authorised, Please log in or make an Account
                  </p>
                </div>
              )}
              {favItems.some(
                (el) => el.id === state.manga.id && el.type === state.manga.type
              ) ? (
                <button
                  className="bg-transparent py-2 px-4 font-semibold border hover:scale-105 hover:border-2 transition ease-out rounded absolute"
                  onClick={() => {
                    removeFromFav(state.manga);
                  }}
                >
                  Remove from favorites
                </button>
              ) : (
                <button
                  className="bg-transparent py-2 px-4 font-semibold border hover:scale-105 hover:border-2 transition ease-out rounded absolute"
                  onClick={() => {
                    if (isAuth) {
                      addToFavorites(state.manga);
                    } else {
                      NotificationManager.error(
                        "Please log in!",
                        "You are not Loged In",
                        5000,
                        () => {
                          alert("callback");
                        }
                      );
                    }
                  }}
                >
                  Add to favorites
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="text-white mt-10 w-9/12" />
      {/* COMMENTS */}
      <div className="border-b border-white">
        <button
          onClick={(e) => {
            e.preventDefault();
            setOptionCom(!optionCom);
          }}
          className={` text-white px-5 py-3 text-2xl text-left w-full ${
            optionCom ? "font-bold" : ""
          }`}
        >
          Comments
        </button>
        {optionCom && (
          <div className="transition-all ease-in">
            {isAuth && (
              <CommentAdd
                info={state.manga}
                setComments={setComments}
                comments={comments}
                sadrzaj={state.manga}
              />
            )}
            <div className="flex flex-col lg:flex-row flex-wrap justify-center">
              {comments.length !== 0 ? (
                <>
                  {comments.map((comment) => {
                    return (
                      <CommentBox
                        comment={comment}
                        info={state.manga}
                        setComments={setComments}
                        comments={comments}
                      />
                    );
                  })}
                </>
              ) : (
                <p className="text-lightred flex justify-center">
                  THERE ARE NO COMMENTS
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {/* LINKS */}
      <div className="border-b border-white">
        <button
          onClick={(e) => {
            e.preventDefault();
            setOptionLink(!optionLink);
          }}
          className={`text-white text-left px-5 py-3 text-2xl w-full ${
            optionLink ? "font-bold" : ""
          }`}
        >
          Links
        </button>
        {optionLink && (
          <div className="transition ease-in-out delay-150">
            {isAuth && (
              <LinkAdd
                info={state.manga}
                setLinks={setLinks}
                links={links}
                sadrzaj={state.manga}
              />
            )}
            <div className="flex flex-col lg:flex-row flex-wrap justify-center">
              {links.length !== 0 ? (
                <>
                  {links.map((link) => {
                    return (
                      <LinkBox
                        link={link}
                        info={state.manga}
                        setLinks={setLinks}
                        links={links}
                      />
                    );
                  })}
                </>
              ) : (
                <p className="text-lightred flex justify-center">
                  THERE ARE NO LINKS
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
