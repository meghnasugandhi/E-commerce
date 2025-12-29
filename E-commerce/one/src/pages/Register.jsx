import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Nav, Alert } from 'react-bootstrap';
import { FaFacebookF } from 'react-icons/fa'; 
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const Register = () => {
    const navigate = useNavigate(); // 2. Initialize navigate
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        securityCode: '',
        userType: 'vendor',
        agreedToTerms: false,
    });
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null); 
    const actualSecurityCode = '8675';

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null); 
        
        if (formData.securityCode !== actualSecurityCode) {
            setMessage({ type: 'danger', text: 'Security code is incorrect.' });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'danger', text: 'Passwords do not match.' });
            return;
        }

        setLoading(true); 

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // --- JWT LOGIC START ---
                
                // 3. Save the token and user data to localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // --- JWT LOGIC END ---

                setMessage({ type: 'success', text: 'Account created! Logging you in...' });

                // 4. Redirect to home or dashboard after 2 seconds
                setTimeout(() => {
                    navigate('/'); // Or navigate('/dashboard')
                }, 2000);

            } else {
                setMessage({ type: 'danger', text: data.message || 'Registration failed.' });
            }
        } catch (error) {
            console.error('Network Error:', error);
            setMessage({ type: 'danger', text: 'Could not connect to server.' });
        } finally {
            setLoading(false); 
        }
    };
    
    const renderSecurityCodeBox = () => (
        <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#e6ffe6', padding: '5px 10px', borderRadius: '5px',
            fontSize: '18px', fontWeight: 'bold', letterSpacing: '5px', userSelect: 'none', minWidth: '90px'
        }}>
            <span style={{ color: '#6ab04c' }}>{actualSecurityCode[0]}</span>
            <span style={{ color: '#eb3b5a' }}>{actualSecurityCode[1]}</span>
            <span style={{ color: '#20bf6b' }}>{actualSecurityCode[2]}</span>
            <span style={{ color: '#f7d794' }}>{actualSecurityCode[3]}</span>
        </div>
    );

    return (
        <Container className="p-4">
            <Nav className="mb-4 text-muted small">
                <Nav.Item><Nav.Link as={Link} to="/" className="p-0 text-success">Home</Nav.Link></Nav.Item>
                <span className="mx-2">&gt;</span>
                <Nav.Item><Nav.Link as={Link} to="/pages" className="p-0 text-muted">Pages</Nav.Link></Nav.Item>
                <span className="mx-2">&gt;</span>
                <Nav.Item><span className="p-0 text-muted">My Account</span></Nav.Item>
            </Nav>

            <Row className="justify-content-center">
                <Col md={10} lg={8} xl={6}>
                    <h2 className="mb-3" style={{ color: '#2a5857' }}>Create an Account</h2>
                    <p className="mb-4">
                        Already have an account? <Link to="/login" className="text-success" style={{ textDecoration: 'none' }}>Login</Link>
                    </p>

                    {message && (
                        <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
                            {message.text}
                        </Alert>
                    )}

                    <Row>
                        <Col md={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Username" name="username" value={formData.username} onChange={handleChange} required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="password" placeholder="Confirm password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex align-items-center">
                                    <Form.Control type="text" placeholder="Security code *" name="securityCode" value={formData.securityCode} onChange={handleChange} required style={{ width: '60%' }} className="me-3"/>
                                    {renderSecurityCodeBox()}
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Check type="radio" id="radio-customer" label="I am a customer" name="userType" value="customer" checked={formData.userType === 'customer'} onChange={handleChange} className="mb-2"/>
                                    <Form.Check type="radio" id="radio-vendor" label="I am a vendor" name="userType" value="vendor" checked={formData.userType === 'vendor'} onChange={handleChange}/>
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex align-items-center">
                                    <Form.Check type="checkbox" id="terms-check" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} 
                                        label={<>I agree to terms & Policy.{' '}<Link to="/terms" className="text-success" style={{ textDecoration: 'none' }}>Learn more</Link></>}/>
                                </Form.Group>
                                <Button variant="success" type="submit" className="w-100 mt-3" disabled={!formData.agreedToTerms || loading}>
                                    {loading ? 'Creating Account...' : 'Create an Account'}
                                </Button>
                            </Form>
                        </Col>

                        <Col md={6} className="d-flex align-items-start justify-content-center">
                            <div className="w-100 ms-md-4 mt-4 mt-md-0">
                                <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center mb-3" style={{ backgroundColor: '#1877f2', borderColor: '#1877f2', height: '50px' }}>
                                    <FaFacebookF size={20} className="me-2" /> Continue with Facebook
                                </Button>
                                <Button variant="light" className="w-100 d-flex align-items-center justify-content-center mb-3 border" style={{ height: '50px' }}>
                                    <FcGoogle size={20} className="me-2" /> Continue with Google
                                </Button>
                                <Button variant="dark" className="w-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'black', borderColor: 'black', height: '50px' }}>
                                    <BsApple size={20} className="me-2" /> Continue with Apple
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