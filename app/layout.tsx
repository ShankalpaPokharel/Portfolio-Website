import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

import { ThemeProvider } from "@/components/provider/theme-provider"

export const metadata: Metadata = {
    metadataBase: new URL("https://www.shankalpapokharel.com.np"),
    title: {
        default: "Shankalpa Pokharel | Web Developer & Software Engineer from Nepal",
        template: "%s | Shankalpa Pokharel",
    },
    description:
        "Shankalpa Pokharel (also known as Sankalpa Pokharel) is a web developer and software engineer from Nepal, specializing in Next.js, React, and the MERN stack. Explore portfolio, projects, and blog.",
    creator: "Shankalpa Pokharel",
    authors: [{ name: "Shankalpa Pokharel", url: "https://www.shankalpapokharel.com.np" }],
    keywords: [
        "Shankalpa Pokharel",
        "Sankalpa Pokharel",
        "shankalpa",
        "sankalpa",
        "Shankalpa Pokharel developer",
        "Shankalpa Pokharel Nepal",
        "Sankalpa Pokharel developer",
        "Web Developer Nepal",
        "Software Engineer Nepal",
        "Next.js Developer",
        "MERN Stack Developer",
        "React Developer Nepal",
        "Full Stack Developer Nepal",
        "Frontend Developer Nepal",
        "JavaScript Developer",
        "Portfolio",
    ],
    alternates: {
        canonical: "https://www.shankalpapokharel.com.np",
    },
    openGraph: {
        type: "website",
        siteName: "Shankalpa Pokharel - Portfolio",
        locale: "en_US",
        url: "https://www.shankalpapokharel.com.np",
        title: "Shankalpa Pokharel | Web Developer & Software Engineer",
        description:
            "Shankalpa Pokharel (Sankalpa) — web developer from Nepal specializing in Next.js, React, and MERN stack. View projects, skills, and blog.",
        images: [
            {
                url: "/images/about.png",
                width: 1200,
                height: 630,
                alt: "Shankalpa Pokharel - Web Developer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Shankalpa Pokharel | Web Developer & Software Engineer",
        description:
            "Shankalpa Pokharel (Sankalpa) — web developer from Nepal. Next.js, React, MERN stack specialist.",
        images: ["/images/about.png"],
    },
    verification: {
        google: "google06fb3d73edfc4539",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

// JSON-LD Structured Data for Person (helps Google create Knowledge Panel)
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shankalpa Pokharel",
    alternateName: ["Sankalpa Pokharel", "Shankalpa", "Sankalpa"],
    url: "https://www.shankalpapokharel.com.np",
    image: "https://www.shankalpapokharel.com.np/images/about.png",
    jobTitle: "Web Developer",
    description:
        "Shankalpa Pokharel is a web developer and software engineer from Nepal, specializing in Next.js, React, and the MERN stack.",
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
        "Full Stack Development",
    ],
    nationality: {
        "@type": "Country",
        name: "Nepal",
    },
    sameAs: [
        "https://github.com/ShankalpaPokharel",
        "https://www.linkedin.com/in/shankalpa-pokharel-48a474242/",
    ],
};

// JSON-LD for the Website itself
const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shankalpa Pokharel Portfolio",
    alternateName: "Sankalpa Pokharel Portfolio",
    url: "https://www.shankalpapokharel.com.np",
    description:
        "Portfolio website of Shankalpa Pokharel (Sankalpa Pokharel), a web developer from Nepal.",
    author: {
        "@type": "Person",
        name: "Shankalpa Pokharel",
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <html  lang="en" suppressHydrationWarning>
                <head>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(jsonLd),
                        }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(websiteJsonLd),
                        }}
                    />
                </head>
                <body className={inter.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </>
     )
}