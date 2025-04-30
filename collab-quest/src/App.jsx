import { useState } from 'react'
import DoodleUpload from './components/DoodleUpload'
import PomodoroTimer from './components/PomodoroTimer'
import AccessibilityOptions from './components/AccessibilityOptions'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>CollabQuest</h1>
        <div className="accessibility-widget">
          <AccessibilityOptions />
        </div>
      </header>
      
      <main>
        <section className="doodle-section">
          <div className="pixel-decoration top-left"></div>
          <DoodleUpload />
        </section>
        
        <section className="pomodoro-section">
          <div className="pixel-decoration top-right"></div>
          <PomodoroTimer />
        </section>
      </main>
      
      <footer>
        <div className="pixel-decoration"></div>
        <p>CollabQuest - Create together</p>
      </footer>
    </div>
  )
}

export default App
