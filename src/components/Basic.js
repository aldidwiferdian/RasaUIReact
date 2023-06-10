import './chatBot.css';
import React, { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BiBot, BiUser } from 'react-icons/bi';

function Basic() {
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    console.log("called");
    const objDiv = document.getElementById('messageArea');
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const name = "default";
    const request_temp = { sender: "user", sender_id: name, msg: inputMessage };

    if (inputMessage !== "") {
      setChat(chat => [...chat, request_temp]);
      setBotTyping(true);
      setInputMessage('');
      rasaAPI(name, inputMessage);
    } else {
      window.alert("Please enter a valid message");
    }
  }

  const handleClick = (recipientId, payload) => {
    const request_temp = { sender: "user", sender_id: recipientId, msg: payload };
    setChat(chat => [...chat, request_temp]);
    setBotTyping(true);

    // Mengecek apakah `payload` adalah URL
    if (isValidURL(payload)) {
      window.open(payload, "_blank");
    } else {
      rasaAPI(recipientId, payload);
    }
  };

  const rasaAPI = async (name, msg) => {
    try {
      const response = await fetch('https://rasa-server-aldi7id.cloud.okteto.net/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'charset': 'UTF-8',
        },
        credentials: "same-origin",
        body: JSON.stringify({ "sender": name, "message": msg }),
      });

      const responseData = await response.json();

      const responses = responseData.map((res) => ({
        sender: "bot",
        recipient_id: res.recipient_id,
        msg: res.text,
        carousel: res.buttons ? true : false,
        buttons: res.buttons,
        image: res.image, 
      }));

      setBotTyping(false);
      setChat((chat) => [...chat, ...responses]);
    } catch (error) {
      console.error(error);
    }
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  console.log(chat);

  const stylecard = {
    maxWidth: '35rem',
    border: '1px solid black',
    paddingLeft: '0px',
    paddingRight: '0px',
    borderRadius: '30px',
    boxShadow: '0 16px 20px 0 rgba(0,0,0,0.4)'
  };

  const styleHeader = {
    borderBottom: '1px solid black',
    borderRadius: '30px 30px 0px 0px',
    backgroundColor: '#8012c4'
  };

  const styleFooter = {
    borderTop: '1px solid black',
    borderRadius: '0px 0px 30px 30px',
    backgroundColor: '#8012c4'
  };

  const styleBody = {
    paddingTop: '10px',
    height: '28rem',
    overflowY: 'auto',
    overflowX: 'hidden'
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="card" style={stylecard}>
            <div className="cardHeader text-white" style={styleHeader}>
              <h1 style={{ marginBottom: '0px' }}>Chatbot Wisata Tangerang Selatan</h1>
              {botTyping ? <h6>Bot Typing....</h6> : null}
            </div>
            <div className="cardBody" id="messageArea" style={styleBody}>
  <div className="row msgarea">
    {chat.map((message, index) => (
      <div key={index} className={message.sender === 'user' ? 'msgalignend' : 'msgalignstart'}>
        <div className={message.sender === 'user' ? 'usermsg' : 'botmsg'}>
          {message.carousel ? (
            <div className="buttonContainer">
              {message.buttons.map((button, buttonIndex) => (
                <div className="buttonItem" key={buttonIndex}>
                  <img src={button.image} alt={button.title} className="botImage" />
                  <div>
                    <h3>{button.title}</h3>
                    <p>{button.subtitle}</p>
                  </div>
                  <div>
                    <button className="buttonItemButton" onClick={() => handleClick(message.recipient_id, button.payload)}>
                      {button.payload}
                    </button>
                    <a href={button.location} className="buttonItemLink" target="_blank" rel="noopener noreferrer">
                      Google Maps
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {message.image && <img src={message.image} alt="Image" className="messageImage" />}
              <p>{message.msg}</p>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

<div className="cardFooter" style={styleFooter}>
  <div className="d-flex align-items-center">
    <div className="mr-2">
      <BiBot className="botIcon" />
    </div>
    <div className="flex-grow-1">
      <input
        type="text"
        className="msginp"
        placeholder="Type a message..."
        value={inputMessage}
        onChange={(evt) => setInputMessage(evt.target.value)}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            handleSubmit(evt);
          }
        }}
      />
    </div>
    <div className="ml-2">
      <button className="sendBtn" onClick={handleSubmit} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem',marginLeft: '10px' }}>
        <IoMdSend style={{ fontSize: '1.2rem' }} />
      </button>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Basic;
