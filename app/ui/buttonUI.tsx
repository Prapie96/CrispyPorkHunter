import { buttonSizeMapStyles, buttonVariantMapStyles, statusButtonMapStyles } from "../const/variant";
import { SizeButton, VariantType } from "../types/uitypes";

interface ButtonUIProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: VariantType;
  size: SizeButton;
  title:string;
}

export default function ButtonUI({ variant = "primary",size ="lg",title,className, ...props }: ButtonUIProps) {
  const baseStyles =`
    mx-auto inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer
    disabled:bg-gray-400 disabled:cursor-default
    `;
  return (
    <button
      {...props}
      // className="bg-amber-600 m-4 px-6 py-3 rounded-2xl mx-auto block text-white hover:bg-amber-800
      //  hover:cursor-pointer 
      // "
      className={`${baseStyles} ${buttonVariantMapStyles[variant]} ${buttonSizeMapStyles[size]} ${className}`}
   >
      {title}
    </button>
  );
}
