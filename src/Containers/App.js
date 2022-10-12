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

  render() {
    const { route, isSignedIn, user } = this.state;
    return (
      <>
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
          route={route}
        />
        {route === "home" ? (
          <Home userId={user.userId} />
        ) : route === "profile" ? (
          <Profile />
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
