import React, { useState } from "react";
import { connect } from "react-redux";
import Message from "../components/Message/Message";
import ToggleSwitch from "../components/ToggleSwitch/ToggleSwitch";
import { updateSettings } from "../redux/actions";
import { fetchCallUpdateDeckPracticeSettings } from "../functions/fetchCalls";
import PracticeSettingsHeader from "../components/PracticeSettingsHeader/PracticeSettingsHeader";
import PracticeDeckPercentageInput from "../components/PracticeDeckPercentageInput/PracticeDeckPercentageInput";
import LanguageSelector from "../components/LanguageSelector/LanguageSelector";

const mapStateToProps = (state) => ({
  currentSettings: state.currentDeck.practice.settings,
  userId: state.userStatus.user.userId,
  deckId: state.currentDeck.currentDeck.deckId,
  speechSynthesisVoices: state.speechSynthesisVoices.speechSynthesisVoices,
  termVoice: state.currentDeck.practice.termSpeechSynthesisVoice,
  definitionVoice: state.currentDeck.practice.definitionSpeechSynthesisVoice,
  sampleUser: state.userStatus.sampleUser,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateSettings: (...args) => dispatch(updateSettings(...args)),
});

const PracticeSettings = ({
  currentSettings,
  onUpdateSettings,
  userId,
  deckId,
  speechSynthesisVoices,
  termVoice,
  definitionVoice,
  sampleUser,
}) => {
  const [error, setError] = useState("");
  const [menuExpanded, setMenuExpanded] = useState(false);

  const { definitionFirst, readOutOnFlip } = currentSettings;

  const saveDeckSettingsChanges = (
    settingPropertyName1,
    settingValue1,
    settingPropertyName2 = undefined,
    settingValue2 = undefined
  ) => {
    if (sampleUser) {
      return;
    }
    return fetchCallUpdateDeckPracticeSettings(userId, deckId, {
      ...currentSettings,
      [settingPropertyName1]: settingValue1,
      [settingPropertyName2]: settingValue2,
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
        {speechSynthesisVoices.length ? (
          <ToggleSwitch
            labelRight="Read Out on Flip"
            value="readOutOnFlip"
            checked={readOutOnFlip}
            onChange={toggleSwitch}
            onAndOff={true}
          />
        ) : (
          <></>
        )}
        <PracticeDeckPercentageInput
          saveDeckSettingsChanges={saveDeckSettingsChanges}
          error={error}
          setError={setError}
        />
        {speechSynthesisVoices.length ? (
          <>
            <LanguageSelector
              label="Term"
              voice={termVoice}
              saveDeckSettingsChanges={saveDeckSettingsChanges}
            />
            <LanguageSelector
              label="Definition"
              voice={definitionVoice}
              saveDeckSettingsChanges={saveDeckSettingsChanges}
            />
          </>
        ) : (
          <></>
        )}
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
