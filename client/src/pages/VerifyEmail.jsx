import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const verificationToken = url.searchParams.get("token");
  const email = url.searchParams.get("email");

  if (!verificationToken || !email) {
    return redirect("/");
  }

  try {
    const resp = await customFetch.post("/auth/verify-email", {
      email,
      verificationToken,
    });

    return { status: "success", msg: resp.data.msg };
  } catch (e) {
    return { status: "fail", msg: e.response?.data?.msg || e.message };
  }
};

const VerifyEmail = () => {
  const loadData = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      {loadData?.status === "fail" ? (
        <section className="m-auto text-center">
          <i className="fa-regular fa-circle-xmark fa-shake fa-shake text-6xl text-red-400"></i>
          <h3 className="mt-5 text-3xl font-normal">Something Went Wrong</h3>
          <p className="mt-3">Please try to login</p>
          <button
            className="btn mt-7"
            onClick={() => navigate("/login", { replace: true })}
          >
            Back to log in
          </button>
        </section>
      ) : (
        <section className="m-auto text-center">
          <i className="fa-regular fa-circle-check fa-shake text-6xl text-green-400"></i>
          <h3 className="mt-5 text-3xl font-normal">Email Verified</h3>
          <p className="mt-3">Your email address was successfully verified</p>
          <button
            className="btn mt-7"
            onClick={() => navigate("/login", { replace: true })}
          >
            Back to log in
          </button>
        </section>
      )}
    </div>
  );
};

export default VerifyEmail;
