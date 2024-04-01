import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../configs/firebase_config";

const CreateRoom = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomFloor, setroomFloor] = useState("");
  const [roomLocated, setroomLocated] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "room"), {
        roomNumber: roomNumber,
        roomFloor: roomFloor,
        roomLocated: roomLocated,
      });
      console.log("Document written with ID: ", docRef.id);
      // Clear input fields after successful submission
      setRoomNumber("");
      setroomFloor("");
      setroomLocated("");
      window.location.reload()
    } catch (error) {
      console.error("Error adding document: ", error);
      setErrorMessage("Failed to create room. Please try again.");
    }
  };

  return (
    <div className="container mt-3">
       <h2>Create Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="roomNumber" className="form-label">
            Room Number
          </label>
          <input
            type="text"
            className="form-control"
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="roomFloor" className="form-label">
            Floor
          </label>
          <input
            type="text"
            className="form-control"
            id="roomFloor"
            value={roomFloor}
            onChange={(e) => setroomFloor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="roomLocated" className="form-label">
            Located
          </label>
          <input
            type="text"
            className="form-control"
            id="roomLocated"
            value={roomLocated}
            onChange={(e) => setroomLocated(e.target.value)}
            required
          />
        </div>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
