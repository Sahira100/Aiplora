import SideButton from "./SideButton";
import ChatHistory from "./ChatHistory";

const SideBar = () => {
  return (
    <section className=" text-xs  flex flex-col col-start-1 col-end-2 row-start-2 row-end-3   text-black bg-background overflow-y-auto border">
      <button className="text-start m-2 border bg-white  rounded-lg p-2  text-gray-600">
        New Chat +
      </button>
      <ChatHistory />
      <SideButton name="Credits" to="/bots">
        All bots
      </SideButton>

      <SideButton name="Credits" to="/credits">
        Credits
      </SideButton>

      <SideButton name="Setting" to="/profile">
        Profile
      </SideButton>
      <SideButton name="Setting" to="/setting">
        Feedback
      </SideButton>

      <div className="text-start pl-4 text-xs text-gray-400 pb-1">
        ©{new Date().getFullYear()} AIplora
      </div>
    </section>
  );
};
// About · Careers · Help center · Privacy policy · Terms of service

export default SideBar;
