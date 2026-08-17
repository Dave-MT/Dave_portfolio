import React from 'react';
import { X, ExternalLink, Github, Check } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content card-base" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-image-wrap">
          <img src={project.image} alt={project.title} className="modal-img" />
          {project.subtitle && (
            <div className="modal-overlay-banner">
              <span className="banner-subtitle">{project.subtitle}</span>
            </div>
          )}
        </div>

        <div className="modal-body">
          <span className="section-badge">{project.category}</span>
          <h2 className="modal-title">{project.title}</h2>
          
          <p className="modal-desc">{project.description}</p>

          <div className="modal-tags">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="tech-tag">{tag}</span>
            ))}
          </div>

          <div className="modal-actions">
            <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-primary">
              <span>View Live Demo</span>
              <ExternalLink size={16} />
            </a>
            <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <Github size={16} />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(6px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content {
          width: 100%;
          max-width: 650px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 0;
          overflow: hidden;
          background-color: var(--bg-card);
        }

        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          color: #FFF;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .close-btn:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.05);
        }

        .modal-image-wrap {
          width: 100%;
          height: 260px;
          position: relative;
        }

        .modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-overlay-banner {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          padding: 10px 16px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(4px);
          border-radius: var(--radius-md);
          color: #FFF;
          font-weight: 700;
        }

        .modal-body {
          padding: 28px;
        }

        .modal-title {
          font-size: 1.75rem;
          margin: 10px 0;
          color: var(--text-primary);
        }

        .modal-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
