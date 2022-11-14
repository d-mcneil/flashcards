// called in the SignIn, Register, and NewDeckOrNewCard components
export const onEnterCallback = (event, callbackFunction) => {
  if (event.code === "Enter") {
    event.preventDefault(); // keeps cursor from going to next line in text area
    return callbackFunction();
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

// called in the NewDeckOrNewCard component
export const setTextAreaHeight = (areaId) => {
  const area = document.getElementById(areaId);
  if (area) {
    area.style.height = "0px";
    area.style.height = area.scrollHeight + 2 + "px";
  }
};
