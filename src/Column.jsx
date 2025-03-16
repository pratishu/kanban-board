import React, { useState } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
import Dropindicator from "./Dropindicator";

export const Column = ({ title, column, cards, setcards, headingcolor }) => {
  const [active, setActive] = useState(false); // to turn off or on the column highlighting when we move the card from one column to another

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId"); // cardid is already stored before on event, when handledragstart fire up.

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return; // for typescript purpose : which we might include later.
      // cardToTransfer.column = column; // editing the card
      cardToTransfer = { ...cardToTransfer, column }; // this is neat trick for above line too.

      copy = copy.filter((c) => c.id !== cardId);

      // below case will only become true if we are pushing to bottom of the column
      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return; // EDGE case check

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setcards(copy);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // so that where you drop will give you droppable sign in browser.
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`)); // we have to use [data-column="${column}"] instead of data-column="${column}" coz we are trying to get all element with dota-column={column} attribute, but when we do second method, we are trying to find <data-column="todo"> which dont exist. //why this happen: no idea
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  // filteredcards for columns: filter through the cards(which comes from usestate propped drilled through parent component) and contain only those objects cards which verify the column name(which comes from the parent component prop)
  const filteredCards = cards.filter((c) => c.column === column);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  return (
    <div className="w-72 shrink-0">
      {/* title section */}
      <div className="flex justify-between items-center mb-3">
        <h3 className={`font-bold text-xl ${headingcolor}`}>{title}</h3>
        <span className={`rounded text-xl border-2 px-2 ${headingcolor}`}>
          {filteredCards.length}
        </span>
      </div>

      {/* cards section */}
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-zinc-900/50" : "bg-zinc-900/0"
        }`}
      >
        {filteredCards.map((card) => (
          <Card key={card.id} {...card} handleDragStart={handleDragStart} />
        ))}
        {/* We are putting here one more cause there should be one below all the cards as all other indicators are in the cards itself */}
        <Dropindicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setcards} />
      </div>
    </div>
  );
};
