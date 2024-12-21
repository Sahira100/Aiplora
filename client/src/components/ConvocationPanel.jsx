import BotResponse from "./BotResponse";
import UserMassage from "./UserMassage";

const ConvocationPanel = ({ messages, botName, botImg }) => {
  return (
    <>
      {messages.map((obj, index) =>
        obj.sender === "user" ? (
          <UserMassage key={index} message={obj.content} />
        ) : (
          <BotResponse
            key={index}
            response={obj.content}
            botName={botName}
            botImg={botImg}
            loading={false}
            questions={obj.questions}
            compareBots={obj.compare}
            activeFooter={messages.length - 1 === index}
          />
        )
      )}
    </>
  );
};

export default ConvocationPanel;
