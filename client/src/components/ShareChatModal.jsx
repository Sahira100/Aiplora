import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { getShareLink } from "../api";

const ShareChatModal = ({ setIsShare, chatId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const createShareLink = async () => {
    setIsLoading(true);
    try {
      const resp = await getShareLink(chatId);

      const data = resp.data.data;

      console.log(data);

      const shareableLink = `http://localhost:5173/share/${data.shareChatId}`;
      setShareLink(shareableLink);

      await navigator.clipboard.writeText(shareableLink);

      toast.success("Copied!");
    } catch (error) {
      toast.error("Couldn't create a link");
    }

    setIsLoading(false);
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success("Copied!");
    } catch (error) {
      //;;;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 flex flex-col justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-[500px] px-8 ">
        <div className="border-b py-4 h-20 flex justify-between items-center">
          <h3 className="text-xl">Create a public link.</h3>
          <button
            className="rounded-full cursor-pointer hover:bg-gray-100 p-2"
            onClick={() => setIsShare(false)}
          >
            <RxCross1 size={20} />
          </button>
        </div>
        <div className="text-sm text-gray-500 my-3">
          Your identity won’t be shared, and any new messages will remain
          private.
        </div>
        <div className="flex justify-between items-center my-6 gap-2">
          <input
            className="border rounded-full p-3 w-full"
            value={shareLink}
            disabled={true}
          />
          {shareLink ? (
            <button
              type="button"
              className="w-36 text-center p-3 text-white font-bold border text-sm bg-black rounded-full"
              onClick={copyShareLink}
            >
              Copy
            </button>
          ) : (
            <button
              type="button"
              className="w-36 text-center p-3 text-white font-bold border text-sm bg-black rounded-full"
              onClick={createShareLink}
              disabled={isLoading}
            >
              {isLoading ? "wait .." : "Create link"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareChatModal;
