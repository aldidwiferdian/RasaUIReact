import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [showPopup, setShowPopup] = useState(true);

  const handleStart = () => {
    setShowPopup(false);
    // Logika atau tindakan lainnya saat tombol "Mulai" diklik
  };

  return (
    <div className={`landingPage ${showPopup ? 'show' : ''}`}>
      <div className="popup">
        <h1>Selamat Datang!</h1>
        <button onClick={handleStart}>Mulai</button>
      </div>
    </div>
  );
}

export default LandingPage;
