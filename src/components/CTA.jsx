import React from 'react';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card card-base">
          <h2 className="cta-title">Have a project in mind?</h2>
          <p className="cta-subtitle">
            Let's bring your ideas to life! Reach out for freelance projects, collaboration, or full-time software engineering roles.
          </p>
          <a href="#contact" className="btn btn-primary cta-btn">
            Hire Me
          </a>
        </div>
      </div>

      <style>{`
        .cta-section {
          padding: 32px 0;
        }

        .cta-card {
          text-align: center;
          padding: 48px 24px;
          background-color: var(--hero-banner-bg);
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cta-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .cta-subtitle {
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 580px;
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .cta-btn {
          padding: 12px 36px;
          font-size: 0.95rem;
        }
      `}</style>
    </section>
  );
};

export default CTA;
