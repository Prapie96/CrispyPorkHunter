import { ReactNode } from "react";
import { buttonSizeMapStyles, buttonVariantMapStyles, statusButtonMapStyles } from "../const/variant";
import { SizeButton, VariantType } from "../types/uitypes";

interface ButtonUIProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: VariantType;
  size: SizeButton;
  children:ReactNode;
}

export default function ButtonUI({ variant = "primary",size ="lg",children,className, ...props }: ButtonUIProps) {
  const baseStyles =`
    mx-auto inline-flex items-center justify-center rounded-2xl font-medium transition-colors cursor-pointer
    disabled:bg-gray-400 disabled:cursor-default focus:outline-none
    `;
  return (
    <button
      {...props}
      className={`${baseStyles} ${buttonVariantMapStyles[variant]} ${buttonSizeMapStyles[size]} ${className}`}
   >
      {children}
    </button>
  );
}
