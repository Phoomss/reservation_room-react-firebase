import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../configs/firebase_config";

const HomeComponent = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsRef = collection(db, "room");
        const querySnapshot = await getDocs(roomsRef);
        const roomsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomsData);
        console.log(rooms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="container mt-3">
      <h2>Rooms</h2>
      <div className="row">
        {rooms.map((room) => (
          <div className="col-md-4 mb-4" key={room.id}>
            <div className="card border-primary">
              <div className="card-body">
                <h5 className="card-title">Room Number: {room.roomNumber}</h5>
                <span className="card-text">Floor: {room.roomFloor} </span>
                <span className="card-text">Located: {room.roomLocated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;
