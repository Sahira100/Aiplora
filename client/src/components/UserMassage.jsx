import { CgSpinner } from "react-icons/cg";
import { BsArrowRepeat } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import Space from "./Space";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, removeMessage } from "../features/chat/chatSlice";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const UserMassage = ({
  messageIndex,
  message,
  isLoading = false,
  error = false,
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
    <div className="w-full  flex justify-end  my-3 relative">
      <div
        className="max-w-[500px]"
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className={`rounded-2xl p-2 ${
            error ? "bg-red-500 text-white" : " text-black"
          }   text-sm `}
        >
          <div className="whitespace-pre-wrap break-words">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message}
            </Markdown>
          </div>
        </div>
        <div className="flex justify-between mt-1">
          {!isHover || deleteScreen || isLoading ? (
            <Space className={"h-8 "} />
          ) : (
            <div className="h-8 flex gap-2">
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
          )}
          {isLoading && (
            <div className="p-1 flex items-center gap-1 text-xs">
              <p>sending</p>
              <CgSpinner className="animate-spin" />
            </div>
          )}
          {error && (
            <div className="flex flex-col items-end p-1 mt-2">
              <p className="block text-xs text-red-500">
                No enough credits available
              </p>

              <button
                type="button"
                className="text-xs p-1 mt-1 rounded-full border hover:bg-gray-100"
              >
                <BsArrowRepeat size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {deleteScreen && (
        <div className="absolute -left-10 bottom-0 top-0 pt-3">
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={selectMessages.indexOf(messageIndex) >= 0}
            onChange={handelSelection}
          />
        </div>
      )}
    </div>
  );
};

export default UserMassage;
