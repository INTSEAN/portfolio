import React from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";

function Contact() {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});

  function onFormUpdate(category, value) {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  }

  // Web 3 Forms was time efficient
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setButtonText("Sending...");
  //   let response = await fetch("http//:localhost:5173/contact", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "Application/json;charset=utf-8",
  //     },
  //     body: JSON.stringify(formDetails),
  //   });
  //   setButtonText("Send");
  //   let result = response.json();
  //   setFormDetails(formInitialDetails);
  //   if (response.status === 200) {
  //     setStatus({
  //       success: true,
  //       message: "Message Sent Successfully",
  //     });
  //   } else {
  //     setStatus({
  //       success: false,
  //       message: (
  //         <span>
  //           Something went wrong, please try again later or{" "}
  //           <a target="blank" href="mailto:donovans064@gmail.com">
  //             Click Here
  //           </a>
  //         </span>
  //       ),
  //     });
  //   }
  // }

  return (
    <section className="contact" id="contact">
      <Container>
        <Row>
          <Col md={6}>
            <img src={contactImg} alt="Contact Us" />
          </Col>
          <Col md={6}>
            <h2>Hiring? Let's Talk</h2>

            {/* Form Starts Here */}
            <form action="https://api.web3forms.com/submit" method="POST">
              <Row>
                <input
                  type="hidden"
                  name="access_key"
                  value="1b8e7451-7e3d-482d-bcb2-e9d721c4e7f4"
                />
              </Row>
              <Row>
                <Col md={6} className="px-1">
                  <input
                    type="text"
                    autoComplete="true"
                    name="name"
                    required
                    value={formDetails.firstName}
                    placeholder="First Name"
                    onChange={(e) => onFormUpdate("firstName", e.target.value)}
                  />
                </Col>
                <Col md={6} className="px-1">
                  <input
                    type="text"
                    autoComplete="true"
                    name="name"
                    required
                    value={formDetails.lastName}
                    placeholder="Last Name "
                    onChange={(e) => onFormUpdate("lastName", e.target.value)}
                  />
                </Col>
                <Col md={6} className="px-1">
                  <input
                    type="email"
                    autoComplete="true"
                    name="email"
                    required
                    value={formDetails.email}
                    placeholder="Email 📧"
                    onChange={(e) => onFormUpdate("email", e.target.value)}
                  />
                </Col>
                <Col md={6} className="px-1">
                  <input
                    type="tel"
                    autoComplete="true"
                    name="tel"
                    value={formDetails.phone}
                    placeholder="Phone No. 📱"
                    onChange={(e) => onFormUpdate("phone", e.target.value)}
                  />
                </Col>
                <Col>
                  <textarea
                    row="6"
                    name="message"
                    autoComplete="true"
                    required
                    value={formDetails.message}
                    placeholder="Leave a message 📥"
                    onChange={(e) => onFormUpdate("message", e.target.value)}
                  ></textarea>
                </Col>
                <button type="submit">
                  {" "}
                  <span> {buttonText}</span>
                </button>
                {status.message && (
                  <Col>
                    <p
                      className={status.success == false ? "danger" : "success"}
                    >
                      {status.message}
                    </p>
                  </Col>
                )}
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
