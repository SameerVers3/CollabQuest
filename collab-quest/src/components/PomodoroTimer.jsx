import { useState, useEffect } from 'react';

function PomodoroTimer() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [notes, setNotes] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setShowCompleted(true);
      // Play sound or notification when timer ends
      try {
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/digital_alarm.ogg');
        audio.play();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setShowCompleted(false);
  };

  // Format time as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-timer">
      <h2>Pomodoro Timer</h2>
      
      <div className={`timer-display ${timeLeft === 0 ? 'completed' : ''}`}>
        {showCompleted && (
          <div className="timer-completed">
            <span>Time's up!</span>
            <button onClick={() => setShowCompleted(false)} className="close-notification">×</button>
          </div>
        )}
        <span className="time">{formatTime()}</span>
      </div>
      
      <div className="timer-controls">
        <button 
          onClick={toggleTimer} 
          className="timer-button"
          disabled={timeLeft === 0}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={resetTimer} 
          className="timer-button reset"
        >
          Reset
        </button>
      </div>
      
      <div className="notes-area">
        <h3>What I created today</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write down what you accomplished during this session..."
          rows={5}
        />
      </div>
    </div>
  );
}

export default PomodoroTimer; 