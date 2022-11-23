import React from "react";
import { connect } from "react-redux";
import Flipcard from "../components/Flipcard/Flipcard";
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

  const speak = (voice, content, event = null) => {
    if (event) {
      event.stopPropagation();
    }
    if (voice) {
      const utterThis = new SpeechSynthesisUtterance(content);
      utterThis.voice = voice;
      window.speechSynthesis.speak(utterThis);
    }
  };

  return (
    <Flipcard
      key={currentCard.cardId}
      frontContent={frontContent}
      backContent={backContent}
      frontVoice={frontVoice}
      backVoice={backVoice}
      speak={speak}
    >
      <NotecardFace
        content={frontContent}
        voice={frontVoice}
        arrowKeysChangeScore={true}
        arrowKeysChangeIndex={true}
        speak={speak}
      />
      <NotecardFace content={backContent} voice={backVoice} speak={speak} />
    </Flipcard>
  );
};

export default connect(mapStateToProps)(Notecards);
