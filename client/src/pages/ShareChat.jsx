import React, { useEffect, useState } from "react";
import { MdOutlineIosShare, MdOutlineShapeLine } from "react-icons/md";
import { BotResponse, HomeLogo, Space, UserMassage } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { getShareChat } from "../api";
import toast from "react-hot-toast";
import MarkDownContent from "../components/MarkDownContent";

const ShareChat = () => {
  const { id } = useParams();
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchShareChat();
  }, [page, id]);

  const fetchShareChat = async () => {
    try {
      const resp = await getShareChat({ shareChatId: id, page });
      const data = resp.data.data;

      setContent([...content, ...data.messages]);
    } catch (error) {
      if (error.status === 400) {
        navigate("/");
      } else {
        toast.error(error.message);
      }
    }
  };

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Copied!");
    } catch (error) {
      toast.error("Failed to copy URL.");
    }
  };

  return (
    <section className="w-screen h-screen  flex flex-col">
      <header className=" flex justify-between  items-center p-3 bg-white border-b">
        <HomeLogo />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onShare}
            className="border items-center p-2 px-3 rounded-full flex gap-1 text-xs hover:bg-gray-100"
          >
            <MdOutlineIosShare size={17} />
            Share
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="border text-xs p-2 px-3 rounded-full bg-blue-500 text-white"
          >
            Sign up
          </button>
        </div>
      </header>
      <div className="grow overflow-y-auto flex flex-col">
        <div className="w-[700px] chat-content self-center flex flex-col">
          {content.map((item) => {
            if (item.role.type === "user") {
              return (
                <div
                  key={item.index}
                  className="rounded-2xl p-2 bg-gray-50 text-black text-sm max-w-3/4 self-end my-4"
                >
                  <div className="whitespace-pre-wrap break-words">
                    {item.message}
                  </div>
                </div>
              );
            } else if (item.role.type === "bot") {
              return (
                <div key={item.index} className="my-3">
                  <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 rounded-md bg-gray-200 overflow-hidden">
                      <img src={item.role.bot.image} alt={item.role.bot.name} />
                    </div>
                    <p className="text-xs">{item.role.bot.name}</p>
                  </div>
                  <div className="text-sm  pt-4 rounded-lg mt-2">
                    <MarkDownContent content={item.message} />
                  </div>
                </div>
              );
            }
          })}
          <Space className="h-32" />
        </div>
        <div className="font-semibold fixed bottom-4 left-3 border border-black text-xs p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          What is Aiplora ?
        </div>
      </div>
    </section>
  );
};

export default ShareChat;
