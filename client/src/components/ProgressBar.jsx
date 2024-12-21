const ProgressBar = ({ value, maxValue, height, width = "w-full" }) => {
  const progress = (value / maxValue) * 100;

  return (
    <div
      className={`mt-1 bg-gray-300 rounded-lg overflow-hidden`}
      style={{ height, width }}
    >
      <div
        className="bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-medium transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%`, height }}
      ></div>
    </div>
  );
};

export default ProgressBar;
