import { useState, useRef } from 'react';

function DoodleUpload() {
  const [doodle, setDoodle] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleDoodleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDoodle(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setDoodle(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };
  
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-4">
      <div 
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-sunset-500 bg-sunset-50' : 'border-gray-300 hover:border-sunset-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {doodle ? (
          <img 
            src={doodle} 
            alt="Your doodle" 
            className="max-h-64 mx-auto rounded-lg"
          />
        ) : (
          <div className="space-y-2">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              stroke="currentColor" 
              fill="none" 
              viewBox="0 0 48 48" 
              aria-hidden="true"
            >
              <path 
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                strokeWidth={2} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <p className="text-gray-600 font-pixel">Drop your doodle here</p>
            <p className="text-sm text-gray-500 font-pixel">or</p>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleDoodleChange}
              id="doodle-upload"
              ref={fileInputRef}
              className="hidden"
            />
            <button className="pixel-button">
              Choose a file
            </button>
          </div>
        )}
      </div>
      {doodle && (
        <button 
          onClick={() => setDoodle(null)} 
          className="pixel-button bg-gray-500 hover:bg-gray-600 w-full"
        >
          Clear Doodle
        </button>
      )}
    </div>
  );
}

export default DoodleUpload; 