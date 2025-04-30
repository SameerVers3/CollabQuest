export function AccessibilityControls({
  isDyslexiaFont,
  isHighContrast,
  onDyslexiaToggle,
  onContrastToggle,
}) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onDyslexiaToggle(!isDyslexiaFont)}
        className={`pixel-button group relative ${
          isDyslexiaFont
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
        title="Toggle Dyslexia-Friendly Font"
      >
        <span className="flex items-center gap-2">
          <span className="text-xl">{isDyslexiaFont ? '🔤' : '🔡'}</span>
          <span>{isDyslexiaFont ? 'Dyslexia Font' : 'Regular Font'}</span>
        </span>
        <div className="pixel-tooltip">
          {isDyslexiaFont ? 'Switch to regular font' : 'Switch to dyslexia-friendly font'}
        </div>
      </button>

      <button
        onClick={() => onContrastToggle(!isHighContrast)}
        className={`pixel-button group relative ${
          isHighContrast
            ? 'bg-purple-600 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
        title="Toggle High Contrast Mode"
      >
        <span className="flex items-center gap-2">
          <span className="text-xl">{isHighContrast ? '🌗' : '🌓'}</span>
          <span>{isHighContrast ? 'High Contrast' : 'Normal Contrast'}</span>
        </span>
        <div className="pixel-tooltip">
          {isHighContrast ? 'Switch to normal contrast' : 'Switch to high contrast mode'}
        </div>
      </button>
    </div>
  );
}