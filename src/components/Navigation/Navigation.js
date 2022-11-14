import React from "react";
import { routeChangeAndResetError, signOutUser } from "../../redux/actions";
import { connect } from "react-redux";
import "./Navigation.css";

const mapStateToProps = (state) => ({
  signedIn: state.userStatus.signedIn,
  route: state.route.route,
  error: state.error.error,
  // error is used only to plug into the "onRouteChange" function
  // so that the error state isn't updated unnecessarily on every route change
});

const mapDispatchToProps = (dispatch) => ({
  // prettier-ignore
  onRouteChange: (route, error) => dispatch(routeChangeAndResetError(route, error)),
  onSignOut: (error) => dispatch(signOutUser(error)),
});

const Navigation = ({ route, signedIn, error, onRouteChange, onSignOut }) => {
  const navBarStyleClasses = "f3 dim nav-bar-button";

  const renderHomeOrProfileButton = () => {
    if (route === "home" || route === "practice" || route === "editor") {
      return (
        <p
          onClick={() => onRouteChange("profile", error)}
          className={`${navBarStyleClasses} push`}
        >
          Profile
        </p>
      );
    } else if (route === "profile") {
      return (
        <p
          onClick={() => onRouteChange("home", error)}
          className={`${navBarStyleClasses} push`}
        >
          Home
        </p>
      );
    }
  };

  const renderRegisterSignInOrSignOutButton = () => {
    if (signedIn) {
      return (
        <p onClick={() => onSignOut(error)} className={`${navBarStyleClasses}`}>
          Sign Out
        </p>
      );
    } else {
      switch (route) {
        case "register":
          return (
            <p
              onClick={() => onRouteChange("signed-out", error)}
              className={`${navBarStyleClasses} push`}
            >
              Sign In
            </p>
          );
        case "signed-out":
          return (
            <p
              onClick={() => onRouteChange("register", error)}
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
