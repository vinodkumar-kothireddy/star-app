// src/components/WelcomeSection.jsx
import React from 'react';
import './WelcomeSection.css';

const memberImages = [
  process.env.PUBLIC_URL +'/images/members/image1.jpg',
  process.env.PUBLIC_URL +'/images/members/image2.jpg',
  process.env.PUBLIC_URL +'/images/members/image3.jpg',
  process.env.PUBLIC_URL +'/images/members/image.jpg',
  process.env.PUBLIC_URL +'/images/members/image2.jpg',
];

const WelcomeSection = () => {
  return (
    <section className="welcome-section">
      <div className="photo-column">
        <div className="scroll-container">
          <div className="scroll-content">
            {memberImages.map((img, i) => (
              <img src={img} alt={`Member ${i + 1}`} key={i} />
            ))}
            {/* Repeat for seamless loop */}
            {memberImages.map((img, i) => (
              <img src={img} alt={`Member copy ${i + 1}`} key={`copy-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="text-column">
        <h2>Welcome Message</h2>
        <p>
          We warmly welcome you to the Star app, hosted in the beautiful city of
          Visakhapatnam. This scientific gathering will offer rich learning
          experiences, research presentations, and collaborative opportunities
          in the field of neonatology.
        </p>
      </div>
    </section>
  );
};

export default WelcomeSection;
