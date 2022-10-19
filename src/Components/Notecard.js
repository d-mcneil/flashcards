import React from "react";
import MainCard from "./MainCard";
import ScoreCounter from "./ScoreCounter";

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
}) => {
  return (
    <>
      {/* <MainCard> */}

      <div className="br3 ba b--black-10 w-100 h-100 mw6 shadow-5 center">
        <main className="pa4 black-80 w-100 h-100 center">
          <div
            className="h-100"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "auto 1fr auto",
            }}
          >
            {/* **************start row 1***************** */}
            <div
              style={{
                gridRow: "1",
                gridColumnStart: "1",
                gridColumnEnd: "2",
                justifySelf: "start",
                alignSelf: "start",
              }}
            ></div>
            <div
              style={{
                gridRow: "1",
                gridColumnStart: "2",
                gridColumnEnd: "3",
                alignSelf: "start",
                justifySelf: "center",
              }}
            ></div>
            <div
              className="f6 f5-ns"
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
              className="f3-ns f4 pv5"
              style={{
                gridRow: "2",
                gridColumn: "1 / span 3",
                alignSelf: "center",
                justifySelf: "center",
                textAlign: "center",
                overflow: "auto",
              }}
            >{`${content}`}</div>

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
                className="pointer ba b--black br1 pv1 ph4-ns ph2 bg-transparent hover-bg-black hover-white f6 f5-ns"
                onClick={() => changeCurrentIndex(-1)}
              >
                {"<"}
              </div>
            ) : (
              <></>
            )}
            <div
              className="f6 f5-ns"
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
                className="pointer ba b--black br1 pv1 ph4-ns ph2 bg-transparent hover-bg-black hover-white f6 f5-ns"
                onClick={() => changeCurrentIndex(1)}
              >
                {">"}
              </div>
            ) : (
              <></>
            )}
          </div>
        </main>
      </div>
      {/* </MainCard> */}
    </>
  );
};

export default Notecard;
