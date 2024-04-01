import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { FaGooglePlusG } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { auth } from "../../configs/firebase_config";

const Auth = () => {
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

  const handleLogin = () => {
    auth.useDeviceLanguage();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("SignIn: ", result);
        navigate("/home")
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center p-3 bg-info-subtle">
              <h2>ระบบจองห้องเรียน</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email or Username
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                  />
                </div>
                <button className="btn btn-outline-danger" onClick={handleLogin}>
                  <FaGooglePlusG />
                </button>
                <button type="submit" className="btn btn-outline-primary ms-3">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
