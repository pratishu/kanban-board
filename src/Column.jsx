import React, { useState } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
import Dropindicator from "./Dropindicator";

export const Column = ({ title, column, cards, setcards, headingcolor }) => {
  const [active, setactive] = useState(false); // so we can highlight the column later.
  const filteredcards = cards.filter((card) => card.column === column);
  // console.log(filteredcards); // for debugging

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  return (
    <div className="w-72 shrink-0">
      {/* title section */}
      <div className="flex justify-between items-center mb-3">
        <h3 className={`font-bold text-xl ${headingcolor}`}>{title}</h3>
        <span className={`rounded text-xl border-2 px-2 ${headingcolor}`}>
          {filteredcards.length}
        </span>
      </div>

      {/* cards section */}
      <div>
        {filteredcards.map((card) => (
          <Card key={card.id} {...card} handleDragStart={handleDragStart} />
        ))}
        {/* We are putting here one more cause there should be one below all the cards as all other indicators are in the cards itself */}
        <Dropindicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setcards} />
      </div>
    </div>
  );
};
