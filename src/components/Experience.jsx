import React, { useState, useEffect } from 'react';
import { fetchExperiences } from '../services/api';
import { Briefcase, GraduationCap, CheckCircle } from 'lucide-react';

const Experience = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadExperienceData = async () => {
      const result = await fetchExperiences();
      setData(result);
    };
    loadExperienceData();
  }, []);

  if (!data) return null;

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-badge">Experience</div>
        <h2 className="section-title">My Experience</h2>

        <div className="experience-grid">
          {/* Left Column: Roles Timeline */}
          <div className="roles-container card-base">
            <div className="subcard-header">
              <Briefcase size={20} className="header-icon" />
              <h3 className="subcard-title">Experience Roles</h3>
            </div>

            <div className="timeline-list">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-header">
                    <h4 className="role-title">{exp.role}</h4>
                    <span className="year-pill">{exp.year}</span>
                  </div>
                  <p className="role-company">{exp.company}</p>

                  <p className="role-desc">{exp.description}</p>

                  <div className="tags-row">
                    {exp.tags.map((tag, idx) => (
                      <span key={idx} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education */}
          <div className="education-container card-base">
            <div className="subcard-header">
              <GraduationCap size={20} className="header-icon" />
              <h3 className="subcard-title">Education</h3>
            </div>

            <div className="education-body">
              {/* Main Degree */}
              <div className="edu-entry">
                <h4 className="degree-title">{data.education.degree}</h4>
                <p className="institution-name">{data.education.institution}</p>
                <span className="graduated-badge">{data.education.year}</span>
              </div>

              {/* Certification */}
              {data.education.certification && (
                <div className="edu-entry cert-entry">
                  <h4 className="degree-title">{data.education.certification}</h4>
                  <p className="institution-name">{data.education.certificationDesc}</p>
                </div>
              )}

              {/* Highlights */}
              {data.education.highlights && data.education.highlights.length > 0 && (
                <div className="highlights-wrap">
                  <p className="highlights-label">HIGHLIGHTS</p>
                  <ul className="highlights-list">
                    {data.education.highlights.map((item, idx) => (
                      <li key={idx} className="highlight-item">
                        <CheckCircle size={15} className="bullet-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .experience-section {
          padding: 32px 0;
        }

        .experience-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
        }

        .subcard-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 16px;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
        }

        .header-icon {
          color: var(--text-primary);
        }

        .subcard-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .timeline-item {
          position: relative;
          padding-left: 18px;
          border-left: 2px solid var(--border-color);
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -6px;
          top: 4px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--text-primary);
        }

        .timeline-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .role-title {
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          color: var(--text-primary);
        }

        .role-company {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .year-pill {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 10px;
          background-color: var(--bg-pill);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
        }

        .role-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-tag {
          font-size: 0.78rem;
          font-weight: 600;
          padding: 3px 10px;
          background-color: var(--bg-pill);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
        }

        /* Education Card */
        .education-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .edu-entry {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cert-entry {
          padding-top: 4px;
          border-top: 1px solid var(--border-color);
        }

        .degree-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .institution-name {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .graduated-badge {
          display: inline-block;
          margin-top: 6px;
          padding: 3px 12px;
          background-color: var(--bg-pill);
          color: var(--text-secondary);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          border-radius: var(--radius-sm);
          width: fit-content;
        }

        .highlights-wrap {
          padding-top: 4px;
          border-top: 1px solid var(--border-color);
        }

        .highlights-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        .bullet-icon {
          color: var(--accent-green);
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .experience-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
