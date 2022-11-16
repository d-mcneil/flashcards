import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateCardScore } from "../../redux/actions";
import { fetchCallUpdateCardScore } from "../../functions/fetchCalls";

const mapDispatchToProps = (dispatch) => ({
  onUpdateScore: (cardId, incrementValue) =>
    dispatch(updateCardScore(cardId, incrementValue)),
});

const ScoreCounter = ({
  score,
  cardId,
  userId,
  setErrorCallback,
  onUpdateScore,
  arrowKeysChangeScore = false, // only true in practice mode
}) => {
  const updateScore = (incrementValue, event) => {
    event.stopPropagation(); // prevents unwanted card flip
    fetchCallUpdateCardScore(userId, cardId, incrementValue)
      .then((data) => {
        if (data.cardId) {
          onUpdateScore(cardId, incrementValue);
          setErrorCallback("");
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

  useEffect(() => {
    if (arrowKeysChangeScore && window) {
      window.addEventListener("keydown", handleArrowKeys);
      return () => {
        window.removeEventListener("keydown", handleArrowKeys);
      };
    }
    // this function produces the following eslint warning:
    //    React Hook useEffect has missing dependencies: 'arrowKeysChangeScore' and 'handleArrowKeys'. Either include them or remove the dependency array
    // however, removing the dependency array makes the event handler unnecessarily detach and reattach
    // and adding handleArrowKeys to the dependencies makes an infinte loop, giving this message:
    //    The 'handleArrowKeys' function makes the dependencies of useEffect Hook (at line 56) change on every render. Move it inside the useEffect callback. Alternatively, wrap the definition of 'handleArrowKeys' in its own useCallback() Hook
    // moving handleArrowKeys inside the useEffect Hook then causes the same problem with the changeScore function,
    // but that function is called elsewhere
    // thus, i could use the useCallback hook to make a memo funciton, but it seems to be making the code unnecessarily long and obfuscatory,
    // when all that's desired is to make the useEffect Hook function like componentDidMount
    // thus, I decided to leave an empty dependencies array and disable the eslint warning with the following line:
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="score-counter-grid center"
      onClick={(event) => updaateScore(-1, event)}
    >
      <div className="score-button-left hover-bg-black hover-white ba">-</div>
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

export default connect(null, mapDispatchToProps)(ScoreCounter);
