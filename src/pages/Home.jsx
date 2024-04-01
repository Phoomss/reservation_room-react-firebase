import React from "react";
import HomeComponent from "../components/HomeComponent";
import MainLayout from "../components/layouts/MainLayout";
import ReservationComponent from "../components/ReservationComponent";

const Home = () => {
  return (
    <MainLayout>
      <HomeComponent />
      <ReservationComponent/>
    </MainLayout>
  );
};

export default Home;
