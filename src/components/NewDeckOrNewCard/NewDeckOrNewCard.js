import React, { Component } from "react";
import { connect } from "react-redux";
// prettier-ignore
import { setTextAreaHeight, onEnterCallback, onBlurSave } from "../../functions/repeatedFunctions";
import Message from "../Message/Message";
import "./NewDeckOrNewCard.css";

const mapDispatchToProps = (dispatch) => ({
  onSave: (deckOrCard, actionAddDeckOrCardCallback) =>
    dispatch(actionAddDeckOrCardCallback(deckOrCard)),
});

const initialState = {
  mainField: "",
  secondaryField: "",
  error: "",
};

class NewDeckOrNewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainField: "",
      secondaryField: "",
      error: "",
    };
  }

  onMainFieldChange = (event) => {
    this.setState({ mainField: event.target.value });
  };

  onSecondaryFieldChange = (event) => {
    this.setState({ secondaryField: event.target.value });
  };

  save = () => {
    const {
      onSave,
      userId,
      deckId, // undefined if component is for making a new deck, defined if for making a new card
      validationCallback, // validateDeckName or validateNewCardInput "../../functions/validateInput"
      fetchCallback, // fetchCallCreateDeck or fetchCallCreateCard from "../../functions/fetchCalls"
      actionAddDeckOrCardCallback, // addDeck or addCard from "../../redux/actions"
      idPropertyName, // deckId or cardId
    } = this.props;
    const { mainField, secondaryField } = this.state;
    const validity = validationCallback(mainField, secondaryField);
    // returns object with properties { valid, reason(not in every case) }
    if (!validity.valid) {
      if (validity.reason) {
        this.setState({ error: validity.reason });
      }
      return;
    }
    fetchCallback(userId, mainField, secondaryField, deckId)
      .then((data) => {
        if (data[`${idPropertyName}`]) {
          onSave(data, actionAddDeckOrCardCallback);
          for (const item of document.getElementsByClassName(
            "reset-new-deck-or-card-info"
          )) {
            item.value = "";
          }
          this.setState(initialState);
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) =>
        this.setState({
          error: `Error saving new ${idPropertyName.replace("Id", "")}: 0`,
        })
      );
  };

  componentDidMount() {
    setTextAreaHeight("new-text-area");
  }

  render() {
    const { error } = this.state;
    const {
      maxLengthMainField, // {100} for deck name or {255} for term
      maxLengthSecondaryField, // {undefined} for deck description or {255} for definition
      mainFieldPlaceholder, // "Enter New Deck Name" or "Enter New Term"
      secondaryFieldPlaceholder, // "Enter New Deck Description (Optional)" or "Enter New Definition"
    } = this.props;
    return (
      <div className="new-deck-or-card-grid center">
        {/* **************start deck name / card term***************** */}
        <input
          type="text"
          maxLength={maxLengthMainField}
          onChange={this.onMainFieldChange}
          onKeyDown={(event) => onEnterCallback(event, this.save)}
          onBlur={(event) => {
            onBlurSave(event, this.save);
          }}
          placeholder={mainFieldPlaceholder}
          className="new-deck-name-or-card-term reset-new-deck-or-card-info f3-ns f4 outline-hover"
        ></input>

        {/* **************start deck description / card definition***************** */}
        <textarea
          maxLength={maxLengthSecondaryField}
          onChange={(event) => {
            setTextAreaHeight("new-text-area");
            this.onSecondaryFieldChange(event);
          }}
          onKeyDown={(event) => onEnterCallback(event, this.save)}
          onBlur={(event) => {
            onBlurSave(event, this.save);
          }}
          placeholder={secondaryFieldPlaceholder}
          className="new-deck-description-or-card-definition reset-new-deck-or-card-info outline-hover f6"
          id="new-text-area"
        ></textarea>

        {/* **************start save button***************** */}
        {/* alternate save button if I decide to get rid of the onBlur action for saving
        <div
            onClick={this.save}
            className="f6 f5-ns mt3 mb2 dim pointer"
            style={{ alignSelf: "end", justifySelf: "center" }}
          >
            Save
          </div> */}

        {/* **************start error notification***************** */}
        {error ? (
          <Message
            message={error}
            wrapperClass="new-deck-or-card-error-message"
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(NewDeckOrNewCard);
