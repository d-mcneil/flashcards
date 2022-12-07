import React, { Component } from "react";
import { connect } from "react-redux";
import { removeDeck, selectDeck } from "../../redux/actions";
import { fetchCallDelete } from "../../functions/fetchCalls";
import DeckOrCardGrid from "../DeckOrCardGrid/DeckOrCardGrid";
import Message from "../Message/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "../DeleteButton/DeleteButton";
import "./Deck.css";

const mapStateToProps = (state) => ({
  sampleUser: state.userStatus.sampleUser,
});

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
    const { userId, deck, sampleUser, onDelete } = this.props;
    const { deckId } = deck;
    if (sampleUser) {
      onDelete(deckId);
      return;
    }
    fetchCallDelete(userId, deckId, "deck")
      .then((data) => {
        if (data.deckId === deckId) {
          onDelete(deckId);
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
      <DeckOrCardGrid>
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
        <DeleteButton deleteCallback={this.deleteDeck} />

        {/* **************start error notification***************** */}
        {error ? (
          <Message
            message={error}
            wrapperClass="main-error-message" // in index.css
          />
        ) : (
          <></>
        )}
      </DeckOrCardGrid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
