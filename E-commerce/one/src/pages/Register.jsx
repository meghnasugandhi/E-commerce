import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';

// Note: In a real app using React Router DOM, you would import:
// import { Link } from 'react-router-dom'; 

const Register = () => {
  // ... (State and handler functions remain the same) ...
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityCode: '',
    userType: 'vendor', 
    agreedToTerms: false,
  });

  const actualSecurityCode = '8675';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.securityCode !== actualSecurityCode) {
      alert('Security code is incorrect.');
      return;
    }
    console.log('Form Submitted', formData);
  };
  
  const renderSecurityCodeBox = () => (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6ffe6', 
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '18px',
        fontWeight: 'bold',
        letterSpacing: '5px',
        userSelect: 'none', 
        minWidth: '90px'
      }}
    >
      <span style={{ color: '#6ab04c' }}>{actualSecurityCode[0]}</span>
      <span style={{ color: '#eb3b5a' }}>{actualSecurityCode[1]}</span>
      <span style={{ color: '#20bf6b' }}>{actualSecurityCode[2]}</span>
      <span style={{ color: '#f7d794' }}>{actualSecurityCode[3]}</span>
    </div>
  );
  // ... (End of helper functions) ...

  return (
    <Container className="p-4">
      
      {/* 🏡 --- UPDATED BREADCRUMB NAVIGATION --- */}
      <Nav className="mb-4 text-muted small">
        <Nav.Item>
          {/* Action: Link to Home page (path: /) */}
          <Nav.Link 
            href="/" // Use the actual route path
            className="p-0 text-success"
            // If using React Router DOM, this would be: as={Link} to="/"
          >
            Home
          </Nav.Link>
        </Nav.Item>
        
        <span className="mx-2">&gt;</span>
        
        <Nav.Item>
          {/* Action: Link to Pages index/dashboard (path: /pages) */}
          <Nav.Link 
            href="/pages" // Use the actual route path
            className="p-0 text-muted"
            // If using React Router DOM, this would be: as={Link} to="/pages"
          >
            Pages
          </Nav.Link>
        </Nav.Item>
        
        <span className="mx-2">&gt;</span>
        
        <Nav.Item>
          {/* Current Page: My Account (Registration) */}
          {/* This link is usually not clickable, but uses the same styling */}
          <span className="p-0 text-muted"> 
            My Account
          </span>
        </Nav.Item>
      </Nav>

      {/* --- Main Content Row --- */}
      <Row className="justify-content-center">
        <Col md={10} lg={8} xl={6}>
          <h2 className="mb-3" style={{ color: '#2a5857' }}>
            Create an Account
          </h2>
          <p className="mb-4">
            Already have an account?{' '}
            {/* Action: Link to Login page (path: /login) */}
            <a href="/login" className="text-success" style={{ textDecoration: 'none' }}> 
              Login
            </a>
          </p>

          <Row>
            {/* --- Left Column: Traditional Form --- */}
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3"><Form.Control type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} required/></Form.Group>
                <Form.Group className="mb-3"><Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required/></Form.Group>
                <Form.Group className="mb-3"><Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required/></Form.Group>
                <Form.Group className="mb-3"><Form.Control type="password" placeholder="Confirm password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/></Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <Form.Control type="text" placeholder="Security code *" name="securityCode" value={formData.securityCode} onChange={handleChange} required style={{ width: '60%' }} className="me-3"/>
                  {renderSecurityCodeBox()}
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Check type="radio" id="radio-customer" label="I am a customer" name="userType" value="customer" checked={formData.userType === 'customer'} onChange={handleChange} className="mb-2"/>
                  <Form.Check type="radio" id="radio-vendor" label="I am a vendor" name="userType" value="vendor" checked={formData.userType === 'vendor'} onChange={handleChange} style={{ color: formData.userType === 'vendor' ? '#2a5857' : undefined }}/>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <Form.Check type="checkbox" id="terms-check" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} 
                    label={<>I agree to terms & Policy.{' '}<a href="/terms" className="text-success" style={{ textDecoration: 'none' }}>Learn more</a></>}/> {/* Updated 'Learn more' link */}
                </Form.Group>
                <Button variant="success" type="submit" className="w-100 mt-3" disabled={!formData.agreedToTerms}>
                    Create an Account
                </Button>
              </Form>
            </Col>

            {/* --- Right Column: Social Login Buttons (Same as before) --- */}
            <Col md={6} className="d-flex align-items-start justify-content-center">
              <div className="w-100 ms-md-4 mt-4 mt-md-0">
                <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center mb-3" style={{ backgroundColor: '#1877f2', borderColor: '#1877f2', height: '50px' }}>
                  <FaFacebookF size={20} className="me-2" />
                  Continue with Facebook
                </Button>
                <Button variant="light" className="w-100 d-flex align-items-center justify-content-center mb-3 border" style={{ height: '50px' }}>
                  <FcGoogle size={20} className="me-2" />
                  Continue with Google
                </Button>
                <Button variant="dark" className="w-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'black', borderColor: 'black', height: '50px' }}>
                  <BsApple size={20} className="me-2" />
                  Continue with Apple
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;