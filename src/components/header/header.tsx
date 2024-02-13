import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src={"/logo.svg"}
          alt={"logo"}
          width={56}
          height={56}
          className={"cursor-pointer object-contain"}
        />

        <ul className="space-x-4 md:flex hidden">
          <li className="navLink">Home</li>
          <li className="navLink">Movies</li>
          <li className="navLink">TV Shows</li>
          <li className="navLink">New</li>
          <li className="navLink">Popular</li>
        </ul>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
