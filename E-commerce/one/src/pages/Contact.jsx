import React from 'react';
import { Container, Row, Col, Form, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import Nest from '../images/Nest.jpg'; // Ensure this path and extension are correct

const Contact = () => {
  // Brand Colors
  const greenText = { color: '#3BB77E', textDecoration: 'none' };
  const darkBlueText = { color: '#253D4E', fontWeight: 'bold' };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="contact-page bg-white pb-5">
      {/* 1. Breadcrumb Section */}
      <Container className="py-3 border-bottom mb-5">
        <Breadcrumb className="mb-0">
          {/* linkAs={Link} makes it functional with react-router without page refresh */}
          <Breadcrumb.Item 
            linkAs={Link} 
            linkProps={{ to: "/" }} 
            style={greenText}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item 
            href="#" 
            style={greenText}
          >
            Pages
          </Breadcrumb.Item>
          {/* Active item is plain text by default */}
          <Breadcrumb.Item active>Contact</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      {/* 2. Inquiry Information Section */}
      <Container className="mb-5">
        <Row className="gy-4">
          <Col lg={4}>
            <h6 style={greenText} className="mb-3 fw-bold">How can help you ?</h6>
            <h1 style={{ ...darkBlueText, fontSize: '3.5rem', lineHeight: '1.1' }}>
              Let us know how we can help you
            </h1>
            <p className="text-muted mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </Col>
          <Col lg={8}>
            <Row className="g-4">
              {[
                { id: '01', title: 'Visit Feedback' },
                { id: '02', title: 'Employer Services' },
                { id: '03', title: 'Billing Inquiries', isGreen: true },
                { id: '04', title: 'General Inquiries' },
              ].map((item) => (
                <Col md={6} key={item.id}>
                  <h5 style={item.isGreen ? greenText : darkBlueText} className="mb-3">
                    {item.id}. {item.title}
                  </h5>
                  <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                  </p>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* 3. Map Hero Section */}
      <div className="mb-5" style={{ height: '450px', width: '100%', overflow: 'hidden' }}>
        <img 
          src={Nest} 
          alt="World Map Locations" 
          className="w-100 h-100"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* 4. Location Cards */}
      <Container className="mb-5 pt-4">
        <Row className="g-4">
          {['Office', 'Studio', 'Shop'].map((loc, idx) => (
            <Col md={4} key={idx}>
              <h4 style={greenText} className="mb-4 fw-bold">{loc}</h4>
              <address className="text-muted mb-3" style={{ lineHeight: '1.8' }}>
                205 North Michigan Avenue, Suite 810<br />
                Chicago, 60601, USA
              </address>
              <p className="mb-1 text-muted"><strong>Phone:</strong> (123) 456-7890</p>
              <p className="mb-4 text-muted"><strong>Email:</strong> contact@Evara.com</p>
              <Button 
                variant="success" 
                className="d-flex align-items-center px-4 py-2"
                style={{ backgroundColor: '#3BB77E', border: 'none', fontSize: '0.9rem' }}
                onClick={() => alert(`Opening Map for ${loc}...`)}
              >
                <FaMapMarkerAlt className="me-2" /> View map
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      {/* 5. Contact Form Section */}
      <Container className="pt-5 position-relative">
        <Row className="align-items-center">
          <Col lg={8}>
            <h6 style={greenText} className="mb-2 fw-bold">Contact form</h6>
            <h2 style={{ ...darkBlueText, fontSize: '3rem' }} className="mb-3">Drop Us a Line</h2>
            <p className="text-muted mb-5">
              Your email address will not be published. Required fields are marked *
            </p>
            
            <Form onSubmit={(e) => { e.preventDefault(); alert("Message Sent Successfully!"); }}>
              <Row className="g-4">
                <Col md={6}>
                  <Form.Control 
                    required
                    placeholder="First Name" 
                    className="bg-light border-0 py-3 px-4" 
                    style={{ borderRadius: '10px' }}
                  />
                </Col>
                <Col md={6}>
                  <Form.Control 
                    required
                    type="email"
                    placeholder="Your Email" 
                    className="bg-light border-0 py-3 px-4" 
                    style={{ borderRadius: '10px' }}
                  />
                </Col>
                <Col md={6}>
                  <Form.Control 
                    placeholder="Your Phone" 
                    className="bg-light border-0 py-3 px-4" 
                    style={{ borderRadius: '10px' }}
                  />
                </Col>
                <Col md={6}>
                  <Form.Control 
                    placeholder="Subject" 
                    className="bg-light border-0 py-3 px-4" 
                    style={{ borderRadius: '10px' }}
                  />
                </Col>
                <Col xs={12}>
                  <Form.Control 
                    required
                    as="textarea" 
                    rows={6} 
                    placeholder="Message" 
                    className="bg-light border-0 py-3 px-4"
                    style={{ borderRadius: '10px' }}
                  />
                </Col>
                <Col xs={12}>
                  <Button 
                    type="submit"
                    size="lg" 
                    style={{ backgroundColor: '#253D4E', border: 'none', borderRadius: '10px' }} 
                    className="px-5 py-3 mt-2 fw-bold"
                  >
                    Send message
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          
          <Col lg={4} className="d-none d-lg-block ps-lg-5 text-center">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" 
              alt="Support Representative" 
              className="img-fluid rounded-4 shadow-sm"
              style={{ minHeight: '500px', objectFit: 'cover' }}
            />
          </Col>
        </Row>

        {/* Scroll to Top Button */}
        <div 
          className="position-fixed bottom-0 end-0 m-4 shadow border rounded-circle d-flex align-items-center justify-content-center bg-white" 
          style={{ width: '45px', height: '45px', cursor: 'pointer', zIndex: 1000 }}
          onClick={scrollToTop}
        >
          <FaArrowUp style={darkBlueText} />
        </div>
      </Container>

      {/* Internal CSS to clean up Breadcrumb hover and link styles */}
      <style>{`
        .breadcrumb-item a {
          color: #3BB77E !important;
          text-decoration: none !important;
        }
        .breadcrumb-item a:hover {
          color: #253D4E !important;
        }
        .breadcrumb-item + .breadcrumb-item::before {
          content: ">" !important;
          color: #ccc;
        }
      `}</style>
    </div>
  );
};

export default Contact;