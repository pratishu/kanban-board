import { motion } from "framer-motion";
import React from "react";
import DropIndicator from "./Dropindicator";

const Card = ({ title, id, column, handleDragStart }) => {
  return (
    <>
      {/* we are making drop indicator line with div and only will activated when cards will hover over it: other function in column are implimenting that */}
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded-lg border-2 border-gray-500 bg-zinc-800/20 p-3 active:cursor-grabbing"
      >
        <p className="font-medium text-gray-100">{title}</p>
      </motion.div>
    </>
  );
};
export default Card;
