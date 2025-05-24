import React from "react";
import "../pages/player.css";

export default function Player({ videoUrl, closePlayer }) {
  return (
    <div className="PlayerOverlay">
      <div className="PlayerContainer">
        {/* <button className="watchButton" onClick={() => openPopup(videoUrl)}>🎬 Assistir no YouTube</button> */}

        <button className="closeButton" onClick={closePlayer}>✖</button>
        <iframe
          src={videoUrl}
          title="Vídeo"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
