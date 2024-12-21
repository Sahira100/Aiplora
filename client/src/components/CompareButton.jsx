import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const CompareButton = ({ onCompare }) => {
  const [active, setActive] = useState(false);
  const { bots } = useSelector((state) => state.bot);

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
    <div ref={modalRef}>
      <button
        className="p-2 py-1 border rounded-full flex items-center gap-1"
        onClick={() => setActive(!active)}
      >
        Compare <FaAngleDown />
      </button>
      <div className="relative h-1">
        {active && (
          <div className="absolute left-0 inset-y-1  bg-white min-w-36 py-2 rounded-lg flex flex-col gap-1 border shadow h-fit  max-h-52 overflow-y-auto ">
            {bots.map((bot, index) => (
              <button
                className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 cursor-pointer "
                key={index}
                onClick={() => {
                  setActive(false);
                  onCompare(bot);
                }}
              >
                <div className="h-4 w-4 rounded-sm overflow-hidden">
                  <img src={bot.image} alt={bot.name} />
                </div>
                <h3 className="text-sm whitespace-nowrap">{bot.name}</h3>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default CompareButton;
