const Headline = ({ name }) => {
  return (
    <div>
      <h3 className="text-4xl font-light text-gray-800 capitalize">
        {name
          ? `${name}. Let's make today productive`
          : "Let's make today productive!"}
      </h3>
      <p className="mt-5 text-gray-600">
        You can view your already subscribed models in the Subscribe Models
        section on the left side. Feel free to explore and use them.
      </p>
    </div>
  );
};

export default Headline;
