import './App.css'

import TechText from './components/TechText';
import DotField from './components/DotField';

function App() {
  return (
    <div className="portfolio-hero">
      <DotField
        dotRadius={1.5}
        dotSpacing={14}
        bulgeStrength={12}
        glowRadius={50}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={500}
        cursorForce={0.1}
        bulgeOnly
        gradientFrom="#A855F7"
        gradientTo="#B497CF"
        glowColor="#120F17"
      />
      <TechText
        text="Adrien Reynard"
        fontWeight={600}
        fontSize={150}
        reveal="letter"
        dashLength={4}
        dashGap={2}
        specks={15}
        fontFamily=""
        color="#000"
        accentColor="#000"
        letterSpacing={-0.05}
        reach={200}
        softness={0.7}
        strokeWidth={1.5}
        speed={1}
        lineStyle="dashed"
        selection
        labels
        draggable
        sweep
      />
    </div>
  )
}

export default App
