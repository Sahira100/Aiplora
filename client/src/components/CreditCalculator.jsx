const CreditCalculator = () => {
  return (
    <div className="bg-white border-2 p-2 rounded-lg">
      <div className="mb-2">
        <label htmlFor="credits" className="block">
          Credits
        </label>
        <input type="text" className="border-2 p-1 w-full" />
      </div>
      <div className="my-2">
        <label htmlFor="credits" className="block">
          Model
        </label>
        <input type="text" className="border-2 p-1 w-full" />
      </div>
      <div className="flex flex-col items-center my-2 mt-6">
        <h3>Total Messages</h3>
        <h4 className="text-3xl font-medium">400</h4>
      </div>
    </div>
  );
};

export default CreditCalculator;
