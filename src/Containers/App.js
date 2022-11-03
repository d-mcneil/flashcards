import React, { Component } from "react";
import Navigation from "../Components/Navigation";
import Register from "./Register";
import SignIn from "./SignIn";
import Home from "./Home";
import Profile from "../Components/Profile";

const initialState = {
  route: "signed-out",
  isSignedIn: false,
  user: {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    joined: "",
  },
  // speechSynthesisVoices: [], // this isn't included as part of the initial state because it shouldn't be reset when logged out
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "signed-out",
      isSignedIn: false,
      user: {
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        joined: "",
      },
      speechSynthesisVoices: [],
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        userId: data.user_id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        username: data.username,
        joined: data.joined,
      },
    });
  };

  onRouteChange = (route) => {
    if (route === "signed-out") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  };

  getSpeechSynthesisVoices = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      const _handleVoicesChanged = () => {
        const voices = window.speechSynthesis.getVoices();
        this.setState({
          speechSynthesisVoices: voices,
        });
        synth.removeEventListener("voiceschanged", _handleVoicesChanged);
      };
      synth.addEventListener("voiceschanged", _handleVoicesChanged);
    }
  };

  componentDidMount() {
    this.getSpeechSynthesisVoices();
  }

  render() {
    const { route, isSignedIn, user, speechSynthesisVoices } = this.state;
    return (
      <>
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
          route={route}
        />
        {route === "home" ? (
          <Home
            userId={user.userId}
            speechSynthesisVoices={speechSynthesisVoices}
          />
        ) : route === "profile" ? (
          <Profile user={user} onRouteChange={this.onRouteChange} />
        ) : route === "signed-out" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </>
    );
  }
}

export default App;
