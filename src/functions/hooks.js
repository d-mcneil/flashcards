import { useEffect, useState } from "react";

// called in the Register, SignIn, and NewDeckOrCard components
export const useInputValueWithErrorReset = (
  initialValue,
  error,
  resetErrorCallback
) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event) => {
    setValue(event.target.value);
    if (error) {
      resetErrorCallback();
    }
  };
  return {
    value,
    setValue,
    onChange: handleChange,
  };
};

export const useWindowEventHandler = (
  eventHandlerCallback,
  condition = true,
  dependencyArray = [],
  eventType = "keydown"
) => {
  return useEffect(() => {
    if (window && condition) {
      window.addEventListener(eventType, eventHandlerCallback);
      return () => window.removeEventListener(eventType, eventHandlerCallback);
    }
    // the following is a note I made from the implementation of this function in the ScoreCounter component
    //
    // this function produces the following eslint warning:
    //    React Hook useEffect has missing dependencies: 'arrowKeysChangeScore' and 'handleArrowKeys'. Either include them or remove the dependency array
    // however, removing the dependency array makes the event handler unnecessarily detach and reattach
    // and adding handleArrowKeys to the dependencies makes an infinte loop, giving this message:
    //    The 'handleArrowKeys' function makes the dependencies of useEffect Hook (at line 56) change on every render. Move it inside the useEffect callback. Alternatively, wrap the definition of 'handleArrowKeys' in its own useCallback() Hook
    // moving handleArrowKeys inside the useEffect Hook then causes the same problem with the changeScore function,
    // but that function is called elsewhere
    // thus, i could use the useCallback hook to make a memo funciton, but it seems to be making the code unnecessarily long and obfuscatory,
    // when all that's desired is to make the useEffect Hook function like componentDidMount
    // thus, I decided to leave an empty dependencies array (later added error for resetting the error) and disable the eslint warning with the following line:
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyArray);
};
