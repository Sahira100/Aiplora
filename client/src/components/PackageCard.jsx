import { useDispatch } from "react-redux";
import { setSelectBot } from "../features/bot/botSlice";
import { useNavigate } from "react-router-dom";

const PackageCard = ({ bot, image, name, description, credits }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectBot = () => {
    dispatch(setSelectBot(bot));
    navigate("/chat");
  };

  return (
    <section className="relative cursor-pointer w-48 h-48">
      <div
        className="flex flex-col absolute bg-white w-full border rounded-xl shadow-md p-3 min-h-48 h-full overflow-hidden hover:h-fit hover:z-10 hover:outline hover:outline-gray-300"
        onClick={selectBot}
      >
        <div className="flex text-sm gap-2">
          <img src={image} alt={name} className="w-12 h-12 rounded-lg" />
          <div className="text-xs">
            <h3 className="font-medium">{name}</h3>
            <h3>{credits}</h3>
          </div>
        </div>
        <div className="text-xs grow mt-2 truncate  text-wrap">
          {description}
        </div>
      </div>
    </section>
  );
};

export default PackageCard;
