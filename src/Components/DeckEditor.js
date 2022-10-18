import React, { Component } from "react";
import mainUrl from "../mainUrl";
import Error from "./Forms/Error";

class DeckEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDeckName: "",
      newDeckDescription: "",
      error: "",
    };
  }

  // called in this.saveDeck
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

  saveDeck = () => {
    const { newDeckName, newDeckDescription } = this.state;
    const {
      updateDeck,
      userId,
      currentDeckId,
      currentDeckDescription,
      currentDeckName,
    } = this.props;
    if (
      currentDeckDescription === newDeckDescription &&
      currentDeckName === newDeckName
    ) {
      return;
    }
    const valid = this.checkValidInput(newDeckName);
    if (!valid) {
      return;
    }
    fetch(`${mainUrl}/update-deck`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        deckId: currentDeckId,
        deckName: newDeckName,
        description: newDeckDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deck_id) {
          updateDeck(newDeckName, newDeckDescription);
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Unable to update deck: 0" }));
  };

  onDeckNameChange = (event) => {
    this.setState({ newDeckName: event.target.value });
  };

  onDeckDescriptionChange = (event) => {
    this.setState({ newDeckDescription: event.target.value });
  };

  setDescriptionAreaHeight = () => {
    const descriptionArea = document.getElementById("description-area");
    if (descriptionArea) {
      descriptionArea.style.height = "0px";
      descriptionArea.style.height = descriptionArea.scrollHeight + 2 + "px";
    }
  };

  setNameAreaHeight = () => {
    const nameArea = document.getElementById("name-area");
    nameArea.style.height = "0px";
    nameArea.style.height = nameArea.scrollHeight + 2 + "px";
  };

  componentDidMount() {
    const { currentDeckName, currentDeckDescription } = this.props;
    this.setState({
      newDeckName: currentDeckName,
      newDeckDescription: currentDeckDescription,
    });
    this.setNameAreaHeight();
    this.setDescriptionAreaHeight();
  }

  render() {
    const { currentDeckName, currentDeckDescription } = this.props;
    const { error } = this.state;

    return (
      <>
        {/* **************start deck name***************** */}
        <textarea
          className="bn f2 mv3 outline-hover"
          id="name-area"
          defaultValue={currentDeckName}
          placeholder="Enter Deck Name"
          onBlur={this.saveDeck}
          maxLength={100}
          onChange={(event) => {
            this.setNameAreaHeight();
            this.onDeckNameChange(event);
          }}
          style={{
            width: "100%",
            resize: "none",
            textAlign: "center",
            maxHeight: "30vh",
            cursor: "text",
          }}
        ></textarea>
        {/* **************start description***************** */}
        <textarea
          className="bn f5 mb4 outline-hover"
          id="description-area"
          placeholder="Enter Deck Description (Optional)"
          defaultValue={currentDeckDescription}
          onBlur={this.saveDeck}
          onChange={(event) => {
            this.setDescriptionAreaHeight();
            this.onDeckDescriptionChange(event);
          }}
          style={{
            width: "100%",
            resize: "none",
            textAlign: "justify",
            fontStyle: "italic",
            maxHeight: "30vh",
            cursor: "text",
          }}
        ></textarea>
        {error ? (
          <div className={"mt0 pt0 mb3"}>
            <Error error={error} />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default DeckEditor;
