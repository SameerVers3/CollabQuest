import { useState, useEffect } from 'react';

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [notes, setNotes] = useState('');
  const [mode, setMode] = useState('pomodoro'); // 'pomodoro', 'shortBreak', 'longBreak'

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Play sound or show notification
      new Audio('/timer-done.mp3').play().catch(() => {});
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    switch (mode) {
      case 'pomodoro':
        setTimeLeft(25 * 60);
        break;
      case 'shortBreak':
        setTimeLeft(5 * 60);
        break;
      case 'longBreak':
        setTimeLeft(15 * 60);
        break;
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    switch (newMode) {
      case 'pomodoro':
        setTimeLeft(25 * 60);
        break;
      case 'shortBreak':
        setTimeLeft(5 * 60);
        break;
      case 'longBreak':
        setTimeLeft(15 * 60);
        break;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getModeColor = () => {
    switch (mode) {
      case 'pomodoro':
        return 'bg-red-500';
      case 'shortBreak':
        return 'bg-emerald-500';
      case 'longBreak':
        return 'bg-blue-500';
      default:
        return 'bg-red-500';
    }
  };

  const getModeTextColor = () => {
    switch (mode) {
      case 'pomodoro':
        return 'text-red-500';
      case 'shortBreak':
        return 'text-emerald-500';
      case 'longBreak':
        return 'text-blue-500';
      default:
        return 'text-red-500';
    }
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-md">
      {/* Mode Selector */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <button
          onClick={() => switchMode('pomodoro')}
          className={`pixel-button ${
            mode === 'pomodoro' 
              ? 'bg-red-500 text-white shadow-md' 
              : 'bg-red-50 text-red-600 hover:bg-red-100'
          }`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`pixel-button ${
            mode === 'shortBreak' 
              ? 'bg-emerald-500 text-white shadow-md' 
              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`pixel-button ${
            mode === 'longBreak' 
              ? 'bg-blue-500 text-white shadow-md' 
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          Long Break
        </button>
      </div>

      {/* Timer Display */}
      <div className="text-center">
        <div className={`text-7xl font-pixel mb-6 animate-pulse-slow ${getModeTextColor()}`}>
          {formatTime(timeLeft)}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={toggleTimer}
            className={`pixel-button ${
              isRunning
                ? 'bg-gray-500 text-white shadow-md'
                : `${getModeColor()} text-white shadow-md`
            }`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="pixel-button bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Notes Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-pixel text-gray-800 flex items-center gap-2">
          <span className="animate-float">📝</span>
          What I created today
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-gray-300 focus:outline-none bg-white text-gray-700 shadow-sm"
          placeholder="Write your thoughts here..."
          rows={4}
        />
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full ${getModeColor()} transition-all duration-1000`}
          style={{
            width: `${((mode === 'pomodoro' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60) - timeLeft) / (mode === 'pomodoro' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60) * 100}%`
          }}
        />
      </div>
    </div>
  );
} 