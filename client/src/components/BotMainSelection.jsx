import BotCircleButton from "./BotCircleButton";
import BotSelectionSkeleton from "./BotSelectionSkeleton";

const BotMainSelection = ({ bots, onSelect, selectBot }) => {
  if (!bots || bots.length < 1) {
    return <BotSelectionSkeleton size={6} />;
  }

  return (
    <div className="flex flex-wrap mt-6 justify-center gap-3">
      {bots.map((bot) => (
        <BotCircleButton
          bot={bot}
          key={bot.name}
          active={bot === selectBot}
          onClick={() => onSelect(bot)}
        />
      ))}
    </div>
  );
};

export default BotMainSelection;
