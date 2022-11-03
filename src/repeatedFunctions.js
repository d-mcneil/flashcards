// prevent saving the card/deck if the relatedTarget of the onBlur is a sibling element of the field being edited
export const handleOnBlur = (event, callbackFunction) => {
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

export const onEnterSave = (event, callbackFunction) => {
  if (event.code === "Enter") {
    event.preventDefault(); // keeps cursor from going to next line in text area
    return callbackFunction();
  }
};

export const setAreaHeight = (areaId) => {
  const area = document.getElementById(areaId);
  if (area) {
    area.style.height = "0px";
    area.style.height = area.scrollHeight + 2 + "px";
  }
};