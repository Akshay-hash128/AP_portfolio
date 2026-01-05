// src/App.jsx
import React, { useEffect, useState } from "react";
import apLogo from "./assets/ap-motion-logo1.svg";
import ProjectCarousel from "./components/ProjectCarousel";
import UnicornEmbed from "./components/UnicornEmbed";

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
        <UnicornEmbed
          projectId="MZNZ3utZ7eUYmFgSShpk"
          className="hero-unicorn"
        />
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
            <li>⚙️ 5-axis desktop robot arm with cycloidal drives</li>
            <li>🧠 AI-powered automation pipelines</li>
            <li>🖨️ Functional 3D printed mechanisms</li>
            <li>📐 Motor-control PCB design</li>
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
          <form className="contact-form">
            <div className="form-row">
              <label>Name</label>
              <input type="text" required />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input type="email" required />
            </div>
            <div className="form-row">
              <label>Message</label>
              <textarea rows="4" required />
            </div>
            <button className="btn-primary" type="submit">
              Send Message
            </button>
          </form>
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
