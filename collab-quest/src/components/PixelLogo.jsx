export function PixelLogo() {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-14 h-14 bg-soft-coral rounded-lg border-4 border-soft-pearl/30 flex items-center justify-center shadow-soft hover:shadow-glow transition-all duration-300 transform group-hover:scale-110">
        <span className="text-3xl font-pixel text-soft-pearl animate-pulse-slow">CQ</span>
      </div>
      <div className="relative">
        <h1 className="text-4xl font-pixel text-soft-pearl drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">
          CollabQuest
        </h1>
        <div className="absolute -bottom-1 left-0 w-full h-1 bg-soft-coral/30 rounded-full overflow-hidden">
          <div className="w-full h-full bg-soft-coral rounded-full animate-glow" />
        </div>
      </div>
    </div>
  );
} 