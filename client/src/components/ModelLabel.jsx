const ModelLabel = ({ name }) => {
  return (
    <div className="m-1 rounded-lg text-sm p-2 hover:bg-purple-200 flex items-center gap-2">
      <div className="w-5 h-5 rounded-full ">
        <img
          src="https://img.icons8.com/?size=100&id=eoxMN35Z6JKg&format=png&color=000000"
          alt="gpt"
        />
      </div>
      <h4>{name}</h4>
    </div>
  );
};

export default ModelLabel;
