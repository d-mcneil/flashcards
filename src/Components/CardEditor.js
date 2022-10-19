import React, { Component } from "react";
import Error from "./Forms/Error";
import mainUrl from "../mainUrl";
import ScoreCounter from "./ScoreCounter";

class CardEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      newTerm: "",
      newDefinition: "",
    };
  }

  onTermChange = (event) => {
    this.setState({ newTerm: event.target.value });
  };

  onDefinitionChange = (event) => {
    this.setState({ newDefinition: event.target.value });
  };

  setDefinitionAreaHeight = () => {
    const { cardId } = this.props;
    const definitionArea = document.getElementById(`definition-area-${cardId}`);
    definitionArea.style.height = "0px";
    definitionArea.style.height = definitionArea.scrollHeight + 2 + "px";
  };

  deleteCard = () => {
    const { userId, cardId, removeCard } = this.props;
    fetch(`${mainUrl}/delete-card`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, cardId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.card_id === cardId) {
          removeCard(cardId);
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Error deleting card: 0" }));
  };

  // called in this.saveCard
  checkValidInput = (term, definition) => {
    if (!term || !definition) {
      this.setState({
        error: "Invalid submission: both term and definition are required",
      });
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

  saveCard = () => {
    const { userId, cardId, updateCard, currentDefinition, currentTerm } =
      this.props;
    const { newTerm, newDefinition } = this.state;
    if (currentDefinition === newDefinition && currentTerm === newTerm) {
      return;
    }
    const valid = this.checkValidInput(newTerm, newDefinition);
    if (!valid) {
      return;
    }
    fetch(`${mainUrl}/update-card`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        cardId: cardId,
        term: newTerm,
        definition: newDefinition,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.card_id) {
          updateCard(cardId, newTerm, newDefinition);
          this.setState({ error: "" });
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Unable to update card: 0" }));
  };

  setScoreError = (error) => {
    this.setState({ error });
  };

  // changeScore = (incrementValue) => {
  //   const { updateScore, cardId, userId } = this.props;
  //   fetch(`${mainUrl}/update-score`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ userId, cardId, incrementValue }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.card_id) {
  //         updateScore(cardId, incrementValue);
  //         this.setState({ error: "" });
  //       } else {
  //         this.setState({ error: data });
  //       }
  //     })
  //     .catch((err) => this.setState({ error: "Unable to update score: 0" }));
  // };

  componentDidMount() {
    const { currentDefinition, currentTerm } = this.props;
    this.setState({ newTerm: currentTerm, newDefinition: currentDefinition });
    this.setDefinitionAreaHeight();
  }

  render() {
    const {
      currentTerm,
      currentDefinition,
      score,
      cardId,
      updateScore,
      userId,
    } = this.props;
    const { error } = this.state;
    return (
      <>
        <div
          style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}
          className="mh0 bt b--black-10"
        >
          {/* **************start term***************** */}
          {/* <div
            className="f3-ns f4 mt3 mb2 mr4"
            style={{
              alignSelf: "end",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >{`${term}`}</div> */}
          <input
            type="text"
            maxLength={255}
            onChange={this.onTermChange}
            onBlur={this.saveCard}
            placeholder="Enter Term"
            defaultValue={currentTerm}
            className="f3-ns f4 mt3 mb2 mr4 bn outline-hover"
            style={{
              alignSelf: "end",
              textOverflow: "ellipsis",
              overflow: "hidden",
              cursor: "text",
            }}
          ></input>
          {/* **************start score counter***************** */}
          <div
            className="f6 f5-ns mt3 mb2"
            style={{
              display: "flex",
              alignSelf: "end",
            }}
          >
            {/* <div
              className="pointer pv1 ba b--black br3 br--left bg-transparent hover-bg-black hover-white"
              style={{
                marginLeft: "auto",
                minWidth: "1.5em",
                textAlign: "center",
              }}
              onClick={() => this.changeScore(-1)}
            >
              -
            </div>
            <div className="ph1 pv1 bt bb b--black">{`${score}`}</div>
            <div
              className="pointer pv1 ba b--black br3 br--right bg-transparent hover-bg-black hover-white"
              style={{
                marginRight: "auto",
                minWidth: "1.5em",
                textAlign: "center",
              }}
              onClick={() => this.changeScore(1)}
            >
              +
            </div> */}
            <ScoreCounter
              score={score}
              setScoreError={this.setScoreError}
              updateScore={updateScore}
              userId={userId}
              cardId={cardId}
            />
          </div>
          {/* **************start definition***************** */}
          {/* <div
            style={{
              alignSelf: "start",
              // this breaks the description up how i want, but WebkitBoxOrient is deprecated
              wordBreak: "break-all",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              //
              // this also works (although it doesn't show the ellipsis),
              // but it gets a little funny when the ns tachyons breakpoint is reached (i.e., works below the breakpoint, not above),
              // so to use this would require using a media query and calculating what the height should be above the ns breakpoint
              //   wordBreak: "break-all",
              //   overflow: "hidden",
              //   maxHeight: "3.22rem",
            }}
            className="f6 mb3 mt2 mr4"
          >{`${definition}`}</div> */}
          <textarea
            maxLength={255}
            onChange={(event) => {
              this.setDefinitionAreaHeight();
              this.onDefinitionChange(event);
            }}
            onBlur={this.saveCard}
            defaultValue={currentDefinition}
            placeholder="Enter Definition"
            style={{
              alignSelf: "start",
              resize: "none",
              cursor: "text",
              textAlign: "justify",
              maxHeight: "3.75em",
            }}
            className="f6 mb3 mt2 mr4 bn outline-hover"
            id={`definition-area-${cardId}`}
          ></textarea>

          {/* **************start delete button***************** */}
          <div
            className="f6 f5-ns mb3 mt2 link dim pointer"
            style={{
              alignSelf: "start",
              gridColumn: "2/span 1",
              justifySelf: "center",
            }}
            onClick={this.deleteCard}
          >
            Delete
          </div>
          {/* **************start error notification***************** */}
          {error ? (
            <div className={"mt0 pt0 mb3"} style={{ gridColumn: "span 2" }}>
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

export default CardEditor;
