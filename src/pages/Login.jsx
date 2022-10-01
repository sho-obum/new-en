import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, fs } from "../config/config";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [errmsg, seterrmsg] = useState("");
  const [success, setsuccess] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleSignup = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((obj) => {
        console.log("thisis", obj.user);
        setsuccess("Login successfull.");
        localStorage.setItem("uid", obj.user.uid);
        localStorage.setItem("registrarname", name);
        setname("");
        setemail("");
        setpassword("");
        seterrmsg("");
        setTimeout(() => {
          setsuccess("");
          navigate(`/ticket/${obj.user.uid}/${name}`);
        }, 1000);
      })
      .catch((error) => seterrmsg(error.message));
  };
  return (
    <div className="logincontent">
      <center>
        <form className="login-form" onSubmit={handleSignup}>
          <label className="signup-label">
            <span>Name</span>
            <input
              type="text"
              name="name"
              className="login-miniform"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </label>
          <label className="signup-label">
            <span>Email Address</span>
            <input
              type="email"
              name="mail"
              className="login-miniform"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </label>
          <label className="signup-label">
            <span>Password</span>
            <input
              type="password"
              name="Password"
              className="login-miniform"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </label>

          {success && (
            <>
              <div className="success-msg">
                <center
                  style={{
                    // backgroundColor: "#7DCE13",
                    margin: "auto",
                    padding: "5px",
                    borderRadius: "10px",
                    color: "#7DCE13",
                    fontWeight: "600",
                  }}
                >
                  {success}
                </center>
              </div>
            </>
          )}
          {errmsg && (
            <>
              <div
                style={{
                  // backgroundColor: "red",
                  margin: "auto",
                  padding: "5px",
                  borderRadius: "10px",
                  color: "red",
                  fontWeight: "600s",
                }}
                className="success-msg"
              >
                <center>Please enter details carefully</center>
              </div>
            </>
          )}
          <center>
            <div className="login-btn">
              <center>
                <button type="submit" className="login-btn-login">
                  Login
                </button>
              </center>
            </div>
          </center>
        </form>
      </center>
    </div>
  );
};

export default Login;
