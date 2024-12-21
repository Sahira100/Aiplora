import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatHistory } from "../features/chat/chatHistorySlice";
import ChatHistoryCard from "./ChatHistoryCard";

const ChatHistory = () => {
  const { history, hasNextPage, isLoading, error } = useSelector(
    (state) => state.chatHistory
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const scrollElement = scrollRef.current;

    const offset =
      scrollElement.scrollHeight -
      scrollElement.scrollTop -
      scrollElement.clientHeight;
    if (offset < 1 && !isLoading && hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    dispatch(fetchChatHistory(page));
  }, [page]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  const reFetch = () => {
    dispatch(fetchChatHistory(page));
  };

  return (
    <section
      ref={scrollRef}
      className=" w-full border-b py-2 mb-2 flex flex-col  gap-1 grow overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-200 scrollbar-track-gray-100"
    >
      {history.map((chat) => (
        <ChatHistoryCard
          key={chat._id}
          name={chat.name}
          chatId={chat._id}
          hint={chat.hint}
        />
      ))}
      {error && (
        <div className="h-full flex  flex-col items-center justify-center">
          <h3 className="  w-full text-center p-2">
            Failed to fetch chat history
          </h3>
          <button
            type="button"
            className="border border-gray-300 px-2 rounded-lg bg-gray-100"
            onClick={reFetch}
          >
            Try again
          </button>
        </div>
      )}
      {isLoading && (
        <div className="h-full flex items-center justify-center">
          <p className="text-center ">Loading ...</p>
        </div>
      )}
    </section>
  );
};

export default ChatHistory;
