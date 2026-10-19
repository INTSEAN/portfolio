import { useState } from "react";
import "./Bann.css";

export default function Bann() {
  const [status, setStatus] = useState("");

  const openChat = async () => {
    setStatus("");
    const chat = window.voiceflow?.chat;
    if (!chat?.open) {
      setStatus("Chat is still loading. Please try again in a moment.");
      return;
    }
    try {
      await chat.open();
    } catch {
      setStatus("Chat is unavailable right now.");
    }
  };

  return (
    <aside className="digital-sean-banner" aria-label="Digital Sean assistant">
      <div className="container digital-sean-banner-inner">
        <p className="digital-sean-banner-copy">
          <span className="digital-sean-status-dot" aria-hidden="true" />
          <strong>Digital Sean</strong>
          <span className="digital-sean-banner-description">Ask about my work.</span>
        </p>
        <button type="button" className="digital-sean-banner-button" onClick={openChat}>
          Try Digital Sean <span aria-hidden="true">↗</span>
        </button>
      </div>
      {status && <p className="container digital-sean-banner-status" role="status">{status} <a href="mailto:donovans064@gmail.com">Email me instead</a>.</p>}
    </aside>
  );
}
