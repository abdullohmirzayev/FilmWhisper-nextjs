import Image from "next/image";

const Success = () => {
  return (
    <>
      <div className="flex justify-start">
        <Image
          src={"/logo.svg"}
          alt={"logo"}
          width={56}
          height={56}
          className={"cursor-pointer object-contain"}
        />
      </div>
    </>
  );
};

export default Success;
