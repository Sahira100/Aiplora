import { useDispatch, useSelector } from "react-redux";
import { BotMainSelection, ChatInput, Space } from "../components";
import { useNavigate } from "react-router-dom";
import { setTemp } from "../features/chat/chatSlice";
import { toastError, userMessage } from "../utils";
import { Headline } from "../components/home";
import { setGlobalLoading } from "../features/task/taskSlice";
import { useState } from "react";
import { setSelectBot } from "../features/bot/botSlice";
import { createNewChat } from "../api";

const Home = () => {
  const {
    bots,
    selectBot,
    isLoading: botsLoading,
    error: botFetchError,
  } = useSelector((state) => state.bot);

  const {
    name,
    isLoading: userLoading,
    error: userFetchError,
  } = useSelector((state) => state.user);

  const isLoading = botsLoading || userLoading;
  const hasError = botFetchError || userFetchError;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async ({ formData }) => {
    setIsSubmitting(true);
    dispatch(setGlobalLoading(true));

    try {
      const resp = await createNewChat({ botId: selectBot._id });

      const chatId = resp.data.data.chatId;

      dispatch(setTemp({ chatId, formData }));
      navigate(`/chat/${chatId}`);
    } catch (error) {
      toastError(error);
    }

    setIsSubmitting(false);
    dispatch(setGlobalLoading(false));
  };

  const handleBotSelect = (bot) => {
    dispatch(setSelectBot(bot));
  };

  if (hasError) {
    throw new Error("Something went wrong");
  }

  return (
    <section className=" h-full flex flex-col items-center">
      <Space className="h-28" />

      <div className="w-1/2 sm:w-3/4 lg:w-1/2  p-4 flex  flex-col items-center text-center">
        <Headline name={name} />
        <BotMainSelection
          bots={bots}
          selectBot={selectBot}
          onSelect={handleBotSelect}
        />
        <Space className="h-10" />
        <ChatInput
          placeholder="Let's start a new chat (shift+enter for new line)"
          onSubmit={handleSubmit}
          disable={isSubmitting || isLoading || hasError}
        />
      </div>
    </section>
  );
};

export default Home;
