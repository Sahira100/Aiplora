const LoadingBar = () => {
  return (
    <div className="relative w-full h-1 bg-gray-200/40 rounded-lg overflow-hidden">
      <div className="absolute left-0 h-full w-full bg-blue-500 animate-loading"></div>
    </div>
  );
};

export default LoadingBar;
