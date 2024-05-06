import React, { useState, useRef } from 'react';
import Head from 'next/head';

const YouTubeEmbed = ({ videoId }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const iframeRef = useRef(null);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;  // Enable autoplay when iframe loads

  const handleVideoPlay = () => {
    setPlayVideo(true);
  };

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe && iframe.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      iframe.webkitRequestFullscreen();
    } else if (iframe && iframe.mozRequestFullScreen) { /* Firefox */
      iframe.mozRequestFullScreen();
    } else if (iframe && iframe.msRequestFullscreen) { /* IE/Edge */
      iframe.msRequestFullscreen();
    }
  };

  return (
    <>
      <Head>
        <title>Play YouTube Video</title>
      </Head>
      {!playVideo ? (
        <div style={{ cursor: 'pointer' }} onClick={handleVideoPlay}>
          <img
            src={`https://img.youtube.com/vi/${videoId}/0.jpg`} // YouTube thumbnail URL
            alt="Play"
            style={{ width: '100%' }}
          />
        </div>
      ) : (
        <div style={{ width: '100%', height: '0', paddingBottom: '56.25%', position: 'relative' }}>
          <iframe
            ref={iframeRef}
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      )}
    </>
  );
};

export default YouTubeEmbed;
