import React from "react";

const Input: React.FC<{}> = () => {
  return (
    <div>
      <input
        className="game__input-input"
        autoComplete="false"
        type="text"
        autoCapitalize="false"
      />
    </div>
  );
};

export default Input;
