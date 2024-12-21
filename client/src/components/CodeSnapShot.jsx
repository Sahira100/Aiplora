import { BiSolidCopy } from "react-icons/bi";

const CodeSnapShot = () => {
  return (
    <section className=" rounded-lg overflow-y-hidden bg-code-body">
      <div className="flex justify-between p-1 px-3 bg-code-header text-white rounded-t-lg text-sm">
        <h3>javascript</h3>
        <div>
          <BiSolidCopy className="inline-block mr-1" />
          copy
        </div>
      </div>
      <div className="rou  text-sm p-3  text-white">
        {`Lorem ipsum dolor sit amet consectetur adipisicing elit.\n A ratione ullam
        repellat voluptates earum pariatur odio, \n nesciunt molestiae maxime at
        quos dolores in accusamus, quae rerum eveniet, asperiores iure.
        Quisquam.`}
      </div>
    </section>
  );
};

export default CodeSnapShot;
