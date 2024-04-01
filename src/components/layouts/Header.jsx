import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../configs/firebase_config";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        window.sessionStorage.setItem("user", JSON.stringify(authUser));
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        window.sessionStorage.clear();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {user ? (
        <nav className="navbar navbar-expand-lg bg-info-subtle">
          <div
            className="container-fluid"
            style={{ maxWidth: "1320px", margin: "0 auto" }}
          >
            <Link className="navbar-brand" to="/home">
              ระบบจองห้องเรียน
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    หน้าหลัก
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reservation">
                    จองห้อง
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    รายการห้องทั้งหมด
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/all-rooms">
                        แสดงรายการห้องทั้งหมด
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {
                user ? (
                  <div className="d-flex align-items-center">
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-dark dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {user.displayName}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            ออกจากระบบ
                          </button>
                        </li>
                      </ul>
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="rounded-circle ms-3"
                        width={35}
                      />
                    </div>
                  </div>
                ) : null /* Don't render anything if user is not logged in */
              }
            </div>
          </div>
        </nav>
      ) : (
        <h2 className="text-center">Please login before logging in.</h2>
      )}
    </>
  );
};

export default Header;
