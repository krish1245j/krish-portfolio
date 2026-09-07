import { useState, useCallback } from "react";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import AmbientBackground from "./components/AmbientBackground";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Architecture from "./sections/Architecture";
import Achievements from "./sections/Achievements";
import EducationInterests from "./sections/EducationInterests";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { useReducedMotion } from "./hooks/useReducedMotion";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const reducedMotion = useReducedMotion();
  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <div className="cursor-none-desktop relative min-h-screen bg-ink">
      <AmbientBackground />
      <Loader onDone={handleDone} reducedMotion={reducedMotion} />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main
        className="transition-opacity duration-700"
        style={{ opacity: loaded ? 1 : 0 }}
        aria-hidden={!loaded}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Architecture />
        <Achievements />
        <EducationInterests />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
