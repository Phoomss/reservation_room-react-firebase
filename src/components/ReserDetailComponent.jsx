import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp
} from "firebase/firestore";

import { db } from "../configs/firebase_config";

const ReserDetailComponent = () => {
  const [reservations, setReservations] = useState([]);
  const [roomID, setRoomID] = useState("");
  const [timeStart, settimeStart] = useState("");
  const [timeOut, settimeOut] = useState("");
  const [tel, setTel] = useState("");
  const [user, setUser] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsRef = collection(db, "reservation");
        const querySnapshot = await getDocs(reservationsRef);
        const reservationData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          roomID: doc.data().roomID,
          timeStart: new Date(
            doc.data().timeStart.seconds * 1000
          ).toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          timeOut: new Date(doc.data().timeOut.seconds * 1000).toLocaleString(
            "en-US",
            {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }
          ),
          user: doc.data().user,
          tel: doc.data().tel,
        }));
        setReservations(reservationData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchReservations();
  }, []);

  const handleSave = async (id) => {
    try {
      // สร้าง Firebase Timestamp จากเวลาที่ผู้ใช้เลือก
      const startTimestamp =Timestamp.fromDate(new Date(timeStart));
      const endTimestamp = Timestamp.fromDate(new Date(timeOut));
  
      // อัปเดตข้อมูลการจองในฐานข้อมูล Firestore
      await updateDoc(doc(db, "reservation", id), {
        roomID: roomID,
        timeStart: startTimestamp,
        timeOut: endTimestamp,
        user: user,
        tel: tel,
      });
  
      // อัปเดตข้อมูลการจองในสเตทของ React
      const updatedReservations = reservations.map((reservation) => {
        if (reservation.id === id) {
          return {
            ...reservation,
            roomID: roomID,
            timeStart: startTimestamp.toDate().toLocaleString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            timeOut: endTimestamp.toDate().toLocaleString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            user: user,
            tel: tel,
          };
        }
        return reservation;
      });
      setReservations(updatedReservations);
      setEditId(null);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleEdit = (id, reservation) => {
    setEditId(id);
    setRoomID(reservation.roomID);
    settimeStart(reservation.timeStart);
    settimeOut(reservation.timeOut);
    setUser(reservation.user);
    setTel(reservation.tel);
  };
  

  const handleCancel = () => {
    setEditId(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "reservation", id));
      const updatedReservations = reservations.filter(
        (reservation) => reservation.id !== id
      );
      setReservations(updatedReservations);
      console.log("Reservation deleted successfully");
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Reservations Details All</h2>
      <div className="table-responsive">
        <table className="table ">
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Time Start</th>
              <th>Time Out</th>
              <th>User</th>
              <th>Tel</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                {editId === reservation.id ? (
                  <>
                    <td>
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
                    </td>
                    <td>
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
                    </td>
                    <td>
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
                    </td>
                    <td>
                      <div className="mb-3">
                        <label htmlFor="user" className="form-label">
                          user
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
                    </td>
                    <td>
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
                    </td>
                  </>
                ) : (
                  <>
                    <td>{reservation.roomID}</td>
                    <td>{reservation.timeStart}</td>
                    <td>{reservation.timeOut}</td>
                    <td>{reservation.user}</td>
                    <td>{reservation.tel}</td>
                  </>
                )}
                <td>
                  {editId === reservation.id ? (
                    <div className="d-flex">
                      <button
                        className="btn btn-outline-success me-2"
                        onClick={() => handleSave(reservation.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-outline-danger me-2 "
                        onClick={() => handleCancel()}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex">
                      <button
                        className="btn btn-outline-warning me-2"
                        onClick={() => handleEdit(reservation.id, reservation)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(reservation.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReserDetailComponent;
