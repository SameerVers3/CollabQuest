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
    <div className="doodle-upload">
      <h2>Share Your Doodle</h2>
      <div 
        className={`doodle-drop-area ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {doodle ? (
          <img src={doodle} alt="Your doodle" className="doodle-preview" />
        ) : (
          <div className="doodle-placeholder">
            <p>Drop your doodle here</p>
            <p className="or-text">or</p>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleDoodleChange}
              id="doodle-upload"
              ref={fileInputRef}
              className="file-input"
            />
            <button className="upload-button">
              Choose a file
            </button>
          </div>
        )}
      </div>
      {doodle && (
        <button onClick={() => setDoodle(null)} className="clear-button">
          Clear Doodle
        </button>
      )}
    </div>
  );
}

export default DoodleUpload; 