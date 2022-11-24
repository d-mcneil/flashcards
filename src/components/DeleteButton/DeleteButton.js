import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./DeleteButton.css";

const DeleteButton = ({ deleteCallback }) => {
  return (
    <div
      onClick={deleteCallback}
      className="delete-button f5 f4-ns dim pointer"
      // alternate delete button with text instead of the trash can
      // className="deck-delete-button f6 f5-ns mb3 mt2 dim" > Delete
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </div>
  );
};

export default DeleteButton;
