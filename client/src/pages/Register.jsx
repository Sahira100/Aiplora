import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import {
  customFetch,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../utils";
import {
  ErrorToast,
  FormInput,
  SubmitBtn,
  VerifyYourEmail,
} from "../components";
import { useState } from "react";
import FormPasswordInput from "../components/FormPasswordInput";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { name, email, password } = Object.fromEntries(formData);

  if (!email || !name || !password) return;

  if (!validateEmail(email).valid) return;

  if (!validateUsername(name).valid) return;

  if (!validatePassword(password).valid) return;

  try {
    await customFetch.post("/auth/register", { name, email, password });
    return { status: "success", email };
  } catch (error) {
    return { status: "fail", msg: "register Errors" };
  }
};

const Register = () => {
  const navigation = useNavigation();
  const actionData = useActionData();

  const isSubmitting = navigation.state === "submitting";
  const [errors, setErrors] = useState({ name: "", password: "", email: "" });

  const handleFirstName = (e) => {
    const fname = e.target.value;
    const status = validateUsername(fname);

    if (!status.valid) {
      return setErrors({ ...errors, name: status.msg });
    }

    return setErrors({ ...errors, name: "" });
  };

  const handleEmail = (e) => {
    const email = e.target.value;
    const status = validateEmail(email);

    if (!status.valid) {
      return setErrors({ ...errors, email: status.msg });
    }

    return setErrors({ ...errors, email: "" });
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    const status = validatePassword(password);

    if (!status.valid) {
      return setErrors({ ...errors, password: status.msg });
    }

    return setErrors({ ...errors, password: "" });
  };

  return (
    <main>
      <div className="h-screen flex items-center justify-center">
        {actionData?.status === "success" ? (
          <VerifyYourEmail email={actionData?.email} />
        ) : (
          <section className="w-96 p-8">
            <h3 className="text-center text-4xl">AIplora</h3>
            <h4 className="my-6 text-lg">Create an account</h4>
            {actionData?.msg === "register Errors" && (
              <ErrorToast
                headline="There was an issue creating your account. Please ensure all
              information is correct and try again."
                headlineSize="text-sm"
              />
            )}

            <Form method="POST">
              <FormInput
                label="First name *"
                type="text"
                name="name"
                onChange={handleFirstName}
                warning={errors.name}
              />
              <div className="mt-2"></div>
              <FormInput
                label="Email *"
                type="email"
                name="email"
                onChange={handleEmail}
                warning={errors.email}
              />
              <div className="mt-2"></div>

              <FormPasswordInput
                label="Password *"
                onChange={handlePassword}
                warning={errors.password}
              />
              <div className="mt-9"></div>
              <SubmitBtn
                name="Create"
                color="bg-gradient-to-b from-sky-500 to-blue-500"
                isSubmitting={isSubmitting}
              />
            </Form>
            <p className="mt-4 text-[10px]">
              AIplora uses the information you provide us to contact you about
              our relevant content, products, and services. You may unsubscribe
              from these communications at any time.
            </p>
            <h3 className="my-4 text-sm">
              Already have an account?
              <Link to="/login" className="ml-1 text-blue-500">
                Log in
              </Link>
            </h3>
          </section>
        )}
      </div>
    </main>
  );
};

export default Register;
