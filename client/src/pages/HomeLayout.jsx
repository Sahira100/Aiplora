import { useOutlet } from "react-router-dom";
import { HomeLogo, PageContent, SideBar, TopBar } from "../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { getBots } from "../features/bot/botSlice";
import { getCredits } from "../features/credit/creditSlice";

const HomeLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getBots());
    dispatch(getCredits());
  }, []);
  const outlet = useOutlet();

  return (
    <main className="grid grid-cols-layout grid-rows-layout h-screen w-screen ">
      <TopBar />
      <SideBar />
      <PageContent>{outlet}</PageContent>
    </main>
  );
};

export default HomeLayout;
