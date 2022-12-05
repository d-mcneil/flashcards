import React, { Component } from "react";
import { connect } from "react-redux";
import { loadSpeechSynthesisVoices, signInSampleUser } from "../redux/actions";
import SignIn from "./SignIn";
import Register from "./Register";
import Decks from "./Decks";
import Editor from "./Editor";
import Practice from "./Practice";
import MainCard from "../components/MainCard/MainCard";
import Navigation from "../components/Navigation/Navigation";
import DeckNavigation from "../components/DeckNavigation/DeckNavigation";
import Profile from "../components/Profile/Profile";
import Button from "../components/Forms/Button/Button";

const mapStateToProps = (state) => ({
  route: state.route.route,
  signedIn: state.userStatus.signedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setSpeechSynthesisVoices: (voices) =>
    dispatch(loadSpeechSynthesisVoices(voices)),
  loadSampleUser: () => dispatch(signInSampleUser()),
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

  sampleUserButtonRender = () => {
    const { signedIn, loadSampleUser } = this.props;
    if (!signedIn) {
      return <Button label="Sign In as Sample User" onClick={loadSampleUser} />;
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
        {this.sampleUserButtonRender()}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
