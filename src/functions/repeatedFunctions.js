// called in the SignIn and Register components
export const onEnterCallback = (event, callbackFunction) => {
  if (event.code === "Enter") {
    return callbackFunction();
  }
};

// called in the SignIn and Register components
export const onFieldChangeResetError = (props) => {
  if (props.error) {
    props.resetError();
  }
};
