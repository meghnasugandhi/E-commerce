import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Import the requested carousel images from the 'images' folder.
import cor1Image from "../images/cor1.jpg";
import cor2Image from "../images/cor2.jpg";

const Main4 = () => {
  // 1. Define the slides data for the *entire* banner background.
  // We'll use cor1Image for the first slide background, and cor2Image for the second.
  const slides = [
    { backgroundImage: cor1Image }, // Slide 1 background
    { backgroundImage: cor2Image }, // Slide 2 background
    { backgroundImage: cor1Image }, // Slide 3 (repeat cor1 for demonstration)
  ];

  // 2. State to track the active slide index (0, 1, or 2)
  const [activeIndex, setActiveIndex] = useState(0);

  // 3. Get the current active background image based on the state
  const currentSlideBackground = slides[activeIndex].backgroundImage;

  // CSS styles embedded as a string
  const styles = `
    .newsletter-banner {
      min-height: 400px;
      /* REMOVED: background-color: #fff; */
      overflow: hidden;
      position: relative;
      background-size: cover; 
      background-position: center; 
      background-repeat: no-repeat;
      transition: background-image 0.5s ease-in-out; /* Smooth transition for slide change */
      color: #fff; /* Make text white or light for contrast against darker images */
      display: flex; /* Use flexbox to center content vertically */
      align-items: center; /* Center content vertically */
      justify-content: center; /* Center content horizontally */
      text-shadow: 1px 1px 3px rgba(0,0,0,0.5); /* Add text shadow for readability */
    }

    /* --- Text and Typography --- */
    .newsletter-banner .display-4 {
      color: #1a4d46; /* Keep this if you want dark text. For images, often white is better. */
      /* If you want white text on image: color: #fff; */
      font-size: 3rem;
      line-height: 1.1;
      font-weight: 700;
      /* If text is over image, remove background from Col */
      background-color: transparent !important; 
    }

    .newsletter-banner .lead {
      color: #555; /* Keep this or change to #eee for light text */
      /* If text is over image, consider: color: #eee; */
      font-size: 1.15rem;
    }

    /* --- Form and Input Styling --- */
    .email-input-group {
      position: relative;
      width: 280px;
    }

    .email-input {
      border-radius: 50px !important;
      padding-left: 40px !important;
      border: 1px solid #ddd;
      height: 50px;
      box-shadow: none !important;
      font-size: 1rem;
      background-color: rgba(255,255,255,0.8); /* Slightly transparent white input */
    }
    .email-input::placeholder {
        color: #888;
    }

    .email-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #aaa;
    }

    .subscribe-button {
      background-color: #38b47a !important;
      border-color: #38b47a !important;
      border-radius: 50px !important;
      margin-left: 10px;
      padding: 10px 25px;
      font-weight: 600;
      height: 50px;
    }

    .subscribe-button:hover {
      background-color: #2e9664 !important;
      border-color: #2e9664 !important;
    }

    /* --- Carousel Indicators (Dots) --- */
    .dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ccc;
      border: 1px solid #ccc;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .active-dot {
      background-color: #38b47a;
      border: 2px solid white; 
      box-shadow: 0 0 0 1px #38b47a; 
    }

    /* No more .visual-left or .visual-right as separate background holders */
    /* The main .newsletter-banner now holds the background image */
  `;

  // SVG code for the paper plane icon
  const emailIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.237-4.237-3.178a.75.75 0 0 1 .124-1.329L15.314.036a.5.5 0 0 1 .54.11ZM6.636 10.057l-2.435 2.435L14.594 3.14 6.636 10.057Z" />
    </svg>
  );

  return (
    <>
      {/* Inject the CSS styles into the component */}
      <style>{styles}</style>

      <div 
        className="newsletter-banner"
        // DYNAMIC STYLING: Sets the background image for the entire banner
        style={{ backgroundImage: `url(${currentSlideBackground})` }} 
      >
        <Container fluid className="p-0 h-100 d-flex align-items-center"> {/* h-100 ensures container takes full banner height */}
          <Row noGutters className="justify-content-center w-100"> {/* w-100 ensures row takes full width */}
            {/* Center Content Area - this will now be directly over the background image */}
            <Col xs={12} lg={6} className="text-center py-5 px-3"> {/* Adjusted Col width */}
              <h1 className="display-4 font-weight-bold mb-3">
                Don't miss <br /> amazing deals
              </h1>
              <p className="lead mb-4">Sign up for the daily newsletter</p>

              {/* Email Form */}
              <Form className="d-flex justify-content-center">
                <div className="email-input-group">
                  <Form.Control
                    type="email"
                    placeholder="Your email address"
                    className="email-input"
                  />
                  <span className="email-icon">{emailIcon}</span>
                </div>
                <Button
                  variant="success"
                  type="submit"
                  className="subscribe-button"
                >
                  Subscribe
                </Button>
              </Form>

              {/* Carousel Indicators */}
              <div className="d-flex justify-content-center mt-4">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`dot mx-2 ${activeIndex === index ? 'active-dot' : ''}`}
                    onClick={() => setActiveIndex(index)}
                  ></span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Main4;