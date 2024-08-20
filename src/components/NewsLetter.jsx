import React from "react";
import { Col, Row } from "react-bootstrap";

function Newsletter() {
  return (
    <Col lg={12}>
      <div className="newsletter-bx ">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3 style={{ fontSize: "20px", letterSpacing: "2px" }}>
              Subscribe to my newsletter & never miss out on the latest tech
              news + tech resources!
            </h3>
          </Col>
          <Col md={6} xl={7}>
            <form>
              <div className="new-email-bx">
                <input
                  value=""
                  name="email"
                  autoComplete="true"
                  type="email"
                  placeholder="Email Address"
                />
                <button type="submit">Submit</button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default Newsletter;
