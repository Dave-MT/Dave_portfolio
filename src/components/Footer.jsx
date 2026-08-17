import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <p className="copyright-text">
          © 2026 Dawit Tamirat. All rights reserved.
        </p>

        <div className="footer-links">
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#terms" className="footer-link">Policy</a>
        </div>
      </div>

      <style>{`
        .footer-section {
          padding: 24px 0;
          border-top: 1px solid var(--border-color);
          background-color: var(--bg-card);
        }

        .footer-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .copyright-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .footer-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .footer-link {
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .footer-link:hover {
          color: var(--text-primary);
        }

        @media (max-width: 600px) {
          .footer-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
