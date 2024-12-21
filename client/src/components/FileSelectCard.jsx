import React from "react";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const FileSelectCard = ({ selectedFile, onRemove }) => {
  return (
    <div className="border p-1 px-2 flex gap-1 relative bg-white h-11">
      <MdOutlineInsertDriveFile size={30} />
      <div className="text-xs text-start w-24">
        <h3 className="truncate ">{selectedFile.name}</h3>
        <p className="block">{(selectedFile.size / 1024).toFixed(2)} kb</p>
      </div>
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

export default FileSelectCard;
