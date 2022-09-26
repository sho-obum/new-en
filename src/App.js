import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Ticket from "./pages/Ticket";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/ticket" element={<Ticket />} />
      </Routes>
    </>
  );
};

export default App;
