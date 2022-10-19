import React from "react";
import mainUrl from "../mainUrl";

const ScoreCounter = ({
  score,
  setScoreError,
  updateScore,
  userId,
  cardId,
}) => {
  const changeScore = (incrementValue) => {
    fetch(`${mainUrl}/update-score`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, cardId, incrementValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.card_id) {
          updateScore(cardId, incrementValue);
          setScoreError("");
        } else {
          setScoreError(data);
        }
      })
      .catch((err) => setScoreError("Unable to update score: 0"));
  };

  return (
    <>
      <div
        className="pointer pv1 ba b--black br3 br--left bg-transparent hover-bg-black hover-white"
        style={{
          marginLeft: "auto",
          minWidth: "1.5em",
          textAlign: "center",
        }}
        onClick={() => changeScore(-1)}
      >
        -
      </div>
      <div className="ph1 pv1 bt bb b--black">{`${score}`}</div>
      <div
        className="pointer pv1 ba b--black br3 br--right bg-transparent hover-bg-black hover-white"
        style={{
          marginRight: "auto",
          minWidth: "1.5em",
          textAlign: "center",
        }}
        onClick={() => changeScore(1)}
      >
        +
      </div>
    </>
  );
};

export default ScoreCounter;
