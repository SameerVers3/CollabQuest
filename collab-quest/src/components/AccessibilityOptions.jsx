import { useState, useEffect } from 'react';

function AccessibilityOptions() {
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (dyslexiaFont) {
      document.documentElement.classList.add('font-dyslexia');
    } else {
      document.documentElement.classList.remove('font-dyslexia');
    }
    
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    localStorage.setItem('accessibility', JSON.stringify({
      dyslexiaFont,
      highContrast
    }));
  }, [dyslexiaFont, highContrast]);
  
  useEffect(() => {
    const savedPreferences = localStorage.getItem('accessibility');
    if (savedPreferences) {
      const { dyslexiaFont: savedFont, highContrast: savedContrast } = JSON.parse(savedPreferences);
      setDyslexiaFont(savedFont);
      setHighContrast(savedContrast);
    }
  }, []);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="pixel-button"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Accessibility Options</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 10V3L4 14h7v7l9-11h-7z" 
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 pixel-border">
          <h2 className="text-lg font-bold mb-4 font-pixel">Accessibility Options</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="dyslexia-font" className="font-medium font-pixel">Dyslexia-friendly Font</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="dyslexia-font"
                  className="sr-only peer"
                  checked={dyslexiaFont}
                  onChange={() => setDyslexiaFont(!dyslexiaFont)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sunset-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sunset-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="high-contrast" className="font-medium font-pixel">High Contrast Mode</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="high-contrast"
                  className="sr-only peer"
                  checked={highContrast}
                  onChange={() => setHighContrast(!highContrast)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sunset-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sunset-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessibilityOptions; 