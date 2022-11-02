import { Component } from "react";
import React from "react";

class LanguageSelector extends Component {
  //   voiceOptions = () => {
  //     const { voices } = this.props;
  //     return (
  //       // {
  //       voices.map((voice) => {
  //         if (!voice.localService) {
  //           const voiceName = voice.name
  //             .replace("Google ", "")
  //             .replace("Google", "");
  //           return (
  //             <option data-lang={voice.lang}>
  //               {voiceName} {voice.lang}
  //             </option>
  //           );
  //         } else {
  //           return <></>;
  //         }
  //       })
  //       // }
  //     );
  //   };

  //     componentDidMount() {
  //     const { label, voices } = this.props;
  //     const synth = window.speechSynthesis;
  //     const voiceSelect = document.getElementById(`select-${label}-language`);
  //     // const voices = synth.getVoices();

  //     for (let i = 0; i < voices.length; i++) {
  //       if (!voices[i].localService) {
  //         const option = document.createElement("option");
  //         option.textContent = `${voices[i].name} (${voices[i].lang})`
  //           .replace("Google ", "")
  //           .replace("Google", "");

  //         //   if (voices[i].default) {
  //         //     option.textContent += " — DEFAULT";
  //         //   }

  //         option.setAttribute("data-lang", voices[i].lang);
  //         // option.setAttribute("data-name", voices[i].name);
  //         voiceSelect.appendChild(option);
  //       }
  //     }
  //   }

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
    const defaultLanguageValue = matchingName ? language : "Select a Langauge";
    // let defaultLanguageValue;
    // if (voices.length) {
    //   const voicesThatMatchUsersSelectedLanguage = voices.filter(
    //     (voice) => voice.name === language
    //   );
    //   if (voicesThatMatchUsersSelectedLanguage.length) {
    //     defaultLanguageValue = voicesThatMatchUsersSelectedLanguage[0].name;
    //     console.log(voicesThatMatchUsersSelectedLanguage[0]);
    //   } else {
    //     defaultLanguageValue = "Select a Language";
    //   }
    // } else {
    //   defaultLanguageValue = "Select a Language";
    // }

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
        >
          <option value={"select-a-language"} disabled>
            Select a Language
          </option>
          {voices.map((voice) => {
            if (!voice.localService) {
              const cleanVoiceName = voice.name
                .replace("Google ", "")
                .replace("Google", "");
              return (
                <option
                  data-lang={voice.lang}
                  data-name={voice.name}
                  value={voice.name}
                  key={cleanVoiceName.replace(" ", "-")}
                >
                  {cleanVoiceName}
                </option>
              );
            } else {
              return <></>;
            }
          })}
        </select>
      </div>
    );
  }
}

export default LanguageSelector;
