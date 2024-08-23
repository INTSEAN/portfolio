import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import langOne from "../assets/img/lang1.svg";
import langTwo from "../assets/img/lang2.svg";
import langThree from "../assets/img/lang3.svg";
import langFour from "../assets/img/lang4.svg";
import langFive from "../assets/img/lang5.svg";
import langSeven from "../assets/img/lang7.svg";
import langEight from "../assets/img/lang8.svg";
import langNine from "../assets/img/lang9.svg";
import langEleven from "../assets/img/lang11.svg";

import colorSharp from "../assets/img/color-sharp.png";

function Skills() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <section className="skill" id="skills">
        <Container>
          <Row>
            <Col>
              <div className="skills-bx">
                <h2>Programming Languages + Frameworks</h2>
                <p> I speak fluent... </p>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  className="skill-slider"
                >
                  <div className="item">
                    <img src={langOne} alt="Image" />
                  </div>
                  <div className="item">
                    <img src={langTwo} alt="Image" />
                  </div>
                  <div className="item">
                    <img src={langThree} alt="Image" />
                  </div>
                  <div className="item">
                    <img src={langFour} alt="Image" />
                  </div>
                  <div className="item">
                    <img src={langFive} alt="Image" />
                  </div>
                  <div className="item">
                    <img src={langSeven} alt="Image" />
                  </div>
                  <div className="item">
                    <img src={langEight} alt="Image" />
                  </div>
                  <div className="item">
                    <img src={langNine} alt="Image" />
                  </div>
                  <div className="item">
                    <img src={langEleven} alt="Image" />
                  </div>
                </Carousel>
              </div>
            </Col>
          </Row>
        </Container>
        <img className="background-image-left" src={colorSharp} alt="" />
      </section>
    </>
  );
}

export default Skills;
