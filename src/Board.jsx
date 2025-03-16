import React, { useEffect, useState } from "react";
import { Column } from "./Column";
import DeleteCards from "./DeleteCard";
import { DEFAULT_CARDS } from "./Resources/jsondata";

export const Board = () => {
  const [cards, setcards] = useState([]);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    checked && localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);
  useEffect(() => {
    const carddata = localStorage.getItem("cards");
    setcards(carddata ? JSON.parse(carddata) : DEFAULT_CARDS); // we are giving default cards or making user set some cards which persist the refresh state
    setChecked(true);
  }, []);
  return (
    <div className="flex h-full w-full gap-8 overflow-scroll justify-center pt-16">
      <Column
        title="Backlog"
        column="backlog"
        cards={cards}
        setcards={setcards}
        headingcolor="text-gray-200"
      />
      <Column
        title="TODO"
        column="todo"
        cards={cards}
        setcards={setcards}
        headingcolor="text-yellow-500"
      />

      <Column
        title="In Progress"
        column="doing"
        cards={cards}
        setcards={setcards}
        headingcolor="text-green-500"
      />
      <Column
        title="Completed"
        column="done"
        cards={cards}
        setcards={setcards}
        headingcolor="text-blue-500"
      />
      <DeleteCards setCards={setcards} />
    </div>
  );
};
