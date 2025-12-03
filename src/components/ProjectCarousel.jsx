// src/components/ProjectCarousel.jsx
import React, { useRef } from "react";

const projects = [
  {
    title: "5-Axis Desktop Robot Arm",
    role: "Design · Control · Fabrication",
    description:
      "Custom cycloidal gearbox stages, NEMA 17 motors, and closed-loop control targeting precise desktop automation.",
    tags: ["Cycloidal Drive", "NEMA 17", "Closed-loop"],
    imageAlt: "Robot arm project placeholder",
  },
  {
    title: "Low-Cost Cycloidal Gearbox",
    role: "Mechanical Design · Testing",
    description:
      "20:1 reduction cycloidal gearbox optimized for 3D printing and hobby robotics, with a focus on backlash and stiffness.",
    tags: ["Gearbox", "3D Printing", "Simulation"],
    imageAlt: "Cycloidal gearbox project placeholder",
  },
  {
    title: "Data Ingestion Pipeline",
    role: "Architecture · Automation",
    description:
      "Python + SQL pipeline for large-scale document processing with Azure OCR and SCD2-style data modeling.",
    tags: ["Python", "SQL", "Azure AI"],
    imageAlt: "Data ingestion / automation project placeholder",
  },
  {
    title: "NRTA Wearable Concept",
    role: "Product Vision · Prototyping",
    description:
      "Modular IMU pods with BLE for real-time form tracking, rep counting, and feedback in strength training.",
    tags: ["Wearables", "IMU", "BLE"],
    imageAlt: "Wearable fitness project placeholder",
  },
];

const ProjectCarousel = () => {
  const trackRef = useRef(null);

  const scrollByCards = (direction = 1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(".project-card");
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 24; // matches CSS gap
    const scrollAmount = direction * (cardWidth + gap);

    track.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-header">
        <button
          type="button"
          className="carousel-btn"
          onClick={() => scrollByCards(-1)}
          aria-label="Previous projects"
        >
          ◀
        </button>
        <button
          type="button"
          className="carousel-btn"
          onClick={() => scrollByCards(1)}
          aria-label="Next projects"
        >
          ▶
        </button>
      </div>

      <div className="carousel-track" ref={trackRef}>
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-card-inner">
              {/* Image placeholder area */}
              <div className="project-image-placeholder">
                <span>{project.imageAlt}</span>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-role">{project.role}</p>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
