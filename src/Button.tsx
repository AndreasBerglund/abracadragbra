import React from "react";

const buttonStyling = {
  padding: "10px 18px",
  margin: "8px",
  border: "5px solid #333",
  fontWeight: "900",
};

const buttonDisabled = {
  border: "5px solid #ccc",
};

interface ButtonInterface {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled: boolean;
  buttonText: string;
}

const Button = ({ handleClick, isDisabled, buttonText }: ButtonInterface) => {
  return (
    <button
      style={
        isDisabled ? { ...buttonStyling, ...buttonDisabled } : buttonStyling
      }
      onClick={handleClick}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
};

export default Button;
