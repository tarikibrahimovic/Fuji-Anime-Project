import { useContext, useEffect,  } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { FavoritesList } from "./components/Context/Context";
import Layout from "./Layout";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Verify from "./pages/VerifyPage/Verify";
import ForgotEmail from "./pages/ForgotEmailPage/ForgotEmail";
import ForgotPass from "./pages/ForgorPasswordPage/ForgotPass";
import Delete from "./pages/DeletePage/Delete";
import ChangePass from "./pages/ChangePassPage/ChangePass";

function App() {
  const { isAuth, setIsAuth, token, getFavorites, setToken, setUsername, setId } = useContext(FavoritesList);
  const tok = token;
  let status;

  useEffect(() => {
    if(token === undefined && localStorage.getItem('token')?.length > 8){
      let requestOptions = {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      fetch("https://localhost:7098/api/User/check-token",requestOptions).then((e) => {
        status = e.status
        return e.json()
      }).then((e) => {
        if(status === 200){
          setToken(localStorage.getItem('token'))
          setIsAuth(true);
          setUsername(e.username)
          setId(e.userId);
        }
      })
    }
  }, [])

//ADMIN TAB AND ERROR PAGE, ON INFO'S FOR GUEST BUTTON, 



  useEffect(() => {
    if (tok == null) return;
    let requestOptions = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    fetch(`https://localhost:7098/api/User/get-favorites`, requestOptions)
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
          element={isAuth ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/*" element={<Layout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/forgotpassword" element={<ForgotEmail />} />
        <Route path="/forgot/:id" element={<ForgotPass />} />
        <Route path="/changepass" element={<ChangePass />} />
        <Route path="/deleteacc" element={<Delete />} />
      </Routes>
    </div>
  );
}

export default App;
