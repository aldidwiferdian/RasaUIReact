import React, { useState } from 'react';
import './LandingPage.css';
import Basic from './Basic';

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
            <h2>Selamat Datang di Informasi Chatbot Wisata Tangeran Selatan!</h2>
            <p>Anda bisa memulainya dengan menekan tombol mulai dibawah ini.</p>
            <button className="button" onClick={closePopup}>Mulai</button>
          </div>
        </div>
      )}

      {!showPopup && <Basic />}
    </>
  );
}

export default LandingPage;
