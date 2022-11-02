import React from "react";
import LanguageSelector from "../Components/LanguageSelector";

const PracticeSettings = ({
  definitionFirst,
  toggleSwitch,
  initialDeckPercentage,
  deckPercentage,
  termLanguage,
  definitionLanguage,
  updatePracticeCards,
  saveDeckSettings,
  voices,
  matchVoices,
  setSpeechSynthesisVoice,
}) => {
  const setNewTermLanguage = (newTermLanguage) => {
    if (newTermLanguage === termLanguage) {
      return;
    }
    saveDeckSettings(
      definitionFirst,
      deckPercentage,
      newTermLanguage,
      definitionLanguage
    );
  };
  const setNewDefinitionLanguage = (newDefinitionLanguage) => {
    if (newDefinitionLanguage === definitionLanguage) {
      return;
    }
    saveDeckSettings(
      definitionFirst,
      deckPercentage,
      termLanguage,
      newDefinitionLanguage
    );
  };
  return (
    <>
      <div className="f3-ns f4 w-100 mt4 mb4" style={{ textAlign: "center" }}>
        Settings
      </div>
      {/* **************start term/definition first toggle switch***************** */}
      <div
        className="w-100"
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          gridTemplateColumns: "1fr auto 1fr",
        }}
      >
        <span
          className="pr2 f6 f5-ns settings-definition-first "
          style={{ justifySelf: "end" }}
        >
          Term First
        </span>

        <label className="switch">
          <input
            type="checkbox"
            value="definition-first"
            id="definition-first"
            checked={definitionFirst}
            onChange={toggleSwitch}
          ></input>
          <span className="slider round"></span>
        </label>

        <span
          className="pl2 f6 f5-ns settings-definition-first"
          style={{ justifySelf: "start" }}
        >
          Definition First
        </span>
      </div>
      {/* **************start deck percentage input***************** */}
      <div
        className="w-100 f6 f5-ns mt3"
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          gridTemplateColumns: "1fr auto 1fr",
        }}
      >
        <div style={{ justifySelf: "end" }}>Practice</div>
        <input
          type="number"
          className="tc bn mh1 pa1"
          id="percentage"
          style={{ width: "2.5em", cursor: "text" }}
          min={1}
          max={100}
          defaultValue={initialDeckPercentage}
          placeholder={deckPercentage}
          onChange={updatePracticeCards}
          onBlur={() =>
            saveDeckSettings(
              definitionFirst,
              deckPercentage,
              termLanguage,
              definitionLanguage
            )
          }
        ></input>
        <div style={{ justifySelf: "start" }}>% of Deck</div>
      </div>
      {/* **************start language selection input***************** */}
      <LanguageSelector
        label="Term"
        voices={voices}
        language={termLanguage}
        setNewLanguage={setNewTermLanguage}
        matchVoices={matchVoices}
        setSpeechSynthesisVoice={setSpeechSynthesisVoice}
      />
      <LanguageSelector
        label="Definition"
        voices={voices}
        language={definitionLanguage}
        setNewLanguage={setNewDefinitionLanguage}
        matchVoices={matchVoices}
        setSpeechSynthesisVoice={setSpeechSynthesisVoice}
      />
    </>
  );
};

export default PracticeSettings;
