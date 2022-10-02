import React, { useState } from "react";
import "./Admin.css";
import { fs, auth } from "../config/config";
import { useNavigate, useParams, Link } from "react-router-dom";
import emailjs from "emailjs-com";
import FForange from "../assets/FFora.png";

var ticket_name;
const Admin = ({ user }) => {
  const { userid, registrarName } = useParams();
  const navigate = useNavigate();

  function handleTicketChange(event) {
    setTicket(event.target.value);
    if (event.target.value == 100) {
      ticket_name = "Standard";
    } else if (event.target.value == 150) {
      ticket_name = "Premium";
    } else {
      ticket_name = "Elite";
    }
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setphno] = useState("");
  const [ticket, setTicket] = useState("");
  const [course, setcourse] = useState("");
  const [college, setcollege] = useState("");
  const [quantity, setQuantity] = useState(0);

  console.log(name);
  console.log(userid, registrarName);
  console.log(phno);
  console.log(ticket);
  console.log(email);
  console.log(quantity);

  const handlelogout = () => {
    auth.signOut().then(() => {
      localStorage.setItem("registrarname", null);
      localStorage.setItem("uid", null);
      navigate("/");
    });
  };

  // var uid = new Date().getTime().toString(36);
  // console.log(uid);

  const senddata = async () => {
    let userdata = {};
    var uid = new Date().getTime().toString(36);
    var current = new Date();

    userdata["name"] = name;
    userdata["course"] = course;
    userdata["college"] = college;
    userdata["email"] = email;
    userdata["phone_number"] = phno;
    userdata["quantity"] = quantity;
    userdata["ticket"] = ticket;
    userdata["uid"] = uid;
    userdata["time"] = current.toLocaleString();

    console.log(userdata);
    fs.collection(`offline-Contacts`)
      .doc(`${name}, ${registrarName}`)
      .set(userdata)
      .then(() => {
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
      });

    setName("");
    setQuantity("");
    setEmail("");
    setphno("");
    setTicket("");
    setcourse("");
    setcollege("");
    // email

    emailjs
      .send(
        "service_eg6yhc4",
        "template_enbe1rw",
        { name, ticket_name, quantity, uid, email },
        "aU2UYRfNcfx9sv8Ws"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );

    // email end
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    senddata();
  };
  console.log(user);

  return (
    <>
      {userid === localStorage.getItem("uid") &&
      registrarName === localStorage.getItem("registrarname") ? (
        <div>
          <Link style={{ color: "black" }} to={"/"} onClick={handlelogout}>
            <button
              className="nav-links nav-box"
              style={{
                padding: "10px 10px",
                border: "1px solid white",
                borderRadius: "2px 10px",
                marginRight: "10px",
                color: "white",
                background: "#E45826",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              LOGOUT
            </button>
          </Link>
          <img
            className="wave"
            src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/wave.png"
          />
          <div className="container">
            <div className="img">
              <img src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/bg.svg" />
            </div>
            <div className="login-content">
              <Link
                to={"/"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={FForange} className="ffo" />
              </Link>
              <p style={{ fontSize: "26px" }}>Admin Portal</p>
              <form onSubmit={handleSubmit}>
                <div className="input-div one">
                  <div className="i">
                    <i className="fas fa-user" />
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div pass">
                  <div className="i">
                    <i className="fas fa-lock" />
                  </div>
                  <div className="div">
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div pass">
                  <div className="i">
                    <i className="fas fa-lock" />
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="Phone Number"
                      value={phno}
                      onChange={(e) => setphno(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div pass">
                  <div className="i">
                    <i className="fas fa-lock" />
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="Course"
                      value={course}
                      onChange={(e) => setcourse(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div pass">
                  <div className="i">
                    <i className="fas fa-lock" />
                  </div>
                  <div className="div">
                    <input
                      type="text"
                      className="input"
                      placeholder="College"
                      value={college}
                      onChange={(e) => setcollege(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-div pass">
                  <div className="i">
                    <i className="fas fa-lock" />
                  </div>
                  <div className="div">
                    <select
                      name="ticket"
                      value={ticket}
                      onChange={handleTicketChange}
                    >
                      <option value="0">Select Ticket</option>
                      <option value="100">Silver</option>
                      <option value="150">Elite</option>
                      <option value="200">Diamond</option>
                    </select>
                  </div>
                </div>
                <div className="input-div pass">
                  <div className="i">
                    <i className="fas fa-lock" />
                  </div>
                  <div className="div">
                    <input
                      min="0"
                      type="number"
                      className="input"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="btn">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        "You are logged out, Login in again sweety 💖"
      )}
    </>
  );
};

export default Admin;
