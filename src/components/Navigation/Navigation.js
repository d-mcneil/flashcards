import React from "react";
import { routeChange, signOutUser } from "../../redux/actions";
import { connect } from "react-redux";
import "./Navigation.css";

const mapStateToProps = (state) => ({
  signedIn: state.userStatus.signedIn,
  route: state.routeChange.route,
});

const mapDispatchToProps = (dispatch) => ({
  onRouteChange: (route) => dispatch(routeChange(route)),
  onSignOut: () => dispatch(signOutUser()),
});

const Navigation = ({ route, signedIn, onRouteChange, onSignOut }) => {
  const navBarStyleClasses = "f3 dim nav-bar-button";

  const renderHomeOrProfileButton = () => {
    switch (route) {
      case "home":
        return (
          <p
            onClick={() => onRouteChange("profile")}
            className={`${navBarStyleClasses} push`}
          >
            Profile
          </p>
        );
      case "profile":
        return (
          <p
            onClick={() => onRouteChange("home")}
            className={`${navBarStyleClasses} push`}
          >
            Home
          </p>
        );
      default:
        return <></>;
    }
  };

  const renderRegisterSignInOrSignOutButton = () => {
    if (signedIn) {
      return (
        <p onClick={onSignOut} className={`${navBarStyleClasses}`}>
          Sign Out
        </p>
      );
    } else {
      switch (route) {
        case "register":
          return (
            <p
              onClick={() => onRouteChange("signed-out")}
              className={`${navBarStyleClasses} push`}
            >
              Sign In
            </p>
          );
        case "signed-out":
          return (
            <p
              onClick={() => onRouteChange("register")}
              className={`${navBarStyleClasses} push`}
            >
              Register
            </p>
          );
        default:
          return <></>;
      }
    }
  };

  return (
    <nav id="nav-bar">
      {renderHomeOrProfileButton()}
      {renderRegisterSignInOrSignOutButton()}
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
