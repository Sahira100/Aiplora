import { useState } from "react";
import { customFetch } from "../utils";

const VerifyYourEmail = ({ email, resetTime = 15 }) => {
  const [resendState, setResendState] = useState({
    sending: false,
    canResend: true,
  });

  const resendVerificationEmail = async () => {
    if (!resendState.canResend) return;
    setResendState({ ...resendState, sending: true });

    try {
      await customFetch.post("/auth/verification-email", {
        email,
      });
    } catch (error) {
      console.log(error);
    }

    setResendState({
      canResend: false,
      sending: false,
    });

    setTimeout(() => {
      setResendState({ ...resendState, canResend: true });
    }, 1000 * resetTime);
  };

  return (
    <section className="w-[500px] text-center">
      <h3 className="text-center text-4xl">AIplora</h3>
      <h3 className="mt-10 text-2xl font-semibold">Please verify your email</h3>
      <p className="mt-2 ">You're almost there! We sent an email to</p>
      <p className="mb-4 font-semibold">{email}</p>
      <p>
        Just click on the link in that email to complete your signup. if you
        dont see it,you may need to{" "}
        <span className="font-semibold">check your spam </span>
        folder
      </p>
      <p className="mt-8 mb-3">Still cant't find the email? No problem</p>

      {resendState.canResend ? (
        <button
          className="btn no-animation"
          disabled={resendState.sending}
          onClick={resendVerificationEmail}
        >
          {resendState.sending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Resend Verification Email"
          )}
        </button>
      ) : (
        <p>
          <i className="fa-solid fa-circle-check"> </i> Success
        </p>
      )}

      <div className="my-8"></div>
    </section>
  );
};

export default VerifyYourEmail;
