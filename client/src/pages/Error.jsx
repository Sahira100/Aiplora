import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <main>
      <section className="h-screen w-screen flex flex-col text-center">
        <div className="m-auto w-80">
          <h3 className="text-7xl">404</h3>
          <h4 className="text-lg">Page Not Found</h4>
          <h5 className="mt-5 text-sm">
            This page has wandered off. Let's get you back to where you belong!
          </h5>
          <button
            type="button"
            className="btn w-full mt-5"
            onClick={() => navigate("/", { replace: true })}
          >
            Back
          </button>
        </div>
      </section>
    </main>
  );
};

export default Error;
