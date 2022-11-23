import React from "react";
import { connect } from "react-redux";
import { selectVoice } from "../../redux/actions";
import "./LanguageSelector.css";

const mapStateToProps = (state) => ({
  speechSynthesisVoices: state.speechSynthesisVoices.speechSynthesisVoices,
  settingsHaveBeenFetched: state.currentDeck.practice.settingsHaveBeenFetched,
});

const mapDispatchToProps = (dispatch) => ({
  onSelectVoice: (...args) => dispatch(selectVoice(...args)),
});

const LanguageSelector = ({
  label,
  voice,
  speechSynthesisVoices,
  onSelectVoice,
  saveDeckSettingsChanges,
  settingsHaveBeenFetched,
}) => {
  const labelLowercase = label.toLowerCase();
  const selectElementId = `select-${labelLowercase}-language`; // exists for the htmlFor property of the label, not for styling
  const defaultLanguageValue = voice ? voice.name : "select-a-language";

  const handleSelectVoice = (event) => {
    const selectedVoice = event.target.selectedOptions[0];
    const newLangCode = selectedVoice.getAttribute("data-lang");
    const newLangName = selectedVoice.getAttribute("data-name");
    onSelectVoice(newLangName, newLangCode, labelLowercase);
    saveDeckSettingsChanges(
      `${labelLowercase}LanguageCode`,
      newLangCode,
      `${labelLowercase}LanguageName`,
      newLangName
    );
  };

  return (
    <div className="language-selector-wrapper center">
      <label
        className="f6 f5-ns language-selector-label center"
        htmlFor={selectElementId}
      >
        {label} Language
      </label>
      <select
        id={selectElementId}
        key={settingsHaveBeenFetched}
        defaultValue={defaultLanguageValue}
        className="f6 f5-ns center"
        onChange={handleSelectVoice}
      >
        {defaultLanguageValue === "select-a-language" ? (
          <option
            value={"select-a-language"}
            key={"select-a-language"}
            disabled
          >
            Select a Language
          </option>
        ) : (
          <></>
        )}
        {speechSynthesisVoices.map((voice) => {
          return (
            <option
              data-lang={voice.lang}
              data-name={voice.name}
              value={voice.name}
              key={voice.name.replace(" ", "-")}
            >
              {voice.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);
