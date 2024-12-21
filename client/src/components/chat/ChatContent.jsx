import {
  BotResponse,
  ChatBotCard,
  ClearContextBreaker,
  UserMassage,
} from "../";
import ChatResponseLoader from "../ChatResponseLoader";
import Dropdown from "../DropDownMenu";
import Space from "../Space";
import { BsThreeDots } from "react-icons/bs";

const ChatContent = ({
  streamMessage,
  scrollContainerRef,
  messagesEndRef,
  content,
  chatBot,
  submitting,
  onCompare,
  onQuestion,
  onRepeat,
  tempMessage,
}) => {
  return (
    <div
      className=" grow overflow-y-auto scrollbar flex flex-col items-center"
      ref={scrollContainerRef}
    >
      <div className="w-[780px] ">
        {chatBot && <ChatBotCard bot={chatBot} />}
        {content.map((item, index) => {
          if (item.role.type === "user") {
            return (
              <UserMassage
                key={item.index}
                messageIndex={item.index}
                message={item.message}
                isLoading={false}
                error={false}
              />
            );
          } else if (item.role.type === "bot") {
            return (
              <BotResponse
                key={item.index}
                botImage={item.role.bot.image}
                botName={item.role.bot.name}
                message={item.message}
                messageIndex={item.index}
                questions={item.questions}
                // isActiveFeatures={content.length - 1 === index}
                onCompare={onCompare}
                onRepeat={onRepeat}
                onQuestion={onQuestion}
              />
            );
          } else if (item.role.type === "system") {
            return (
              <ClearContextBreaker key={item.index} messageIndex={item.index} />
            );
          }
        })}
        {tempMessage && (
          <UserMassage
            message={tempMessage.message}
            isLoading={submitting}
            error={false}
          />
        )}
        {streamMessage && (
          <BotResponse
            botImage={chatBot.image}
            botName={chatBot.name}
            message={streamMessage}
          />
        )}
        <Space className="h-48" />
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
export default ChatContent;
