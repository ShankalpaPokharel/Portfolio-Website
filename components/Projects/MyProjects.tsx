import Image from "next/image";
import Link from "next/link";
import {
  SiJavascript,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiReact,
  SiNodedotjs,
  SiGithub,
  SiNextdotjs,
} from "react-icons/si";

export default function MyProjects() {
  const myProjects = [
    {
      imageSrc: "/images/project1.png",
      projectName: "Scholar",
      techStack: [
        { icon: SiNodedotjs, iconColor: "#3C873A" },
        { icon: SiExpress, iconColor: "#000000" },
        { icon: SiMongodb, iconColor: "#47A248" },
        { icon: SiReact, iconColor: "#61DAFB" },
      ],
      githubLink: "https://scholar-aba6.vercel.app/",
    },
    {
      imageSrc: "/images/project2.png",
      projectName: "CodePen Clone",
      techStack: [
        { icon: SiNodedotjs, iconColor: "#3C873A" },
        { icon: SiExpress, iconColor: "#000000" },
        { icon: SiMongodb, iconColor: "#47A248" },
        { icon: SiReact, iconColor: "#61DAFB" },
      ],
      githubLink: "https://github.com/ShankalpaPokharel/CodePen",
    },
    {
      imageSrc: "/images/project3.png",
      projectName: "Pizza Palance",
      techStack: [
        { icon: SiNextdotjs, iconColor: "#000000" },
        { icon: SiMongodb, iconColor: "#47A248" },
      ],
      githubLink: "#",
    },
  ];
  return (
    <div id="projects" className="py-20">
      <div className="w-fit rounded-3xl border border-slate-500 px-5 py-2">
        <p>My Projects</p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 2xl:grid-cols-3">
        {myProjects.map((project) => (
          <div
            key={project.projectName}
            className="rounded-2xl bg-[#232323] shadow-xl"
          >
            <div className="lg:h-[300px]">
              <Image
                src={project.imageSrc}
                width={400}
                height={0}
                alt="project1"
                className="aspect-video h-full w-full rounded-t-2xl object-cover 2xl:object-contain"
              />
            </div>
            <div className="mt-5 flex items-center justify-between px-5">
              <p>{project.projectName}</p>
              <div className="flex gap-3 rounded-full bg-slate-400 px-3 py-2">
                {project.techStack.map((tech: any) => (
                  //  <div className="bg-white p-3 rounded-full w-fit flex items-center justify-center">
                  <tech.icon
                    key={tech.icon}
                    color={tech.iconColor}
                    className="text-2xl"
                  />
                  //  </div>
                ))}
              </div>
            </div>
            <hr className="mx-6 mt-4 border-slate-600" />
            <Link
              href={project.githubLink}
              className="flex items-center px-8 py-4"
              target="_blank"
            >
              <SiGithub className="text-2xl" />
              <p className="ml-3">View Code</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
