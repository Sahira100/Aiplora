import React from "react";
import { RxCross1 } from "react-icons/rx";

const ImageSelectCard = ({ selectedFile, onRemove }) => {
  return (
    <div className="border  flex relative bg-white rounded-lg">
      <img
        src={URL.createObjectURL(selectedFile)}
        alt={selectedFile.name}
        className="max-w-20 max-h-20 object-fill rounded-lg"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute -right-3 -top-3 p-1 rounded-full border bg-white hover:bg-gray-200"
      >
        <RxCross1 size={10} />
      </button>
    </div>
  );
};

export default ImageSelectCard;
