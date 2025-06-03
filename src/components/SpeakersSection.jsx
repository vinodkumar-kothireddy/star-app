// SpeakersSection.jsx
import React from 'react';

const speakers = [
  { name: 'Dr. Ammu', img: process.env.PUBLIC_URL +'/images/speakers/ammu.jpg' },
  { name: 'Dr. Vamika', img: process.env.PUBLIC_URL +'/images/speakers/ammu.jpg' },
];
const SpeakersSection = () => (
  <section style={{ padding: '2rem' }}>
    <h2>Faculty</h2>
    <div style={{ display: 'flex', gap: '1rem' }}>
      {speakers.map((speaker, i) => (
        <div key={i}>
          <img src={speaker.img} alt={speaker.name} width="150" />
          <p>{speaker.name}</p>
        </div>
      ))}
    </div>
  </section>
);

export default SpeakersSection;
