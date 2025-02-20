import React, { useState, useEffect } from "react";
import "./Bann.css"; // Assuming the CSS is in a separate file named Bann.css

const Bann = () => {
  const [isVisible, setVisible] = useState(true);
  const [isFading, setFading] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [isBlurred, setBlur] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = () => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      setFading(false);
    }, 500); // Matches the CSS transition duration
  };

  const handleButtonClick = () => {
    // Toggle blur state for main content
    setBlur(true);

    // Trigger the Voiceflow chat widget to open
    if (window.voiceflow && window.voiceflow.chat) {
      window.voiceflow.chat.open(); // Opens the widget
    } else {
      console.error("Voiceflow chat widget not initialized yet.");
      // Optional: Add fallback logic, e.g., retry after a short delay
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="bann"
      style={{
        opacity: isFading || !isMounted ? 0 : 1,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <div className="bann-container">
        <h2 className="bann-heading">Digital Sean is Live!</h2>
        <div class="card">
          <div class="loader">
            <div class="words">
              <span class="word">Sean's Bio</span>
              <span class="word">Sean's Experience</span>
              <span class="word">Sean's Tech stack</span>
              <span class="word">Sean's Skills</span>
              <span class="word digital">Digital Sean</span>
            </div>
          </div>
        </div>
        <button
          class="bann-button bann-button-item"
          onClick={handleButtonClick}
        >
          <span class="bann-button-bg">
            <span class="bann-button-bg-layers">
              <span class="bann-button-bg-layer bann-button-bg-layer-1 -purple"></span>
              <span class="bann-button-bg-layer bann-button-bg-layer-2 -turquoise"></span>
              <span class="bann-button-bg-layer bann-button-bg-layer-3 -yellow"></span>
            </span>
          </span>
          <span class="bann-button-inner">
            <span class="bann-button-inner-static">Try Digital Sean</span>
            <span class="bann-button-inner-hover">Powered By AI</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Bann;
