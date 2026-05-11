interface ButtonUIProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export default function ButtonUI({ title, ...props }: ButtonUIProps) {
  return (
    <button
      {...props}
      className="bg-amber-600 m-4 px-6 py-3 rounded-2xl mx-auto block text-white hover:bg-amber-800
       hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-default
      "
    >
      {title}
    </button>
  );
}
