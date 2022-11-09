import React, { createContext, useState } from "react";

const FavoritesList = createContext();

function FavoritesContextProvider({ children }) {
  const [favItems, setFavItems] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const [id, setId] = useState();
  let niz = [];

  const addToFavorites = (favoriteItem) => {
    let token = localStorage.getItem("token") || "";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        idSadrzaja: favoriteItem.id,
        tip: favoriteItem.type,
      }),
    };
    fetch("https://localhost:7098/api/User/add-favorite", requestOptions)
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
      `https://localhost:7098/api/User/delete-favorite?Tip=${favoriteItem.type}&idSadrzaja=${favoriteItem.id}`,
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
    setUsername
  };
  return (
    <FavoritesList.Provider value={values}>{children}</FavoritesList.Provider>
  );
}

export { FavoritesContextProvider, FavoritesList };
