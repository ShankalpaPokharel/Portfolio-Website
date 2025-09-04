import React from "react";
import {
  SiJavascript,
  SiTypescript,
  SiExpress,
  SiMongodb,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
} from "react-icons/si";

function SkillDev({
  iconName: IconComponent,
  title,
  iconColor,
}: {
  iconName: React.ElementType;
  title: string;
  iconColor: string;
}) {
  return (
    <div className="w-fill hover-effect-box rounded-2xl bg-[#232323] px-12 py-10 text-white ">
      <div className="flex flex-col items-center justify-between space-y-6">
        <div className="flex w-fit items-center justify-center rounded-full bg-white p-3">
          {IconComponent && (
            <IconComponent
              style={{ color: iconColor }}
              className="inline-block text-2xl"
            />
          )}
        </div>
        <p className="text-center text-lg">{title}</p>
      </div>
    </div>
  );
}

export default function MySkills() {
  const MySkills = [
    { iconName: SiJavascript, title: "JavaScript", iconColor: "#F7DF1E" },
    { iconName: SiTypescript, title: "TypeScript", iconColor: "#3178C6" },
    { iconName: SiNextdotjs, title: "Next.js", iconColor: "#000000" },
    // { iconName: SiExpress, title: "Express", iconColor: "#68A063" },
    { iconName: SiMongodb, title: "MongoDB", iconColor: "#47A248" },
    { iconName: SiReact, title: "React", iconColor: "#61DAFB" },
    { iconName: SiNodedotjs, title: "Node.js", iconColor: "#339933" },
  ];

  return (
    <div id="skills" className="gap-10 py-20 lg:flex">
      <div className="lg:w-[40%]">
        <div className="w-fit rounded-3xl border border-slate-500 px-5 py-2">
          What I Know?
        </div>
        <p className="mt-5 text-3xl font-bold">
          My Skills: Navigating the Tech Landscape
        </p>
        <p className="mt-5 text-justify">
          My skill set is a blend of powerful technologies and practical
          experience. JavaScript is at the core of my development work, enabling
          me to build interactive and engaging web features. With{" "}
          <code>Next.js</code>, I create high-performance, SEO-friendly
          applications that are fast and responsive
        </p>
        <p className="mt-5 text-justify">
          The<code> MERN stack</code> is a cornerstone of my full-stack
          development, where I integrate{" "}
          <code>MongoDB, Express.js, React, and Node.js</code> to craft robust
          and scalable applications. To enhance my code quality and reliability,
          I use <code>TypeScript</code>, which introduces type safety and helps
          prevent errors. Additionally, I can effectively convert
          <code> Figma</code> designs into code, turning detailed design
          prototypes into functional web interfaces. Together, these skills
          enable me to navigate the tech landscape effectively and deliver
          compelling web experiences.
        </p>
      </div>
      <div className="mt-10 lg:w-[60%]">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {MySkills.map((skill, index) => (
            <SkillDev
              key={index}
              iconName={skill.iconName}
              title={skill.title}
              iconColor={skill.iconColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
