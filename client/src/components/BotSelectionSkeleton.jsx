const BotSelectionSkeleton = ({ size }) => {
  const array = Array(size).fill(null);
  return (
    <div className="mt-6 animate-pulse flex justify-center gap-3">
      {array.map((_, index) => (
        <div
          key={index}
          className="relative w-16 h-16 rounded-full bg-gray-200"
        ></div>
      ))}
    </div>
  );
};

export default BotSelectionSkeleton;
