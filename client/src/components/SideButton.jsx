import { useNavigate } from "react-router-dom";

const SideButton = ({ name, to, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      type="button"
      className="pl-4 py-2  w-full text-start flex items-center gap-2 hover:bg-gray-100"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default SideButton;
