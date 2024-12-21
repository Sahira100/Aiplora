import { useState } from "react";
import { FormInput, SuccessToast, ErrorToast } from "../components";
import { customFetch, validateEmail } from "../utils";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const handleEmail = (e) => {
    const email = e.target.value;

    setEmail(email);

    const status = validateEmail(email);

    if (!status.valid) return setWarning(status.msg);

    setWarning("");
  };

  const requestResetLink = async () => {
    if (!validateEmail(email)) return;

    setIsSubmitting(true);

    try {
      await customFetch.post("/auth/forgot-password", { email });
      setIsSuccess(true);
      setIsFailed(false);
      setEmail("");
    } catch (error) {
      setIsFailed(true);
      setIsSuccess(false);
    }

    setIsSubmitting(false);
  };

  return (
    <main>
      <div className="h-screen flex flex-col">
        <section className="m-auto w-80">
          <h3 className="text-center text-2xl mb-10">AIplora</h3>
          <p className="text-sm mb-6">
            Enter the email address associated with your account and we'll send
            you a link to reset your password
          </p>
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmail}
            warning={warning}
          />
          <button className="btn w-full mt-5" onClick={requestResetLink}>
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Reset Password"
            )}
          </button>

          {isFailed && (
            <ErrorToast
              headline="Something went Wrong"
              message="Check your email and try again later."
            />
          )}

          {isSuccess && (
            <SuccessToast
              headline="Reset password email sent"
              message="You should soon receive an email allowing you to reset your
                  password. Please make sure to check your spam and trash if you
                  can't find the email."
            />
          )}
          <p className="text-center mt-10 underline">
            <Link to="/login">Return to log in</Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default ForgotPassword;
