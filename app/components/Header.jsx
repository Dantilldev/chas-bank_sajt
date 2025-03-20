"use client";
import {RxHamburgerMenu} from "react-icons/rx";
import {TfiClose} from "react-icons/tfi";
import {useState} from "react";
import {BiLogIn} from "react-icons/bi";

import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <nav className=" flex justify-between items-center w-full ">
      {isOpen && <div className="fixed inset-0 " onClick={handleMenu}></div>}

      <div className="flex flex-row justify-between items-center w-full bg-blue-950 text-white py-4 px-5 gap-10">
        <Link
          href="/"
          className="flex flex-row items-center gap-4"
          style={{textDecoration: "none"}}
        >
          <span className="text-5xl hover:no-underline">🏦</span>

          <span className="text-2xl hover:no-underline">CHAS BANKS</span>
        </Link>

        <ul className="md:flex items-center hidden space-x-6 text-lg font-light">
          <li>
            <Link href="/">Contact Us</Link>
          </li>
          <li>
            <Link href="/">Accounts</Link>
          </li>
          <li>
            <Link href="/">Transfer</Link>
          </li>
          <li>
            <Link href="/">Help</Link>
          </li>
          <li>
            <Link
              href="/login"
              className="bg-blue-500 flex flex-row justify-center items-center py-2 px-4 rounded-md gap-2 hover:opacity-80"
              style={{textDecoration: "none"}}
            >
              <BiLogIn /> Login
            </Link>
          </li>
        </ul>
        {/* Menu Btn */}
        {!isOpen && (
          <button
            className="text-3xl relative z-50 md:hidden"
            onClick={handleMenu}
          >
            <RxHamburgerMenu />
          </button>
        )}
      </div>
      {/* Slide Menu */}
      <div
        className={`fixed top-0 right-0 min-h-screen w-52 bg-blue-950 text-white shadow-lg p-4 flex flex-col items-center space-y-7 text-xl duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : " translate-x-full"}`}
      >
        <div className="flex justify-end text-3xl w-full">
          <button onClick={handleMenu}>
            <TfiClose />
          </button>
        </div>

        <ul className=" flex flex-col gap-5">
          <li>
            <Link href="/">Contact Us</Link>
          </li>
          <li>
            <Link href="/">Accounts</Link>
          </li>
          <li>
            <Link href="/">Transfer</Link>
          </li>
          <li className="border-b pb-10 ">
            <Link href="/">Help</Link>
          </li>
          <li>
            <Link
              href="/login"
              className="flex flex-row justify-start items-center gap-3  py-2 px-4 rounded-sm bg-blue-500 hover:opacity-90"
              style={{textDecoration: "none"}}
            >
              <BiLogIn />
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

{
  /*Stänger menyn vid klick utanför) */
}
{
  /* {isOpen && <div className="fixed inset-0 " onClick={handleMenu}></div>} */
}
