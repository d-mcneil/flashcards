import React, { Component } from "react";
import Error from "./Forms/Error";
import mainUrl from "../mainUrl";

const initialState = {
  error: "",
  deckName: "",
  description: "",
};

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      deckName: "",
      description: "",
    };
  }

  checkValidInput = (deckName) => {
    if (!deckName) {
      this.setState({
        error: "Invalid submission: deck name is required",
      });
      return false;
    } else if (deckName.length > 100) {
      this.setState({
        error:
          "Invalid submission: deck name must be no more than 100 characters long",
      });
      return false;
    }
    return true;
  };

  onDeckNameChange = (event) => {
    this.setState({ deckName: event.target.value });
  };

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  onSaveDeck = () => {
    const { deckName, description } = this.state;
    const { userId, addNewDeck } = this.props;
    const valid = this.checkValidInput(deckName);
    if (!valid) {
      return;
    }
    fetch(`${mainUrl}/create-deck`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, deckName, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deck_id) {
          addNewDeck(data);
          for (const item of document.getElementsByClassName(
            "reset-new-deck-info"
          )) {
            item.value = "";
          }
          this.setState(initialState);
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Unable to create new deck: 0" }));
  };

  render() {
    const { error } = this.state;
    return (
      <>
        <div
          style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}
          className="mh0 bt b--black-10"
        >
          {/* **************start deck name***************** */}
          <input
            type="text"
            maxLength={100}
            onChange={this.onDeckNameChange}
            placeholder="Enter New Deck Name"
            className="f3-ns f4 mt3 mb2 mr4 bn reset-new-deck-info"
            style={{
              alignSelf: "end",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          ></input>
          {/* **************start save button***************** */}
          <div
            onClick={this.onSaveDeck}
            className="f6 f5-ns mt3 mb2 link dim pointer"
            style={{ alignSelf: "end" }}
          >
            Save
          </div>
          {/* **************start description***************** */}
          <textarea
            onChange={this.onDescriptionChange}
            placeholder="Enter New Deck Description (Optional)"
            style={{
              alignSelf: "start",
              resize: "none",
            }}
            className="f6 mb0 mt2 mr4 bn reset-new-deck-info"
            rows={3}
          ></textarea>
          {/* **************start error notification***************** */}
          <div className={"mt0 pt0"} style={{ gridColumn: "span 2" }}>
            <Error error={error} />
          </div>
        </div>
      </>
    );
  }
}

export default NewDeck;
