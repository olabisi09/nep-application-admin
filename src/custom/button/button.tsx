import React from "react";

import classNames from "classnames";

import Spinner from "../spinner/spinner";

import styles from "./styles.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isLoading?: boolean;
  iconBefore?: React.ReactNode;
  variant?: "default" | "text";
  bgColor?: string; // New prop for background color
  removePadding?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  className,
  isLoading,
  iconBefore,
  disabled,
  bgColor,
  variant,
  removePadding,
  ...rest
}) => {
  const buttonStyle = {
    backgroundColor: bgColor || "var(--color-primary)", // Use the passed bgColor or fallback to default
  };
  
  const noPaddingStyle = {
    paddingInline: 0,
    paddingBlock: 0,
  };

  if (variant === "text") {
    return (
      <button
        {...rest}
        className={classNames(styles.textButton, className)}
        disabled={disabled}
        type="button"
        style={removePadding ? noPaddingStyle : {}}
      >
        {iconBefore}
        {isLoading ? <Spinner /> : text}
      </button>
    );
  }

  return (
    <button
      {...rest}
      className={classNames(styles.button, className)}
      style={buttonStyle} // Apply the style
      disabled={disabled}
    >
      {iconBefore}
      {isLoading ? <Spinner /> : text}
    </button>
  );
};

export default Button;
