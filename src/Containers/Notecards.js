import React from "react";
import { connect } from "react-redux";
import Flipcard from "../components/Filpcard/Flipcard";
import NotecardFace from "../components/NotecardFace/NotecardFace";

const mapStateToProps = (state) => ({
  currentIndex: state.practice.currentIndex,
  practiceCards: state.practice.practiceCards,
  definitionFirst: state.currentDeck.settings.definitionFirst,
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
    <Flipcard>
      <NotecardFace
        content={frontContent}
        voice={frontVoice}
        arrowKeysChangeScore={true}
      />
      <NotecardFace content={backContent} voice={backVoice} />
    </Flipcard>
  );
};

export default connect(mapStateToProps)(Notecards);
