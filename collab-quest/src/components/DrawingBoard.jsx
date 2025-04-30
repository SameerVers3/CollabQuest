import { useRef, useState, useEffect } from 'react';

export function DrawingBoard() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FFFFFF');
  const [size, setSize] = useState(5);
  const [tool, setTool] = useState('brush'); // 'brush', 'eraser', 'fill'
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set initial canvas state
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
    }

    ctx.lineWidth = size;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
    saveState();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = history[historyIndex - 1];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = history[historyIndex + 1];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      setHistoryIndex(historyIndex + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tools Section */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setTool('brush')}
            className={`pixel-button ${tool === 'brush' ? 'bg-soft-coral' : 'bg-soft-coral/20 text-soft-coral'}`}
          >
            ✏️ Brush
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`pixel-button ${tool === 'eraser' ? 'bg-soft-coral' : 'bg-soft-coral/20 text-soft-coral'}`}
          >
            🧹 Eraser
          </button>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 rounded-lg cursor-pointer border-2 border-soft-lavender/30 hover:border-soft-coral transition-colors"
          />
          <div className="flex items-center gap-2">
            <span className="text-soft-lavender">Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-32 accent-soft-coral"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="pixel-button bg-soft-pearl/20 text-soft-pearl hover:bg-soft-pearl/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ↩️ Undo
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="pixel-button bg-soft-pearl/20 text-soft-pearl hover:bg-soft-pearl/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ↪️ Redo
          </button>
          <button
            onClick={clearCanvas}
            className="pixel-button bg-soft-coral text-soft-pearl hover:bg-soft-peach"
          >
            🧹 Clear
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-[400px] rounded-lg border-2 border-soft-lavender/30 cursor-crosshair hover:border-soft-coral transition-colors"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
        <div className="absolute bottom-4 right-4 text-soft-lavender/50 text-sm font-pixel">
          {tool === 'brush' ? 'Drawing' : tool === 'eraser' ? 'Erasing' : 'Filling'}...
        </div>
      </div>
    </div>
  );
} 