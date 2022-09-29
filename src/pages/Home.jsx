import React from "react";
import { Link } from "react-router-dom";
// import BgVideo from "../assets/Video.mp4";
import Blob from "../assets/blob.svg";
import BgImg from "../assets/Main003.png";
import enLogo from "../assets/logo.svg";
import "../pages/Home.css";
const Home = () => {
  return (
    <>
      <div className="main">
        <div className="overlay"></div>
        {/* <video
          src={BgVideo}
          autoPlay
          muted
          loop
          playsinline="true"
          disablePictureInPicture="true"
          webkit-playsinline
        ></video> */}
        <img src={BgImg} alt="" />
        <div className="content">
          <img className="enLogo" src={enLogo} alt="" />
          <p className="subhead">Presents</p>
          <img className="blob" src={Blob} alt="" />

          <Link to={"/ticket"}>
            <button className="mainBtn">GET YOUR PASSES</button>
          </Link>
        </div>
      </div>
      <div className="second"></div>
    </>
  );
};

export default Home;
