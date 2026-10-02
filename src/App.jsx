import MobileMenu from './components/MobileMenu';

import Hero from './sections/Hero/Hero';
import Education from './sections/Education/Education';
import Experience from './sections/Experience/Experience';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';
import Stats from './sections/Stats/Stats';
import Contact from './sections/Contact/Contact';

function App() {
  return (
    <>
    <MobileMenu />
    <main>
      <Hero />
      <Education />
      <Experience />
      <Projects />
      <Skills />
      <Stats />
      <Contact />
      </main>
    </>
  );
}

export default App;