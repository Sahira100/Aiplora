import { useEffect, useState } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";

const ScrollDownButton = ({ update, endRef, containerRef, className }) => {
  const [active, seActive] = useState(false);
  let prevScrollTop = 0;
  useEffect(() => {
    containerRef.current.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [...update]);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    seActive(false);
  };

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;
    const scrollHeight = containerRef.current.scrollHeight;
    const clientHeight = containerRef.current.clientHeight;

    if (prevScrollTop > scrollTop) {
      seActive(true);
    }

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      seActive(false);
    }

    prevScrollTop = scrollTop;
  };

  return active ? (
    <button
      className={` w-7 h-7  rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-400 hover:text-white  bg-white ${className}`}
      onClick={scrollToBottom}
    >
      <IoIosArrowRoundDown size={25} />
    </button>
  ) : null;
};

export default ScrollDownButton;
