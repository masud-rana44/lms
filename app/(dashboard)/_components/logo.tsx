import Image from "next/image";

export const Logo = () => {
  return (
    <div className="space-y-1">
      <Image
        height={50}
        width={50}
        alt="logo"
        src="/logo.svg"
        className="cursor-pointer"
      />
      <h1 className="font-bold text-xl text-[#2880b0]">Knowledge War</h1>
    </div>
  );
};
