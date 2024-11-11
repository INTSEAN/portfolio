import React from 'react';
import { Col } from "react-bootstrap";

function ProjectCard({ title, description, imgUrl, link, category, technologies, isHovered }) {
  return (
    <Col sm={6} md={4}>
      <div 
        className={`proj-imgbx ${isHovered ? 'hovered' : ''}`}
        onClick={() => window.open(link, '_blank')}
      >
        <img src={imgUrl} alt={title} loading="lazy" />
        <div className="proj-txtx">
          <span className="proj-category">{category}</span>
          <h4>{title}</h4>
          <span>{description}</span>
          <div className="proj-technologies">
            {technologies.map((tech, index) => (
              <span key={index} className="proj-tech-tag">{tech}</span>
            ))}
          </div>
          <div className="proj-links">
            <button className="view-project">View Project</button>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default ProjectCard;
