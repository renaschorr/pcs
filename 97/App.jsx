import React, { useState, useEffect } from 'react';

const ColorPicker = ({ label, color, setColor }) => (
  <div>
    <label>{label}</label>
    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
  </div>
);
const fontOptions = ["Arial", "Helvetica", "Times New Roman", "Courier New"];
const FontChooser = ({ selectedFont, setFont }) => (
  <div>
    <label>Choose Font:</label>
    <select value={selectedFont} onChange={(e) => setFont(e.target.value)}>
      {fontOptions.map((font) => (<option>{font}</option>))}
    </select>
  </div>
);

const ColorChangerApp = () => {
  const [backgroundColor, setBackgroundColor] = useState(localStorage.getItem('backgroundColor') || '#ffffff');
  const [textColor, setTextColor] = useState(localStorage.getItem('textColor') || '#000000');
  const [selectedFont, setSelectedFont] = useState(localStorage.getItem('selectedFont') || 'Arial');

  const handleSaveSettings = () => {
    // Save settings to local storage
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('textColor', textColor);
    localStorage.setItem('selectedFont', selectedFont);
  };

  return (
    <div style={{ backgroundColor, color: textColor, fontFamily: selectedFont }}>
      <h1>Color Changer App</h1>
      <ColorPicker label="Background Color:" color={backgroundColor} setColor={setBackgroundColor} />
      <ColorPicker label="Text Color:" color={textColor} setColor={setTextColor} />
      <FontChooser selectedFont={selectedFont} setFont={setSelectedFont} />
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default ColorChangerApp;


