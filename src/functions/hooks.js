import { useState } from "react";

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

export const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event) => setValue(event.target.value);
  return {
    value,
    setValue,
    onChange: handleChange,
  };
};
