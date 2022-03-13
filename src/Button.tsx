import React from "react";

const buttonStyling = {
  padding: "8px 14px",
  margin: "8px",
  border: "6px solid #333",
  color: "#333",
  fontWeight: "900",
  fontSize: 26,
  borderRadius: 6,
};

const buttonDisabled = {
  border: "6px solid #ccc",
  color: "#ccc",
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
