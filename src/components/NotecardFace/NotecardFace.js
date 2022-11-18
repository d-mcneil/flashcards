import React from "react";
import { connect } from "react-redux";
import { changeCurrentIndex, setError } from "../../redux/actions";
import MainCard from "../MainCard/MainCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import "./NotecardFace.css";
import ScoreCounter from "../ScoreCounter/ScoreCounter";

const mapStateToProps = (state) => ({
  currentIndex: state.practice.currentIndex,
  userId: state.userStatus.user.userId,
  practiceCards: state.practice.practiceCards,
});

const mapDispatchToProps = (dispatch) => ({
  changeIndex: (incrementValue) => dispatch(changeCurrentIndex(incrementValue)),
  updateError: (error) => dispatch(setError(error)),
});

const NotecardFace = ({
  content,
  voice,
  currentIndex,
  userId,
  practiceCards,
  updateError,
  arrowKeysChangeScore = false,
}) => {
  const currentCard = practiceCards[currentIndex];
  const { cardId, score } = currentCard;
  const totalCards = practiceCards.length;

  return (
    <MainCard extraClassName="w-100 pointer notecard-main-extra-class">
      <div className="notecard-grid">
        {/* **************start row 1***************** */}
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
        <div
          // onClick={shufflePracticeCards}
          className="f6 f5-ns dim row-1 column-2 notecard-icon-wrapper shuffle-icon-wrapper"
        >
          <FontAwesomeIcon icon={faShuffle} />
        </div>
        <div className="f6 f5-ns row-1 column-3 index-counter">
          {`${currentIndex + 1} / ${totalCards}`}
        </div>

        {/* **************start row 2***************** */}
        <div className="row-2 notecard-text-wrapper">
          <div className="f3-ns f4 notecard-text">{content}</div>
        </div>

        {/* **************start row 3***************** */}
        {currentIndex > 0 ? (
          <div
            onClick={(event) => changeCurrentIndex(-1, event)}
            className="bg-transparent hover-bg-black hover-white ba f6 f5-ns column-1 row-3 left-arrow"
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
          arrowKeysChangeScore={arrowKeysChangeScore}
          wrapperClass="notecard-score-counter-wrapper f6 f5-ns row-3 column-2"
        />
        {currentIndex < totalCards ? (
          <div
            onClick={(event) => changeCurrentIndex(1, event)}
            className="bg-transparent hover-bg-black hover-white ba f6 f5-ns row-3 column-3 right-arrow"
          >
            {">"}
          </div>
        ) : (
          <></>
        )}
      </div>
    </MainCard>
  );

  //   return (
  //     <>
  //       <div className="br3 ba b--black-10 w-100 h-100 mw6 shadow-5 center">
  //         <main className="pa4 black-80 w-100 h-100 center pointer">

  //             {/* **************start row 3***************** */}
  //
  //
  //               <ScoreCounter
  //                 score={score}
  //                 setScoreError={setScoreError}
  //                 updateScore={updateScore}
  //                 userId={userId}
  //                 cardId={cardId}
  //                 arrowKeysChangeScore={arrowKeysChangeScore}
  //               />
  //             </div>
  //             {currentIndex < totalCards ? (
  //               <div

  //                 className="pointer ba b--black br1 pv1 ph4-ns ph2 bg-transparent hover-bg-black hover-white f6 f5-ns mt2 ml1"
  //                 onClick={(event) => changeCurrentIndex(1, event)}
  //               >
  //                 {">"}
  //               </div>
  //             ) : (
  //               <></>
  //             )}
  //           </div>
  //         </main>
  //       </div>
  //     </>
  //   );
};

export default connect(mapStateToProps, mapDispatchToProps)(NotecardFace);
