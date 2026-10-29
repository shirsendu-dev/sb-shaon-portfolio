import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import Expertise from "@/components/home/Expertise";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Services from "@/components/home/Services";
import Journey from "@/components/home/Journey";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Stats />
      <About />
      <Expertise />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Journey />
      <Contact />
    </main>
  );
}
