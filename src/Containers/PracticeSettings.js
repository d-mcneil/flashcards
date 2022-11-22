import React, { useState } from "react";
import { connect } from "react-redux";
import Message from "../components/Message/Message";
import ToggleSwitch from "../components/ToggleSwitch/ToggleSwitch";
import { updateSettings } from "../redux/actions";
import { fetchCallUpdateDeckPracticeSettings } from "../functions/fetchCalls";

const mapStateToProps = (state) => ({
  currentSettings: state.currentDeck.practice.settings,
  userId: state.userStatus.user.userId,
  deckId: state.currentDeck.currentDeck.deckId,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateSettings: (...args) => dispatch(updateSettings(...args)),
});

const PracticeSettings = ({
  currentSettings,
  onUpdateSettings,
  userId,
  deckId,
}) => {
  const [error, setError] = useState("");

  const { definitionFirst, readOutOnFlip } = currentSettings;

  const toggleSwitch = (event) => {
    const settingPropertyName = event.target.value;
    const settingValue = event.target.checked;
    onUpdateSettings(settingPropertyName, settingValue);
    fetchCallUpdateDeckPracticeSettings(userId, deckId, {
      ...currentSettings,
      [settingPropertyName]: settingValue,
    })
      .then((data) => {
        if (data.deckId) {
          if (error) {
            setError("");
          }
        } else {
          setError(data);
        }
      })
      .catch((err) => setError("Error saving updated deck settings: 0"));
  };

  return (
    <>
      <ToggleSwitch
        labelLeft="Term First"
        labelRight="Definition First"
        value="definitionFirst"
        checked={definitionFirst}
        onChange={toggleSwitch}
      />
      <ToggleSwitch
        labelRight="Read Out on Flip"
        value="readOutOnFlip"
        checked={readOutOnFlip}
        onChange={toggleSwitch}
        onAndOff={true}
      />
      {error ? (
        <Message
          message={error}
          wrapperClass="main-error-message" // in index.css
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PracticeSettings);
