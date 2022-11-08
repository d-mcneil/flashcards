import React, { Component } from "react";
import MainCard from "../components/MainCard/MainCard";
import Register from "./Register";
import SignIn from "./SignIn";

class App extends Component {
  render() {
    return (
      <MainCard>
        <Register />
      </MainCard>
    );
  }
}

export default App;
