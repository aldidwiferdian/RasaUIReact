import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="popupContainer">
          <div className="popupContent">
            <h2>Selamat Datang!</h2>
            <p>Ini adalah halaman landing page.</p>
            <button onClick={closePopup}>Mulai</button>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;
