import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { StarFill, StarHalf, PlusCircle, CartPlus } from 'react-bootstrap-icons';

// --- Image Imports ---
import cornImage from '../images/corn.jpg';
import orangeImage from '../images/dryginger.jpg';
import peaImage from '../images/veggi.png';
import grapefruitImage from '../images/yogurt.jpg';

// Timer Box Component
const TimerBox = ({ value, label }) => (
    <div
        className="d-flex flex-column align-items-center me-2 p-2 rounded text-success"
        style={{ backgroundColor: 'white', minWidth: '40px' }}
    >
        <strong style={{ fontSize: '1.2rem' }}>{value}</strong>
        <small style={{ fontSize: '0.65rem' }}>{label}</small>
    </div>
);

// Deal Card Component
const DealCard = ({ title, vendor, price, oldPrice, rating, days, hours, mins, secs, image }) => {
    const renderRating = (r) => {
        const stars = [];
        const floorRating = Math.floor(r);
        const hasHalfStar = r % 1 !== 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= floorRating) {
                stars.push(<StarFill key={i} className="text-warning" style={{ fontSize: '0.7rem' }} />);
            } else if (i === floorRating + 1 && hasHalfStar) {
                stars.push(<StarHalf key={i} className="text-warning" style={{ fontSize: '0.7rem' }} />);
            }
        }

        return (
            <div className="d-flex align-items-center">
                {stars}
                <small className="ms-2 text-muted">({r.toFixed(1)})</small>
            </div>
        );
    };

    return (
        <Card className="h-100 border-0 shadow-sm rounded-3 overflow-hidden">
            <div style={{ position: 'relative' }}>
                <Card.Img
                    variant="top"
                    src={image}
                    style={{ height: '200px', objectFit: 'cover' }}
                />

                <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3"
                    style={{ background: 'rgba(0,0,0,0.1)' }}
                >
                    <TimerBox value={days} label="Days" />
                    <TimerBox value={hours} label="Hours" />
                    <TimerBox value={mins} label="Mins" />
                    <TimerBox value={secs} label="Sec" />
                </div>
            </div>

            <Card.Body className="d-flex flex-column p-3">
                <Card.Title as="h6" className="mb-2" style={{ minHeight: '40px' }}>
                    {title}
                </Card.Title>

                {renderRating(rating)}

                <Card.Text className="text-muted mb-3 mt-1" style={{ fontSize: '0.85rem' }}>
                    By {vendor}
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                        <strong className="text-success me-2" style={{ fontSize: '1.1rem' }}>
                            ${price}
                        </strong>
                        <span className="text-muted text-decoration-line-through" style={{ fontSize: '0.85rem' }}>
                            ${oldPrice}
                        </span>
                    </div>

                    <Button
                        variant="outline-success"
                        className="d-flex align-items-center py-1 px-2 border-0"
                        style={{ fontSize: '0.9rem' }}
                    >
                        <CartPlus size={18} className="me-1" />
                        Add
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

// Main Deals Component
const DealsOfTheDay = () => {
    const deals = [
        {
            title: 'Seeds of Change Organic Quinoa, Brown, & Red Rice',
            vendor: 'NestFood',
            price: '32.85',
            oldPrice: '33.8',
            rating: 4.0,
            days: '00',
            hours: '00',
            mins: '00',
            secs: '00',
            image: cornImage,
        },
        {
            title: 'Perdue Simply Smart Organics Gluten Free',
            vendor: 'Old El Paso',
            price: '24.85',
            oldPrice: '26.8',
            rating: 4.0,
            days: '157',
            hours: '07',
            mins: '05',
            secs: '41',
            image: orangeImage,
        },
        {
            title: 'Signature Wood-Fired Mushroom and Caramelized',
            vendor: 'Progresso',
            price: '12.85',
            oldPrice: '13.8',
            rating: 3.0,
            days: '491',
            hours: '07',
            mins: '05',
            secs: '41',
            image: peaImage,
        },
        {
            title: 'Simply Lemonade with Raspberry Juice',
            vendor: 'Yoplait',
            price: '15.85',
            oldPrice: '16.8',
            rating: 3.0,
            days: '00',
            hours: '00',
            mins: '00',
            secs: '00',
            image: grapefruitImage,
        },
    ];

    return (
        <Container className="my-5">
            <Row className="mb-4 d-flex align-items-center">
                <Col>
                    <h2 className="fw-bold mb-0">Deals Of The Day</h2>
                </Col>
                <Col className="text-end">
                    <a href="#all-deals" className="text-success text-decoration-none fw-bold">
                        All Deals <i className="bi bi-arrow-right"></i>
                    </a>
                </Col>
            </Row>

            <Row xs={1} sm={2} lg={4} className="g-4">
                {deals.map((deal, index) => (
                    <Col key={index}>
                        <DealCard {...deal} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DealsOfTheDay;
