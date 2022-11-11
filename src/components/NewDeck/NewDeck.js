import React, { Component } from "react";
import "./NewDeck.css";
import { connect } from "react-redux";
import { validateDeckName } from "../../functions/validateInput";
// prettier-ignore
import { setTextAreaHeight, onEnterCallback } from "../../functions/repeatedFunctions";
import { fetchCallCreateDeck } from "../../functions/fetchCalls";
import Message from "../Message/Message";

const mapStateToProps = (state) => ({
  userId: state.userStatus.user.userId,
});

const mapDispatchToProps = (dispatch) => ({
  // addDeck: (deck) => dispatch(createNewDeck(deck))
});

const initialState = {
  deckName: "",
  description: "",
  error: "",
};

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: "",
      description: "",
      error: "",
    };
  }

  onDeckNameChange = (event) => {
    this.setState({ deckName: event.target.value });
  };

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  saveDeck = () => {
    const { userId, addDeck } = this.props;
    const { deckName, description } = this.state;
    const validity = validateDeckName(deckName);
    // returns object with properties { valid, reason(not in every case) }
    if (!validity.valid) {
      if (validity.reason) {
        this.setState({ error: validity.reason });
      }
      return;
    }
    fetchCallCreateDeck(userId, deckName, description)
      .then((data) => {
        if (data.deckId) {
          //   addDeck(data);
          for (const item of document.getElementsByClassName(
            "reset-new-deck-or-card-info"
          )) {
            item.value = "";
          }
          this.setState(initialState);
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Error saving new deck: 0" }));
  };

  componentDidMount() {
    setTextAreaHeight("new-text-area");
  }

  render() {
    const { error } = this.state;
    console.log(this.state);
    return (
      <>
        <div className="new-deck-or-card-grid center">
          {/* **************start deck name / card term***************** */}
          <input
            type="text"
            maxLength={100}
            onChange={this.onDeckNameChange}
            onKeyDown={(event) => onEnterCallback(event, this.saveDeck)}
            // onBlur={(event) => {
            //   handleOnBlur(event, this.saveDeck);
            // }}
            placeholder="Enter New Deck Name"
            className="new-deck-name-or-card-term reset-new-deck-or-card-info f3-ns f4 outline-hover"
          ></input>

          {/* **************start deck description / card definition***************** */}
          <textarea
            onChange={(event) => {
              setTextAreaHeight("new-text-area");
              this.onDescriptionChange(event);
            }}
            onKeyDown={(event) => onEnterCallback(event, this.saveDeck)}
            // onBlur={(event) => {
            //   handleOnBlur(event, this.saveDeck);
            // }}
            placeholder="Enter New Deck Description (Optional)"
            className="new-deck-description-or-card-definition reset-new-deck-or-card-info outline-hover f6"
            id="new-text-area"
          ></textarea>

          {/* **************start save button***************** */}
          {/* <div
            onClick={this.saveDeck}
            className="f6 f5-ns mt3 mb2 dim pointer"
            style={{ alignSelf: "end", justifySelf: "center" }}
          >
            Save
          </div> */}

          {/* **************start error notification***************** */}
          {error ? (
            <Message
              message={error}
              wrapperClass="new-deck-or-card-error-message"
            />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
