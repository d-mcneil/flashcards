import React from "react";
import "./MainCard.css";

const MainCard = ({ children, extraClassName = "" }) => {
  return (
    <main className={`main-card w-100 center ba ${extraClassName}`}>
      {children}
    </main>
  );
};

export default MainCard;
