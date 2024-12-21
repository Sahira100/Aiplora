import React from "react";

const ClearContextButton = ({ className, onClearContext }) => {
  return (
    <button
      className={`border px-2 py-2 rounded-full ${className}  text-black  font-medium`}
      onClick={onClearContext}
    >
      <h3 className="text-xs">Clear Context</h3>
    </button>
  );
};

export default ClearContextButton;
