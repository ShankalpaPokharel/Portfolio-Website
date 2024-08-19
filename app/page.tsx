import About from '@/components/About/About';
import Banner from '@/components/Banner/Banner';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar'
import MySkills from '@/components/MySkills/MySkills';
import NavHeader from '@/components/NavHeader';
import MyProjects from '@/components/Projects/MyProjects';

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Shankalpa Pokharel | Portfolio',
  description: 'Shankalpa Portfolio Website',
  creator: 'Shankalpa Pokharel',
  keywords: ['Shankalpa', 'Pokharel', 'Portfolio','sankalpa','pokharel', 'sankalpa pokhrel','web develper'],
  openGraph: {
    images: ['/about.png'],
  },
}
 

export default function Home() {
  return (
    <main>
      <NavHeader/>
      <Navbar />
      <Banner/>
      <About/>
      <MySkills/>
      <MyProjects/>
      <Contact/>
      <Footer/>
    </main>
  );
}
