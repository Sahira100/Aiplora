import { useState } from "react";

const FormPasswordInput = ({ label, onChange, warning, value }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [hideEye, setHideEye] = useState(false);

  const handlePasswordType = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label htmlFor="password" className="block mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={`${showPassword ? "text" : "password"}`}
          name="password"
          autoComplete="current-password"
          spellCheck="false"
          autoCapitalize="none"
          className={`border-2 p-1 pr-12 rounded-lg w-full relative ${
            warning && "border-red-500"
          }`}
          value={value}
          required={true}
          onChange={(e) => {
            if (onChange) onChange(e);
            if (e.target.value.length > 0) return setHideEye(true);

            setHideEye(false);
          }}
        />
        {hideEye && (
          <button
            type="button"
            className="absolute right-0 bottom-0 h-full p-2"
            onClick={handlePasswordType}
          >
            <i
              className={`fa-regular ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              }`}
            ></i>
          </button>
        )}
      </div>

      <div className={`${!warning && "hidden"} text-red-500 text-sm flex mt-1`}>
        <i className="fa-solid fa-circle-exclamation text-sm mr-2 text-red-500 inline"></i>
        {warning}
      </div>
    </>
  );
};
export default FormPasswordInput;
