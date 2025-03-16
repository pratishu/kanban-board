import React, { useState } from "react";
import { FaFire, FaTrash } from "react-icons/fa";
const DeleteCards = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    // e.datatransfer.getdata have already set up cardid when we start to move the card from the column
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-80 w-80 shrink-0 place-content-center rounded-lg border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-gray-500 bg-gray-500/20 text-gray-500"
      }`}
    >
      {active ? (
        <FaFire className="animate-bounce text-4xl" />
      ) : (
        <FaTrash className="text-4xl" />
      )}
    </div>
  );
};
export default DeleteCards;
