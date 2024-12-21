import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProtectedLayout = ({ children }) => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div>
      {/* <div className="w-screen h-screen absolute bg-black/40 z-50 flex justify-center items-center">
        <div className="rounded-lg bg-white p-3 shadow-lg">
          <div className="flex gap-3">
            <div className="rounded-full bg-yellow-200 flex items-center p-2">
              <IoWarningOutline size={30} className="text-yellow-500" />
            </div>
            <div>
              <h3 className=" font-medium">Your session has expired</h3>
              <h6 className="text-xs mt-1 ">
                Please log in again to continue using the app.
              </h6>
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button
              className="btn btn-sm  rounded-lg font-medium border border-gray-400/50"
              onClick={goToLogin}
            >
              Log In
            </button>
          </div>
        </div>
      </div> */}
      {children}
    </div>
  );
};

export default ProtectedLayout;
