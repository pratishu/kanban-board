import React from "react";
const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"} // to find out the before id : means if we are dropping on position 2 , before id will be 3.
      // data-before and data-column attribute will be used to get all the dropindicator in the column later: by using document.queryselectorall([data-column=${column}])
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-blue-400 opacity-0"
    />
  );
};
export default DropIndicator;
