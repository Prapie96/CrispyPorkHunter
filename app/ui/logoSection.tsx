import Image from "next/image";

export default function LogoSection() {
  return (
    <div className="p-8 flex flex-col gap-4 bg-linear-to-br from-amber-600 to-orange-800 shadow-md">
      <div className="flex items-center justify-start">
        <Image
          src={"/crispypork.png"}
          alt="Logo Crispy Pork"
          width={80}
          height={80}
         
        />
        <h2 className=" text-2xl font-bold">Crispy Pork Hunter</h2>
      </div>
      <p className=" text-amber-100 text-sm opacity-90 font-light">
        ตามล่าร้านหมูกรอบทั่วราชอาณาจักรไทย
      </p>
    </div>
  );
}
