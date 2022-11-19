import React from "react";
import { connect } from "react-redux";
import Flipcard from "../components/Filpcard/Flipcard";
import NotecardFace from "../components/NotecardFace/NotecardFace";

const mapStateToProps = (state) => ({
  currentIndex: state.currentDeck.practice.currentIndex,
  practiceCards: state.currentDeck.practice.practiceCards,
  definitionFirst: state.currentDeck.practice.settings.definitionFirst,
  termVoice: state.currentDeck.practice.termSpeechSynthesisVoice,
  definitionVoice: state.currentDeck.practice.definitionSpeechSynthesisVoice,
});

const Notecards = ({
  currentIndex,
  practiceCards,
  definitionFirst,
  termVoice,
  definitionVoice,
}) => {
  const currentCard = practiceCards[currentIndex];
  let frontContent,
    backContent = "";
  let frontVoice,
    backVoice = null;
  if (definitionFirst) {
    frontContent = currentCard.definition;
    backContent = currentCard.term;
    frontVoice = definitionVoice;
    backVoice = termVoice;
  } else {
    frontContent = currentCard.term;
    backContent = currentCard.definition;
    frontVoice = termVoice;
    backVoice = definitionVoice;
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
