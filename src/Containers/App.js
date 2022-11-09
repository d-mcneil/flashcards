import React, { Component } from "react";
import { connect } from "react-redux";
import MainCard from "../components/MainCard/MainCard";
import Register from "./Register";
import SignIn from "./SignIn";
import Navigation from "../components/Navigation/Navigation";

const mapStateToProps = (state) => ({
  route: state.routeChange.route,
});

class App extends Component {
  renderSignInRegisterOrHome = () => {
    switch (this.props.route) {
      case "signed-out":
        return <SignIn />;
      case "register":
        return <Register />;
      case "home":
        // return <Home />
        return <></>;
      default:
        return <></>;
    }
  };

  render() {
    return (
      <>
        <Navigation />
        <MainCard>{this.renderSignInRegisterOrHome()}</MainCard>
      </>
    );
  }
}

export default connect(mapStateToProps)(App);
