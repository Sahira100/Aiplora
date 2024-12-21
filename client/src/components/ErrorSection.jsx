import { useRouteError } from "react-router-dom";

const ErrorSection = () => {
  const error = useRouteError();

  return (
    <div className="text-center h-full flex items-center justify-center">
      <p className="mt-5 text-gray-700">
        {error.message || "Something went wrong while fetching the data."}
      </p>
    </div>
  );
};

export default ErrorSection;
