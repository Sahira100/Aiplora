import { useEffect, useRef, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const SwitchButton = ({ switchBots, onSwitch, className }) => {
  const [active, setActive] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  return (
    <div ref={modalRef} className={className}>
      <div className="relative h-1">
        {active && (
          <div className="absolute bottom-4  bg-white min-w-36 py-2 rounded-lg flex flex-col gap-1 border shadow  h-fit">
            {switchBots.length < 1 && (
              <div className="text-center">Loading...</div>
            )}
            {switchBots.map((bot, index) => (
              <button
                className="flex text-sm items-center gap-2 hover:bg-gray-100 px-2 py-1 cursor-pointer "
                key={index}
                onClick={() => {
                  setActive(false);
                  onSwitch(bot);
                }}
              >
                <div className="h-4 w-4 rounded-sm overflow-hidden">
                  <img src={bot.image} alt={bot.name} />
                </div>
                <h3 className="whitespace-nowrap">{bot.name}</h3>
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        className="px-2 py-2 text-xs font-medium  text-black  border rounded-full flex items-center gap-2"
        onClick={() => setActive(!active)}
      >
        Switch <FaAngleUp />
      </button>
    </div>
  );
};

export default SwitchButton;
