import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-banner-card">
          <h1 className="hero-title">
            I'M <span className="highlight-name">DAWIT</span> TAMIRAT
          </h1>

          <div className="hero-pills-container">
            <span className="hero-pill">UI/UX Designer</span>
            <span className="hero-pill">Full-Stack Developer</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 24px 0 32px 0;
        }

        .hero-banner-card {
          background-color: var(--hero-banner-bg);
          border: 1px solid var(--border-card);
          border-radius: var(--radius-xl);
          padding: 56px 24px;
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: var(--transition-normal);
          position: relative;
          overflow: hidden;
        }

        .hero-title {
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          text-transform: uppercase;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .highlight-name {
          background-color: var(--bg-pill);
          color: var(--text-primary);
          padding: 2px 16px;
          border-radius: var(--radius-md);
          display: inline-block;
        }

        .hero-pills-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 8px 20px;
          background-color: var(--hero-subcard-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
        }

        .hero-pill {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .pill-divider {
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        @media (max-width: 600px) {
          .hero-banner-card {
            padding: 40px 16px;
          }
          .hero-pills-container {
            flex-direction: column;
            gap: 6px;
            border-radius: var(--radius-lg);
          }
          .pill-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
