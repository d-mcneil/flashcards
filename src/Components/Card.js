import React, { Component } from "react";
import Error from "./Forms/Error";
import mainUrl from "../mainUrl";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "" };
  }

  onDeleteCard = () => {
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
      });
    // .catch((err) => this.setState({ error: "Error deleting card: 0" }));
  };

  render() {
    const { term, definition, score } = this.props;
    const { error } = this.state;
    return (
      <>
        <div
          style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}
          className="mh0 bt b--black-10"
        >
          {/* **************start term***************** */}
          <div
            className="f3-ns f4 mt3 mb2 mr4"
            style={{
              alignSelf: "end",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >{`${term}`}</div>
          {/* **************start edit button***************** */}
          <div
            className="f6 f5-ns mt3 mb2 link dim pointer"
            style={{ alignSelf: "end" }}
          >
            Edit
          </div>
          {/* **************start definition***************** */}
          <div
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
          >{`${definition}`}</div>

          {/* **************start delete button***************** */}
          <div
            className="f6 f5-ns mb3 mt2 link dim pointer"
            style={{ alignSelf: "start", gridColumn: "2/span 1" }}
            onClick={this.onDeleteCard}
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

export default Card;
