import { useState } from "react";
import { FaCaretUp } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const ChatModelList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="w-48  flex flex-col justify-center p-1  rounded-lg outline outline-1 hover:outline-4 outline-gray-300">
        <button className="w-full h-full" onClick={toggleDropup}>
          <div className="flex gap-1">
            <div className="rounded-lg bg-gray-400 w-8">
              <img
                src="https://qph.cf2.poecdn.net/main-thumb-pb-3015-200-ivodfqemfvztmvgafhdouijhknthkvmp.jpeg"
                alt="gpt-4o"
              />
            </div>
            <div className="flex flex-col text-xs text-start grow">
              <h2 className="font-medium">GPT 4o</h2>
              <p>100 per message</p>
            </div>
            <div className="flex items-center text-gray-600 border-l px-1">
              <FaCaretUp />
            </div>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute bottom-full mb-4 left-0 w-56 bg-gray-950 rounded-md  z-10 p-3 flex flex-col gap-3">
          <div className="bg-white mb-6 mt-1 p-1 flex items-center gap-1 rounded-md">
            <FaSearch className="ml-1" />
            <input
              type="text"
              className="w-full text-sm border-none outline-none"
            />
          </div>

          <button className="h-full w-full text-white" onClick={toggleDropup}>
            <div className="flex gap-2">
              <div className="rounded-lg bg-gray-400 w-8 overflow-hidden">
                <img
                  src="https://qph.cf2.poecdn.net/main-thumb-pb-1019-200-ecyfizaydihfkxfwhwjlruyjdyoxengr.jpeg"
                  alt="claude"
                />
              </div>
              <div className="flex flex-col text-xs text-start grow">
                <h2 className="font-medium">GPT 4</h2>
                <p>100 per message</p>
              </div>
            </div>
          </button>

          <button
            className="h-full w-full text-white overflow-hidden"
            onClick={toggleDropup}
          >
            <div className="flex gap-2 ">
              <div className="rounded-lg bg-gray-400 w-8 overflow-hidden">
                <img
                  src="https://qph.cf2.poecdn.net/main-thumb-pb-4731472-200-uomiqutkjmccfkuctvnilhhuzsxxbvrf.jpeg"
                  alt=""
                />
              </div>
              <div className="flex flex-col text-xs text-start grow">
                <h2 className="font-medium">GPT 4o</h2>
                <p>100 per message</p>
              </div>
            </div>
          </button>

          <button className="h-full w-full text-white" onClick={toggleDropup}>
            <div className="flex gap-2">
              <div className="rounded-lg bg-gray-400 w-8"></div>
              <div className="flex flex-col text-xs text-start grow">
                <h2 className="font-medium">GPT 4o</h2>
                <p>100 per message</p>
              </div>
            </div>
          </button>

          <button className="h-full w-full text-white" onClick={toggleDropup}>
            <div className="flex gap-2">
              <div className="rounded-lg bg-gray-400 w-8"></div>
              <div className="flex flex-col text-xs text-start grow">
                <h2 className="font-medium">GPT 4o</h2>
                <p>100 per message</p>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatModelList;
