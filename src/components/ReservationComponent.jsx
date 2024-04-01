import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../configs/firebase_config";

const ReservationComponent = () => {
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

  return (
    <div className="container mt-3">
      <h2>Reservations Details All</h2>
      <div className="row">
        {reservations.map((reservation) => (
          <div className="col-md-4 mb-4" key={reservation.id}>
            <div className="card border-primary">
              <div className="card-body">
                {editId === reservation.id ? (
                  <>
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
                        User
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
                  </>
                ) : (
                  <>
                    <h5 className="card-title">
                      Room Number: {reservation.roomID}
                    </h5>
                    <span className="card-text">
                      Time Start: {reservation.timeStart}
                    </span>
                    <p className="card-text">Time Out: {reservation.timeOut}</p>
                    <p className="card-text">
                      ฺBook's name: {reservation.user}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationComponent;
