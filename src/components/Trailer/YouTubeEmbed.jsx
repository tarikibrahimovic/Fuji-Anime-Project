import React from "react";
import "./YouTubeEmbed.css"

const YoutubeEmbed = ({trailer }) => (
  <div className="video-responsive">
    <iframe
      src={`https://www.youtube.com/embed/${trailer}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;