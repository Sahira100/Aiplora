import React, { useState, useRef, useEffect } from "react";

const DropDownMenu = ({
  label = "dropDown",
  direction = "bottom",
  children,
  customButton,
  modalWidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const directionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-center text-xs" ref={modalRef}>
      {customButton ? (
        React.cloneElement(customButton, { onClick: toggleDropdown })
      ) : (
        <button
          onClick={toggleDropdown}
          className="px-1 border rounded-lg text-xs focus:outline-none"
        >
          {label}
        </button>
      )}

      {isOpen && (
        <div
          className={`absolute z-10 min-w-32 ${modalWidth} bg-white border rounded-lg shadow-md ${directionClasses[direction]}`}
        >
          <div className="p-1 pt-3">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
