import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';
import ProjectModal from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-badge">My Portfolio</div>
        <h2 className="section-title">MY Projects</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card card-base"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image Box */}
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-img" />

                {/* Special Overlay Banners matching visual design */}
                {project.subtitle && !project.promoText && !project.category?.toLowerCase().includes('ux') && (
                  <div className="special-overlay-banner health-banner">
                    <span className="banner-tag">Healthcare App</span>
                    <h4>{project.subtitle}</h4>
                  </div>
                )}

                {project.promoText && (
                  <div className="special-overlay-banner promo-banner">
                    <div className="promo-text-wrap">
                      <h3>Get your</h3>
                      <h2>Special Sale</h2>
                      <p>up to 40%</p>
                      <button className="promo-btn">Shop Now</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Info */}
              <div className="project-card-content">
                <div className="project-header-row">
                  <h3 className="project-title">{project.title}</h3>
                  <button className="arrow-btn" aria-label="View Project">
                    <ArrowUpRight size={18} />
                  </button>
                </div>

                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style>{`
        .projects-section {
          padding: 32px 0;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }

        .project-card {
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .project-card:hover .project-img {
          transform: scale(1.05);
        }

        .project-card:hover .arrow-btn {
          background-color: var(--btn-bg);
          color: var(--btn-text);
          transform: translate(2px, -2px);
        }

        .project-image-container {
          width: 100%;
          height: 230px;
          position: relative;
          overflow: hidden;
          background-color: var(--bg-pill);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-img[src=""] , .project-img:not([src]) {
          display: none;
        }

        /* Overlay Banners for health & promo visual cards */
        .special-overlay-banner {
          position: absolute;
          inset: 0;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          backdrop-filter: blur(2px);
        }

        .health-banner {
          background: linear-gradient(135deg, rgba(240, 253, 244, 0.92) 0%, rgba(220, 252, 231, 0.95) 100%);
          color: #064E3B;
        }

        [data-theme="dark"] .health-banner {
          background: linear-gradient(135deg, rgba(6, 78, 59, 0.95) 0%, rgba(4, 47, 36, 0.95) 100%);
          color: #A7F3D0;
        }

        .banner-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background-color: var(--accent-green);
          color: #FFF;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          width: fit-content;
          margin-bottom: 8px;
        }

        .health-banner h4 {
          font-size: 1.4rem;
          font-weight: 800;
          line-height: 1.25;
        }

        .promo-banner {
          background: linear-gradient(135deg, #FF6B00 0%, #FF8800 100%);
          color: #FFFFFF;
        }

        .promo-text-wrap h3 { font-size: 1rem; font-weight: 600; opacity: 0.9; }
        .promo-text-wrap h2 { font-size: 1.6rem; font-weight: 900; line-height: 1.1; }
        .promo-text-wrap p { font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; }

        .promo-btn {
          padding: 6px 16px;
          border-radius: var(--radius-full);
          border: none;
          background: #FFFFFF;
          color: #FF6B00;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
        }

        /* Yango UX/UI Design banner */
        .yango-banner {
          background: linear-gradient(135deg, rgba(254, 243, 199, 0.93) 0%, rgba(252, 211, 77, 0.9) 100%);
          color: #78350F;
        }

        [data-theme="dark"] .yango-banner {
          background: linear-gradient(135deg, rgba(120, 53, 15, 0.95) 0%, rgba(92, 38, 6, 0.95) 100%);
          color: #FDE68A;
        }

        .yango-banner h4 {
          font-size: 1.2rem;
          font-weight: 800;
          line-height: 1.3;
          margin-top: 6px;
        }

        .yango-tag {
          background-color: #F59E0B !important;
          color: #FFF !important;
        }

        .project-card-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .project-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .arrow-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--bg-pill);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .project-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        @media (max-width: 800px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
