import React from "react";
import { MdReplay } from "react-icons/md";

const BotRepeatButton = ({ onSubmit }) => {
  return (
    <button
      type="button"
      className="border p-2 rounded-full"
      onClick={onSubmit}
    >
      <MdReplay rotate="20deg" />
    </button>
  );
};

export default BotRepeatButton;
