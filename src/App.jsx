import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import Rooms from "./pages/Rooms";
import ReserDetails from "./pages/ReserDetails";
import UpdateRoom from "./pages/Updates/UpdateRoom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reservation" element={<ReserDetails />} />
        <Route path="/all-rooms" element={<Rooms />} />
        <Route path="/edit-room" element={<UpdateRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
