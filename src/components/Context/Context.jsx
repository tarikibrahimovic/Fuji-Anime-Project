import React, { createContext, useState } from "react";
import { NotificationManager } from "react-notifications";

const FavoritesList = createContext();

function FavoritesContextProvider({ children }) {
  const [favItems, setFavItems] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const [id, setId] = useState();
  const [admin, setAdmin] = useState("");
  const [email, setEmail] = useState("");
  const [verifiedAt, setVerifiedAt] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [tip, setTip] = useState("");
  let niz = [];
  const link = process.env.REACT_APP_BACKEND_LINK;

  const addToFavorites = (favoriteItem) => {
    let token = localStorage.getItem("token") || "";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,fetch
      },
      body: JSON.stringify({
        idSadrzaja: favoriteItem.id,
        tip: favoriteItem.type,
      }),
    };
    fetch(link + "Favorites/add-favorite", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        if (
          !favItems.some(
            (e) => e.id == favoriteItem.id && e.type == favoriteItem.type
          )
        ) {
          setFavItems((prev) => [...prev, favoriteItem]);
        }
        NotificationManager.success("", "Succesfully added!");
      })
      .catch((e) => console.log(e));
  };

  const removeFromFav = (favoriteItem) => {
    let token = localStorage.getItem("token") || "";
    let requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };
    fetch(
      link + `Favorites/delete-favorite/${favoriteItem.type}/${favoriteItem.id}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        setFavItems((prev) => {
          return prev.filter(
            (el) => el.id !== favoriteItem.id || el.type !== favoriteItem.type
          );
        });
        NotificationManager.success("", "Succesfully removed!");
      })
      .catch((e) => console.log(e));
  };

  async function getFavorites(favs) {
    let res;
    for (let i = 0; i < favs.length; i++) {
      res = await fetch(`https://kitsu.io/api/edge/${favs[i].favorites.tip}/${favs[i].favorites.idSadrzaja}`);
      let data = await res.json();
      niz.push(data.data);
    }
    setFavItems(niz);
  }


  const values = {
    favItems,
    setFavItems,
    addToFavorites,
    removeFromFav,
    isAuth,
    setIsAuth,
    token,
    setToken,
    getFavorites,
    id,
    setId,
    username,
    setUsername,
    admin,
    setAdmin,
    email, 
    setEmail,
    verifiedAt,
    setVerifiedAt,
    imageUrl,
    setImageUrl,
    tip,
    setTip,
  };
  return (
    <FavoritesList.Provider value={values}>{children}</FavoritesList.Provider>
  );
}

export { FavoritesContextProvider, FavoritesList };
