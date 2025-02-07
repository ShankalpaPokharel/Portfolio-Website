import Image from "next/image";
import { CgCode, CgCodeClimate } from "react-icons/cg";
import { DiJavascript } from "react-icons/di";
import { FaCode, FaWpexplorer } from "react-icons/fa";
import { MdOutlineMovieFilter } from "react-icons/md";
import { SiJavascript } from "react-icons/si";

export default function About() {
  return (
    <div id="about" className="mt-20 flex flex-col gap-10 pb-24 lg:flex-row">
      <div className="w-full lg:w-1/2">
        <Image
          src={"/images/about.png"}
          width={400}
          height={400}
          quality={100}
          className="object-fit w-full rounded-xl"
          alt="about image"
        />
      </div>
      <div className="order-1 space-y-5 lg:order-2 lg:w-1/2">
        <div className="w-fit rounded-3xl border border-slate-500 px-5 py-2">
          <p>About Me</p>
        </div>
        <p className="text-justify">
          My journey into web development began with a curiosity about how the
          internet works, which soon turned into a passion for creating smooth
          and user-friendly digital experiences. With skills in{" "}
          <code>JavaScript, Next.js, and the MERN stack</code>, I focus on
          turning complex challenges into simple, effective solutions
        </p>
        <p className="text-justify">
          For me, coding is more than just a job—it&mdash;s about exploring new
          technologies and staying updated with the latest trends. I&mdash;m
          always eager to learn and excited about working on projects that make
          a meaningful impact.
        </p>
        <p className="text-xl font-bold underline">Things I love</p>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex items-center space-x-6">
            <div className="hover-effect-box flex w-fit items-center justify-center rounded-full bg-white p-3">
              <FaCode className="inline-block text-2xl text-blue-500" />
            </div>
            <p className="text-lg">Web Development</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hover-effect-box flex w-fit items-center justify-center rounded-full bg-white p-3">
              <SiJavascript className="inline-block text-2xl text-[#F7DF1E]" />
            </div>
            <p className="text-lg">JavaScript</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hover-effect-box flex w-fit items-center justify-center rounded-full bg-white p-3">
              <FaWpexplorer className="inline-block text-2xl text-blue-500" />
            </div>
            <p className="text-lg">Explore</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hover-effect-box flex w-fit items-center justify-center rounded-full bg-white p-3">
              <MdOutlineMovieFilter className="inline-block text-2xl text-blue-500" />
            </div>
            <p className="text-lg">Movie</p>
          </div>
        </div>
      </div>
    </div>
  );
}
