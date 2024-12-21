import { useSelector } from "react-redux";
import LoadingBar from "./LoadingBar";

const PageContent = ({ children }) => {
  const isLoading = useSelector((state) => state.task.loading);

  return (
    <section className="relative col-start-2 col-end-3 row-start-1 row-end-3 overflow-y-auto  ">
      {children}
      <div className="absolute top-0 left-0 right-0">
        {isLoading && <LoadingBar />}
      </div>
    </section>
  );
};

//rounded-tl-lg

export default PageContent;
