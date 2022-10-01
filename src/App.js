import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { fs, auth } from "./config/config";
import Home from "./pages/Home";
import Ticket from "./pages/Ticket";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

const App = () => {
  function GetUserId() {
    const [uid, setuid] = useState(null);
    const [email, setemail] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setuid(user.uid);
          setemail(user.email);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserId();

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/ticket/:userid/:registrarName"
          element={<Admin user={uid} />}
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/ticket" element={<Ticket />} />
      </Routes>
    </>
  );
};

export default App;
