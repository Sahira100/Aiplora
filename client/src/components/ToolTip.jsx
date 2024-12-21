import { IoMdArrowDropup } from "react-icons/io";

const ToolTip = ({ message, position }) => {
  return (
    <div className={`absolute ${position} flex flex-col items-center `}>
      <div className="relative rounded-full bg-black text-xs whitespace-nowrap">
        <div className="absolute w-full -top-3 flex justify-center text-clip">
          <IoMdArrowDropup size={20} />
        </div>
        <p className=" p-1 px-2 text-center text-white">{message}</p>
      </div>
    </div>
  );
};
export default ToolTip;
