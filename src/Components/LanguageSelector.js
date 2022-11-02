import { Component } from "react";
import React from "react";

class LanguageSelector extends Component {
  selectVoice = (event) => {
    const {
      matchVoices,
      voices,
      setSpeechSynthesisVoice,
      label,
      setNewLanguage,
    } = this.props;
    const language = event.target.selectedOptions[0].getAttribute("data-name");
    const voice = matchVoices(voices, language);
    setSpeechSynthesisVoice(voice, language, label);
    setNewLanguage(language);
  };

  render() {
    const { label, voices, language, matchVoices } = this.props;
    const matchingName = matchVoices(voices, language).name;
    const defaultLanguageValue = matchingName ? language : "select-a-language";
    return (
      <div
        style={{ display: "grid", gridTemplateColumns: "auto 1fr auto" }}
        className="w-100 f6 f5-ns mt3"
      >
        <label
          style={{ gridColumn: "2/3" }}
          className="db tc mb1"
          htmlFor={`${label} Language`}
        >
          {label} Language
        </label>
        <select
          id={`select-${label}-language`}
          onChange={this.selectVoice}
          style={{
            gridColumn: "2/3",
            width: "min-content",
            justifySelf: "center",
          }}
          className="pointer tc"
          defaultValue={defaultLanguageValue}
          key={defaultLanguageValue}
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
          {voices
            .filter((voice) => !voice.localService)
            .map((voice) => {
              const cleanVoiceName = voice.name
                .replace("Google ", "")
                .replace("Google", "");
              return (
                <option
                  data-lang={voice.lang}
                  data-name={voice.name}
                  value={voice.name}
                  key={cleanVoiceName.replace(" ", "-")}
                  // key={voice.name.replace(" ", "-")}
                >
                  {cleanVoiceName}
                  {/* {voice.name} */}
                </option>
              );
            })}
        </select>
      </div>
    );
  }
}

export default LanguageSelector;
