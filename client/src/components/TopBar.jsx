import CreditLabel from "./CreditLabel";
import { FaBell } from "react-icons/fa6";
import HomeLogo from "./HomeLogo";

const TopBar = () => {
  return (
    <section className="z-10 col-start-1 col-end-2 row-start-1 row-end-2 flex items-center px-3   border">
      <HomeLogo />
      {/* <div className="w-full flex justify-start">
        <CreditLabel />
      </div> */}
    </section>
  );
};

export default TopBar;
