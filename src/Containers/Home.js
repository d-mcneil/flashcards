import React, { Component } from "react";
import Practice from "./Practice";
import Editor from "./Editor";
import Decks from "./Decks";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDeck: "",
      error: "",
      route: "decks",
    };
  }

  // called in this.onSelectDeck
  onRouteChange = (route) => {
    if (route === "decks") {
      this.setState({
        //     newDeckDescription: "",    // removed when decks was moved to be a child component, pretty sure it's no longer needed, keeping just in case
        //     newDeckName: "",
        currentDeckId: "",
        currentDeckName: "",
        currentDeckDescription: "",
      });
    }
    this.setState({ route });
  };

  onSelectDeck = (route, deckId, deckName, description) => {
    this.onRouteChange(route);
    this.setState({
      currentDeckId: deckId,
      currentDeckName: deckName,
      currentDeckDescription: description,
    });
  };

  render() {
    const { currentDeckId, currentDeckDescription, currentDeckName, route } =
      this.state;
    const { userId } = this.props;
    if (route === "practice") {
      return (
        <Practice
          currentDeckId={currentDeckId}
          currentDeckDescription={currentDeckDescription}
          currentDeckName={currentDeckName}
          onRouteChange={this.onRouteChange}
        />
      );
    } else if (route === "editor") {
      return (
        <Editor
          userId={userId}
          currentDeckId={currentDeckId}
          currentDeckDescription={currentDeckDescription}
          currentDeckName={currentDeckName}
          onRouteChange={this.onRouteChange}
        />
      );
    } else {
      return <Decks userId={userId} onSelectDeck={this.onSelectDeck} />;
    }
  }
}

export default Home;
