import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, fs } from "../config/config";
import "./Login.css";
import FForange from "../assets/FFora.png";
import { Link } from "react-router-dom";
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

  const [Ftitle, setFTitle] = useState("Forgot Password?");
  return (
    <div className="logincontent">
      <form className="login-form" onSubmit={handleSignup}>
        <Link
          to={"/"}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={FForange} className="ffo" style={{ width: "100px" }} />
        </Link>
        <p
          style={{
            fontSize: "20px",
            margin: "30px",
            textDecoration: "underline",
          }}
        >
          Admin Login
        </p>
        <label className="signup-label">
          {/* <span>Name</span> */}
          <input
            type="text"
            name="name"
            className="login-miniform"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </label>
        <label className="signup-label">
          {/* <span>Email Address</span> */}
          <input
            type="email"
            name="mail"
            className="login-miniform"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </label>
        <label className="signup-label">
          {/* <span>Password</span> */}
          <input
            type="password"
            name="Password"
            placeholder="Password"
            className="login-miniform"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </label>

        {success && (
          <>
            <div className="success-msg">
              style=
              {{
                // backgroundColor: "#7DCE13",
                margin: "auto",
                padding: "5px",
                borderRadius: "10px",
                color: "#7DCE13",
                fontWeight: "600",
              }}
              {success}
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
              Please enter details carefully
            </div>
          </>
        )}

        <div className="login-btn">
          <button type="submit" className="login-btn-login">
            Login
          </button>
          <p
            style={{ textAlign: "start", marginTop: "5px" }}
            className="forgot"
            onClick={() => setFTitle("Contact Shubham 9540028204")}
          >
            {Ftitle}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
