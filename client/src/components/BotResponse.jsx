import { useState } from "react";
import BotQuestions from "./BotQuestions";
import BotRepeatButton from "./BotRepeatButton";
import CompareButton from "./CompareButton";
import { MdContentCopy } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Space from "./Space";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, removeMessage } from "../features/chat/chatSlice";
import MarkDownContent from "./MarkDownContent";

const BotResponse = ({
  botName,
  botImage,
  messageIndex,
  message,
  isActiveFeatures = false,
  questions = [],
  onRepeat,
  onCompare,
  onQuestion,
}) => {
  const { deleteScreen, selectMessages } = useSelector((state) => state.chat);
  const [isHover, setIsHover] = useState(false);

  const dispatch = useDispatch();

  const handelSelection = (e) => {
    if (e.target.checked) {
      dispatch(addMessage(messageIndex));
    } else {
      dispatch(removeMessage(messageIndex));
    }
  };

  const onDelete = () => {
    dispatch(addMessage(messageIndex));
  };

  const onCopy = () => {};

  return (
    <div
      onMouseOver={() => setIsHover(!isActiveFeatures)}
      onMouseLeave={() => setIsHover(false)}
      className="my-3 w-full  relative"
    >
      <div className="flex gap-2 items-center">
        <div className="w-4 h-4 rounded-md  overflow-hidden leading-normal">
          <img src={botImage} alt={name} />
        </div>
        <p className="text-xs">{botName}</p>
      </div>
      <div className="text-sm  pt-4 rounded-lg bg-gray-50 mt-2  px-3">
        <MarkDownContent content={message} />
      </div>
      {!deleteScreen &&
        (!isHover ? (
          <Space className="h-8 mt-2" />
        ) : (
          <div className="h-8 flex gap-2 mt-2">
            <button
              type="button"
              className="border p-2 rounded-full shadow-sm hover:bg-gray-100"
            >
              <MdContentCopy size={13} />
            </button>
            <button
              type="button"
              className="border p-2 rounded-full shadow-sm hover:bg-gray-100"
              onClick={onDelete}
            >
              <MdDeleteOutline size={15} />
            </button>
          </div>
        ))}
      {/* {isActiveFeatures && !deleteScreen && (
        <>
          <div className="relative flex items-center mt-2  gap-2 text-sm">
            <BotRepeatButton onSubmit={onRepeat} />
            <CompareButton onCompare={onCompare} />
          </div>
          <BotQuestions questions={questions} onClick={onQuestion} />
          <Space className="h-7" />
        </>
      )} */}

      {deleteScreen && (
        <div className="absolute -left-10 bottom-0 top-0 pt-12">
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

export default BotResponse;
