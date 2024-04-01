import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../configs/firebase_config";
import { Timestamp } from "firebase/firestore"; // เพิ่ม import Firebase Timestamp

const CreateReser = () => {
  const [roomID, setRoomID] = useState("");
  const [timeStart, settimeStart] = useState("");
  const [timeOut, settimeOut] = useState("");
  const [tel, setTel] = useState("");
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // สร้าง Firebase Timestamp จากวันที่และเวลาที่ผู้ใช้เลือก
      const startTimestamp = Timestamp.fromDate(new Date(timeStart));
      const endTimestamp = Timestamp.fromDate(new Date(timeOut));

      // เพิ่มข้อมูลการจองใหม่ลงในฐานข้อมูล
      const docRef = await addDoc(collection(db, "reservation"), {
        roomID: roomID,
        timeStart: startTimestamp,
        timeOut: endTimestamp,
        user: user,
        tel: tel,
      });
      console.log("Reservation created with ID: ", docRef.id);
      // ล้างข้อมูลในฟอร์มหลังจากสร้างการจองเสร็จสมบูรณ์
      setRoomID("");
      settimeStart("");
      settimeOut("");
      setTel("");
      setUser("");
      setErrorMessage("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating reservation: ", error);
      setErrorMessage("Failed to create reservation. Please try again.");
    }
  };

  return (
    <div className="container mt-3">
      <h2>Create Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="roomID" className="form-label">
            Room ID
          </label>
          <input
            type="text"
            className="form-control"
            id="roomID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="timeStart" className="form-label">
            Start Date and Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="timeStart"
            value={timeStart}
            onChange={(e) => settimeStart(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="timeOut" className="form-label">
            End Date and Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="timeOut"
            value={timeOut}
            onChange={(e) => settimeOut(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="user" className="form-label">
            Name and Surname
          </label>
          <input
            type="text"
            className="form-control"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tel" className="form-label">
            Telephone
          </label>
          <input
            type="text"
            className="form-control"
            id="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
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

export default CreateReser;
