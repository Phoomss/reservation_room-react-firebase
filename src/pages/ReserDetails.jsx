import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import ReserDetailComponent from "../components/ReserDetailComponent";
import CreateReser from "../components/FormCreate/CreateReser";

const ReserDetails = () => {
  return (
    <MainLayout>
      <div className="container">
        <div className="row">
          <div className="col-9">
            <ReserDetailComponent />
          </div>
          <div className="col-3">
            <CreateReser />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReserDetails;
