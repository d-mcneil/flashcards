import React from "react";
// import Logo from "./Logo/Logo";

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
  const navBarStyleClasses = "f3 link dim black underline pa3 pointer mv0";
  return (
    <nav style={{ display: "flex" }}>
      {/* <Logo /> */}
      {/* **************start home/profile button***************** */}
      {route === "home" ? (
        <p
          onClick={() => onRouteChange("profile")}
          className={`${navBarStyleClasses} push`}
        >
          Profile
        </p>
      ) : route === "profile" ? (
        <p
          onClick={() => onRouteChange("home")}
          className={`${navBarStyleClasses} push`}
        >
          Home
        </p>
      ) : (
        <></>
      )}
      {/* **************start sign-out/sign-in/register buttons***************** */}
      {isSignedIn ? (
        <p
          onClick={() => onRouteChange("signed-out")}
          className={`${navBarStyleClasses}`}
        >
          Sign Out
        </p>
      ) : route === "register" ? (
        <p
          onClick={() => onRouteChange("signed-out")}
          className={`${navBarStyleClasses} push`}
        >
          Sign In
        </p>
      ) : (
        <p
          onClick={() => onRouteChange("register")}
          className={`${navBarStyleClasses} push`}
        >
          Register
        </p>
      )}
    </nav>
  );
};

export default Navigation;
