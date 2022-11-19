import React from "react";
import { useWindowEventHandler } from "../../functions/hooks";
import "./Flipcard.css";

const Flipcard = ({ children }) => {
  const flipTheCard = () => {
    const card = document.getElementById("flip-card-inner");
    if (card) {
      const cardFront = document.getElementById("flip-card-front");
      const cardBack = document.getElementById("flip-card-back");
      card.classList.toggle("flipped");
      cardFront.classList.toggle("flipped-front");
      cardBack.classList.toggle("flipped-back");
    }
  };

  const handleSpaceBar = (event) => {
    if (event.code === "Space") {
      event.preventDefault(); // this keeps the page from scrolling when the space bar is pressed and the card is flipped
      flipTheCard();
    }
  };

  // handles flipping the card with the space bar
  useWindowEventHandler(handleSpaceBar);

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
