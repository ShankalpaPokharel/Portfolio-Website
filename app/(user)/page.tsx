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
    "Explore the portfolio of Shankalpa Pokharel (also known as Sankalpa Pokharel), a skilled web developer and software engineer from Nepal specializing in Next.js, React, and MERN stack. Discover projects, skills, and expertise in crafting user-friendly web applications.",
  creator: "Shankalpa Pokharel",
  keywords: [
    "Shankalpa Pokharel",
    "Sankalpa Pokharel",
    "shankalpa pokharel portfolio",
    "sankalpa pokharel portfolio",
    "Shankalpa Pokharel web developer",
    "Sankalpa Pokharel web developer",
    "Shankalpa developer Nepal",
    "Web Developer",
    "Portfolio",
    "Next.js",
    "MERN Stack",
    "JavaScript",
    "TypeScript",
    "React Developer",
    "Frontend Developer",
    "Full-stack Developer",
    "Nepal Web Developer",
    "Software Engineer Nepal",
  ],
  alternates: {
    canonical: "https://www.shankalpapokharel.com.np",
  },
  openGraph: {
    title: "Shankalpa Pokharel | Web Developer Portfolio",
    description:
      "Explore Shankalpa Pokharel's (Sankalpa Pokharel) portfolio showcasing expertise in Next.js, MERN stack, and JavaScript development.",
    images: [
      {
        url: "/images/about.png",
        width: 1200,
        height: 630,
        alt: "Shankalpa Pokharel Portfolio Preview",
      },
    ],
    type: "website",
    locale: "en_US",
    url: "https://www.shankalpapokharel.com.np",
    siteName: "Shankalpa Pokharel - Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shankalpa Pokharel | Web Developer Portfolio",
    description:
      "Discover the work and projects of Shankalpa Pokharel (Sankalpa Pokharel), a passionate web developer from Nepal with expertise in MERN stack and Next.js.",
    images: ["/images/about.png"],
  },
};

// JSON-LD for the portfolio page - provides rich context for search engines
const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Shankalpa Pokharel",
    alternateName: ["Sankalpa Pokharel", "Shankalpa", "Sankalpa"],
    url: "https://www.shankalpapokharel.com.np",
    image: "https://www.shankalpapokharel.com.np/images/about.png",
    jobTitle: "Web Developer",
    description:
      "Shankalpa Pokharel is a web developer and software engineer from Nepal specializing in Next.js, React, and the MERN stack.",
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "MERN Stack",
      "Web Development",
      "Frontend Development",
    ],
    nationality: {
      "@type": "Country",
      name: "Nepal",
    },
    sameAs: [
      "https://github.com/ShankalpaPokharel",
      "https://www.linkedin.com/in/shankalpa-pokharel-48a474242/",
    ],
  },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioJsonLd),
        }}
      />
        <Banner />
        <About />
        <MySkills />
        <MyProjects />
        <MyBlogs/>
        <Contact />

    </main>
  );
}
