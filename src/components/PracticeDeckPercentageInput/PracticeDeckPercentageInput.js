import React from "react";
import { connect } from "react-redux";
import { updateSettings } from "../../redux/actions";
import { validatePracticeDeckPercentage } from "../../functions/validateInput";
import "./PracticeDeckPercentageInput.css";

const mapStateToProps = (state) => ({
  currentDeckPercentage:
    state.currentDeck.practice.settings.practiceDeckPercentage,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateSettings: (...args) => dispatch(updateSettings(...args)),
});

const PracticeDeckPercentageInput = ({
  currentDeckPercentage,
  onUpdateSettings,
  saveDeckSettingsChanges,
}) => {
  const handleOnChange = (event) => {
    let percentageInput = event.target;
    const percentageInputValue = percentageInput.value;
    if (percentageInputValue > 100) {
      percentageInput.value = 100;
    } else if (percentageInputValue < 0) {
      percentageInput.value = 1;
    } else if (percentageInputValue > 0 && percentageInputValue < 1) {
      percentageInput.value = 1;
    }
    onUpdateSettings("practiceDeckPercentage", percentageInput.value);
  };

  const handleOnBlur = (event) => {
    const newPracticeDeckPercentage = validatePracticeDeckPercentage(
      Number(event.target.value)
    );
    saveDeckSettingsChanges(
      "practiceDeckPercentage",
      newPracticeDeckPercentage
    );
  };

  return (
    <div id="deck-percentage-input-grid-wrapper" className="f6 f5-ns">
      <div id="deck-percentage-label-left">Practice</div>
      <input
        type="number"
        id="deck-percentage-input"
        className="ba outline-hover f6 f5-ns"
        min={1}
        max={100}
        value={currentDeckPercentage}
        // placeholder={""}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      ></input>
      <div id="deck-percentage-label-right">% of Deck</div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PracticeDeckPercentageInput);
