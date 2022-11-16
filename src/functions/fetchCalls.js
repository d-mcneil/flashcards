import mainUrl from "../mainUrl";
const headers = { "Content-Type": "application/json" };
const responseToJson = (res) => res.json();

// ************************************************* get *************************************************
export const fetchCallGetDecksOrCards = (id, decksOrCards = "decks") => {
  return fetch(`${mainUrl}/${decksOrCards}/${id}`).then(responseToJson);
};

// ************************************************* post *************************************************
// prettier-ignore
export const fetchCallRegister = (firstName, lastName, email, username, password) => {
  return fetch(`${mainUrl}/register`, {
    method: "POST",
    headers,
    body: JSON.stringify({ firstName, lastName, email, username, password }),
  }).then(responseToJson);
};

export const fetchCallSignIn = (username, password) => {
  return fetch(`${mainUrl}/sign-in`, {
    method: "POST",
    headers,
    body: JSON.stringify({ username, password }),
  }).then(responseToJson);
};

export const fetchCallCreateDeck = (userId, deckName, description) => {
  return fetch(`${mainUrl}/create-deck`, {
    method: "POST",
    headers,
    body: JSON.stringify({ userId, deckName, description }),
  }).then(responseToJson);
};

export const fetchCallCreateCard = (userId, term, definition, deckId) => {
  return fetch(`${mainUrl}/create-card`, {
    method: "POST",
    headers,
    body: JSON.stringify({ userId, deckId, term, definition }),
  }).then(responseToJson);
};

// ************************************************* put *************************************************
export const fetchCallUpdateDeckOrCard = (
  userId,
  secondaryId, // deckId or cardId
  primaryColumn, // deckName or term
  secondaryColumn, // description or definition
  deckOrCard // "deck" or "card"
) => {
  return fetch(`${mainUrl}/update-${deckOrCard}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      userId,
      secondaryId,
      primaryColumn,
      secondaryColumn,
    }),
  }).then(responseToJson);
};

export const fetchCallUpdateCardScore = (userId, cardId, incrementValue) => {
  return fetch(`${mainUrl}/update-card-score`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ userId, cardId, incrementValue }),
  }).then(responseToJson);
};

// ************************************************* delete *************************************************
export const fetchCallDelete = (
  userId,
  secondaryId, // deckId, cardId, or username
  deckCardOrUser // "deck", "card", or "user"
) => {
  return fetch(`${mainUrl}/delete-${deckCardOrUser}`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ userId, secondaryId }),
  }).then(responseToJson);
};
