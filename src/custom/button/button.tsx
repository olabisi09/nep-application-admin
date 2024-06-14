import React from "react";
import { Spin } from "antd";
import styles from "./styles.module.scss";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isLoading?: boolean;
  iconBefore?: React.ReactNode;
  bgColor?: string; // New prop for background color
}

const Button: React.FC<ButtonProps> = ({
  text,
  className,
  isLoading,
  iconBefore,
  disabled,
  bgColor,
  ...rest
}) => {
  const buttonStyle = {
    backgroundColor: bgColor || "var(--color-primary)", // Use the passed bgColor or fallback to default
  };

  return (
    <button
      {...rest}
      className={classNames(styles.button, className)}
      style={buttonStyle} // Apply the style
      disabled={disabled}
    >
      {iconBefore}
      {isLoading ? <Spin className={styles.spinner} /> : text}
    </button>
  );
};

export default Button;
