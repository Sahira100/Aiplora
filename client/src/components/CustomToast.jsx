export const SuccessToast = ({ headline, headlineSize, message }) => {
  return (
    <div className="flex bg-green-400 p-3 mt-5 gap-2 mb-2">
      <i className="fa-solid fa-circle-check mr-2 text-xl"></i>
      <div className={`col-span-2 ${headlineSize}`}>
        <p>{headline}</p>
        <p className="text-[10px]">{message}</p>
      </div>
    </div>
  );
};

export const ErrorToast = ({ headline, headlineSize, message }) => {
  return (
    <div className="flex bg-red-400 p-3 mt-5 gap-2 mb-2">
      <i className="fa-solid fa-circle-exclamation mr-2 text-xl"></i>
      <div className={`col-span-2 ${headlineSize}`}>
        <p>{headline}</p>
        <p className="text-[10px]">{message}</p>
      </div>
    </div>
  );
};
