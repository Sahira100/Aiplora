import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

const CartItem = () => {
  return (
    <div className="bg-gray-100 min-h-20 max-h-20 flex p-1 gap-3 rounded-lg">
      <div className="min-w-24 h-full bg-gray-200 rounded-lg"></div>
      <div className="grow flex flex-col justify-between">
        <div className="text-xs font-medium text-ellipsis overflow-hidden">
          All gpt models includes GPT-4o, GPT-4, GPT-4+{" "}
          <span className="text-blue-500 underline">See more..</span>
        </div>
        <div className="flex justify-between text-xs">
          <div className=" text-red-400 h-1/4 underline" onClick={() => {}}>
            Remove
          </div>
          <div>$ 0.99</div>
        </div>
      </div>
      <div className="min-w-6 flex flex-1 flex-col justify-between">
        <button
          type="button"
          className="flex text-gray-500 items-center  justify-center p-1 bg-gray-200 rounded-sm"
        >
          <FiPlus />
        </button>
        <div className="text-center">1</div>
        <button
          type="button"
          className="flex text-gray-500 items-center justify-center p-1 bg-gray-200 rounded-sm"
        >
          <FiMinus />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
