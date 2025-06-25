"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "teal" | "login";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: React.ReactNode | string | ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses =
    "px-4 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 xl:px-9 xl:py-5 text-md lg:text-xl font-medium rounded-[100px] inline-block cursor-pointer";

  const variantClasses = {
    primary: "text-white bg-black",
    secondary: "text-black border-2 border-black border-solid", 
    teal: "text-white bg-emerald-400",
    login: "text-white bg-emerald-400",
  } as const;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
