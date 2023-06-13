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
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Signum-Node-Blue.svg/512px-Signum-Node-Blue.svg.png?20211205034017" alt="Logo" className="logo" />
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
