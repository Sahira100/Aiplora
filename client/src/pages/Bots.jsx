import React from "react";
import { useSelector } from "react-redux";
import { PackageCard, Space } from "../components";

const Bots = () => {
  const { bots, isLoading, error } = useSelector((state) => state.bot);

  if (error) {
    throw new Error("Something went wrong");
  }

  return (
    <section className="h-full">
      <Space className="h-4" />
      <section className=" mx-10 mt-10">
        <h3 className="text-3xl font-semibold">All bots</h3>
        <section className="flex  gap-3 flex-wrap mt-10">
          {bots?.map((bot, index) => (
            <PackageCard
              key={index}
              bot={bot}
              image={bot.image}
              name={bot.name}
              credits={bot.creditsPerMessage}
              description={bot.description}
            />
          ))}
        </section>
      </section>
    </section>
  );
};

/*
    <section className="h-full">
      <Space className="h-4" />
      <section className=" mx-10 mt-10">
        <h3 className="text-3xl font-semibold">Credits</h3>
        <section className="mt-10 ">
          <h3 className="text-xl">Usage</h3>
          <div className="mt-3 drop-shadow-md p-4 border flex flex-col gap-2 bg-white rounded-3xl">
            <UsageCard
              ExpireInDays="10"
              purchaseDate="09/29/2024"
              totalCredits="5000"
              remaningCredits="2000"
            />
            <UsageCard
              ExpireInDays="7"
              purchaseDate="08/29/2024"
              totalCredits="5000"
              remaningCredits="4000"
            />
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
          className="mt-2 text-xs border  px-2 py-1 rounded-lg bg-green-700 text-white font-medium"
        >
          Visit store
        </button>
      </div>
    </section>


*/

export default Bots;
