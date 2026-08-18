import React from 'react';
import { Github, Linkedin, Send, Twitter, Globe, PhoneCall } from 'lucide-react';

const About = () => {
  const profileImage = "/profile.jpg"; // User's actual personal photo

  const socialLinks = [
    { icon: <PhoneCall size={18} />, label: "Phone", href: "tel:+251939754592" },
    { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/Dave-MT" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/dawit-tamirat-mihrete-584194247" },
    { icon: <Send size={18} />, label: "Telegram", href: "https://t.me/dawit_tamesi" },
    { icon: <Twitter size={18} />, label: "Twitter @Dave_36t", href: "https://twitter.com/Dave_36t" },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-badge">About Me</div>

        <div className="about-grid">
          {/* Left Column: Profile Card */}
          <div className="profile-card card-base">
            <div className="avatar-wrapper">
              <img src={profileImage} alt="Dawit Tamirat" className="profile-img" />
            </div>

            <h3 className="profile-name">Dawit Tamirat</h3>

            <div className="status-badge">
              <span>Open to opportunities</span>
            </div>

            {/* Social Icons Bar */}
            <div className="social-links-bar">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title={social.label}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Bio Details */}
          <div className="bio-card card-base">
            <h2 className="bio-greeting">
              Hello, I’m Dawit Tamirat.
            </h2>
            <p className="bio-description">
              I’m a Computer Science graduate from St. Mary University with a strong interest in UX/UI design and full-stack web development. I enjoy building clean, useful digital experiences and learning by creating work that solves real problems.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 32px 0;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 24px;
        }

        .profile-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px;
        }

        .avatar-wrapper {
          width: 180px;
          height: 220px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 16px;
          border: 1px solid var(--border-color);
        }

        .profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 0.5s ease;
        }

        .profile-card:hover .profile-img {
          transform: scale(1.04);
        }

        .profile-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .social-links-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
          width: 100%;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: var(--bg-pill);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          transition: var(--transition-fast);
        }

        .social-btn:hover {
          background-color: var(--btn-bg);
          color: var(--btn-text);
          transform: translateY(-2px);
        }

        .bio-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
        }

        .bio-greeting {
          font-size: 2.1rem;
          font-weight: 800;
          line-height: 1.25;
          margin-bottom: 20px;
          color: var(--text-primary);
        }

        .bio-description {
          font-size: 0.98rem;
          line-height: 1.7;
          color: var(--text-secondary);
          letter-spacing: 0.01em;
        }

        @media (max-width: 850px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .bio-card {
            padding: 24px;
          }
          .bio-greeting {
            font-size: 1.65rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
