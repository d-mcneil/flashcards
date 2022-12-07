import { fetchCallUpdateDeckOrCard } from "./fetchCalls";

// called in the SignIn, Register, and NewDeckOrNewCard components
export const onEnterCallback = (event, callbackFunction) => {
  if (event.code === "Enter") {
    event.preventDefault(); // keeps cursor from going to next line in text area
    return callbackFunction();
  }
};

// called in the NewDeckOrNewCard component
export const onBlurSave = (event, callbackFunction) => {
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

// called in the NewDeckOrNewCard component
export const setTextAreaHeight = (areaId) => {
  const area = document.getElementById(areaId);
  if (area) {
    area.style.height = "0px";
    area.style.height = area.scrollHeight + 2 + "px";
  }
};

export const saveChangesDeckOrCard = (
  mainFieldCurrentValue,
  mainFieldNewValue,
  secondaryFieldCurrentValue,
  secondaryFieldNewValue,
  validationCallback, // validateDeckName or validateCardInput
  setErrorCallback,
  actionCallback, // updateDeck or updateCard
  userId,
  secondaryId, // deckId or cardId
  deckOrCard, // 'deck' or 'card'
  sampleUser // true or false
) => {
  // prettier-ignore
  if (mainFieldCurrentValue === mainFieldNewValue && secondaryFieldCurrentValue === secondaryFieldNewValue) {
    return; // this prevents sending information to the server if it's exactly the same as what it already has
  }

  // prettier-ignore
  const validity = validationCallback( mainFieldNewValue,secondaryFieldNewValue );
  if (!validity.valid) {
    if (validity.reason) {
      setErrorCallback(validity.reason);
    }
    return;
  }

  if (sampleUser) {
    actionCallback(mainFieldNewValue, secondaryFieldNewValue, secondaryId);
    return;
  }

  // prettier-ignore
  fetchCallUpdateDeckOrCard(userId, secondaryId, mainFieldNewValue, secondaryFieldNewValue, deckOrCard)
  .then(data => {
      if (data[deckOrCard + 'Id'] === secondaryId) {
        actionCallback(mainFieldNewValue, secondaryFieldNewValue, secondaryId);
      } else {
        setErrorCallback(data)
      }
  }).catch(err => setErrorCallback(`Error updating ${deckOrCard}: 0`))
};

export const sortDecksOrCards = (
  actionLoadCallback,
  cardsOrDecksToSort,
  sortProperty,
  descending = true
) => {
  if (descending) {
    return actionLoadCallback(
      cardsOrDecksToSort.sort(
        (a, b) => b[`${sortProperty}`] - a[`${sortProperty}`]
      )
    );
  } else {
    return actionLoadCallback(
      cardsOrDecksToSort.sort(
        (a, b) => a[`${sortProperty}`] - b[`${sortProperty}`]
      )
    );
  }
};
