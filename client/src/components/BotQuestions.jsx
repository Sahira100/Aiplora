import React from "react";
import { MdNavigateNext } from "react-icons/md";

const BotQuestions = ({ questions = [], onClick }) => {
  return (
    <div className="mt-3 text-sm flex flex-col gap-2">
      {questions.map((question, index) => (
        <button
          key={index}
          className="p-2 py-1 rounded-xl bg-white border flex justify-between items-center hover:bg-gray-100 cursor-pointer"
          onClick={() => onClick(question)}
        >
          {question}
          <div>
            <MdNavigateNext />
          </div>
        </button>
      ))}
    </div>
  );
};

export default BotQuestions;
