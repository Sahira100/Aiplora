import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosAttach, IoIosArrowUp } from "react-icons/io";
import FileSelectCard from "./FileSelectCard";
import ImageSelectCard from "./ImageSelectCard";

const ChatInput = ({
  placeholder,
  onSubmit,
  disable = false,
  height = "22",
}) => {
  const textareaRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [prompt, setPrompt] = useState("");

  const handleTextArea = (e) => {
    setupTextAreaHeight(e);
    setPrompt(e.target.value);
  };

  const setupTextAreaHeight = (e) => {
    resetTextAreaHeight();
    let scHeight = e.target.scrollHeight;
    textareaRef.current.style.height = Math.min(120, scHeight) + "px";
  };

  const resetTextAreaHeight = () => {
    textareaRef.current.style.height = `${height}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      submitForm(e);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const trimmedMessage = prompt.trim();

    //*validation
    if (!trimmedMessage) {
      if (!selectedFile) {
        return toast.error("The message field cannot be empty.");
      }
    }

    //*form submission
    const formData = new FormData();

    formData.append("message", trimmedMessage);

    setPrompt("");
    setSelectedFile(null);
    resetTextAreaHeight();

    onSubmit({ formData });
  };

  return (
    <div className="relative w-full flex flex-col justify-end  bg-white border border-gray-500 pr-2 pl-4 py-2  rounded-3xl">
      <form onSubmit={submitForm} className="w-full flex items-center  gap-2 ">
        <textarea
          name="prompt"
          ref={textareaRef}
          type="text"
          onKeyDown={handleKeyDown}
          onChange={handleTextArea}
          value={prompt}
          className="resize-none text-sm outline-none grow"
          placeholder={placeholder}
          autoComplete="false"
          style={{ height: `${height}px` }}
        />

        <button
          type="submit"
          className="btn btn-circle btn-sm bg-gray-500 text-white self-end"
          disabled={disable}
        >
          <IoIosArrowUp size={25} height="20px" />
        </button>
      </form>
    </div>
  );
};
export default ChatInput;
