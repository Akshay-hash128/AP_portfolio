// src/App.jsx
import React, { useEffect, useState } from "react";
import apLogo from "./assets/ap-motion-logo1.svg";
import ProjectCarousel from "./components/ProjectCarousel";
import UnicornEmbed from "./components/UnicornEmbed";
import ContactForm from "./components/ContactForm";

const App = () => {
  const [heroFade, setHeroFade] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      // Fade out over first ~60% of viewport scroll
      const max = window.innerHeight * 0.6;
      const y = window.scrollY || 0;
      const t = Math.min(1, y / max); // 0 -> 1
      setHeroFade(1 - t); // 1 -> 0
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app-root">
      {/* H{eader / Nav */}
      <header className="site-header">
        <a href="#hero" className="logo-wrap">
          <img src={apLogo} alt="AP Motion Logo" className="logo-img" />
        </a>
        <nav className="main-nav">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* FULLSCREEN HERO (background only) */}
      <section id="hero" className="hero-section hero-fullscreen">
        {/* FADE THIS WRAPPER, NOT UNICORN */}
        <div className="hero-unicorn-wrapper" style={{ opacity: heroFade }}>
          <UnicornEmbed
            projectId="MZNZ3utZ7eUYmFgSShpk"
            className="hero-unicorn"
          />
        </div>
      </section>


      {/* Projects */}
      <section id="projects" className="section section-projects">
        <div className="section-header">
          <h2>Selected Projects</h2>
          <p>
            A snapshot of the systems I&apos;ve built in robotics, motion, and
            applied AI.
          </p>
        </div>
        <ProjectCarousel />
      </section>

      {/* About */}
      <section id="about" className="section section-about">
        <div className="section-header">
          <h2>About</h2>
        </div>

        <div className="about-grid">
          <div>
            <p>
              I&apos;m an engineer obsessed with motion control, compliant
              mechanisms, and making hardware feel as polished as great
              software.
            </p>
            <p>
              AP Motion is my umbrella identity for robotics and motion-focused
              projects.
            </p>
          </div>

          <ul className="about-list">
            <li>
              <span className="about-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
                </svg>
              </span>
              5-axis desktop robot arm with cycloidal drives
            </li>
            <li>
              <span className="about-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 7h.01M12 7h.01M17 7h.01M7 11h10" />
                </svg>
              </span>
              AI-powered automation pipelines
            </li>
            <li>
              <span className="about-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
              </span>
              Functional 3D printed mechanisms
            </li>
            <li>
              <span className="about-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="2" /><path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01" /><path d="M7 12h10M12 7v10" />
                </svg>
              </span>
              Motor-control PCB design
            </li>
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section section-contact">
        <div className="section-header">
          <h2>Contact</h2>
          <p>Want to talk robotics, motion systems, or collaboration?</p>
        </div>

        <div className="contact-grid">
          <ContactForm />

          <div className="contact-info">
            <h3>Let's build something</h3>
            <p>Whether it's a robotics project, a motion system, or an AI pipeline — I'm always open to interesting problems.</p>
            <ul className="contact-links">
              <li>
                <span className="about-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                akshay@apmotion.dev
              </li>
              <li>
                <span className="about-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </span>
                github.com/akshaypadmanabhuni
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} AP Motion · Akshay Padmanabhuni</p>
      </footer>
    </div>
  );
};

export default App;
