import React from "react";
import { connect } from "react-redux";
import { sortDecksOrCards } from "../../functions/repeatedFunctions";
import "./SortSelector.css";

const mapDispatchToProps = (dispatch) => ({
  onSelectSort: (...args) => dispatch(sortDecksOrCards(...args)),
});

const SortSelector = ({
  onSelectSort,
  actionLoadCallback, // loadDecks or loadCards
  cardsOrDecksToSort, // array of decks or array of cards
  optionOne, // {value: 'Most Recent First', descending: 'true', sortProperty: 'deckId' or 'cardId'}
  optionTwo, // {value: 'Oldest First', descending: 'false', sortProperty: 'deckId' or 'cardId'}
  optionThree = "", // {value: 'Highest Score First', descending: 'true', sortProperty: 'score'}
  optionFour = "", // {value: 'Lowest Score First', descending: 'false', sortProperty: 'score'}
  // optionThree and optionFour are only used when sorting cards and not when sorting decks
}) => {
  const options = [optionOne, optionTwo];
  if (optionThree) {
    options.push(optionThree);
    if (optionFour) {
      options.push(optionFour);
    }
  }

  const handleOnChange = (event) => {
    const selectedSort = event.target.selectedOptions[0];
    const sortProperty = selectedSort.getAttribute("sort-property");
    const descending = selectedSort.getAttribute("descending") === "true";
    // prettier-ignore
    onSelectSort(actionLoadCallback, [].concat(cardsOrDecksToSort), sortProperty, descending);
  };

  const htmlLabel = (value) => {
    return value.replace(" ", "-").toLowerCase();
  };

  return (
    <div id="sort-selector-wrapper" className="center">
      <select
        defaultValue={htmlLabel(optionOne.value)}
        onChange={handleOnChange}
        className="f6 f5-ns"
        id="sort-selector"
      >
        {options.map((option) => {
          return (
            <option
              key={htmlLabel(option.value)}
              value={htmlLabel(option.value)}
              descending={option.descending}
              sort-property={option.sortProperty}
            >
              {option.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(SortSelector);
