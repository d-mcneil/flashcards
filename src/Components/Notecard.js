import React from "react";
import ScoreCounter from "./ScoreCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

const Notecard = ({
  currentIndex,
  updateScore,
  userId,
  cardId,
  totalCards,
  changeCurrentIndex,
  score,
  setScoreError,
  content,
  shufflePracticeCardsOnly,
}) => {
  return (
    <>
      <div className="br3 ba b--black-10 w-100 h-100 mw6 shadow-5 center">
        <main className="pa4 black-80 w-100 h-100 center pointer">
          <div
            className="h-100 pointer"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "auto 1fr auto",
            }}
          >
            {/* **************start row 1***************** */}
            <div
              className="f6 f5-ns mb2 pointer"
              style={{
                gridRow: "1",
                gridColumnStart: "1",
                gridColumnEnd: "2",
                justifySelf: "start",
                alignSelf: "start",
              }}
            ></div>
            <div
              className="f6 f5-ns pointer dim"
              onClick={(event) => shufflePracticeCardsOnly(event)}
              style={{
                gridRow: "1",
                gridColumnStart: "2",
                gridColumnEnd: "3",
                alignSelf: "start",
                justifySelf: "center",
                height: "min-content",
                width: "min-content",
              }}
            >
              <FontAwesomeIcon icon={faShuffle} />
            </div>
            <div
              className="f6 f5-ns mb2 pointer"
              style={{
                gridRow: "1",
                gridColumnStart: "3",
                gridColumnEnd: "4",
                alignSelf: "start",
                justifySelf: "end",
              }}
            >{`${currentIndex} / ${totalCards}`}</div>
            {/* **************start row 2***************** */}
            <div
              className="pointer"
              style={{
                gridRow: "2",
                gridColumn: "1 / span 3",
                alignSelf: "center",
                justifySelf: "center",
                textAlign: "center",
                overflow: "hidden",
                maxHeight: "11.2rem",
              }}
            >
              <div
                className="f3-ns f4 notecard-text pb1 w-100 pointer"
                style={{ overflow: "auto" }}
              >{`${content}`}</div>
            </div>
            {/* **************start row 3***************** */}
            {currentIndex > 1 ? (
              <div
                style={{
                  gridRow: "3",
                  gridColumnStart: "1",
                  gridColumnEnd: "2",
                  justifySelf: "end",
                  alignSelf: "center",
                }}
                className="pointer ba b--black br1 pv1 ph4-ns ph2 bg-transparent hover-bg-black hover-white f6 f5-ns mt2"
                onClick={(event) => changeCurrentIndex(-1, event)}
              >
                {"<"}
              </div>
            ) : (
              <></>
            )}
            <div
              className="f6 f5-ns  mt2"
              style={{
                gridRow: "3",
                gridColumnStart: "2",
                gridColumnEnd: "3",
                alignSelf: "center",
                justifySelf: "center",
                display: "flex",
              }}
            >
              <ScoreCounter
                score={score}
                setScoreError={setScoreError}
                updateScore={updateScore}
                userId={userId}
                cardId={cardId}
              />
            </div>
            {currentIndex < totalCards ? (
              <div
                style={{
                  gridRow: "3",
                  gridColumnStart: "3",
                  gridColumnEnd: "4",
                  justifySelf: "start",
                  alignSelf: "center",
                }}
                className="pointer ba b--black br1 pv1 ph4-ns ph2 bg-transparent hover-bg-black hover-white f6 f5-ns mt2"
                onClick={(event) => changeCurrentIndex(1, event)}
              >
                {">"}
              </div>
            ) : (
              <></>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Notecard;
