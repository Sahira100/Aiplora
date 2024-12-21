import BotResponse from "./BotResponse";
import { chatResponse } from "../../data/chatData";

const Test = () => {
  return (
    <BotResponse
      botImg={chatResponse.compare[0].imageUrl}
      compareBots={chatResponse.compare}
      botName={chatResponse.compare[0].name}
      onRepeat={() => {}}
      onSwitch={() => {}}
      loading={false}
      questions={chatResponse.questions}
      response={chatResponse.response}
      isStreaming={false}
    />
  );
};

export default Test;
