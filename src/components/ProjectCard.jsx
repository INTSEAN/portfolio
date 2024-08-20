import { Col } from "react-bootstrap";

function ProjectCard({ title, description, imgUrl, link }) {
  return (
    <Col sm={6} md={4}>
      <div className="proj-imgbx">
        <a href={link}>
          <img src={imgUrl} alt="Image Card" />
        </a>
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  );
}

export default ProjectCard;
