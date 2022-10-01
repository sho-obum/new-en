import React, { useState, useEffect } from "react";
import "./Admin.css";
import { fs, auth } from "../config/config";
import { useNavigate, useParams, Link } from "react-router-dom";
import emailjs from "emailjs-com";

const Admin = ({ user }) => {
  const { userid, registrarName } = useParams();
  const navigate = useNavigate();

  var ticket_name;
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
  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setphno] = useState("");
  const [ticket, setTicket] = useState("");
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

  var uid = new Date().getTime().toString(36);
  console.log(uid);

  const senddata = async () => {
    let userdata = {};
    var uid = new Date().getTime().toString(36);
    var current = new Date();

    userdata["name"] = name;
    userdata["email"] = email;
    userdata["phone_number"] = phno;
    userdata["ticket"] = ticket;
    userdata["quantity"] = quantity;
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
    setEmail("");
    setTicket("");
    setQuantity("");
    setphno("");
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
                border: "1px solid black",
                borderRadius: "2px 10px",
                marginRight: "10px",
                color: "black",
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
              <form onSubmit={handleSubmit}>
                {/* <img src={FForange} /> */}
                <h2 className="title">Book 'EM Bifkre</h2>
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
                      type="number"
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
                    <select name="ticket" onChange={handleTicketChange}>
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
                      id=""
                      onChange={handleQuantityChange}
                      type="number"
                      className="input"
                      placeholder="Quantity"
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
        "You are logged out, Login in again sweety 💖✊🌊"
      )}
    </>
  );
};

export default Admin;
