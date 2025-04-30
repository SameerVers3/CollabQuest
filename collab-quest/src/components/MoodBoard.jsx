import { useState, useEffect, useRef } from 'react';

const PASTEL_COLORS = [
  '#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA',
  '#FFB5E8', '#B5FFCE', '#B5DEFF', '#DCD3FF',
  '#FFD1DC', '#E6E6FA', '#B5EAD7', '#C7CEEA',
  '#F7D9C4', '#FFB7B2', '#FFDAC1', '#E2F0CB'
];

export function MoodBoard({ isHighContrast = false }) {
  const [dailyColor, setDailyColor] = useState('');
  const [doodles, setDoodles] = useState([]);
  const [selectedDoodle, setSelectedDoodle] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const randomColor = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
    setDailyColor(randomColor);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newDoodle = {
          id: Date.now(),
          url: event.target.result,
          color: dailyColor,
          date: new Date().toLocaleDateString()
        };
        setDoodles([newDoodle, ...doodles]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newDoodle = {
          id: Date.now(),
          url: event.target.result,
          color: dailyColor,
          date: new Date().toLocaleDateString()
        };
        setDoodles([newDoodle, ...doodles]);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteDoodle = (id) => {
    setDoodles(doodles.filter(doodle => doodle.id !== id));
    if (selectedDoodle?.id === id) {
      setSelectedDoodle(null);
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-lg border-2 transition-all duration-500 ${
      isHighContrast 
        ? 'border-white/30 bg-gray-800' 
        : 'border-gray-200 bg-white shadow-md'
    }`}>
      <div className={`p-4 sm:p-6 backdrop-blur-xs ${
        isHighContrast ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-xl sm:text-2xl font-pixel mb-3 sm:mb-4 ${
          isHighContrast ? 'text-white' : 'text-gray-800'
        }`}>
          Mood Board
        </h3>
        
        {/* Color Palette */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {[
            { bg: 'bg-blue-500', text: 'text-blue-500' },
            { bg: 'bg-purple-500', text: 'text-purple-500' },
            { bg: 'bg-emerald-500', text: 'text-emerald-500' },
            { bg: 'bg-rose-500', text: 'text-rose-500' }
          ].map((color) => (
            <div
              key={color.bg}
              className={`aspect-square rounded-lg border-2 transition-all duration-300 hover:scale-110 shadow-sm ${
                isHighContrast 
                  ? 'border-white/30 bg-gray-700' 
                  : `${color.bg} border-gray-200`
              }`}
            />
          ))}
        </div>

        {/* Inspiration Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`aspect-video rounded-lg border-2 transition-all duration-300 hover:scale-105 shadow-sm ${
                isHighContrast 
                  ? 'border-white/30 bg-gray-700' 
                  : 'border-gray-200 bg-gray-100'
              }`}
            />
          ))}
        </div>

        {/* Notes Section */}
        <div className={`p-3 sm:p-4 rounded-lg border-2 shadow-sm ${
          isHighContrast 
            ? 'border-white/30 bg-gray-700' 
            : 'border-gray-200 bg-white'
        }`}>
          <textarea
            placeholder="Add your thoughts..."
            className={`w-full h-24 sm:h-32 bg-transparent resize-none focus:outline-none text-sm sm:text-base ${
              isHighContrast 
                ? 'text-white placeholder-gray-400' 
                : 'text-gray-700 placeholder-gray-400'
            }`}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button className={`pixel-button w-full sm:w-auto shadow-sm ${
            isHighContrast 
              ? 'bg-white text-black hover:bg-gray-200' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}>
            Save
          </button>
          <button className={`pixel-button w-full sm:w-auto shadow-sm ${
            isHighContrast 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            Clear
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 rounded-br-full transform -translate-x-1/2 -translate-y-1/2 ${
        isHighContrast ? 'bg-white/10' : 'bg-blue-100'
      }`} />
      <div className={`absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 rounded-tl-full transform translate-x-1/2 translate-y-1/2 ${
        isHighContrast ? 'bg-white/10' : 'bg-gray-100'
      }`} />
    </div>
  );
} 