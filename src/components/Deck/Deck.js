import React, { Component } from "react";
import { connect } from "react-redux";
import { removeDeck, selectDeck } from "../../redux/actions";
import { fetchCallDeleteDeck } from "../../functions/fetchCalls";
import Message from "../Message/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./Deck.css";

const mapDispatchToProps = (dispatch) => ({
  onDelete: (deckId) => dispatch(removeDeck(deckId)),
  onSelectDeck: (...args) => dispatch(selectDeck(...args)),
});

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  deleteDeck = () => {
    const { userId, deckId } = this.props;
    fetchCallDeleteDeck(userId, deckId)
      .then((data) => {
        if (data.deckId === deckId) {
          this.props.onDelete(deckId);
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Error deleting deck: 0" }));
  };

  render() {
    const { deck, onSelectDeck } = this.props;
    const { deckName, description } = deck;
    const { error } = this.state;
    return (
      <div className="deck-grid center">
        {/* **************start deck name***************** */}
        <div
          className="deck-name f3-ns f4 dim"
          onClick={() => onSelectDeck("practice", error, deck)}
        >{`${deckName}`}</div>

        {/* **************start description***************** */}
        {description ? (
          <div className="deck-description f6">{`${description}`}</div>
        ) : (
          <></>
        )}

        {/* **************start edit button***************** */}
        <div
          onClick={() => onSelectDeck("editor", error, deck)}
          className="deck-edit-button f5 f4-ns dim"
          // alternate edit button with text instead of the pencil
          // className="deck-edit-button f6 f5-ns mt3 mb2 dim" > Edit
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>

        {/* **************start delete button***************** */}
        <div
          onClick={this.deleteDeck}
          className="deck-delete-button f5 f4-ns dim pointer"
          // alternate delete button with text instead of the trash can
          // className="deck-delete-button f6 f5-ns mb3 mt2 dim" > Delete
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </div>

        {/* **************start error notification***************** */}
        {error ? (
          <Message message={error} wrapperClass="deck-error-message" />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Deck);
