import React, { Component } from "react";
import Error from "./Forms/Error";
import mainUrl from "../mainUrl";

const initialState = {
  error: "",
  term: "",
  definition: "",
};

class NewCard extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "", term: "", definition: "" };
  }

  // called in this.saveCard
  checkValidInput = (term, definition) => {
    if (!term || !definition) {
      // this.setState({
      //   error: "Invalid submission: both term and definition are required",
      // });
      return false;
    } else if (term.length > 255) {
      this.setState({
        error:
          "Invalid submission: term must be no more than 255 characters long",
      });
      return false;
    } else if (definition.length > 255) {
      this.setState({
        error:
          "Invalid submission: definition must be no more than 255 characters long",
      });
      return false;
    }
    return true;
  };

  onTermChange = (event) => {
    this.setState({ term: event.target.value });
  };

  onDefinitionChange = (event) => {
    this.setState({ definition: event.target.value });
  };

  saveCard = () => {
    const { term, definition } = this.state;
    const { userId, deckId, addCard } = this.props;
    const valid = this.checkValidInput(term, definition);
    if (!valid) {
      return;
    }
    fetch(`${mainUrl}/create-card`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, deckId, term, definition }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.card_id) {
          addCard(data);
          for (const item of document.getElementsByClassName(
            "reset-new-card-info"
          )) {
            item.value = "";
          }
          this.setState(initialState);
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Unable to create new card: 0" }));
  };

  render() {
    const { error } = this.state;
    return (
      <>
        <div
          style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}
          className="mh0 bt b--black-10"
        >
          {/* **************start term***************** */}
          <input
            type="text"
            maxLength={255}
            onChange={this.onTermChange}
            onBlur={this.saveCard}
            placeholder="Enter New Term"
            className="f3-ns f4 mt3 mb1 bn reset-new-card-info outline-hover"
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
            onClick={this.saveCard}
            className="f6 f5-ns mt3 mb2 link dim pointer"
            style={{ alignSelf: "end", justifySelf: "center" }}
          >
            Save
          </div> */}
          {/* **************start definition***************** */}
          <textarea
            maxLength={255}
            onChange={this.onDefinitionChange}
            onBlur={this.saveCard}
            placeholder="Enter New Definition"
            style={{
              alignSelf: "start",
              resize: "none",
              cursor: "text",
              gridColumn: "1/3",
            }}
            className="f6 mb0 mt2 bn reset-new-card-info outline-hover"
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

export default NewCard;
