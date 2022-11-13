import { useState } from "react";

// called in the hook useInput, which is below
const onFieldChangeResetError = (error, resetError) => {
  if (error) {
    resetError();
  }
};

// called in the Register and SignIn components ******************************* custom hook *******************************
export const useInputValue = (initialValue, error, resetError) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event) => {
    setValue(event.target.value);
    onFieldChangeResetError(error, resetError);
  };
  return {
    value,
    onChange: handleChange,
  };
};

// called in the SignIn, Register, and NewDeckOrNewCard components
export const onEnterCallback = (event, callbackFunction) => {
  if (event.code === "Enter") {
    event.preventDefault(); // keeps cursor from going to next line in text area
    return callbackFunction();
  }
};

// called in the NewDeckOrNewCard component
export const setTextAreaHeight = (areaId) => {
  const area = document.getElementById(areaId);
  if (area) {
    area.style.height = "0px";
    area.style.height = area.scrollHeight + 2 + "px";
  }
};

// called in the NewDeckOrNewCard component
export const onBlurSave = (event, callbackFunction) => {
  const relatedTarget = event.relatedTarget;
  const target = event.target;
  if (relatedTarget) {
    if (
      relatedTarget === target.nextSibling ||
      relatedTarget === target.previousSibling
    ) {
      return;
    }
  }
  return callbackFunction();
};
