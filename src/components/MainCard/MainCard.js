import React from "react";
import "./MainCard.css";

const MainCard = ({ children }) => {
  return <main className="main-card w-100 center ba">{children}</main>;
};

export default MainCard;
