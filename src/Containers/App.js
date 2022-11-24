import React, { Component } from "react";
import { connect } from "react-redux";
import { loadSpeechSynthesisVoices } from "../redux/actions";
import SignIn from "./SignIn";
import Register from "./Register";
import Decks from "./Decks";
import Editor from "./Editor";
import Practice from "./Practice";
import MainCard from "../components/MainCard/MainCard";
import Navigation from "../components/Navigation/Navigation";
import DeckNavigation from "../components/DeckNavigation/DeckNavigation";
import Profile from "../components/Profile/Profile";

const mapStateToProps = (state) => ({
  route: state.route.route,
});

const mapDispatchToProps = (dispatch) => ({
  setSpeechSynthesisVoices: (voices) =>
    dispatch(loadSpeechSynthesisVoices(voices)),
});

class App extends Component {
  componentDidMount() {
    const speechSynthesizer = window.speechSynthesis;
    if (speechSynthesizer) {
      const _handleVoicesChanged = () => {
        const voices = speechSynthesizer.getVoices();
        this.props.setSpeechSynthesisVoices(voices);
        speechSynthesizer.removeEventListener(
          "voiceschanged",
          _handleVoicesChanged
        );
      };
      speechSynthesizer.addEventListener("voiceschanged", _handleVoicesChanged);
    }
  }

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
      case "profile":
        return <Profile />;
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
