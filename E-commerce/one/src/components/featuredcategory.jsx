import React, { useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, ArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

// --- Import Local Images ---
// (Assuming the component is in src/components and images are in src/images)
import cakeAndMilkImg from '../images/cakeandmilk.png';
import organicKiwiImg from '../images/organickiwi.png';
import peachImg from '../images/peach.png';
import redAppleImg from '../images/redapple.png';
import snackImg from '../images/snack.png';
import vegetablesImg from '../images/veggi.png'; // Correctly imported as 'vegetablesImg'
import strawberryImg from '../images/strawberry.png'; // Correctly imported as 'strawberryImg'
import blackPlumImg from '../images/blackplum.png';
import custardAppleImg from '../images/custardapple.png';
// Placeholders for categories not found in your file list
import coffeeTeaImg from '../images/cor2.jpg'; 
import headphoneImg from '../images/cor1.jpg'; 


// --- Product Data with Image Mapping (for Featured Categories) ---
const categories = [
    { name: "Cake & Milk", items: 26, image: cakeAndMilkImg },
    { name: "Organic Kiwi", items: 28, image: organicKiwiImg },
    { name: "Peach", items: 14, image: peachImg },
    { name: "Red Apple", items: 54, image: redAppleImg },
    { name: "Snack", items: 56, image: snackImg },
    { name: "Vegetables", items: 72, image: vegetablesImg },
    { name: "Strawberry", items: 36, image: strawberryImg },
    { name: "Black plum", items: 123, image: blackPlumImg },
    { name: "Custard apple", items: 34, image: custardAppleImg },
    { name: "Coffee & Tea", items: 89, image: coffeeTeaImg }, 
    { name: "Headphone", items: 87, image: headphoneImg }, 
];

// --- Banner Data (for the new section) ---
const banners = [
    {
        title: "Everyday Fresh & Clean with Our Products",
        image: vegetablesImg, // FIX: Using existing variable 'vegetablesImg'
        alt: "Fresh Onions",
        bgColor: '#f0e9d8', 
        link: "/shop/fresh-clean"
    },
    {
        title: "Make your Breakfast Healthy and Easy",
        image: strawberryImg, // FIX: Using existing variable 'strawberryImg'
        alt: "Strawberry Juice",
        bgColor: '#fbf0f4', 
        link: "/shop/healthy-breakfast"
    },
    {
        title: "The best Organic Products Online",
        image: vegetablesImg, // FIX: Using existing variable 'vegetablesImg' again
        alt: "Vegetable Basket",
        bgColor: '#eff2fa', 
        link: "/shop/organic-products"
    },
];

// --- Custom CSS for FeaturedCategory Styling ---
const cardStyles = (index) => ({
    // Determine background color based on index (approximating the image colors)
    backgroundColor: (index % 5 === 0) ? '#f4fff4' : 
                     (index % 5 === 1) ? '#ffeef2' : 
                     (index % 5 === 2) ? '#fff7eb' : 
                     (index % 5 === 3) ? '#f6f0ff' : 
                                         '#fffef2',
    borderRadius: '10px',
    padding: '20px 10px',
    textAlign: 'center',
    marginRight: '15px', 
    minWidth: '150px', 
    height: '200px', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    border: 'none',
    position: 'relative', 
});

const featuredStyles = {
    display: 'flex',
    overflowX: 'hidden',
    paddingBottom: '20px',
    scrollBehavior: 'smooth',
};

const navButtonStyles = {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    color: '#000',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const categoryHeaderStyles = {
    display: 'flex',
    gap: '20px',
    fontSize: '1.1rem',
    fontWeight: 500,
    paddingLeft: '15px',
    paddingTop: '5px',
};

const inactiveLinkStyle = {
    color: '#333',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
    '&:hover': {
        color: '#00b894', 
    }
};

const activeStyle = {
    color: '#00b894', // Green color
    fontWeight: 600,
    cursor: 'default',
    textDecoration: 'none',
};

// --- Custom CSS for BannerSection Styling ---
const bannerCardStyle = (bgColor) => ({
    backgroundColor: bgColor,
    borderRadius: '10px',
    height: '300px',
    padding: '40px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
});

const bannerTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 700,
    lineHeight: 1.3,
    maxWidth: '60%',
    zIndex: 2,
    color: '#333',
};

const shopButtonStyle = {
    backgroundColor: '#00b899', // Slightly modified green for better match
    borderColor: '#00b899',
    color: '#fff',
    fontWeight: 500,
    padding: '10px 20px',
    borderRadius: '5px',
    marginTop: '20px',
    textDecoration: 'none',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 2,
    transition: 'background-color 0.2s',
    cursor: 'pointer',
};

const imageOverlayStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '100%', 
    width: 'auto',
    maxWidth: '50%', 
    objectFit: 'contain', 
    pointerEvents: 'none', 
    zIndex: 1,
};

