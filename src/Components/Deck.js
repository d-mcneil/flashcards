import React, { Component } from "react";
import Error from "./Forms/Error";
import mainUrl from "../mainUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
// import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  deleteDeck = () => {
    const { userId, deckId, removeDeck } = this.props;
    fetch(`${mainUrl}/delete-deck`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, deckId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deck_id === deckId) {
          removeDeck(deckId);
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) => this.setState({ error: "Error deleting deck: 0" }));
  };

  render() {
    const {
      deckId,
      deckName,
      description,
      definitionFirst,
      deckPercentage,
      termLanguage,
      definitionLanguage,
      selectDeck,
    } = this.props;
    const { error } = this.state;
    return (
      <>
        <div
          style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}
          className="mh0 bt b--black-10"
        >
          {/* **************start deck name***************** */}
          <div
            className="f3-ns f4 mt3 pb2 mr4 link dim pointer"
            style={{
              alignSelf: "end",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
            onClick={() =>
              selectDeck(
                "practice",
                deckId,
                deckName,
                description,
                definitionFirst,
                deckPercentage,
                termLanguage,
                definitionLanguage
              )
            }
          >{`${deckName}`}</div>
          {/* **************start edit button***************** */}
          {/* <div
            onClick={() =>
              selectDeck(
                "editor",
                deckId,
                deckName,
                description,
                definitionFirst,
                deckPercentage
              )
            }
            className="f6 f5-ns mt3 mb2 link dim pointer"
            style={{ alignSelf: "end" }}
          >
            Edit
          </div> */}
          <div
            onClick={() =>
              selectDeck(
                "editor",
                deckId,
                deckName,
                description,
                definitionFirst,
                deckPercentage,
                termLanguage,
                definitionLanguage
              )
            }
            className="f5 f4-ns mb1 dim pointer"
            style={{ alignSelf: "end", justifySelf: "center" }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          {/* **************start description***************** */}
          {description ? (
            <div
              style={{
                alignSelf: "start",
                // this breaks the description up how i want, but WebkitBoxOrient is deprecated
                wordBreak: "break-all",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                paddingBottom: ".15rem",
                //
                // this also works (although it doesn't show the ellipsis),
                // but it gets a little funny when the ns tachyons breakpoint is reached (i.e., works below the breakpoint, not above),
                // so to use this would require using a media query and calculating what the height should be above the ns breakpoint
                //   wordBreak: "break-all",
                //   overflow: "hidden",
                //   maxHeight: "3.22rem",
              }}
              className="f6 mt2 mr4 mb3"
            >{`${description}`}</div>
          ) : (
            <></>
          )}
          {/* **************start delete button***************** */}
          {/* <div
            className="f6 f5-ns mb3 mt2 link dim pointer"
            style={{ alignSelf: "start", gridColumn: "2/span 1" }}
            onClick={this.deleteDeck}
          >
            Delete
          </div> */}
          <div
            className="f5 f4-ns mt1 mb2 dim pointer"
            style={{
              alignSelf: "start",
              gridColumn: "2/span 1",
              justifySelf: "center",
            }}
            onClick={this.deleteDeck}
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

export default Deck;
