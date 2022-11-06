import React, { createContext, useState } from "react";

const FavoritesList = createContext();

function FavoritesContextProvider({ children }) {
  const [favItems, setFavItems] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const addToFavorites = (tip, favoriteItem) => {
    let status;
    let token = localStorage.getItem("token") || "";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        idSadrzaja: favoriteItem.id,
        tip: tip,
      }),
    };
    fetch("https://localhost:7098/api/User/add-favorite", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        if (status === 200) {
          console.log(e);
          setFavItems((prevItems) => {
            if (
              !prevItems.find(
                (el) =>
                  el.id === favoriteItem.id && el.title === favoriteItem.title
              )
            ) {
              return [...prevItems, { ...favoriteItem }];
            } else {
              alert("This is already added on favorite");
              return [...prevItems];
            }
          });
          console.log(favItems);
        }
      })
      .catch((e) => console.log(e));
  };

  const removeFromFav = (favoriteItem, Tip) => {
    let token = localStorage.getItem("token") || "";
    let status;
    let requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    };
    fetch(
      `https://localhost:7098/api/User/delete-favorite?Tip=${Tip}&idSadrzaja=${favoriteItem.id}`,
      requestOptions
    )
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        console.log(e);
        if (status === 200) {
          setFavItems((prev) => {
            return prev.filter(
              (el) =>
                el.id !== favoriteItem.id || el.title !== favoriteItem.title
            );
          });
        } else {
        }
      })
      .catch((e) => console.log(e));
  };
  const values = {
    favItems,
    setFavItems,
    addToFavorites,
    removeFromFav,
    isAuth,
    setIsAuth,
  };
  return (
    <FavoritesList.Provider value={values}>{children}</FavoritesList.Provider>
  );
}

export { FavoritesContextProvider, FavoritesList };
