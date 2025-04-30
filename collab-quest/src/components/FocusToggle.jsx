export function FocusToggle({ isEnabled, onToggle }) {
  return (
    <button
      onClick={() => onToggle(!isEnabled)}
      className={`pixel-button group relative ${
        isEnabled
          ? 'bg-soft-coral text-soft-pearl'
          : 'bg-soft-coral/20 text-soft-coral'
      }`}
    >
      <span className="flex items-center gap-2">
        <span className="text-xl">{isEnabled ? '🌙' : '✨'}</span>
        <span>{isEnabled ? 'Focus Mode' : 'Normal Mode'}</span>
      </span>
      <div className="pixel-tooltip">
        {isEnabled
          ? 'Switch to normal mode with animations and bright colors'
          : 'Switch to focus mode with reduced animations and muted colors'}
      </div>
    </button>
  );
} 