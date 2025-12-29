import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import loginImage from "../images/login.png"; 

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const loginData = {
      usernameOrEmail: usernameOrEmail,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // --- JWT LOGIC START ---
        
        // 1. Save the token to the browser's storage
        localStorage.setItem('token', data.token); 
        
        // 2. Save user info if you need it for the profile header
        localStorage.setItem('user', JSON.stringify(data.user));

        // --- JWT LOGIC END ---

        setSuccess(true);
        setUsernameOrEmail('');
        setPassword('');

        // Redirect after a short delay so the user sees the success message
        setTimeout(() => {
            window.location.href = "/dashboard"; // Change this to your home or profile route
        }, 1500);

      } else {
        setError(data.message || 'An unknown error occurred during login.');
      }
    } catch (err) {
      setError('Could not connect to the server. Check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Card className="shadow-lg p-0" style={{ maxWidth: '900px', width: '100%', borderRadius: '15px' }}>
        <Row className="g-0">
          <Col md={6}>
            <img
              src={loginImage}
              alt="Login Illustration"
              className="img-fluid h-100 w-100"
              style={{ objectFit: 'cover', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}
            />
          </Col>
          
          <Col md={6} className="p-5">
            <h2 className="mb-1 fw-bold">Login</h2>
            <p className="text-muted mb-4">
              Don't have an account? <a href="/register" className="text-decoration-none" style={{ color: '#3cb371' }}>Create here</a>
            </p>

            {success && <Alert variant="success">Login successful! Redirecting...</Alert>}
            {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control 
                  type="text" 
                  placeholder="Username or Email *" 
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control 
                  type="password" 
                  placeholder="Your password *" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Row className="mb-4 align-items-center">
                <Col xs={6}>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                </Col>
                <Col xs={6} className="text-end">
                  <a href="#forgot" className="small text-muted text-decoration-none">Forgot password?</a>
                </Col>
              </Row>

              <Button 
                variant="dark" 
                type="submit" 
                className="w-100"
                style={{ backgroundColor: '#212529', borderColor: '#212529', padding: '10px 0' }}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Login;