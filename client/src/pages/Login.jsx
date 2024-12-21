import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import {
  ErrorToast,
  FormInput,
  SubmitBtn,
  VerifyYourEmail,
} from "../components/";
import { customFetch } from "../utils";
import FormPasswordInput from "../components/FormPasswordInput";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const user = await customFetch.post("/auth/login", data);
    console.log(user);
    return null;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      if (error.response.data.msg === "Please verify your email") {
        await customFetch.post("/auth//verification-email", {
          email: data.email,
        });
        return { status: "verify", email: data.email };
      }
    }

    return { status: "fail" };
  }
};

const Login = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main>
      {actionData?.status === "verify" ? (
        <div className="h-screen flex items-center justify-center">
          <VerifyYourEmail email={actionData?.email} />
        </div>
      ) : (
        <div className="mx-auto my-20 w-4/6">
          <h3 className="text-4xl">AIplora</h3>
          <div className="flex mt-5 gap-x-10">
            <section className="flex-initial w-96">
              <p>
                Access ChatGPT, GPT-4, Claude 3 Opus, DALL-E 3, and more -
                choose from flexible AI packages.
              </p>

              <div className="mt-7 w-5/6">
                {actionData?.status === "fail" && (
                  <ErrorToast
                    headline="There was a problem in logging. Check your email and password."
                    headlineSize="text-sm"
                  />
                )}
                <Form method="POST">
                  <FormInput
                    label="Email *"
                    name="email"
                    type="email"
                    placeholder="aiplora@gmail.com"
                  />
                  <div className="mt-3"></div>
                  <FormPasswordInput label="Password *" />
                  <div className="mb-6"></div>
                  <p className="mt-2 text-sm mb-2">
                    <Link to="/forgot-password">Forgot password?</Link>
                  </p>
                  <SubmitBtn
                    isSubmitting={isSubmitting}
                    color="bg-gradient-to-b from-sky-500 to-blue-500"
                    name="Log in"
                  />
                </Form>

                <p className="mt-6 text-sm">
                  Don't have an account ?
                  <span>
                    <Link to="/signup" className="text-blue-500">
                      {" "}
                      Create an account
                    </Link>
                  </span>
                </p>

                <p className="mt-8 text-s">
                  By continuing, you are agreeing to AIplora's{" "}
                  {
                    <Link to="/terms" className="text-blue-500">
                      Terms of Service{" "}
                    </Link>
                  }
                  and{" "}
                  {
                    <Link to="/privacy" className="text-blue-500">
                      Privacy Policy
                    </Link>
                  }
                </p>
              </div>
            </section>
            <section className="grow">
              <img src="./login_screen_img1.svg" alt="login image" />
            </section>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;
