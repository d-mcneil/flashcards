// prettier-ignore
export const validateRegistration = (firstName, lastName, email, username, password) => {
  if (!firstName || !lastName || !email || !username || !password) {
    return {
      valid: false,
      reason: "Incorrect form submission: all fields are required",
    };
  } else if (firstName.length > 100) {
    return {
      valid: false,
      reason:
        "Invalid form submission: first name must be no more than 100 characters long",
    };
  } else if (lastName.length > 100) {
    return {
      valid: false,
      reason:
        "Invalid form submission: last name must be no more than 100 characters long",
    };
  } else if (email.length > 100) {
    return {
      valid: false,
      reason:
        "Invalid form submission: email must be no more than 100 characters long",
    };
  } else if (username.length > 100) {
    return {
      valid: false,
      reason:
        "Invalid form submission: username must be no more than 100 characters long",
    };
  } else if (
    !email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return {
      valid: false,
      reason: "Invalid form submission: email is not valid.",
    };
  }
  return { valid: true };
};

export const validateSignIn = (username, password) => {
  if (!username || !password) {
    return {
      valid: false,
      reason: "Incorrect form submission: all fields are required.",
    };
  } else if (username.length > 100) {
    return {
      valid: false,
      reason: "Invalid combination of username and password",
    };
  }
  return { valid: true };
};

export const validateDeckName = (deckName) => {
  if (!deckName) {
    return {
      valid: false,
      // reason: "Invalid submission: deck name is required."
    };
  } else if (deckName.length > 100) {
    return {
      valid: false,
      reason:
        "Invalid submission: deck name must be no more than 100 characters long.",
    };
  }
  return { valid: true };
};

export const validateCardInput = (term, definition) => {
  if (!term || !definition) {
    return {
      valid: false,
      // reason: "Invalid submission: both term and definition are required."
    };
  } else if (term.length > 255) {
    return {
      valid: false,
      reason:
        "Invalid submission: term must be no more than 255 characters long.",
    };
  } else if (definition.length > 255) {
    return {
      valid: false,
      reason:
        "Invalid submission: definition must be no more than 100 characters long.",
    };
  }
  return { valid: true };
};
