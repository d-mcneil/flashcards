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
        currentDeck: "",
      });
    }
    this.setState({ route });
  };

  onSelectDeck = (route, deckId) => {
    this.onRouteChange(route);
    this.setState({ currentDeck: deckId });
  };

  render() {
    const { currentDeck, route } = this.state;
    const { userId } = this.props;
    if (route === "practice") {
      return (
        <Practice
          currentDeck={currentDeck}
          onRouteChange={this.onRouteChange}
        />
      );
    } else if (route === "editor") {
      return (
        <Editor currentDeck={currentDeck} onRouteChange={this.onRouteChange} />
      );
    } else {
      return <Decks userId={userId} onSelectDeck={this.onSelectDeck} />;
    }
  }
}

export default Home;
