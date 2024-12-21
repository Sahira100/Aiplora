import React from "react";

const ChatBotCard = ({ bot }) => {
  return (
    <section className="w-full border rounded-xl shadow-sm p-3 my-12">
      <div className="flex gap-2">
        <img src={bot.image} alt={bot.name} className="w-12 h-12 rounded-lg" />
        <div className="text-sm">
          <h3 className="font-medium">{bot.name}</h3>
          <h3>
            <span>{bot.creditsPerMessage} </span>per message
          </h3>
        </div>
      </div>
      <div className="text-sm mt-2">{bot.description}</div>
    </section>
  );
};

export default ChatBotCard;
