import { FaRegStopCircle } from "react-icons/fa";

const StopButton = () => {
  return (
    <button className="flex h-7 px-3 justify-center items-center gap-1 cursor-pointer rounded-full bg-white">
      <FaRegStopCircle size={17} />
      <h3>Stop</h3>
    </button>
  );
};

export default StopButton;
