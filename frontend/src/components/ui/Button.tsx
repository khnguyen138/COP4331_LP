import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "link";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size,
  className,
  children,
  ...props
}) => {
  const classes = classNames(
    "btn",
    {
      [`btn-${variant}`]: variant,
      [`btn-${size}`]: size,
    },
    className
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
