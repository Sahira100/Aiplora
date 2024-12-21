import React from "react";
import { CgSpinner } from "react-icons/cg";

const ChatResponseLoader = ({ name, image, loading }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-5 h-5 rounded-md bg-gray-200 overflow-hidden">
        <img src={image} alt={name} />
      </div>
      <p>{name}</p>
      {loading && (
        <div className="animate-spin w-4 h-4 flex items-center ">
          <CgSpinner size={40} />
        </div>
      )}
    </div>
  );
};

export default ChatResponseLoader;
