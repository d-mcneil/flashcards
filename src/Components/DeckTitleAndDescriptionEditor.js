import React, { Component } from "react";

class DeckTitleAndDescriptionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setNameAreaHeight();
    this.setDescriptionAreaHeight();
  }

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

  render() {
    const {
      onDeckNameChange,
      onDeckDescriptionChange,
      currentDeckName,
      currentDeckDescription,
    } = this.props;

    return (
      <>
        {/* **************start deck name***************** */}
        <textarea
          className="bn f2 mv3 outline-hover"
          id="name-area"
          defaultValue={currentDeckName}
          placeholder="Enter Deck Name"
          maxLength={100}
          onChange={(event) => {
            this.setNameAreaHeight();
            onDeckNameChange(event);
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
          onChange={(event) => {
            this.setDescriptionAreaHeight();
            onDeckDescriptionChange(event);
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
      </>
    );
  }
}

export default DeckTitleAndDescriptionEditor;
