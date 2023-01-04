import React, { createContext, useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const FavoritesList = createContext();

function FavoritesContextProvider({ children }) {
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(false);
  let niz = [];
  // let LoginRegister = '';
  const [LoginRegister, setLoginRegister] = useState("");
  const link = process.env.REACT_APP_BACKEND_LINK;

  const logout = () => {
    signOut(auth);
    logoutSetup();
  };

  const logoutSetup = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAdmin("");
    setFavItems([]);
    setIsAuth(false);
    setEmail("");
    setVerifiedAt("");
    setImageUrl("");
    setId(0);
    setToken("");
    navigate("/", {});
    setTip("");
  };

  // const googleSignIn = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider);
  // };
  // const googleSignUp = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider);
  // };
  
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     console.log(user, LoginRegister);
  //     if (user) {
  //       if (LoginRegister === "login") {
  //         console.log("proslo");
  //         GoogleLogin(user);
  //       } else if (LoginRegister === "register") {
  //         GoogleRegister(user);
  //       }
  //     }
  //   });
  // }, []);



  function GoogleRegister(userObject) {
    let status;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userObject.displayName,
        email: userObject.email,
        sub: userObject.uid,
      }),
    };
    fetch(link + "User/register-google", requestOptions)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((e) => {
        if (status === 200) {
          NotificationManager.success("Verification mail sent!", "Success!");
          logout();
          navigate("/", {});
        } else {
          NotificationManager.error(e.message, "Error!");
        }
      })
      .catch((e) => console.log(e));
  }

  const GoogleLogin = (userObject) => {
    let status;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userObject.displayName,
        email: userObject.email,
        sub: userObject.uid,
      }),
    };
    fetch(link + "User/login-google", requestOptions)
      .then((res) => {
        status = res.status;
        console.log(res);
        return res.json();
      })
      .then((e) => {
        localStorage.setItem("token", "Bearer " + e.token);
        localStorage.setItem("username", e.username);
        setToken("Bearer " + e.token);
        if (status === 200) {
          setIsAuth(true);
          setId(e.id);
          setUsername(e.username);
          setAdmin(e.role);
          setEmail(e.email);
          setVerifiedAt(e.verifiedAt);
          setImageUrl(e.pictureUrl);
          setTip(e.type);
          NotificationManager.success("", `Welcome back! ${e.username}`);
        } else {
          NotificationManager.error("", e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const addToFavorites = (favoriteItem) => {
    let token = localStorage.getItem("token") || "";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        fetch,
      },
      body: JSON.stringify({
        idSadrzaja: favoriteItem.id,
        tip: favoriteItem.type,
      }),
    };
    fetch(link + "User/add-favorite", requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        if (
          !favItems.some(
            (e) => e.id === favoriteItem.id && e.type === favoriteItem.type
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
      link + `User/delete-favorite/${favoriteItem.type}/${favoriteItem.id}`,
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
      res = await fetch(
        `https://kitsu.io/api/edge/${favs[i].favorites.tip}/${favs[i].favorites.idSadrzaja}`
      );
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
    isLoading,
    setIsLoading,
    // googleSignIn,
    logout,
    // googleSignUp,
    logoutSetup,
    LoginRegister,
    setLoginRegister,
    GoogleRegister,
    GoogleLogin,
  };
  return (
    <FavoritesList.Provider value={values}>{children}</FavoritesList.Provider>
  );
}

export { FavoritesContextProvider, FavoritesList };
