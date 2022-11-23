import React, { useState } from "react";
import { connect } from "react-redux";
import Message from "../components/Message/Message";
import ToggleSwitch from "../components/ToggleSwitch/ToggleSwitch";
import { updateSettings } from "../redux/actions";
import { fetchCallUpdateDeckPracticeSettings } from "../functions/fetchCalls";
import PracticeSettingsHeader from "../components/PracticeSettingsHeader/PracticeSettingsHeader";
import PracticeDeckPercentageInput from "../components/PracticeDeckPercentageInput/PracticeDeckPercentageInput";

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
  const [menuExpanded, setMenuExpanded] = useState(false);

  const { definitionFirst, readOutOnFlip } = currentSettings;

  const saveDeckSettingsChanges = (settingPropertyName, settingValue) => {
    return fetchCallUpdateDeckPracticeSettings(userId, deckId, {
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

  const toggleSwitch = (event) => {
    const { value, checked } = event.target;
    onUpdateSettings(value, checked);
    saveDeckSettingsChanges(value, checked);
  };

  const handleExpandSettingsMenu = () => {
    document
      .getElementById("practice-settings-wrapper")
      .classList.toggle("hide");
    if (menuExpanded) {
      setMenuExpanded(false);
    } else {
      setMenuExpanded(true);
    }
  };

  return (
    <>
      <PracticeSettingsHeader
        menuExpanded={menuExpanded}
        handleExpandSettingsMenu={handleExpandSettingsMenu}
      />
      <div
        id="practice-settings-wrapper" // used for toggling the hide class, not for styling directly
        className="hide" // in index.css
      >
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
        <PracticeDeckPercentageInput
          saveDeckSettingsChanges={saveDeckSettingsChanges}
          error={error}
          setError={setError}
        />
        {error ? (
          <Message
            message={error}
            wrapperClass="main-error-message" // in index.css
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PracticeSettings);
