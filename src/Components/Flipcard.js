import React, { useEffect } from "react";

const Flipcard = ({ children }) => {
  const flipTheCard = () => {
    const card = document.getElementById("flip-card-inner");
    if (card) {
      card.classList.toggle("flipped");
    }
  };

  const handleSpaceBar = (event) => {
    if (event.code === "Space") {
      flipTheCard();
      event.preventDefault(); // this keeps the page from scrolling when the space bar is pressed and the card is flipped
    }
  };

  useEffect(() => {
    if (window) {
      window.addEventListener("keydown", handleSpaceBar);
      return () => {
        window.removeEventListener("keydown", handleSpaceBar);
      };
    }
  });

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
