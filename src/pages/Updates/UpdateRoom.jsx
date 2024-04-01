import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import RoomsDetailsComponent from "../../components/RoomsDatailsComponent";
import FormUpdateRoom from "../../components/FormUpdate/FormUpdateRoom";

const UpdateRoom = () => {
  return (
    <MainLayout>
      <div className="container">
        <div className="row">
          <div className="col-10">
            <RoomsDetailsComponent />
          </div>
          <div className="col-2">
            <FormUpdateRoom />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UpdateRoom;
