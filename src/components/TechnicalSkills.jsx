import React, { useState, useEffect } from 'react';
import { fetchSkills } from '../services/api';
import { CheckCircle2, Layout, Code2, Database, Palette, Wrench } from 'lucide-react';

const TechnicalSkills = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      const data = await fetchSkills();
      setSkillCategories(data);
      setLoading(false);
    };
    loadSkills();
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-badge">My Skills</div>
        <h2 className="section-title">Technical Skills</h2>

        <div className="skills-grid">
          {skillCategories.map((cat, index) => (
            <div key={index} className="skill-card card-base">
              <div className="skill-card-header">
                {cat.category.includes('UI/UX') ? (
                  <Palette className="cat-icon" size={20} />
                ) : cat.category.includes('Tools') ? (
                  <Wrench className="cat-icon" size={20} />
                ) : (
                  <Code2 className="cat-icon" size={20} />
                )}
                <h3 className="skill-cat-title">{cat.category}</h3>
              </div>

              <div className="skills-pills-wrap">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-pill-badge">
                    <span className="skill-name">{skill.name}</span>
                    <CheckCircle2 size={16} className="check-icon" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-section {
          padding: 32px 0;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .skill-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .skill-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
        }

        .cat-icon {
          color: var(--text-primary);
        }

        .skill-cat-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .skills-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-pill-badge {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 8px 16px;
          background-color: var(--bg-pill);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          transition: var(--transition-fast);
          min-width: 120px;
        }

        .skill-pill-badge:hover {
          transform: translateY(-2px);
          background-color: var(--bg-card-hover);
          border-color: var(--accent-green);
        }

        .skill-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .check-icon {
          color: var(--accent-green);
        }
      `}</style>
    </section>
  );
};

export default TechnicalSkills;