// --- 1. Featured Category Component ---
const FeaturedCategory = () => {
    const scrollContainerRef = useRef(null);
    const scrollAmount = 350;

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            if (direction === 'left') {
                scrollContainerRef.current.scrollLeft -= scrollAmount;
            } else {
                scrollContainerRef.current.scrollLeft += scrollAmount;
            }
        }
    };

    const navCategories = ['Cake & Milk', 'Coffees & Teas', 'Pet Foods', 'Vegetables'];

    return (
        <Container className="my-5">
            <Row className="align-items-center mb-4">
                <Col>
                    <h2 style={{ fontWeight: 700 }}>Featured Categories</h2>
                    <div style={categoryHeaderStyles}>
                        {navCategories.map((cat, index) => {
                            const isActive = cat === 'Pet Foods'; 
                            const toPath = `/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`;

                            if (isActive) {
                                return (
                                    <span key={index} style={activeStyle}>
                                        {cat}
                                    </span>
                                );
                            } else {
                                return (
                                    <Link 
                                        key={index} 
                                        to={toPath}
                                        style={inactiveLinkStyle}
                                    >
                                        {cat}
                                    </Link>
                                );
                            }
                        })}
                    </div>
                </Col>
                
                {/* Navigation Buttons */}
                <Col xs="auto" className="d-flex gap-2">
                    <Button 
                        variant="light" 
                        onClick={() => scroll('left')} 
                        style={navButtonStyles}
                    >
                        <ChevronLeft size={20} />
                    </Button>
                    <Button 
                        variant="light" 
                        onClick={() => scroll('right')} 
                        style={navButtonStyles}
                    >
                        <ChevronRight size={20} />
                    </Button>
                </Col>
            </Row>

            {/* Scrollable Card Container */}
            <div ref={scrollContainerRef} style={featuredStyles}>
                {categories.map((category, index) => (
                    // Card structure
                    <div key={index} style={cardStyles(index)}>
                        {/* IMAGE RENDERING */}
                        <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '100px' }}>
                            <img 
                                src={category.image} 
                                alt={category.name} 
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                            />
                        </div>

                        {/* Text content stays at the bottom */}
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333' }}>{category.name}</h4>
                        <p style={{ fontSize: '0.9rem', color: '#777', margin: 0 }}>{category.items} items</p>
                    </div>
                ))}
            </div>
        </Container>
    );
}

// --- 2. Banner Section Component ---
const BannerSection = () => (
    <Container className="mb-5">
        <Row>
            {banners.map((banner, index) => (
                <Col lg={4} key={index} className="mb-4 mb-lg-0">
                    <Card style={bannerCardStyle(banner.bgColor)}>
                        <h3 style={bannerTitleStyle}>{banner.title}</h3>
                        
                        {/* Link component for Shop Now button */}
                        <Link to={banner.link} style={shopButtonStyle}>
                            Shop Now <ArrowRight size={18} />
                        </Link>
                        
                        <img 
                            src={banner.image} 
                            alt={banner.alt} 
                            style={{ 
                                ...imageOverlayStyle,
                                // Adjust specific images for better visual match if needed
                                right: index === 0 ? '10px' : index === 1 ? '-40px' : '0px', 
                                maxWidth: index === 0 ? '55%' : index === 1 ? '70%' : '55%',
                                height: index === 1 ? '85%' : '100%',
                            }}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
);


// --- Combined Component (Order Swapped) ---
const HomepageSections = () => (
    <>
        <FeaturedCategory /> {/* Now rendered first (above) */}
        <BannerSection />    {/* Now rendered second (below) */}
    </>
);

export default HomepageSections;