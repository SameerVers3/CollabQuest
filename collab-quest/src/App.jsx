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
          <DoodleUpload />
        </section>
        
        <section className="pomodoro-section">
          <PomodoroTimer />
        </section>
      </main>
      
      <footer>
        <p>CollabQuest - Create together</p>
      </footer>
    </div>
  )
}

export default App
