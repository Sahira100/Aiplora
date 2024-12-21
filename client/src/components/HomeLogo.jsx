import { useNavigate } from "react-router-dom";

const HomeLogo = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center ">
      <button
        onClick={() => navigate("/")}
        type="button"
        className=" font-normal flex items-center  gap-1 text-lg"
      >
        {/* <img className="w-6 h-6" src="./logo.png" /> */}
        <h3 className="font-semibold">Aiplora</h3>
      </button>
    </section>
  );
};

export default HomeLogo;
