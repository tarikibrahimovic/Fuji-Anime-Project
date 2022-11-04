import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { FavoritesList } from "./components/Context/Context";
import Layout from "./Layout";
import Home from "./pages/HomePage/Home";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Verify from "./pages/VerifyPage/Verify";

function App() {
  const {isAuth} = useContext(FavoritesList);
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Login/>} /> */}
        {/* <Route path="/login'" element={isAuth ? <Navigate to="/home" /> :  <Login />} /> */}
        <Route path="/" element={isAuth ? <Navigate to="/home" /> : <Login />} />
        <Route path="/*" element={<Layout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:id" element={<Verify />} />
      </Routes>
    </div>
  );
}

export default App;
