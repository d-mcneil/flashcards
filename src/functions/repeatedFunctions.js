export const onEnterSubmit = (event, callbackFunction) => {
  if (event.code === "Enter") {
    return callbackFunction();
  }
};
