import React, { useEffect } from "react";
import mainUrl from "../mainUrl";

const ScoreCounter = ({
  score,
  setScoreError,
  updateScore,
  userId,
  cardId,
  arrowKeysChangeScore,
}) => {
  const changeScore = (incrementValue, event) => {
    event.stopPropagation();
    fetch(`${mainUrl}/update-card-score`, {
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

  const handleArrowKeys = (event) => {
    if (event.code === "ArrowUp") {
      event.preventDefault(); // prevents scrolling
      changeScore(1, event);
    } else if (event.code === "ArrowDown") {
      event.preventDefault(); // prevents scrolling
      changeScore(-1, event);
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
    <>
      <div
        className="pointer pv1 ba b--black br3 br--left bg-transparent hover-bg-black hover-white"
        style={{
          marginLeft: "auto",
          minWidth: "1.5em",
          textAlign: "center",
        }}
        onClick={(event) => changeScore(-1, event)}
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
        onClick={(event) => changeScore(1, event)}
      >
        +
      </div>
    </>
  );
};

export default ScoreCounter;
