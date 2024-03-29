import { useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { FavoritesList } from "./components/Context/Context";
import Layout from "./Layout";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Verify from "./pages/VerifyPage/Verify";
import ForgotEmail from "./pages/ForgotEmailPage/ForgotEmail";
import ForgotPass from "./pages/ForgorPasswordPage/ForgotPass";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Home from "./pages/HomePage/Home";
import Anime from "./pages/AnimePage/Anime";
import Manga from "./pages/MangaPage/Manga";
import MangaInfo from "./pages/MangaPage/MangaInfo";
import AnimeInfo from "./pages/AnimePage/AnimeInfo";
import FavPage from "./pages/FavoritePage/FavPage";
import ErrorPage from "./pages/404Page/ErrorPage";
import Admin from "./pages/AdminPage/Admin";
import Modal from 'react-modal';
import Profile from "./pages/ProfilePage/Profile";

Modal.setAppElement('#root');

function App() {
  const {
    isAuth,
    setIsAuth,
    token,
    getFavorites,
    setToken,
    setUsername,
    setId,
    setAdmin,
    setVerifiedAt,
    setEmail,
    setImageUrl,
    setTip,
    setIsLoading,
  } = useContext(FavoritesList);
  const tok = token;
  let status;
  const link = process.env.REACT_APP_BACKEND_LINK;

  
  useEffect(() => {
    if (token === undefined && localStorage.getItem("token")?.length > 8) {
      setIsLoading(true);
      let requestOptions = {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      fetch(link + "User/check-token", requestOptions)
        .then((e) => {
          status = e.status;
          return e.json();
        })
        .then((e) => {
          if (status === 200) {
            setToken(localStorage.getItem("token"));
            setIsAuth(true);
            setUsername(e.username);
            setId(e.userId);
            setAdmin(e.role);
            setEmail(e.email);
            setVerifiedAt(e.verifiedAt);
            setImageUrl(e.pictureUrl)
            setTip(e.pom)
          }
        });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (tok == null) return;
    let requestOptions = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    fetch(link + `User/get-favorites`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        getFavorites(e);
      })
      .catch((e) => console.log(e));
  }, [token]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Navigate to="/layout/home" /> : <Login />}
        />
        <Route path="/layout" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="anime" element={<Anime />} />
          <Route path="manga" element={<Manga />} />
          <Route path="favorites" element={<FavPage />} />
          <Route path="manga/:id/:title" element={<MangaInfo />} />
          <Route path="anime/:id/:title" element={<AnimeInfo />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/forgotpassword" element={<ForgotEmail />} />
        <Route path="/forgot/:id" element={<ForgotPass />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <NotificationContainer />
    </div>
  );
}

export default App;
