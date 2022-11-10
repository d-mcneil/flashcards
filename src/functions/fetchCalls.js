import mainUrl from "../mainUrl";

// prettier-ignore
export const fetchCallRegister = (firstName, lastName, email, username, password) => {
  return fetch(`${mainUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, username, password }),
  }).then((response) => response.json());
};

export const fetchCallSignIn = (username, password) => {
  return fetch(`${mainUrl}/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((response) => response.json());
};

export const fetchCallGetDecks = (userId) => {
  return fetch(`${mainUrl}/decks/${userId}`).then((response) =>
    response.json()
  );
};

export const fetchCallGetCards = (deckId) => {
  return fetch(`${mainUrl}/cards/${deckId}`).then((response) =>
    response.json()
  );
};
