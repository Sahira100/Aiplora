import ProgressBar from "./ProgressBar";

const UsageCard = ({
  purchaseDate,
  expireDate,
  remainingCredits,
  totalCredits,
}) => {
  const getDaysLeft = () => {
    const expiry = new Date(expireDate);
    const today = new Date();

    const timeDifference = expiry - today;

    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="text-xs  rounded-lg">
      <div className="flex justify-between items-end mb-2">
        <div className="flex-col gap-1 flex">
          <h4>
            <span className="font-bold">{remainingCredits}</span> Remaining
            credits{" "}
            <span className=" text-gray-400">for {getDaysLeft()} days</span>
          </h4>
          <h4>
            Expire Date
            <span className="font-bold pl-1">
              {new Date(expireDate).toLocaleDateString()}
            </span>
          </h4>
        </div>
        <h4>
          Purchase Date
          <span className="font-bold pl-1">
            {new Date(purchaseDate).toLocaleDateString()}
          </span>
        </h4>
      </div>
      <ProgressBar
        maxValue={totalCredits}
        value={Number(remainingCredits)}
        height={5}
      />
      <div className="flex justify-end my-1">
        <p className="font-medium">{totalCredits}</p>
      </div>
    </div>
  );
};

export default UsageCard;
