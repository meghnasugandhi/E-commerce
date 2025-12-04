import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// 🚨 IMAGE IMPORTS: Assuming S2.jsx is located in a folder like 'src/components', 
// the path to 'src/images' is '../images/'.
import onionImage from '../images/blackplum.png'; // For the first banner
import strawberryImage from '../images/strawberry.png'; // For the second banner
import veggiBasketImage from '../images/veggi.png'; // For the third banner


/**
 * Renders the three-column banner section (Everyday Fresh, Breakfast, Organic Products).
 */
const S2 = () => {

    /**
     * Helper component for the individual banner cards.
     * @param {string} title - The main text title.
     * @param {string} imageSrc - The path/import variable for the image.
     * @param {string} bgColor - The background color of the card.
     * @param {string} btnColor - The color of the button background.
     */
    const BannerCard = ({ title, imageSrc, bgColor, btnColor }) => {
        return (
            <Card 
                className="h-100 p-4 border-0" 
                style={{ 
                    backgroundColor: bgColor, 
                    borderRadius: '10px', 
                    overflow: 'hidden',
                    position: 'relative', // Needed to position the image
                }}
            >
                <Card.Body className="d-flex flex-column justify-content-between p-0">
                    {/* Title Text */}
                    <h3 
                        className="mb-4" 
                        style={{ 
                            fontSize: '1.75rem', // Adjust size for fit
                            fontWeight: '600', 
                            lineHeight: '1.3',
                            color: '#34495e', // Dark text color
                            maxWidth: '70%', // Constraint text width to leave space for image
                            zIndex: 2, // Keep text above the image
                        }}
                    >
                        {title}
                    </h3>
                    
                    {/* Shop Now Button */}
                    <Button 
                        variant="success" // Using a base variant and overriding style
                        style={{ 
                            backgroundColor: btnColor, 
                            borderColor: btnColor, 
                            color: '#fff',
                            fontWeight: '500',
                            padding: '0.5rem 1.5rem',
                            fontSize: '1rem',
                            width: 'fit-content', // Button size fits content
                            zIndex: 2,
                        }}
                    >
                        Shop Now →
                    </Button>
                </Card.Body>
                
                {/* Background Image - Positioned Absolutely/Relatively */}
                <img 
                    src={imageSrc} 
                    alt="Product" 
                    className="img-fluid" 
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        maxWidth: '50%', // Image takes up to 50% of card width
                        height: 'auto',
                        objectFit: 'cover',
                        zIndex: 1, // Image beneath text/button
                    }}
                />
            </Card>
        );
    };

    return (
        <Container fluid className="px-0">
            <Row className="g-3"> {/* g-3 adds spacing between columns */}
                
                {/* Banner 1: Everyday Fresh & Clean (Beige Background) */}
                <Col lg={4} md={6}>
                    <BannerCard 
                        title="Everyday Fresh & Clean with Our Products"
                        imageSrc={onionImage}
                        bgColor="#f3f0e7" // Light beige
                        btnColor="#5cb874" // Green button
                    />
                </Col>

                {/* Banner 2: Make your Breakfast Healthy and Easy (Pink Background) */}
                <Col lg={4} md={6}>
                    <BannerCard 
                        title="Make your Breakfast Healthy and Easy"
                        imageSrc={strawberryImage}
                        bgColor="#f7eef0" // Light pink/lavender
                        btnColor="#5cb874" // Green button
                    />
                </Col>

                {/* Banner 3: The best Organic Products Online (Light Blue/Gray Background) */}
                <Col lg={4} md={12}>
                    <BannerCard 
                        title="The best Organic Products Online"
                        imageSrc={veggiBasketImage}
                        bgColor="#eef3f7" // Light blue/gray
                        btnColor="#5cb874" // Green button
                    />
                </Col>

            </Row>
        </Container>
    );
};

export default S2; 