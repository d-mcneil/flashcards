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

export const fetchCallGetDecksOrCards = (id, decksOrCards = "decks") => {
  return fetch(`${mainUrl}/${decksOrCards}/${id}`).then((response) =>
    response.json()
  );
};

export const fetchCallCreateDeck = (userId, deckName, description) => {
  return fetch(`${mainUrl}/create-deck`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, deckName, description }),
  }).then((response) => response.json());
};

export const fetchCallCreateCard = (userId, term, definition, deckId) => {
  return fetch(`${mainUrl}/create-card`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, deckId, term, definition }),
  }).then((response) => response.json());
};

export const fetchCallDeleteDeck = (userId, deckId) => {
  return fetch(`${mainUrl}/delete-deck`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, deckId }),
  }).then((response) => response.json());
};

export const fetchCallDeleteUser = (userId, username) => {
  return fetch(`${mainUrl}/delete-user`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, username }),
  }).then((response) => response.json());
};
