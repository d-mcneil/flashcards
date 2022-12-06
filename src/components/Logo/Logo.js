import React from "react";
import logo from "./Logo.jpg";
import "./Logo.css";

const Logo = () => {
  return (
    <>
      <div id="logo-wrapper">
        <img src={logo} id="logo-picture" alt="Flashcards Logo"></img>
        <div id="logo-text" className="f3">
          Flashcards
        </div>
      </div>
    </>
  );
};

export default Logo;
