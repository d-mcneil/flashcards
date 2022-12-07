import React from "react";
import { connect } from "react-redux";
import { updateCardScore } from "../../redux/actions";
import { fetchCallUpdateCardScore } from "../../functions/fetchCalls";
import "./ScoreCounter.css";
import { useWindowEventHandler } from "../../functions/hooks";

const mapStateToProps = (state) => ({
  sampleUser: state.userStatus.sampleUser,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateScore: (...args) => dispatch(updateCardScore(...args)),
});

const ScoreCounter = ({
  sampleUser,
  score,
  cardId,
  userId,
  setErrorCallback,
  error,
  onUpdateScore,
  wrapperClass = "",
  arrowKeysChangeScore = false, // only true in practice mode
}) => {
  const updateScore = (incrementValue, event) => {
    event.stopPropagation(); // prevents unwanted card flip
    if (sampleUser) {
      onUpdateScore(cardId, incrementValue);
      if (error) {
        setErrorCallback("");
      }
      return;
    }
    fetchCallUpdateCardScore(userId, cardId, incrementValue)
      .then((data) => {
        if (data.cardId) {
          onUpdateScore(cardId, incrementValue);
          if (error) {
            setErrorCallback("");
          }
        } else {
          setErrorCallback(data);
        }
      })
      .catch((err) => setErrorCallback("Error updating score: 0"));
  };

  const handleArrowKeys = (event) => {
    if (event.code === "ArrowUp") {
      event.preventDefault(); // prevents scrolling
      updateScore(1, event);
    } else if (event.code === "ArrowDown") {
      event.preventDefault(); // prevents scrolling
      updateScore(-1, event);
    }
  };

  // handles changing the score of the current card in a practice session with arrow keys
  useWindowEventHandler(handleArrowKeys, arrowKeysChangeScore, [error]);

  return (
    <div className={`score-counter-grid ${wrapperClass}`}>
      <div
        className="score-button-left hover-bg-black hover-white ba"
        onClick={(event) => updateScore(-1, event)}
      >
        -
      </div>

      <div className="score-counter-center">{score}</div>

      <div
        className="score-button-right hover-bg-black hover-white ba"
        onClick={(event) => updateScore(1, event)}
      >
        +
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCounter);
