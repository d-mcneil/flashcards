import React, { Component } from "react";
import { connect } from "react-redux";
import SignIn from "./SignIn";
import Register from "./Register";
import Decks from "./Decks";
import Editor from "./Editor";
import Practice from "./Practice";
import MainCard from "../components/MainCard/MainCard";
import Navigation from "../components/Navigation/Navigation";
import DeckNavigation from "../components/DeckNavigation/DeckNavigation";

const mapStateToProps = (state) => ({
  route: state.route.route,
});

class App extends Component {
  mainRender = () => {
    switch (this.props.route) {
      case "signed-out":
        return <SignIn />;
      case "register":
        return <Register />;
      case "home":
        return <Decks />;
      case "editor":
        return <Editor />;
      case "practice":
        return <Practice />;
      default:
        return <></>;
    }
  };

  deckNavigationRender = () => {
    const { route } = this.props;
    if (route === "editor" || route === "practice") {
      return <DeckNavigation />;
    }
  };

  render() {
    return (
      <>
        <Navigation />
        <MainCard>
          {this.deckNavigationRender()}
          {this.mainRender()}
        </MainCard>
      </>
    );
  }
}

export default connect(mapStateToProps)(App);
