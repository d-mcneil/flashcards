import React from "react";
import { connect } from "react-redux";
import Flipcard from "../components/Filpcard/Flipcard";
import NotecardFace from "../components/NotecardFace/NotecardFace";

const mapStateToProps = (state) => ({
  currentIndex: state.currentDeck.practice.currentIndex,
  practiceCards: state.currentDeck.practice.practiceCards,
  definitionFirst: state.currentDeck.practice.settings.definitionFirst,
});

const Notecards = ({ currentIndex, practiceCards, definitionFirst }) => {
  const currentCard = practiceCards[currentIndex];
  let frontContent,
    backContent = "";
  let frontVoice,
    backVoice = null;
  if (definitionFirst) {
    frontContent = currentCard.definition;
    backContent = currentCard.term;
  } else {
    frontContent = currentCard.term;
    backContent = currentCard.definition;
  }

  return (
    <Flipcard key={currentCard.cardId}>
      <NotecardFace
        content={frontContent}
        voice={frontVoice}
        arrowKeysChangeScore={true}
        arrowKeysChangeIndex={true}
      />
      <NotecardFace content={backContent} voice={backVoice} />
    </Flipcard>
  );
};

export default connect(mapStateToProps)(Notecards);
