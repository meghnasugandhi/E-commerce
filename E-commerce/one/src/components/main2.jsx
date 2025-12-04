import React, { useState } from 'react';
import { Container, Row, Col, Card, Carousel, Button, Form, InputGroup } from 'react-bootstrap';

// 🚀 IMPORTING DIFFERENT IMAGES from the 'src/images' folder
import testImageCoffee1 from '../images/peach.png';
import testImageCoffee2 from '../images/redapple.png'; 
import testImageJuice from '../images/cor2.jpg';

// Assigning the imported images to the variables
const slide1Image = testImageCoffee1;
const slide2Image = testImageCoffee2; 
const juiceImage = testImageJuice;

// --- Shared Data ---
const juiceContent = {
  title: "Delivered to your home",
  buttonText: "Shop Now →",
};

// --- UPDATED CSS Styles ---
const embeddedStyles = `
/* Global Wrapper Height */
.custom-carousel-wrapper, .juice-delivery-card {
  height: 450px; /* Standardized height */
}

/* Custom styles for the Coffee Carousel */
.custom-carousel-wrapper {
  background-color: #f7f3f1; 
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

/* Ensure Carousel content fills the wrapper */
.custom-carousel-wrapper .carousel-inner, 
.custom-carousel-wrapper .carousel-item {
  height: 100%;
}

.coffee-slide-content-card {
  background: transparent !important; 
  position: relative;
  height: 100%;
  width: 100%;
}

/* UPDATED: Coffee Image Positioning - Full Coverage */
.coffee-mockup-image {
  position: absolute;
  bottom: 0; 
  right: 0;
  height: 85%; /* Use height instead of width for better control */
  max-height: 380px;
  z-index: 10;
  pointer-events: none;
  object-fit: cover; /* Changed to cover for full image display */
}

/* Custom styles for the Juice Delivery Card */
.juice-delivery-card {
  background-color: #fef7e9; 
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

/* Ensure text is above the image */
.juice-delivery-card .card-body {
  position: relative;
  z-index: 20;
}

/* UPDATED: Juice Image Positioning - Full Coverage */
.juice-mockup-image {
  position: absolute;
  bottom: 0; 
  right: 0;
  height: 90%; /* Increased height for better coverage */
  max-height: 400px;
  z-index: 10;
  pointer-events: none;
  object-fit: cover; /* Changed to cover for full image display */
}

/* Specific text color for "Delivered" */
.text-success-emphasis {
  color: #4CAF50 !important; 
}

/* Additional styles for better text visibility */
.subscription-box {
  position: relative;
  z-index: 25;
}

.shop-now-button {
  position: relative;
  z-index: 25;
}
`;


// --- Carousel Slide Content Component ---
const CoffeeSlideContent = ({ title, subtitle, imageUrl }) => (
  <Card className="coffee-slide-content-card border-0">
    <Card.Body className="d-flex flex-column justify-content-between p-4 p-md-5">
      {/* Text Content */}
      <div style={{ color: '#333', position: 'relative', zIndex: 20 }}>
        <h1 className="display-4 fw-bold">{title}</h1>
        <p className="lead fw-normal mt-3" style={{ opacity: 0.8 }}>{subtitle}</p>
      </div>

      {/* Form and Subscription */}
      <div className="subscription-box mt-4">
        <InputGroup style={{ width: '75%' }}>
          <Form.Control
            placeholder="Your email address"
            aria-label="Your email address"
            className="py-3"
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          />
          <Button 
            variant="success" 
            id="button-addon2" 
            className="px-4 py-3"
            style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            Subscribe
          </Button>
        </InputGroup>
      </div>
      
      {/* Image Content - Updated positioning */}
      <img 
        src={imageUrl} 
        alt="Coffee Mockups" 
        className="coffee-mockup-image" 
      />
    </Card.Body>
  </Card>
);


// --- Main2 Component ---
const Main2 = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {/* 1. Embed the necessary CSS styles directly */}
      <style>{embeddedStyles}</style>
      
      {/* 2. Main Content */}
      <Container className="py-5">
        <Row className="g-4">
          {/* --- Left Column: Carousel/Slider --- */}
          <Col md={7}>
            <div className="custom-carousel-wrapper">
              <Carousel 
                activeIndex={index} 
                onSelect={handleSelect} 
                indicators={true} 
                controls={true}
                className="h-100"
              >
                {/* Slide 1 uses testImageCoffee1 (peach.png) */}
                <Carousel.Item interval={3000}>
                  <CoffeeSlideContent
                    title="Pure Coffe Big discount"
                    subtitle="Save up to 50% off on your first order"
                    imageUrl={slide1Image}
                  />
                </Carousel.Item>
                
                {/* Slide 2 uses testImageCoffee2 (redapple.png) */}
                <Carousel.Item interval={3000}>
                  <CoffeeSlideContent
                    title="Pure Coffe Big discount"
                    subtitle="Save up to 50% off on your first order"
                    imageUrl={slide2Image}
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>

          {/* --- Right Column: Static Juice Content --- */}
          <Col md={5}>
            <Card className="juice-delivery-card border-0">
              <Card.Body className="d-flex flex-column justify-content-between p-4 p-md-5">
                <div style={{ position: 'relative', zIndex: 25 }}>
                  <Card.Title className="h1 mb-3" style={{ lineHeight: '1.2' }}>
                    <span className="text-success-emphasis">Delivered</span> to your home
                  </Card.Title>
                  <Button 
                    variant="success" 
                    className="shop-now-button mt-3 px-4 py-2"
                    style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
                  >
                    {juiceContent.buttonText}
                  </Button>
                </div>
                
                {/* Image uses testImageJuice (cor2.jpg) */}
                <img 
                  src={juiceImage} 
                  alt="Organic Kiwi" 
                  className="juice-mockup-image" 
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '15px', 
                  right: '15px', 
                  fontWeight: 'bold', 
                  fontSize: '2.5rem', 
                  color: '#ffb700', 
                  zIndex: 30 
                }}>
                  Juice.
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Main2;