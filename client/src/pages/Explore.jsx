const Explore = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="w-1/2 mt-10">
        <div>
          <input
            type="text"
            placeholder="Search"
            className="border-2 w-full p-1"
          />
        </div>
        <div className="mt-6  flex gap-2 flex-wrap justify-center">
          <ExploreTag name="Official" />
          <ExploreTag name="New" />
          <ExploreTag name="Image generation" />
          <ExploreTag name="Funny" />
          <ExploreTag name="Background remove" />
          <ExploreTag name="Popular" />
          <ExploreTag name="AI" />
          <ExploreTag name="Programming" />
          <ExploreTag name="Games" />
        </div>
        <div className="mt-8">
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />

          <ExploreCard />
          <ExploreCard />
        </div>
        <div className="h-32"></div>
      </div>
    </section>
  );
};

const ExploreTag = ({ name }) => {
  return (
    <div className="border rounded-lg w-fit p-1 px-2 hover:bg-white font-medium cursor-pointer text-sm">
      {name}
    </div>
  );
};

const ExploreCard = ({ name, description }) => {
  return (
    <div className="flex gap-2 items-center p-2 border-y hover:bg-white cursor-pointer">
      <div className="min-w-[5rem] h-[5rem] bg-gray-400 rounded-lg"></div>
      <div>
        <h3 className="font-medium text-lg">Gpt-4o-mini</h3>
        <p className="text-xs">
          OpenAI's latest model. This intelligent small model is significantly
          smarter, cheaper, and just as fast as GPT-3.5 Turbo. Context window
          has been shortened to optimize for speed and cost. For longer context
          messages, please try GPT-4o-Mini-128k.
        </p>
      </div>
    </div>
  );
};

export default Explore;
