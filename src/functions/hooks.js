import { useState } from "react";

// called in the Register and SignIn components
export const useInputValueWithErrorReset = (
  initialValue,
  error,
  resetError
) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event) => {
    setValue(event.target.value);
    if (error) {
      resetError();
    }
  };
  return {
    value,
    onChange: handleChange,
  };
};

// called in the NewDeckOrCard component
export const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event) => setValue(event.target.value);
  return {
    value,
    setValue,
    onChange: handleChange,
  };
};
