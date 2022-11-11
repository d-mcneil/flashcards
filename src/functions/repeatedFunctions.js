// called in the SignIn, Register, NewDeck, and NewCard components
export const onEnterCallback = (event, callbackFunction) => {
  if (event.code === "Enter") {
    event.preventDefault(); // keeps cursor from going to next line in text area
    return callbackFunction();
  }
};

// called in the SignIn and Register components
export const onFieldChangeResetError = (props) => {
  if (props.error) {
    props.resetError();
  }
};

// called in the NewDeck component
export const setTextAreaHeight = (areaId) => {
  const area = document.getElementById(areaId);
  if (area) {
    area.style.height = "0px";
    area.style.height = area.scrollHeight + 2 + "px";
  }
};
