import { useState, useEffect } from 'react';

function AccessibilityOptions() {
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Apply or remove dyslexia-friendly font
    if (dyslexiaFont) {
      document.documentElement.classList.add('dyslexia-font');
    } else {
      document.documentElement.classList.remove('dyslexia-font');
    }
    
    // Apply or remove high contrast mode
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Save preferences to localStorage
    localStorage.setItem('accessibility', JSON.stringify({
      dyslexiaFont,
      highContrast
    }));
    
  }, [dyslexiaFont, highContrast]);
  
  // Load saved preferences on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('accessibility');
    if (savedPreferences) {
      const { dyslexiaFont: savedFont, highContrast: savedContrast } = JSON.parse(savedPreferences);
      setDyslexiaFont(savedFont);
      setHighContrast(savedContrast);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accessibility-options">
      <button className="accessibility-toggle" onClick={toggleMenu} aria-expanded={isOpen}>
        <span className="sr-only">Accessibility Options</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8v8M8 12h8"></path>
        </svg>
      </button>
      
      <div className={`options-panel ${isOpen ? 'open' : ''}`}>
        <h2>Accessibility Options</h2>
        
        <div className="option-toggles">
          <div className="toggle-option">
            <label htmlFor="dyslexia-font">Dyslexia-friendly Font</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="dyslexia-font"
                checked={dyslexiaFont}
                onChange={() => setDyslexiaFont(!dyslexiaFont)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="toggle-option">
            <label htmlFor="high-contrast">High Contrast Mode</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="high-contrast"
                checked={highContrast}
                onChange={() => setHighContrast(!highContrast)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessibilityOptions; 