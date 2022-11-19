import React from "react";
import { connect } from "react-redux";
import {
  changeCurrentIndex,
  setError,
  shufflePracticeCards,
} from "../../redux/actions";
import { useWindowEventHandler } from "../../functions/hooks";
import { validateIndexChange } from "../../functions/validateInput";
import MainCard from "../MainCard/MainCard";
import ScoreCounter from "../ScoreCounter/ScoreCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShuffle,
  faVolumeHigh,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./NotecardFace.css";

const mapStateToProps = (state) => ({
  userId: state.userStatus.user.userId,
  error: state.error.error,
  currentIndex: state.currentDeck.practice.currentIndex,
  practiceCards: state.currentDeck.practice.practiceCards,
});

const mapDispatchToProps = (dispatch) => ({
  changeIndex: (incrementValue, event = null) => {
    if (event) {
      event.stopPropagation();
    }
    dispatch(changeCurrentIndex(incrementValue));
  },
  updateError: (error) => dispatch(setError(error)),
  shuffleCards: (...args) => {
    dispatch(shufflePracticeCards(...args));
  },
});

const NotecardFace = ({
  content, // frontContent or backContent - from Notecards container
  voice, // frontVoice or backVoice - from Notecards container
  arrowKeysChangeScore = false,
  arrowKeysChangeIndex = false,
  userId,
  error,
  currentIndex,
  practiceCards,
  changeIndex,
  updateError,
  shuffleCards,
}) => {
  const currentCard = practiceCards[currentIndex];
  const { cardId, score } = currentCard;
  const totalCards = practiceCards.length;

  const handleArrowKeys = (event) => {
    if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
      let incrementValue = 1;
      if (event.code === "ArrowLeft") {
        incrementValue = -1;
      }
      // prettier-ignore
      const valid = validateIndexChange(totalCards, currentIndex, incrementValue)
      if (valid) {
        changeIndex(incrementValue);
      }
    }
  };

  // handles changing the curent index number with arrow keys
  useWindowEventHandler(handleArrowKeys, arrowKeysChangeIndex, [currentIndex]);

  return (
    <MainCard extraClassName="w-100 pointer notecard-main-extra-class">
      <div className="notecard-grid">
        {/* **************start row 1***************** */}
        {/* ******** speaker icon ******** */}
        {voice ? (
          <div
            // onClick={speak}
            className="f6 f5-ns dim row-1 column-1 notecard-icon-wrapper speaker-icon-wrapper"
          >
            <FontAwesomeIcon icon={faVolumeHigh} />
          </div>
        ) : (
          <></>
        )}

        {/* ******** shuffle icon ******** */}
        <div
          onClick={(event) => shuffleCards(practiceCards, event, currentIndex)}
          className="f6 f5-ns dim row-1 column-2 notecard-icon-wrapper shuffle-icon-wrapper"
        >
          <FontAwesomeIcon icon={faShuffle} />
        </div>

        {/* ******** index/cards counter ******** */}
        <div className="f6 f5-ns row-1 column-3 index-counter">
          {`${currentIndex + 1} / ${totalCards}`}
        </div>

        {/* **************start row 2***************** */}
        <div className="row-2 notecard-text-wrapper">
          <div className="f3-ns f4 notecard-text">{content}</div>
        </div>

        {/* **************start row 3***************** */}
        {/* ******** left arrow ******** */}
        {currentIndex > 0 ? (
          <div
            onClick={(event) => changeIndex(-1, event)}
            className="hover-bg-black hover-white ba f6 f5-ns column-1 row-3 left-arrow"
          >
            {"<"}
          </div>
        ) : (
          <></>
        )}

        <ScoreCounter
          score={score}
          cardId={cardId}
          userId={userId}
          setErrorCallback={updateError}
          error={error}
          arrowKeysChangeScore={arrowKeysChangeScore}
          wrapperClass="notecard-score-counter-wrapper f6 f5-ns row-3 column-2"
        />

        {/* ******** right arrow / restart practice button ******** */}
        {currentIndex < totalCards - 1 ? (
          <div
            onClick={(event) => changeIndex(1, event)}
            className="hover-bg-black hover-white ba f6 f5-ns row-3 column-3 right-arrow"
          >
            {">"}
          </div>
        ) : totalCards > 1 && currentIndex + 1 === totalCards ? (
          <div
            onClick={(event) => shuffleCards(practiceCards, event)}
            className="hover-bg-black hover-white ba f6 f5-ns row-3 column-3 right-arrow"
          >
            <FontAwesomeIcon icon={faRotateLeft} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </MainCard>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NotecardFace);
