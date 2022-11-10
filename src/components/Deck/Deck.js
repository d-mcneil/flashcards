import React, { Component } from "react";
import "./Deck.css";
import Message from "../Message/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  render() {
    const { userId, deckId, deckName, description } = this.props;
    const { error } = this.state;
    return (
      <div className="deck-grid center">
        {/* **************start deck name***************** */}
        <div
          className="deck-name f3-ns f4 dim"
          //   onClick={() =>
          //     selectDeck(
          //       "practice",
          //       deckId,
        >{`${deckName}`}</div>

        {/* **************start description***************** */}
        {description ? (
          <div className="deck-description f6">{`${description}`}</div>
        ) : (
          <></>
        )}
        {/* **************start edit button***************** */}
        <div
          //   onClick={() =>
          //     selectDeck(
          //       "editor",
          //        deckId
          //     )}
          className="deck-edit-button f5 f4-ns dim"
          // alternate edit button with text instead of the pencil
          // className="deck-edit-button f6 f5-ns mt3 mb2 dim" > Edit
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>

        {/* **************start delete button***************** */}
        <div
          //   onClick={this.deleteDeck}
          className="deck-delete-button f5 f4-ns dim pointer"
          // alternate delete button with text instead of the trash can
          // className="deck-delete-button f6 f5-ns mb3 mt2 dim" > Delete
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </div>

        {/* **************start error notification***************** */}
        {error ? (
          <Message error={error} wrapperClass="deck-error-message" />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Deck;
