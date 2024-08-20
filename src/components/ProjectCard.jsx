import { Col } from "react-bootstrap";

function ProjectCard({ title, description, imgUrl, link }) {
  function handleClick() {
    window.open(link);
  }
  return (
    <Col sm={6} md={4}>
      <div className="proj-imgbx" onClick={handleClick}>
        <img src={imgUrl} alt="Image Card" />

        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span> <br />
          <span>Click on me</span>
        </div>
      </div>
    </Col>
  );
}

export default ProjectCard;
