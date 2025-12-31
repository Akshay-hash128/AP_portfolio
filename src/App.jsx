// src/App.jsx
import apLogo from "./assets/ap-motion-logo1.svg";
import React from "react";
import ProjectCarousel from "./components/ProjectCarousel";

const App = () => {
  return (
    <div className="app-root">
      {/* Header / Nav */}
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

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">Portfolio · Robotics · Product Design</p>
          <h1>
            Akshay Padmanabhuni
            <span className="hero-highlight"> / AP Motion</span>
          </h1>
          <p className="hero-subtitle">
            Building precise motion systems, robotics, and clever hardware +
            software interfaces. This is the home of my experiments in
            automation, 3D printing, and product design.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-ghost">
              Let&apos;s Collaborate
            </a>
          </div>

          <div className="hero-meta">
            <span>Robotics · Mechatronics · PCB Design · CV / ML</span>
          </div>
        </div>

        {/* Placeholder for future 3D viewer */}  
      <div className="hero-visual">
        <div className="hero-video-frame">
          <video
            className="hero-video"
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </div>

      </section>

      {/* Projects Section */}
      <section id="projects" className="section section-projects">
        <div className="section-header">
          <h2>Selected Projects</h2>
          <p>
            A snapshot of the systems I&apos;ve built in robotics, motion, and
            applied AI. Cards are sized like playing cards with a subtle
            glassmorphism effect.
          </p>
        </div>

        <ProjectCarousel />
      </section>

      {/* About Section */}
      <section id="about" className="section section-about">
        <div className="section-header">
          <h2>About</h2>
        </div>
        <div className="about-grid">
          <div>
            <p>
              I&apos;m an engineer obsessed with motion control, compliant
              mechanisms, and making hardware feel as polished as great
              software. My work spans cycloidal gearboxes, custom motor
              controllers, 3D printed mechanisms, and AI-assisted workflows for
              automation.
            </p>
            <p>
              AP Motion is my umbrella identity for robotics and motion-focused
              projects — from desktop arms and gearboxes to data-driven control
              systems and interactive tools.
            </p>
          </div>
          <div>
            <ul className="about-list">
              <li>⚙️ 5-axis desktop robot arm with cycloidal drives</li>
              <li>🧠 AI-powered data ingestion and automation pipelines</li>
              <li>🖨️ Multi-material & functional 3D printing experiments</li>
              <li>📐 PCB design for motor control and sensing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section section-contact">
        <div className="section-header">
          <h2>Contact</h2>
          <p>Want to talk robotics, motion systems, or collaboration?</p>
        </div>

        <div className="contact-grid">
          <form
            className="contact-form"
            method="POST"
            action="https://formspree.io/f/your-form-id" // replace with real endpoint
          >
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>

            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Tell me about your project, role, or idea…"
                required
              />
            </div>

            <button className="btn-primary" type="submit">
              Send Message
            </button>
          </form>

          <div className="contact-meta">
            <p>
              I&apos;m open to roles in robotics, mechatronics, and
              hardware-centric AI, as well as consulting on motion systems,
              prototyping, and 3D printing workflows.
            </p>
            <p className="contact-email">
              Prefer email directly? <span>you@apmotion.com</span> (placeholder)
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} AP Motion · Akshay Padmanabhuni</p>
        <p className="footer-sub">
          Built with React, designed for motion-focused engineering work.
        </p>
      </footer>
    </div>
  );
};

export default App;
