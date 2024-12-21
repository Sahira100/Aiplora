import { useState } from "react";
import ToolTip from "./ToolTip";

const BotCircleButton = ({ bot, active = false, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative w-14 h-14 rounded-full  flex flex-col items-center outline outline-1 outline-gray-300  ${
        active
          ? "outline-4"
          : "hover:outline-4 hover:outline-offset-1 hover:outline-gray-100"
      } cursor-pointer  `}
      onClick={() => onClick(bot)}
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && <ToolTip message={bot.name} position={"-bottom-8"} />}

      <img src={bot.image} alt={bot.name} className="rounded-full" />
    </div>
  );
};

export default BotCircleButton;
