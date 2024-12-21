import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import DropDownMenu from "./DropDownMenu";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, removeMessage } from "../features/chat/chatSlice";

const ClearContextBreaker = ({ messageIndex }) => {
  const { deleteScreen, selectMessages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handelSelection = (e) => {
    if (e.target.checked) {
      dispatch(addMessage(messageIndex));
    } else {
      dispatch(removeMessage(messageIndex));
    }
  };

  return (
    <div className="w-full flex items-center gap-2 my-6 relative">
      <div className="grow h-0 border"></div>
      <p className="grow-0 text-center text-xs font-normal">context clear</p>
      {!deleteScreen && (
        <DropDownMenu label={<BsThreeDots />}>
          <button className="w-full py-1 bg-red-500 text-white rounded-md">
            Delete
          </button>
        </DropDownMenu>
      )}
      <div className="grow h-0 border "></div>

      {deleteScreen && (
        <div className="absolute -left-10 bottom-0 top-0 p-0">
          <input
            type="checkbox"
            className="w-4 h-4"
            onChange={handelSelection}
            checked={selectMessages.indexOf(messageIndex) >= 0}
          />
        </div>
      )}
    </div>
  );
};

export default ClearContextBreaker;
