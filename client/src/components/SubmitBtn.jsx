const SubmitBtn = ({ isSubmitting, color, name }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`block w-full font-medium p-2 rounded-lg text-white ${color}`}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner text-white w-4 "></span>
        </>
      ) : (
        name
      )}
    </button>
  );
};

export default SubmitBtn;
