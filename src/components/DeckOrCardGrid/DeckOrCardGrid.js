import React from "react";
import "./DeckOrCardGrid.css";

const DeckOrCardGrid = ({ newItem = false, children }) => {
  const gridClass = newItem ? "new-item-grid" : "existing-item-grid";

  return (
    <div className={`deck-or-card-grid center ${gridClass}`}>{children}</div>
  );
};

export default DeckOrCardGrid;
