import React, { useState } from 'react';
import { submitContactForm } from '../services/api';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, message: 'Please fill in all fields.' });
      return;
    }

    setStatus({ loading: true, success: false, message: '' });
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus({ loading: false, success: true, message: result.message });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus({ loading: false, success: false, message: '' }), 5000);
    } else {
      setStatus({ loading: false, success: false, message: result.message || 'Error sending message.' });
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-badge">Contact Me</div>

        <div className="contact-grid card-base">
          {/* Left Side: Contact Form */}
          <div className="contact-form-column">
            <h2 className="contact-form-title">Let's work together</h2>
            <p className="contact-form-desc">
              Have a question or want to discuss a new project? Fill out the form below and I'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="form-textarea"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {status.message && (
                <div className={`status-alert ${status.success ? 'success' : 'error'}`}>
                  {status.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={status.loading}
              >
                {status.loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right Side: Contact Info Cards */}
          <div className="contact-cards-column">
            <div className="info-card">
              <div className="info-icon-box">
                <Mail size={20} />
              </div>
              <div className="info-details">
                <span className="info-label">EMAIL</span>
                <a href="mailto:davedtm3664@gmail.com" className="info-value">
                  davedtm3664@gmail.com
                </a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon-box">
                <MapPin size={20} />
              </div>
              <div className="info-details">
                <span className="info-label">LOCATION</span>
                <span className="info-value">Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          padding: 32px 0 56px 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
          padding: 40px;
        }

        .contact-form-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .contact-form-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background-color: var(--bg-input);
          color: var(--text-primary);
          font-family: var(--font-main);
          font-size: 0.92rem;
          outline: none;
          transition: var(--transition-fast);
        }

        .form-input:focus, .form-textarea:focus {
          border-color: var(--accent-green);
          box-shadow: 0 0 0 3px var(--accent-green-bg);
        }

        .status-alert {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 500;
        }

        .status-alert.success {
          background-color: var(--accent-green-bg);
          color: var(--accent-green);
        }

        .status-alert.error {
          background-color: rgba(239, 68, 68, 0.12);
          color: #EF4444;
        }

        .submit-btn {
          align-self: flex-start;
          padding: 12px 28px;
          font-size: 0.9rem;
          margin-top: 8px;
        }

        /* Right Column Info Cards */
        .contact-cards-column {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background-color: var(--hero-subcard-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          transition: var(--transition-fast);
        }

        .info-card:hover {
          transform: translateY(-2px);
          border-color: var(--accent-green);
        }

        .info-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--bg-pill);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-details {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .info-value {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary);
          word-break: break-all;
        }

        @media (max-width: 850px) {
          .contact-grid {
            grid-template-columns: 1fr;
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
