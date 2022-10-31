import React, { Component } from "react";
import Error from "./Forms/Error";
import mainUrl from "../mainUrl";
import { handleOnBlur } from "../repeatedFunctions"; // called in the onBlur for the input and text area fields so that going from one to the other doesn't save the new deck
import { onEnterSave, setAreaHeight } from "../repeatedFunctions";

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
      // this.setState({
      //   error: "Invalid submission: deck name is required",
      // });
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

  saveDeck = () => {
    const { deckName, description } = this.state;
    const { userId, addDeck } = this.props;
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
          addDeck(data);
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

  componentDidMount() {
    setAreaHeight("new-deck-description");
  }

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
            onKeyDown={(event) => onEnterSave(event, this.saveDeck)}
            onBlur={(event) => {
              handleOnBlur(event, this.saveDeck);
            }}
            placeholder="Enter New Deck Name"
            className="f3-ns f4 mt3 mb1 bn reset-new-deck-info outline-hover"
            style={{
              alignSelf: "end",
              textOverflow: "ellipsis",
              overflow: "hidden",
              cursor: "text",
              lineHeight: "1.35",
              gridColumn: "1/3",
            }}
          ></input>
          {/* **************start save button***************** */}
          {/* <div
            onClick={this.saveDeck}
            className="f6 f5-ns mt3 mb2 link dim pointer"
            style={{ alignSelf: "end", justifySelf: "center" }}
          >
            Save
          </div> */}
          {/* **************start description***************** */}
          <textarea
            onChange={(event) => {
              setAreaHeight("new-deck-description");
              this.onDescriptionChange(event);
            }}
            onKeyDown={(event) => onEnterSave(event, this.saveDeck)}
            onBlur={(event) => {
              handleOnBlur(event, this.saveDeck);
            }}
            placeholder="Enter New Deck Description (Optional)"
            style={{
              alignSelf: "start",
              resize: "none",
              cursor: "text",
              gridColumn: "1/3",
            }}
            className="f6 mb0 mt2 bn reset-new-deck-info outline-hover"
            id="new-deck-description"
          ></textarea>
          {/* **************start error notification***************** */}
          {error ? (
            <div className={"mt0 pt0"} style={{ gridColumn: "span 2" }}>
              <Error error={error} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default NewDeck;
