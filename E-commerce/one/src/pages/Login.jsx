import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";


// IMPORTANT: This 'loginImage' import is based on your request. 
// Ensure the path "../assets/login-image.png" is correct in your project structure.
import loginImage from "../images/login.png";

const Login = () => {
  // Inline styles for the CAPTCHA code block for simplicity
  const captchaStyle = {
    backgroundColor: '#e6ffe6', // Light green background
    color: '#3cb371',           // Green text
    fontWeight: 'bold',
    fontSize: '1.2rem',
    padding: '8px',
    borderRadius: '4px',
    textAlign: 'center',
    letterSpacing: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100px', // Set a fixed width for the captcha box
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Card className="shadow-lg p-0" style={{ maxWidth: '900px', width: '100%', borderRadius: '15px' }}>
        <Row className="g-0">
          
          {/* --- Image Section --- */}
          <Col md={6}>
            <img
              src={loginImage}
              alt="Login Illustration"
              className="img-fluid h-100 w-100"
              style={{ objectFit: 'cover', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}
            />
          </Col>
          
          {/* --- Login Form Section --- */}
          <Col md={6} className="p-5">
            <h2 className="mb-1 fw-bold">Login</h2>
            <p className="text-muted mb-4">
              Don't have an account? <a href="#create" className="text-decoration-none" style={{ color: '#3cb371' }}>**Create here**</a>
            </p>

            <Form>
              {/* Username/Email Input */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="small">*</Form.Label>
                <Form.Control type="text" placeholder="Username or Email *" />
              </Form.Group>

              {/* Password Input */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="small">*</Form.Label>
                <Form.Control type="password" placeholder="Your password *" />
              </Form.Group>

              {/* Security Code (CAPTCHA) Row */}
              <Row className="mb-4 align-items-end">
                <Col xs={7}>
                  <Form.Group controlId="formBasicSecurityCode">
                    <Form.Label className="small">*</Form.Label>
                    <Form.Control type="text" placeholder="Security code *" />
                  </Form.Group>
                </Col>
                <Col xs={5}>
                  <div style={captchaStyle}>
                    8675
                  </div>
                </Col>
              </Row>

              {/* Remember Me and Forgot Password */}
              <Row className="mb-4 align-items-center">
                <Col xs={6}>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                </Col>
                <Col xs={6} className="text-end">
                  <a href="#forgot" className="small text-muted text-decoration-none">
                    Forgot password?
                  </a>
                </Col>
              </Row>

              {/* Login Button */}
              <Button 
                variant="dark" 
                type="submit" 
                style={{ backgroundColor: '#212529', borderColor: '#212529', padding: '10px 40px' }}
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Login; 