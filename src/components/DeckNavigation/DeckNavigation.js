import React from "react";
import { connect } from "react-redux";
import { routeChangeAndResetError, unselectDeck } from "../../redux/actions";
import "./DeckNavigation.css";

const mapStateToProps = (state) => ({
  route: state.route.route,
  error: state.error.error,
  // error is used only to plug into the "onRouteChange" function
  // so that the error state isn't updated unnecessarily on every route change
});

const mapDispatchToProps = (dispatch) => ({
  // prettier-ignore
  onRouteChange: (route, error) => dispatch(routeChangeAndResetError(route, error)),
  onNavigateToDecks: (error) => dispatch(unselectDeck(error)),
});

const DeckNavigation = ({ route, error, onRouteChange, onNavigateToDecks }) => {
  const deckNavBarStyleClasses = "f5 dim deck-nav-bar-button";

  const renderPracticeOrEditButton = () => {
    switch (route) {
      case "practice":
        return (
          <p
            onClick={() => onRouteChange("editor", error)}
            className={`${deckNavBarStyleClasses} push`}
          >
            Edit
          </p>
        );
      case "editor":
        return (
          <p
            onClick={() => onRouteChange("practice", error)}
            className={`${deckNavBarStyleClasses} push`}
          >
            Practice
          </p>
        );
      default:
        return <></>;
    }
  };

  return (
    <div id="deck-nav-bar">
      <p
        onClick={() => onNavigateToDecks(error)}
        className={deckNavBarStyleClasses}
      >
        Decks
      </p>
      {renderPracticeOrEditButton()}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckNavigation);
