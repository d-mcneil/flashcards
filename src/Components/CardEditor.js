import React, { Component } from "react";
import Error from "./Forms/Error";
import mainUrl from "../mainUrl";
import ScoreCounter from "./ScoreCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { handleOnBlur } from "../repeatedFunctions"; // called in the onBlur for the input and text area fields so that going from one to the other doesn't save the new card
import { onEnterSave, setAreaHeight } from "../repeatedFunctions";

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

  // setDefinitionAreaHeight = () => {
  //   const { cardId } = this.props;
  //   const definitionArea = document.getElementById(`definition-area-${cardId}`);
  //   definitionArea.style.height = "0px";
  //   definitionArea.style.height = definitionArea.scrollHeight + 2 + "px";
  // };

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

  // called in this.saveTerm and this.saveDefinition
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
    if (currentTerm === newTerm && currentDefinition === newDefinition) {
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

  // saveTerm = () => {
  //   const { userId, cardId, updateCardTerm, currentDefinition, currentTerm } =
  //     this.props;
  //   const { newTerm } = this.state;
  //   if (currentTerm === newTerm) {
  //     return;
  //   }
  //   const valid = this.checkValidInput(newTerm, currentDefinition);
  //   if (!valid) {
  //     return;
  //   }
  //   fetch(`${mainUrl}/update-card-term`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       userId: userId,
  //       cardId: cardId,
  //       term: newTerm,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.card_id) {
  //         updateCardTerm(cardId, newTerm);
  //         this.setState({ error: "" });
  //       } else {
  //         this.setState({ error: data });
  //       }
  //     })
  //     .catch((err) => this.setState({ error: "Unable to update term: 0" }));
  // };

  // saveDefinition = () => {
  //   const {
  //     userId,
  //     cardId,
  //     updateCardDefinition,
  //     currentDefinition,
  //     currentTerm,
  //   } = this.props;
  //   const { newDefinition } = this.state;
  //   if (currentDefinition === newDefinition) {
  //     return;
  //   }
  //   const valid = this.checkValidInput(currentTerm, newDefinition);
  //   if (!valid) {
  //     return;
  //   }
  //   fetch(`${mainUrl}/update-card-definition`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       userId: userId,
  //       cardId: cardId,
  //       definition: newDefinition,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.card_id) {
  //         updateCardDefinition(cardId, newDefinition);
  //         this.setState({ error: "" });
  //       } else {
  //         this.setState({ error: data });
  //       }
  //     })
  //     .catch((err) =>
  //       this.setState({ error: "Unable to update definition: 0" })
  //     );
  // };

  setScoreError = (error) => {
    this.setState({ error });
  };

  componentDidMount() {
    const { currentDefinition, currentTerm, cardId } = this.props;
    this.setState({ newTerm: currentTerm, newDefinition: currentDefinition });
    setAreaHeight(`definition-area-${cardId}`);
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
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 1fr",
            gridAutoFlow: "dense",
          }}
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
            onKeyDown={(event) => onEnterSave(event, this.saveCard)}
            onBlur={(event) => {
              handleOnBlur(event, this.saveCard);
            }}
            placeholder="Enter Term"
            defaultValue={currentTerm}
            className="f3-ns f4 mt3 mb1 mr4 bn outline-hover"
            style={{
              alignSelf: "end",
              textOverflow: "ellipsis",
              overflow: "hidden",
              cursor: "text",
              lineHeight: "1.35",
            }}
          ></input>
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
              setAreaHeight(`definition-area-${cardId}`);
              this.onDefinitionChange(event);
            }}
            onKeyDown={(event) => onEnterSave(event, this.saveCard)}
            onBlur={(event) => {
              handleOnBlur(event, this.saveCard);
            }}
            defaultValue={currentDefinition}
            placeholder="Enter Definition"
            style={{
              alignSelf: "start",
              resize: "none",
              cursor: "text",
              textAlign: "justify",
              maxHeight: "3.75em",
              gridColumn: "1/2",
            }}
            className="f6 mb3 mt2 mr4 bn outline-hover"
            id={`definition-area-${cardId}`}
          ></textarea>
          {/* **************start score counter***************** */}
          <div
            className="f6 f5-ns mt3 mb2"
            style={{
              display: "flex",
              alignSelf: "end",
            }}
          >
            <ScoreCounter
              score={score}
              setScoreError={this.setScoreError}
              updateScore={updateScore}
              userId={userId}
              cardId={cardId}
              arrowKeysChangeScore={false}
            />
          </div>
          {/* **************start delete button***************** */}
          {/* <div
            className="f6 f5-ns mb3 mt2 link dim pointer"
            style={{
              alignSelf: "start",
              gridColumn: "2/span 1",
              justifySelf: "center",
            }}
            onClick={this.deleteCard}
          >
            Delete
          </div> */}
          <div
            className="f5 f4-ns mt2 dim pointer"
            style={{
              alignSelf: "start",
              gridColumn: "2/span 1",
              justifySelf: "center",
            }}
            onClick={this.deleteCard}
          >
            <FontAwesomeIcon icon={faTrashCan} />
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
