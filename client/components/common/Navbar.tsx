import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center bg-blue-200 bg-gradient-to-r from-pink-500 to-red-500 p-3 justify-between">
      <h1 className="text-white text-2xl font-bold">type.amazing</h1>
      <div className="">
        <Link href="/">
          <a className="p-3">Home</a>
        </Link>
        <Link href="/">
          <a className="p-3">Home</a>
        </Link>
        <Link href="/">
          <a className="p-3">Home</a>
        </Link>
        <Link href="/">
          <a className="p-3">Home</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
