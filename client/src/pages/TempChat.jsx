import React from "react";
import { ChatFooter } from "../components/chat";
import { ChatBotCard, ChatInput } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../features/task/taskSlice";
import { createNewChat } from "../api";
import { changeBot, setTemp } from "../features/chat/chatSlice";
import { toastError } from "../utils";
import { useNavigate } from "react-router-dom";

const TempChat = () => {
  const { selectBot } = useSelector((state) => state.bot);
  const { loading: globalLoading } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async ({ formData }) => {
    dispatch(setGlobalLoading(true));

    try {
      const resp = await createNewChat({ botId: selectBot._id });

      const chatId = resp.data.data.chatId;
      dispatch(changeBot(selectBot));
      dispatch(setTemp({ chatId, formData }));
      navigate(`/chat/${chatId}`);
    } catch (error) {
      toastError(error);
    }

    dispatch(setGlobalLoading(false));
  };

  return (
    <div className="h-full flex flex-col justify-end">
      <div className="bg-green grow max-w-[700px] ml-52">
        <ChatBotCard bot={selectBot} />
      </div>

      <ChatFooter>
        <ChatInput
          placeholder={selectBot && `Continue with ${selectBot.name}`}
          onSubmit={handleSubmit}
          disable={globalLoading}
        />
      </ChatFooter>
    </div>
  );
};

export default TempChat;
