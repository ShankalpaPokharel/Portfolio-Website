"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const navbarRef = useRef<HTMLUListElement>(null);

  const handleClickOutside = (event: any) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setNavOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(navOpen);
  return (
    <nav className="fixed w-full bg-black bg-opacity-90 text-left lg:h-auto lg:w-full mt-10">
      <div className="flex flex-col justify-between px-16 py-2 lg:flex-row lg:items-center lg:px-24 overflow-hidden">
        <div>
          <Link href="#banner" className="text-2xl font-bold lg:text-4xl">
            Shankalpa
          </Link>
        </div>
        <ul
          ref={navbarRef}
          className={`absolute right-0 mt-10 flex h-screen w-1/2 flex-col items-start gap-5 bg-black bg-opacity-80 p-5 duration-500 lg:relative lg:mt-0 lg:h-auto lg:w-auto lg:flex-row lg:items-center lg:bg-none lg:p-0 ${
            navOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          } `}
        >
          <li className="group relative">
            <Link href="#banner">Home</Link>
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full"></span>
          </li>
          <li className="group relative">
            <Link href="#about">About</Link>
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full"></span>
          </li>
          <li className="group relative">
            <Link href="#skills">Skills</Link>
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full"></span>
          </li>
          <li className="group relative">
            <Link href="#projects">Projects</Link>
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full"></span>
          </li>
          <li className="group relative">
            <Link href="#contact">Contact</Link>
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full"></span>
          </li>
        </ul>
      </div>
      <div
        onClick={(e) => setNavOpen(!navOpen)}
        className="absolute right-10 top-2 text-4xl lg:hidden"
      >
        {navOpen ? <RxCross2 /> : <FiMenu />}
      </div>
    </nav>
  );
}
