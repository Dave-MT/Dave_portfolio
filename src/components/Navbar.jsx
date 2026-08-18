import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#home" className="nav-brand">
          <span className="brand-text">Dawit</span>
          <span className="brand-dot"></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-menu">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions (Search, Theme Switch, Contact Button) */}
        <div className="nav-actions">
          {/* Theme Switcher Toggle Button */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Contact / Hire Button */}
          <a href="#contact" className="btn btn-primary nav-contact-btn">
            <span>Contact</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="icon-btn mobile-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="mobile-nav-link highlight"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Me <ArrowUpRight size={16} />
              </a>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 16px 0;
          background-color: var(--bg-primary);
          transition: var(--transition-normal);
        }

        .navbar-header.scrolled {
          padding: 12px 0;
          background-color: var(--bg-card);
          box-shadow: var(--shadow-sm);
          border-bottom: 1px solid var(--border-card);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .brand-dot {
          width: 7px;
          height: 7px;
          background-color: var(--accent-green);
          border-radius: 50%;
          display: inline-block;
          margin-top: 4px;
        }

        .nav-menu {
          display: flex;
          align-items: center;
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 28px;
          list-style: none;
        }

        .nav-link {
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .icon-btn:hover {
          background-color: var(--bg-pill);
        }

        .theme-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: var(--bg-pill);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .theme-toggle-btn:hover {
          transform: rotate(15deg) scale(1.05);
        }

        .nav-contact-btn {
          padding: 8px 20px;
          font-size: 0.88rem;
        }

        .mobile-toggle {
          display: none;
        }

        .mobile-menu-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-color);
          padding: 20px;
          box-shadow: var(--shadow-md);
        }

        .mobile-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-nav-link {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        @media (max-width: 850px) {
          .nav-menu, .nav-contact-btn {
            display: none;
          }
          .mobile-toggle {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
