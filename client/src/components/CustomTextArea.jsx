import React from "react";

const CustomTextArea = ({ value }) => {
  return (
    <textarea
      name="prompt"
      ref={textareaRef}
      type="text"
      onKeyDown={handleKeyDown}
      onChange={handleTextArea}
      value={value}
      className="resize-none text-sm outline-none grow"
      placeholder={placeholder}
      autoComplete="false"
      style={{ height: `${height}px` }}
    />
  );
};

export default CustomTextArea;
