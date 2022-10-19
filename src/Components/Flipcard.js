import React from "react";

const Flipcard = ({ children }) => {
  const flipTheCard = () => {
    document.getElementById("flip-card-inner").classList.toggle("flipped");
  };
  return (
    <div id="flip-card" onClick={flipTheCard}>
      <div id="flip-card-inner">
        <div id="flip-card-front">{children[0]}</div>
        <div id="flip-card-back">{children[1]}</div>
      </div>
    </div>
  );
};

export default Flipcard;
