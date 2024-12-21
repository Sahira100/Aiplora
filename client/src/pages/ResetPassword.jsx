import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { customFetch, validatePassword } from "../utils";
import FormPasswordInput from "../components/FormPasswordInput";
import { useState } from "react";
import { ErrorToast } from "../components/CustomToast";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const passwordToken = url.searchParams.get("token");
  const email = url.searchParams.get("email");

  if (!passwordToken || !email) {
    return redirect("/");
  }

  return { email, passwordToken };
};

const ResetPassword = () => {
  const loadData = useLoaderData();

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const handelPassword = (e) => {
    const pass = e.target.value;
    setPassword(pass);
    const { valid, msg } = validatePassword(pass);

    if (valid) {
      return setWarning("");
    }

    return setWarning(msg);
  };

  const resetPassword = async () => {
    if (!validatePassword(password).valid) return;

    setIsSubmitting(true);
    try {
      await customFetch.post("/auth/reset-password", {
        email: loadData.email,
        passwordToken: loadData.passwordToken,
        password,
      });
      navigate("/", { replace: true });
    } catch (e) {
      setIsFailed(true);
    }

    setIsSubmitting(false);
  };

  return (
    <main>
      <div className="h-screen flex flex-col">
        <section className="m-auto w-80">
          <h3 className="text-center text-2xl mb-10">AIplora</h3>

          <h4 className="text-xl mb-5">Reset your password</h4>
          <p className="text-sm mb-4">
            Enter a new password to reset the password on your account.
          </p>
          <FormPasswordInput
            label="New password *"
            onChange={handelPassword}
            warning={warning}
            value={password}
          />
          <button
            type="button"
            className="btn mt-7 w-full"
            onClick={resetPassword}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Reset Password"
            )}
          </button>
          {isFailed && <ErrorToast headline="Password reset failed." />}
        </section>
      </div>
    </main>
  );
};

export default ResetPassword;
