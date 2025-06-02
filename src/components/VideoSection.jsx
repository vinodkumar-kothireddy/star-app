import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import './VideoSection.css';

const VideoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      if (isVisible) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isVisible]);

  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      autoplay: 1,
      mute: 1,             // ✅ Must be muted for autoplay
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  return (
    <section className="video-section" ref={sectionRef}>
      <h2>Have a fun</h2>
      <div className="video-wrapper">
        <YouTube videoId="wKOUwvqSpIY" opts={opts} onReady={onReady} />
      </div>
    </section>
  );
};

export default VideoSection;
