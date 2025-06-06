import React from 'react';
import HeroSection from '../components/HeroSection';
import Countdown from '../components/Countdown';
import AboutSection from '../components/AboutSection';
import VenueSection from '../components/VenueSection';
import SpeakersSection from '../components/SpeakersSection';
import WelcomeSection from '../components/WelcomeSection';
import VideoSection from '../components/VideoSection';

function HomePage() {
  return (
    <>
      <HeroSection />
 <Countdown targetDate="2025-10-10T09:00:00" />
  <WelcomeSection />
  <VideoSection />
      <AboutSection />
      <VenueSection />
      <SpeakersSection />
    </>
  );
}

export default HomePage;
