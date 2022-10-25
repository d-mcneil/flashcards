export const handleOnBlur = (event, callbackFunction) => {
  if (event.relatedTarget) {
    if (
      event.relatedTarget === event.target.nextSibling ||
      event.relatedTarget === event.target.previousSibling
    ) {
      return;
    }
  }
  callbackFunction();
};

export const onEnterSave = (event, callbackFunction) => {
  if (event.code === "Enter") {
    event.preventDefault(); // keeps cursor from going to next line in text area
    callbackFunction();
  }
};
