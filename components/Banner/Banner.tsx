import { FaGithub } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import CodeBlock from "./CodeBlock";
import Link from "next/link";

export default function Banner() {
  const jsCode = `
  class Person {

  constructor() {
    this.name = "Shankalpa Pokharel";
    this.role = "Frontend Web Developer";
    this.skills = ["Next.js", "MERN Stack"];
    this.age = new Date().getFullYear()-2002;
    }
    }
  `;

  return (
    <div id="banner" className="flex h-screen items-center justify-between">
      <div className="mt-20 flex w-full flex-col justify-between gap-10 md:flex-row md:items-center">
        <div className="md:gap-auto mt-20 flex flex-col gap-4 2xl:text-xl">
          <p>Hello I am,</p>
          <p className="text-4xl font-bold lg:text-5xl">Shankalpa Pokharel</p>
          <p>
            Frontend Developer - Building seamless web experiences with Next.js
            and the MERN stack
          </p>
          <div className="flex space-x-5">
            <div className="hover-effect-box rounded-full bg-white p-3">
              <Link
                href={"https://github.com/ShankalpaPokharel"}
                target="_blank"
              >
                <FaGithub className="text-2xl text-black" />
              </Link>
            </div>
            <div className="hover-effect-box rounded-full bg-white p-3">
              <Link
                href={
                  "https://www.linkedin.com/in/shankalpa-pokharel-48a474242/"
                }
                target="_blank"
              >
                <ImLinkedin className="text-2xl text-blue-600" />
              </Link>
            </div>
          </div>
        </div>

        <div>
          <CodeBlock text="JS" language="javascript" code={jsCode} />
        </div>
      </div>
    </div>
  );
}
