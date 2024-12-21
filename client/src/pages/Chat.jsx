import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BotResponse,
  ChatInput,
  ClearContextBreaker,
  ClearContextButton,
  ScrollDownButton,
  ShareChatModal,
  Space,
  SwitchButton,
  UserMassage,
} from "../components";

import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTemp,
  setChat,
  changeBot,
  clearMessages,
  activeDeleteScreen,
} from "../features/chat/chatSlice";
import { botMessage, customFetch, systemMessage, userMessage } from "../utils";
import { ChatContent, ChatFooter } from "../components/chat";
import { MdDeleteOutline, MdOutlineIosShare } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { setGlobalLoading } from "../features/task/taskSlice";
import {
  addChatToHistory,
  fetchChatHistoryById,
} from "../features/chat/chatHistorySlice";
import { removeCredits } from "../features/credit/creditSlice";

import { SSE } from "sse.js";

const Chat = () => {
  const { id } = useParams();

  const {
    id: chatId,
    bot,
    error,
    temp,
    deleteScreen,
  } = useSelector((state) => state.chat);

  const { loading: taskLoading } = useSelector((state) => state.task);

  const {
    bots,
    isLoading: isBotLoading,
    error: botsError,
  } = useSelector((state) => state.bot);

  const { selectMessages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const [submitting, setSubmitting] = useState(false);
  const [currentFetchBot, setCurrentFetchBot] = useState();

  const [content, setContent] = useState([]);
  const [tempMessage, setTempMessage] = useState(null);
  const [streamMessage, setStreamMessage] = useState("");
  const [isShare, setIsShare] = useState(false);

  useEffect(() => {
    fetchChat({ chatId: id });
    setContent([]);
    setStreamMessage("");
    setTempMessage(null);
  }, [id]);

  //*fetch chat from server
  const fetchChat = async ({ chatId }) => {
    dispatch(setGlobalLoading(true));
    try {
      const chatResp = await customFetch.get(`/chat/${chatId}`);
      const { chat } = chatResp.data.data;

      dispatch(setChat({ id: chat._id, bot: chat.bot }));

      const messageResp = await customFetch.get(`/chat/${chatId}/message`);
      const { messages } = messageResp.data.data;

      console.log(messages);

      dispatch(setGlobalLoading(false));
      if (messages.length > 0) {
        setContent(messages);
      } else {
        if (temp && temp.chatId === id) {
          const message = temp.formData.get("message");
          setTempMessage({ role: "user", message });
          await streamResponse({ bot: chat.bot, formData: temp.formData });
          dispatch(fetchChatHistoryById(chat._id));
          dispatch(clearTemp());
        }
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data.message || error.message);
      dispatch(setGlobalLoading(false));
    }
  };

  const streamResponse = ({ bot, formData }) => {
    return new Promise((resolve, reject) => {
      setCurrentFetchBot(bot);
      setSubmitting(true);

      const message = formData.get("message");

      formData.append("chatId", id);
      formData.append("botId", bot._id);

      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });

      const url = "http://localhost:5000/api/v1/services/chatCompletion";

      const source = new SSE(url, {
        method: "POST",
        payload: JSON.stringify(payload),
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      source.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);

        //console.log(data);
        setStreamMessage((message) => message + (data?.message || ""));

        if (data?.meta) {
          const userM = userMessage({ message, index: data.meta.umId });
          const botM = botMessage({
            bot,
            index: data.meta.bmId,
            questions: data.meta.questions,
            message: data.meta.message,
          });

          dispatch(removeCredits(data.meta.usedPackages));
          setContent([...content, userM, botM]);
          setTempMessage(null);
          setStreamMessage("");

          setSubmitting(false);
          source.close();

          resolve();
        }
      });

      source.addEventListener("error", (error) => {
        console.error("Error with SSE stream: ", error);
        setSubmitting(false);
        source.close();

        reject(error);
      });

      source.stream();
    });
  };

  //*fetch the bot response
  const fetchBotResponse = async ({ bot, formData }) => {
    setCurrentFetchBot(bot);
    setSubmitting(true);

    const message = formData.get("message");

    formData.append("chatId", id);
    formData.append("botId", bot._id);
    try {
      const resp = await customFetch.post("/services/chatCompletion", formData);

      const data = resp.data.data;

      const userM = userMessage({ message, index: data.umId });
      const botM = botMessage({
        bot,
        index: data.bmId,
        questions: data.questions,
        message: data.message,
      });

      dispatch(removeCredits(data.usedPackages));
      setContent([...content, userM, botM]);
      setTempMessage(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || "Something went wrong");
    }

    setSubmitting(false);
  };

  //*form submission
  const handelSubmit = ({ formData }) => {
    const message = formData.get("message");
    const file = formData.get("file");

    setTempMessage({ role: "user", message, file });
    streamResponse({ bot, formData });
  };

  //*chat context clear
  const onClearContext = async () => {
    dispatch(setGlobalLoading(true));
    setSubmitting(true);
    try {
      const resp = await customFetch.post("/chat/clearContext", {
        chatId: id,
      });

      const data = resp.data.data.message;

      if (data?.index) {
        const systemM = systemMessage({
          index: data.index,
          isContextClear: data.isContextClear,
        });

        setContent([...content, systemM]);

        setTempMessage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || "Something went wrong");
    }

    setSubmitting(false);
    dispatch(setGlobalLoading(false));
  };

  //*ask recommended question
  const onQuestion = (question) => {
    const formData = new FormData();
    formData.append("message", question);
    setTempMessage({ role: "user", message: question });
    fetchBotResponse({ bot: currentFetchBot || bot, formData });
  };

  //*compare with another bot
  const onCompare = async (bot) => {
    setCurrentFetchBot(bot);
    setSubmitting(true);
    try {
      const resp = await customFetch.post("/services/chat/compare", {
        chatId: id,
        botId: bot._id,
      });

      const data = resp.data.data;

      const botM = botMessage({
        bot,
        index: data.bmId,
        questions: data.questions,
        message: data.message,
      });
      dispatch(removeCredits(data.usedPackages));
      setContent([...content, botM]);
      setTempMessage(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || error.message);
    }

    setSubmitting(false);
  };

  //*re ask from the bot
  const onRepeat = () => {
    //fetchBotResponse({ chatBot });
    console.log("Repeat");
  };

  //*switch the bot
  const onSwitch = (bot) => {
    dispatch(changeBot(bot));
  };

  //*delete the chat messages
  const onDelete = async () => {
    if (selectMessages.length <= 0) {
      return toast.error("No messages selected. Choose a message to delete.");
    }
    try {
      dispatch(setGlobalLoading(true));
      dispatch(activeDeleteScreen(false));

      await customFetch.delete(`/chat/${id}/message`, {
        data: { messages: [...selectMessages] },
      });

      setContent(
        content.filter((message) => {
          return selectMessages.indexOf(message.index) < 0;
        })
      );

      toast.success(`Successfully deleted ${selectMessages.length} messages.`);
      dispatch(clearMessages());
      dispatch(setGlobalLoading(false));
    } catch (error) {
      toast.error(error.message);
      dispatch(activeDeleteScreen(true));
      dispatch(setGlobalLoading(false));
    }
  };

  //*share chat to pulbic
  const onShare = () => {
    setIsShare(!isShare);
  };

  //*if any errors on page loading
  if (error) {
    throw new Error("Something went wrong");
  }

  //*component
  return (
    <section className="relative flex flex-col max-w-full h-full ">
      {content.length > 0 && (
        <button
          type="button"
          onClick={onShare}
          className="absolute flex justify-center items-center gap-1 right-6 top-4 border rounded-full p-2 px-4 text-sm hover:bg-gray-100 "
        >
          <MdOutlineIosShare size={17} />
          <div className="font-semibold">Share</div>
        </button>
      )}
      {isShare && <ShareChatModal setIsShare={setIsShare} chatId={id} />}
      <ChatContent
        content={content}
        messagesEndRef={messagesEndRef}
        onCompare={onCompare}
        onQuestion={onQuestion}
        onRepeat={onRepeat}
        scrollContainerRef={scrollContainerRef}
        submitting={submitting}
        tempMessage={tempMessage}
        streamMessage={streamMessage}
        chatBot={currentFetchBot}
      />

      {deleteScreen ? (
        <div className="h-12 w-full  flex justify-center  items-center mb-3 pt-2">
          <button
            type="button"
            className="flex items-center justify-center text-red-500 border py-2 px-4 gap-1 rounded-full border-gray-300"
            onClick={onDelete}
          >
            <MdDeleteOutline />
            Delete
          </button>

          <button
            className="ml-12 p-2 border-2 rounded-full"
            onClick={() => dispatch(clearMessages())}
          >
            <RxCross1 />
          </button>
        </div>
      ) : (
        <div className="relative flex justify-center items-center  mb-3 pt-2">
          <ClearContextButton
            className="relative -left-8"
            onClearContext={onClearContext}
          />
          <div className="w-[780px] relative -left-5">
            <ChatInput
              placeholder={bot && `Continue with ${bot.name}`}
              onSubmit={handelSubmit}
              disable={submitting || taskLoading}
            />
          </div>
          <ScrollDownButton
            className={"absolute -top-8"}
            containerRef={scrollContainerRef}
            endRef={messagesEndRef}
            update={[content, tempMessage]}
          />
          <SwitchButton onSwitch={onSwitch} switchBots={bots} />
        </div>
      )}
    </section>
  );
};

export default Chat;
