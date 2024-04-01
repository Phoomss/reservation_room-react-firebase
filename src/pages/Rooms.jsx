import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import RoomsComponent from "../components/RoomsComponent";
import RoomsDatailsComponent from "../components/RoomsDatailsComponent";
import CreateRoom from "../components/FormCreate/CreateRoom";

const Rooms = () => {
  return (
    <MainLayout>
      <div className="container">
        <div className="row">
          <div className="col-9">
            <RoomsDatailsComponent />
          </div>
          <div className="col-3">
            <CreateRoom />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Rooms;
