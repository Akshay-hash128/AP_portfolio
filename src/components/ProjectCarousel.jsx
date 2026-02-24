// src/components/ProjectCarousel.jsx
import React, { useRef } from "react";
import ProjectCard3D from "./ProjectCard3D";

const projects = [
  {
    title: "5-Axis Desktop Robot Arm",
    role: "Design · Control · Fabrication",
    description:
      "Custom cycloidal gearbox stages, NEMA 17 motors, and closed-loop control targeting precise desktop automation.",
    tags: ["Cycloidal Drive", "NEMA 17", "Closed-loop"],
  },
  {
    title: "Low-Cost Cycloidal Gearbox",
    role: "Mechanical Design · Testing",
    description:
      "20:1 reduction cycloidal gearbox optimized for 3D printing and hobby robotics, with a focus on backlash and stiffness.",
    tags: ["Gearbox", "3D Printing", "Simulation"],
  },
  {
    title: "Data Ingestion Pipeline",
    role: "Architecture · Automation",
    description:
      "Python + SQL pipeline for large-scale document processing with Azure OCR and SCD2-style data modeling.",
    tags: ["Python", "SQL", "Azure AI"],
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
    const gap = 24;
    track.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-header">
        <button type="button" className="carousel-btn" onClick={() => scrollByCards(-1)} aria-label="Previous projects">◀</button>
        <button type="button" className="carousel-btn" onClick={() => scrollByCards(1)} aria-label="Next projects">▶</button>
      </div>

      <div className="carousel-track" ref={trackRef}>
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            <ProjectCard3D title={project.title} index={index} isLeader={index === 0} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
