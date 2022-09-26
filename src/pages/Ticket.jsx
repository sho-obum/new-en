import React, { useState } from "react";
import "./Ticket.css";
import { fs } from "../config/config";
import cardImg from "../assets/card-img.jpeg";
import FForange from "../assets/FFora.png";

const inputs = document.querySelectorAll(".input");

function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});
const Ticket = () => {
  function handleTicketChange(event) {
    setTicket(event.target.value);
  }
  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setphno] = useState("");
  const [ticket, setTicket] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [paymentid, setpaymentid] = useState();

  let total = ticket * quantity;
  const cart = fs.collection("contacts");

  const sendData = () => {
    localStorage.setItem("Phone", phno);
    localStorage.setItem("Email", email);
    cart
      .doc(`${name} ${phno}`)
      .set({
        name: name,
        email: email,
        phone_number: phno,
        ticket: ticket,
        quantity: quantity,
        // paymentid: paymentid,
      })
      .then(() => {
        alert("Your message has been submitted👍");
        console.log("heXre");
      })
      .catch((error) => {
        alert(error.message);
      });

    setName("");
    setEmail("");
    setTicket("");
    setQuantity("");
    setphno("");
  };

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }
    console.log(amount);

    const options = {
      key: "rzp_live_G32ZAvGvUcvt5J",
      currency: "INR",
      amount: amount * 100,
      name: "Enactus IITM",
      description: "Fall Fest",
      handler: function (response) {
        setpaymentid(response.razorpay_payment_id);
        console.log(response);
        alert("Payment Successfully");
        localStorage.setItem("paymentdone", true);
        if (total) {
          localStorage.setItem("paymentdone", false);
          console.log(localStorage.getItem("paymentdone"));
        } else {
          console.log(localStorage.getItem("paymentdone"), ": payment done");
          console.log(amount);
          localStorage.getItem("paymentdone") === "true"
            ? sendData()
            : console.log("paymentnotdone");
          localStorage.setItem("paymentdone", false);
          console.log(localStorage.getItem("paymentdone"));
        }
      },
      prefill: {
        contact: localStorage.getItem("Phone"),
        email: localStorage.getItem("Email"),
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = 1;
    console.log(price);
    displayRazorpay(price);
  };

  return (
    <>
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
            <img src={FForange} />
            <h2 className="title">Book 'EM Bifkre</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user" />
              </div>
              <div className="div">
                <input type="text" className="input" placeholder="Full Name" />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock" />
              </div>
              <div className="div">
                <input type="email" className="input" placeholder="Email" />
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
    </>
  );
};

export default Ticket;
