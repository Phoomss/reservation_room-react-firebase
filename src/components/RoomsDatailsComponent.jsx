import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../configs/firebase_config";
import { useNavigate } from "react-router-dom";

const RoomsDetailsComponent = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [editId, setEditId] = useState(null);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomFloor, setRoomFloor] = useState("");
  const [roomLocated, setRoomLocated] = useState("");

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleSave = async (id) => {
    try {
      await updateDoc(doc(db, "room", id), {
        roomNumber: roomNumber,
        roomFloor: roomFloor,
        roomLocated: roomLocated
      });
      setEditId(null);
      // อัปเดต local state เพื่อแสดงการเปลี่ยนแปลงทันที
      const updatedRooms = rooms.map(room => {
        if (room.id === id) {
          return {
            ...room,
            roomNumber: roomNumber,
            roomFloor: roomFloor,
            roomLocated: roomLocated
          };
        }
        return room;
      });
      setRooms(updatedRooms);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "room", id));
      // ดึงข้อมูลใหม่หลังจากการลบ
      const updatedRooms = rooms.filter((room) => room.id !== id);
      setRooms(updatedRooms);
      console.log("Room deleted successfully");
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleEdit = (id, room) => {
    setEditId(id);
    setRoomNumber(room.roomNumber);
    setRoomFloor(room.roomFloor);
    setRoomLocated(room.roomLocated);
  };

  return (
    <div className="container mt-3">
      <h2>Rooms All</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Floor</th>
            <th>Located</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>
                {editId === room.id ? (
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
                ) : (
                  room.roomNumber
                )}
              </td>
              <td>
                {editId === room.id ? (
                  <div className="mb-3">
                    <label htmlFor="roomFloor" className="form-label">
                      Floor
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="roomFloor"
                      value={roomFloor}
                      onChange={(e) => setRoomFloor(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  room.roomFloor
                )}
              </td>
              <td>
                {editId === room.id ? (
                  <div className="mb-3">
                    <label htmlFor="roomLocated" className="form-label">
                      Located
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="roomLocated"
                      value={roomLocated}
                      onChange={(e) => setRoomLocated(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  room.roomLocated
                )}
              </td>
              <td>
                {editId === room.id ? (
                  <>
                    <button
                      className="btn btn-outline-success me-2"
                      onClick={() => handleSave(room.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-outline-danger me-2"
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-warning me-2"
                      onClick={() => handleEdit(room.id, room)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(room.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomsDetailsComponent;
