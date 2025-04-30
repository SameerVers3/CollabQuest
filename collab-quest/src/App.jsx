import { useState, useEffect } from 'react'
import { PixelLogo } from './components/PixelLogo'
import { FocusToggle } from './components/FocusToggle'
import { ProjectCard } from './components/ProjectCard'
import { MoodBoard } from './components/MoodBoard'
import { PomodoroTimer } from './components/PomodoroTimer'
import { DrawingBoard } from './components/DrawingBoard'
import { AccessibilityControls } from './components/AccessibilityControls'
import './index.css'

function App() {
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [isDyslexiaFont, setIsDyslexiaFont] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('font-dyslexia', isDyslexiaFont)
    document.documentElement.classList.toggle('high-contrast', isHighContrast)
    document.documentElement.classList.toggle('focus-mode', isFocusMode)
  }, [isDyslexiaFont, isHighContrast, isFocusMode])

  const getBackgroundClass = () => {
    if (isHighContrast) {
      return 'bg-black text-white'
    }
    return `bg-gradient-to-br from-soft-pink via-soft-lavender to-soft-sky ${isFocusMode ? 'opacity-75 saturate-50' : ''}`
  }

  return (
    <div className={`min-h-screen p-6 transition-all duration-500 ${getBackgroundClass()}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <PixelLogo />
            <h1 className={`text-4xl font-pixel drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] ${isHighContrast ? 'text-white' : 'text-soft-pearl'}`}>
              CollabQuest
            </h1>
          </div>
          <div className="flex gap-6">
            <FocusToggle isEnabled={isFocusMode} onToggle={setIsFocusMode} />
            <AccessibilityControls
              isDyslexiaFont={isDyslexiaFont}
              isHighContrast={isHighContrast}
              onDyslexiaToggle={setIsDyslexiaFont}
              onContrastToggle={setIsHighContrast}
            />
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Showcase */}
          <div className={`col-span-1 md:col-span-2 lg:col-span-2 ${isHighContrast ? 'bg-gray-900' : 'pixel-card'} group`}>
            <h2 className={`text-3xl font-pixel mb-6 flex items-center gap-3 ${isHighContrast ? 'text-white' : 'text-soft-coral'}`}>
              <span className="animate-pulse-slow">🎮</span>
              Project Showcase
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProjectCard
                title="Game Demo 1"
                description="A retro-style platformer with pixel-perfect mechanics"
                imageUrl="https://i0.wp.com/davegladow.com/wp-content/uploads/2024/09/Screen-Shot-2024-09-11-at-3.40.14-PM.png?resize=825%2C510&ssl=1"
                tags={['Platformer', 'Pixel Art', 'Unity']}
                isHighContrast={isHighContrast}
              />
              <ProjectCard
                title="Game Demo 2"
                description="Pixel art adventure with RPG elements"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMGlqEx38xuxeOFHa46nUsXB86SHWe2_GPZAdYVHmrZw&s&ec=72940542"
                tags={['RPG', 'Adventure', 'Godot']}
                isHighContrast={isHighContrast}
              />
            </div>
          </div>

          {/* Mood Board */}
          <div className={`col-span-1 ${isHighContrast ? 'bg-gray-900' : 'pixel-card'} group`}>
            <h2 className={`text-3xl font-pixel mb-6 flex items-center gap-3 ${isHighContrast ? 'text-white' : 'text-soft-coral'}`}>
              <span className="animate-float">🎨</span>
              Mood Board
            </h2>
            <MoodBoard isHighContrast={isHighContrast} />
          </div>

          {/* Drawing Board */}
          <div className={`col-span-1 md:col-span-2 ${isHighContrast ? 'bg-gray-900' : 'pixel-card'} group`}>
            <h2 className={`text-3xl font-pixel mb-6 flex items-center gap-3 ${isHighContrast ? 'text-white' : 'text-soft-coral'}`}>
              <span className="animate-pulse-slow">✏️</span>
              Drawing Board
            </h2>
            <DrawingBoard isHighContrast={isHighContrast} />
          </div>

          {/* Pomodoro Timer */}
          <div className={`col-span-1 ${isHighContrast ? 'bg-gray-900' : 'pixel-card'} group`}>
            <h2 className={`text-3xl font-pixel mb-6 flex items-center gap-3 ${isHighContrast ? 'text-white' : 'text-soft-coral'}`}>
              <span className="animate-glow">⏱️</span>
              Pomodoro Timer
            </h2>
            <PomodoroTimer isHighContrast={isHighContrast} />
          </div>
        </div>

        {/* Footer */}
        <footer className={`mt-12 text-center ${isHighContrast ? 'text-white/70' : 'text-gray-800'}`}>
          <p className="font-pixel text-lg">
            Made with ❤️ by Desi Crew
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
