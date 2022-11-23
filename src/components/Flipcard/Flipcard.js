import React, { useState } from "react";
import { connect } from "react-redux";
import { useWindowEventHandler } from "../../functions/hooks";
import "./Flipcard.css";

const mapStateToProps = (state) => ({
  readOutOnFlip: state.currentDeck.practice.settings.readOutOnFlip,
});

const Flipcard = ({
  children,
  frontContent,
  backContent,
  frontVoice,
  backVoice,
  speak,
  readOutOnFlip,
}) => {
  // prettier-ignore
  const [currentBackfaceContent, setCurrentBackfaceContent] = useState(backContent);
  const [currentBackfaceVoice, setCurrentBackfaceVoice] = useState(backVoice);

  const alternateBackfaceContentAndVoice = () => {
    if (currentBackfaceContent === backContent) {
      setCurrentBackfaceContent(frontContent);
      setCurrentBackfaceVoice(frontVoice);
    } else {
      setCurrentBackfaceContent(backContent);
      setCurrentBackfaceVoice(backVoice);
    }
  };

  const flipTheCard = () => {
    const card = document.getElementById("flip-card-inner");
    if (card) {
      const cardFront = document.getElementById("flip-card-front");
      const cardBack = document.getElementById("flip-card-back");
      card.classList.toggle("flipped");
      cardFront.classList.toggle("flipped-front");
      cardBack.classList.toggle("flipped-back");
      if (readOutOnFlip) {
        speak(currentBackfaceVoice, currentBackfaceContent);
      }
      alternateBackfaceContentAndVoice();
    }
  };

  const handleSpaceBar = (event) => {
    if (event.code === "Space") {
      event.preventDefault(); // this keeps the page from scrolling when the space bar is pressed and the card is flipped
      flipTheCard();
    }
  };

  // handles flipping the card with the space bar
  useWindowEventHandler(handleSpaceBar, true, [
    currentBackfaceContent,
    readOutOnFlip,
  ]);

  return (
    <div id="flip-card" onClick={flipTheCard}>
      <div id="flip-card-inner">
        <div id="flip-card-front">{children[0]}</div>
        <div id="flip-card-back">{children[1]}</div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Flipcard);
