import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
// Import a relevant icon if you are using an icon library like Font Awesome or React Icons
// For this example, we'll use a placeholder for the Fingerprint/Lock icon.

function ForgotPasswordUI() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const correctSecurityCode = '8675'; // Hardcoded from the image for display purposes

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add password reset logic here
    console.log('Username/Email:', usernameOrEmail);
    console.log('Security Code Entered:', securityCode);
    console.log('Agreed to Terms:', agreedToTerms);

    if (securityCode === correctSecurityCode && agreedToTerms) {
      alert('Password reset initiated!');
    } else {
      alert('Please check your input and agree to terms.');
    }
  };

  // Inline styles for the specific security code appearance
  const securityCodeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    borderRadius: '5px',
    padding: '5px 10px',
    backgroundColor: '#e6ffe6', // Light green background
    border: '1px solid #ccffcc',
    height: '100%',
  };

  const digitStyle = (color) => ({
    padding: '0 3px',
    color: color,
  });

  // Custom icon element placeholder
  const LockFingerprintIcon = () => (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      {/* This is a simple placeholder to represent the icon */}
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified Fingerprint/Lock visual */}
        <circle cx="12" cy="12" r="10" stroke="#fdb813" strokeWidth="2" fill="none"/>
        <path d="M12 2C16.4183 2 20 5.58172 20 10V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V10C4 5.58172 7.58172 2 12 2Z" stroke="#38c172" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="9" y="10" width="6" height="4" rx="1" stroke="#38c172" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white"/>
        <circle cx="12" cy="12" r="1" fill="#38c172"/>
      </svg>
    </div>
  );


  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          {/* You could wrap this in a Card for a contained look, but the original UI is mostly centered on the page. */}
          <div className="text-center">
            {/* Header/Breadcrumbs from the first image */}
            <div className="text-start mb-4" style={{ fontSize: '14px', color: '#6c757d' }}>
              <span className="text-success me-2">Home</span> &gt; <span className="me-2">Pages</span> &gt; <span>My Account</span>
            </div>

            <LockFingerprintIcon />

            <h2 className="mb-3" style={{ color: '#003366' }}>
              **Forgot your password?**
            </h2>
            <p className="mb-4 text-muted">
              Not to worry, we got you! Let's get you a new password. Please enter your email address or your Username.
            </p>

            <Form onSubmit={handleSubmit} className="text-start">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Username or Email *"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  required
                  style={{ height: '50px', fontSize: '16px' }}
                />
              </Form.Group>

              <Row className="mb-4 align-items-center">
                <Col xs={7}>
                  <Form.Group controlId="formBasicSecurityCode">
                    <Form.Control
                      type="text"
                      placeholder="Security code *"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      required
                      style={{ height: '50px', fontSize: '16px' }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={5}>
                  {/* Security Code Display */}
                  <div style={securityCodeStyle}>
                    <span style={digitStyle('#38c172')}>8</span>
                    <span style={digitStyle('#fdb813')}>6</span>
                    <span style={digitStyle('#38c172')}>7</span>
                    <span style={digitStyle('#fdb813')}>5</span>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4 align-items-center">
                <Col xs={7}>
                  <Form.Check
                    type="checkbox"
                    id="terms-policy"
                    label="I agree to terms & Policy."
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="custom-checkbox"
                  />
                </Col>
                <Col xs={5} className="text-end">
                  <a href="#" className="text-decoration-none" style={{ color: '#007bff' }}>
                    Learn more
                  </a>
                </Col>
              </Row>

              <div className="d-grid gap-2">
                <Button
                  variant="dark" // Using 'dark' to get the dark blue/black background
                  type="submit"
                  style={{ backgroundColor: '#2d3e50', borderColor: '#2d3e50', padding: '10px 0', fontSize: '18px' }}
                >
                  **Reset password**
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPasswordUI;