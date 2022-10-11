import React from "react";
// import Logo from "./Logo/Logo";

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
  return (
    <nav style={{ display: "flex" }}>
      {/* <Logo /> */}
      {route === "home" ? (
        <p
          onClick={() => onRouteChange("profile")}
          className="f3 link dim black underline pa3 pointer mv0 push"
        >
          Profile
        </p>
      ) : route === "profile" ? (
        <p
          onClick={() => onRouteChange("home")}
          className="f3 link dim black underline pa3 pointer mv0 push"
        >
          Home
        </p>
      ) : (
        <></>
      )}
      {isSignedIn ? (
        <>
          <p
            onClick={() => onRouteChange("signed-out")}
            className="f3 link dim black underline pa3 pointer mv0"
          >
            Sign Out
          </p>
        </>
      ) : route === "register" ? (
        <p
          onClick={() => onRouteChange("signed-out")}
          className="f3 link dim black underline pa3 pointer mv0 push"
        >
          Sign In
        </p>
      ) : (
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pointer mv0 push"
        >
          Register
        </p>
      )}
    </nav>
  );
};

export default Navigation;
