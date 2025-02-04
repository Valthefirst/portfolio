import React from 'react';
import './App.css';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Academic from './components/Academic';
import WorkExperience from './components/WorkExperience';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AboutMe />
        <Projects />
        <Academic />
        <WorkExperience />
      </header>
    </div>
  );
}

export default App;
