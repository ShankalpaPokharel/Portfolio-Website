import About from "@/components/About/About";
import Banner from "@/components/Banner/Banner";
import Contact from "@/components/Contact/Contact";
import Container from "@/components/global/Container";
import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import MyBlogs from "@/components/MyBlogs/MyBlogs";
import MySkills from "@/components/MySkills/MySkills";
import NavHeader from "@/components/NavHeader";
import MyProjects from "@/components/Projects/MyProjects";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Shankalpa Pokharel | Web Developer Portfolio | Next.js & MERN Stack Specialist",
  description:
    "Explore the portfolio of Shankalpa Pokharel, a skilled web developer from Nepal specializing in Next.js and MERN stack. Discover projects, skills, and expertise in crafting user-friendly web applications.",
  creator: "Shankalpa Pokharel",
  keywords: [
    "Shankalpa Pokharel",
    "Web Developer",
    "Portfolio",
    "Next.js",
    "MERN Stack",
    "JavaScript",
    "Frontend Developer",
    "Full-stack Developer",
    "Nepal Web Developer",
  ],
  openGraph: {
    title: "Shankalpa Pokharel | Web Developer Portfolio",
    description:
      "Explore Shankalpa Pokharel’s portfolio showcasing expertise in Next.js, MERN stack, and JavaScript development.",
    images: [
      {
        url: "/images/about.png",
        alt: "Shankalpa Pokharel Portfolio Preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shankalpa Pokharel | Web Developer Portfolio",
    description:
      "Discover the work and projects of Shankalpa Pokharel, a passionate web developer with expertise in MERN stack and Next.js.",
    images: ["/images/about.png"],
  },
};

export default function Home() {
  return (
    <main>

        <Banner />
        <About />
        <MySkills />
        <MyProjects />
        <MyBlogs/>
        <Contact />

    </main>
  );
}
