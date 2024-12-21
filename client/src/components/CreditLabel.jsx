import { useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";

const CreditLabel = () => {
  const { credits, isLoading } = useSelector((state) => state.credit);

  const [remainingCredits, setRemainingCredits] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    getRemainingCredits();
    getTotalCredits();
  }, [credits]);

  const getRemainingCredits = () => {
    if (credits && credits.length > 0) {
      let total = 0;

      credits.forEach((credit) => {
        total += credit.remainingCredits;
      });

      setRemainingCredits(total);
    } else {
      return 0;
    }
  };

  const getTotalCredits = () => {
    if (credits && credits.length > 0) {
      let total = 0;

      credits.forEach((credit) => {
        total += credit.totalCredits;
      });

      setTotalCredits(total);
    } else {
      return 0;
    }
  };

  return (
    <div className="ml-40">
      <h4 className="text-xs">
        <span className="font-bold">{remainingCredits}</span> Remaining credits
      </h4>
      <ProgressBar
        width={100}
        height={4}
        maxValue={totalCredits}
        value={remainingCredits}
      />
    </div>
  );
};

export default CreditLabel;
