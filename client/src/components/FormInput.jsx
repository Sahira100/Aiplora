const FormInput = ({
  label,
  name,
  type,
  placeholder,
  onChange,
  warning,
  value,
}) => {
  return (
    <>
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete="true"
        className={`w-full border-2 p-1 rounded-lg ${
          warning && "border-red-500"
        }`}
        value={value}
        required={true}
        onChange={onChange}
      />
      <div className={`${!warning && "hidden"} text-red-500 text-sm flex mt-1`}>
        <i className="fa-solid fa-circle-exclamation text-sm mr-2 text-red-500 inline"></i>
        {warning}
      </div>
    </>
  );
};

export default FormInput;
