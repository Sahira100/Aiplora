import { Cart, PackageCard } from "../components";

const Store = () => {
  return (
    <section className="store overflow-y-auto">
      <Cart />
      <div className=" flex flex-col items-center">
        <div className="h-8"></div>
        <section className="w-1/2 text-center">
          <div className="search  text-sm flex items-center border border-gray-400  overflow-hidden ">
            <input
              type="text"
              placeholder="Type to search..."
              className="flex-1 px-4 py-1 outline-none"
            />
            <button className=" bg-blue-500 text-white px-4 py-1 ">
              Search
            </button>
          </div>
        </section>
        <div className="space h-7"></div>
        <section className="tags w-2/3 flex flex-wrap justify-center gap-3">
          <button className="btn btn-outline btn-xs">Default</button>
          <button className="btn btn-outline btn-xs">Free</button>
          <button className="btn btn-outline btn-xs">Popular</button>
          <button className="btn btn-outline btn-xs">New</button>
          <button className="btn btn-outline btn-xs">Gemini</button>
          <button className="btn btn-outline btn-xs">Chat Gpt</button>
          <button className="btn btn-outline btn-xs">GPT-4o</button>
        </section>
        <div className="space h-20"></div>
        <section className="packages w-3/4 flex flex-wrap justify-center gap-5">
          <PackageCard />
          <PackageCard />
          <PackageCard />
          <PackageCard />
          <PackageCard />
          <PackageCard />
          <PackageCard />
          <PackageCard />
          <PackageCard />
          <PackageCard />
        </section>
        <div className="footer h-52"></div>
      </div>
    </section>
  );
};

export default Store;
