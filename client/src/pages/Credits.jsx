import { useState } from "react";
import { CreditCalculator, PackageCard, Space, UsageCard } from "../components";
import { useSelector } from "react-redux";

const Credits = () => {
  const { credits } = useSelector((state) => state.credit);

  return (
    <section className="h-full">
      <Space className="h-4" />
      <section className=" mx-10 mt-10">
        <h3 className="text-3xl font-semibold">Credits</h3>
        <section className="mt-10 ">
          <div className="mt-3 shadow-md p-4 border flex flex-col gap-2 bg-white rounded-xl">
            {credits.map((item) => (
              <UsageCard
                key={item._id}
                ExpireInDays="10"
                expireDate={item.expiryDate}
                purchaseDate={item.purchaseDate}
                totalCredits={item.totalCredits}
                remainingCredits={item.remainingCredits}
              />
            ))}
          </div>
        </section>
      </section>
      <div className="mt-24 flex flex-col justify-center items-center">
        <h3 className="text-lg font-normal ">Need more credits?</h3>
        <p className="max-w-[500px] text-center text-xs my-2">
          Purchase more to continues services. Credits are valid for{" "}
          <span className="font-medium">09/29/2024 </span>
          and can be used across all available tools and models.
        </p>
        <button
          type="button"
          className="mt-2 text-xs border  px-2 py-1 rounded-lg bg-black text-white font-medium"
        >
          Visit store
        </button>
      </div>
    </section>
  );
};

export default Credits;
