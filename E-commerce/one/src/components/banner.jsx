import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// Assuming your images are named and imported like this:
import freshProductsImage from "../images/blackplum.png";
import organicProductsImage from "../images/custardapple.png";

const BannerComponent = () => {
    // Define the exact background colors and a smaller height
    const freshBannerStyle = {
        backgroundColor: "#e8f5e9", // Light green background
        minHeight: "183px", // Updated height
        display: "flex", 
        alignItems: "center",
    };

    const organicBannerStyle = {
        backgroundColor: "#f7f5e3", // Light beige/yellowish background
        minHeight: "183px", // Updated height
        display: "flex",
        alignItems: "center",
    };
    
    // Custom style for text to match the dark color in the image
    const textStyle = {
        color: '#343a40', // Dark text color
        fontWeight: '600', 
    };

    return (
        <Container className="my-4">
            <Row className="g-4">
                {/* === Top Banner: Everyday Fresh & Clean === */}
                <Col xs={12}>
                    <Card className="p-4 border-0" style={freshBannerStyle}>
                        {/* The Row manages the text/image layout */}
                        <Row className="align-items-center"> 
                            
                            {/* Left Column: Text Content (md={6} ensures wrapping on small screens) */}
                            <Col md={6}>
                                {/* Using h2 instead of display-6 for smaller font size */}
                                <h2 style={textStyle} className="fs-4">
                                    Everyday **Fresh & Clean** with Our Products
                                </h2>
                                <Button variant="success" className="mt-2 py-2 px-4 btn-sm"> 
                                    Shop Now <span className="ms-2">&rarr;</span>
                                </Button>
                            </Col>

                            {/* Right Column: Image Content */}
                            <Col md={6} className="text-end">
                                <img
                                    src={freshProductsImage}
                                    alt="A basket full of fresh vegetables and fruits"
                                    className="img-fluid"
                                    // Updated max-height to 152px
                                    style={{ maxHeight: '152px', width: 'auto', marginBottom: '-25px' }} 
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* === Bottom Banner: The best Organic Products === */}
                <Col xs={12}>
                    <Card className="p-4 border-0" style={organicBannerStyle}>
                        <Row className="align-items-center">

                            {/* Left Column: Image Content */}
                            <Col md={6}>
                                <img
                                    src={organicProductsImage}
                                    alt="A glass of orange juice with an orange on the side"
                                    className="img-fluid"
                                    // Updated max-height to 152px
                                    style={{ maxHeight: '152px', width: 'auto', marginBottom: '-25px' }} 
                                />
                            </Col>

                            {/* Right Column: Text Content */}
                            <Col md={6} className="text-start">
                                <h2 style={textStyle} className="fs-4">
                                    The best **Organic Products** Online
                                </h2>
                                <Button variant="success" className="mt-2 py-2 px-4 btn-sm"> 
                                    Shop Now <span className="ms-2">&rarr;</span>
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BannerComponent;