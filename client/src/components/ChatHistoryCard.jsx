import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDownMenu from "./DropDownMenu";
import { MdDeleteOutline } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const ChatHistoryCard = ({ name, hint, chatId }) => {
  const id = useParams();
  const navigate = useNavigate();

  const navigateToTheChat = () => {
    navigate(`/chat/${chatId}`, { replace: true });
  };

  return (
    <div className="relative max-h-16 pl-4   hover:bg-gray-100 cursor-pointer flex gap-1 justify-between">
      <button
        type="button"
        className="p-1 py-2  truncate "
        onClick={navigateToTheChat}
      >
        <div>
          <h3 className="truncate">{name}</h3>
          <h3 className="truncate  text-[10px] text-gray-600 text-start">
            {hint}
          </h3>
        </div>
        <div className="absolute p-1 top-0 left-0 ">
          <div className="bg-blue-400 w-2  h-2  rounded-full"></div>
        </div>
      </button>

      <DropDownMenu
        customButton={
          <button className="py-1 rounded-lg hover:bg-white">
            <BsThreeDotsVertical size={16} className="text-gray-400" />
          </button>
        }
        direction="left"
      >
        <button className="flex items-center gap-2 px-2   py-1 border w-full rounded-lg text-center mb-1 hover:bg-gray-100">
          <LuPencil />
          Rename
        </button>

        {/* <button className=" flex px-2  gap-2 items-center py-1 border w-full rounded-lg text-center mb-3 hover:bg-gray-100">
          <FaRegBookmark />
          Bookmark
        </button> */}
        <button className=" flex gap-2 px-2 py-1 border w-full rounded-lg bg-red-500 text-white hover:bg-red-600">
          <MdDeleteOutline size={15} />
          Delete Chat
        </button>
      </DropDownMenu>
    </div>
  );
};

export default ChatHistoryCard;
