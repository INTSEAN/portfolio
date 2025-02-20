import React, { useState, useEffect } from "react";
import "./Bann.css"; // Assuming the CSS is in a separate file named Bann.css

const Bann = () => {
  const [isVisible, setVisible] = useState(true);
  const [isFading, setFading] = useState(false);
  const [isMounted, setMounted] = useState(false);

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
        <button className="bann-button">Try it Below</button>
      </div>
    </div>
  );
};

export default Bann;
