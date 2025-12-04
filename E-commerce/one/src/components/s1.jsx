import React from "react";
import { Card, Container, Row, Col } from 'react-bootstrap';

// 🚨 IMAGE IMPORT: Adjust the path if your S1.jsx is not in the same directory as Newproducts.jsx,
// or if your images folder is located differently relative to this component.
import mainJuiceBottle from '../images/main2img1.png'; // Using main2img1.png as the juice bottle

const S1 = () => {
    return (
        // The main card acting as the container for the entire section.
        // It has a light background color and subtle shadow, matching the design.
        <Card 
            className="mb-4 mt-4 border-0" 
            style={{ 
                backgroundColor: '#f8f5ed', // Light beige background color from the image
                borderRadius: '15px',      // Slightly rounded corners
                overflow: 'hidden',        // Ensures image doesn't spill out
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)' // Subtle shadow
            }}
        >
            <Card.Body className="p-0"> {/* Remove default Card.Body padding */}
                <Container fluid className="p-0"> {/* Use fluid container for full width */}
                    <Row className="g-0 align-items-center"> {/* g-0 removes gutter, align-items-center for vertical alignment */}
                        
                        {/* Left Column: Text Content */}
                        <Col md={7} className="d-flex justify-content-center align-items-center p-5">
                            <div className="text-start">
                                <p 
                                    className="text-muted mb-2" 
                                    style={{ 
                                        fontSize: '1.2rem', 
                                        fontWeight: '500', 
                                        color: '#7f8c8d' // Custom muted gray
                                    }}
                                >
                                    Oganic
                                </p>
                                <h1 
                                    className="display-4 fw-bold mb-0" 
                                    style={{ 
                                        fontSize: '3.5rem', // Larger font size for impact
                                        lineHeight: '1.1',
                                        color: '#34495e' // Dark text color
                                    }}
                                >
                                    Save <span style={{ color: '#2ecc71' }}>17%</span><br/> 
                                    on <span style={{ color: '#2ecc71' }}>Oganic</span> Juice.
                                </h1>
                            </div>
                        </Col>

                        {/* Right Column: Image Content */}
                        <Col md={5} className="d-flex justify-content-center align-items-end p-0">
                            <img 
                                src={mainJuiceBottle} 
                                alt="Organic Juice Bottle" 
                                className="img-fluid" 
                                style={{ 
                                    maxWidth: '100%', 
                                    height: 'auto', 
                                    // Adjust if needed to align the base of the image to the bottom of the card
                                    // transform: 'translateY(10%)' 
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
};

export default S1;