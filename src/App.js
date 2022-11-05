import { useContext } from "react";
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
  const {isAuth} = useContext(FavoritesList);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to="/home" /> : <Login />} />
        <Route path="/*" element={<Layout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/forgotpassword" element={<ForgotEmail/>} />
        <Route path="/forgot/:id" element={<ForgotPass/>} />
        <Route path="/changepass" element={<ChangePass/>} />
        <Route path="/deleteacc" element={<Delete/>} />
      </Routes>
    </div>
  );
}

export default App;
