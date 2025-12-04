import React from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
// You will need to install this package for the icons: npm install react-bootstrap-icons
import { Envelope, HandThumbsUp, Truck, Gift, CardText, ArrowRepeat, GeoAlt, Telephone, Clock } from 'react-bootstrap-icons';

// Import all necessary assets
import DeliveryPersonImage from '../images/footer.png'; 
import LogoImage from '../images/logo.svg'; // 🐛 NEW: Importing the logo
// Assuming app and payment images are available in the public folder or similar
// For this component, we'll use simple image tags for app store and payment icons

const Footer = () => {
  // Define main styles as objects for clarity
  const heroSectionStyle = { 
    backgroundColor: '#e9f5e9', // Light green background
    paddingTop: '5rem', 
    paddingBottom: '5rem' 
  };

  const headingStyle = {
    color: '#2d6a4f', // Dark green color
    fontSize: '3rem',
    fontWeight: 700,
    lineHeight: 1.2
  };

  const subscribeButtonStyle = {
    backgroundColor: '#40916c', // Green button color
    border: 'none'
  };

  const vendorDropdownStyle = {
    position: 'absolute',
    top: '100px', // Adjust positioning as needed
    right: '100px', // Adjust positioning as needed
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    zIndex: 10 // Ensure it sits on top
  };
  
  const iconContainerStyle = {
    backgroundColor: '#e9f5e9', // Light green background for the feature icons
    padding: '10px',
    borderRadius: '8px'
  };

  const iconColor = '#40916c'; // Color for all feature icons
  
  // New Footer Styles
  const footerLinkStyle = { 
      color: '#6c757d', // Muted text color for links
      padding: '0.2rem 0',
      textDecoration: 'none'
  };
  
  const footerTitleStyle = {
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#212529'
  };


  return (
    <>
      {/* --- HERO SECTION --- */}
      <div className="hero-section" style={heroSectionStyle}>
        <Container>
          <Row className="align-items-center">
            {/* Left Column: Text and Email Input */}
            <Col lg={6} className="text-start">
              <h1 style={headingStyle}>
                Stay home & get your daily needs from our shop
              </h1>
              <p className="lead text-muted mb-4">
                Start Your Daily Shopping with **Nest Mart**
              </p>
              
              {/* Email Subscription Form */}
              <div className="d-flex w-75">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <Envelope color={iconColor} size={20} />
                  </span>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="form-control py-3 border-start-0"
                  />
                  <Button variant="success" className="px-4" style={subscribeButtonStyle}>
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Vendors Dropdown (Simulated based on the screenshot) */}
              <div style={vendorDropdownStyle}>
                <Nav className="flex-column">
                  <Nav.Link href="#" className="text-dark py-1">Vendors List</Nav.Link>
                  <Nav.Link href="#" className="text-dark py-1">Vendor Details 01</Nav.Link>
                  <Nav.Link href="#" className="text-dark py-1">Vendor Details 02</Nav.Link>
                  <Nav.Link href="#" className="text-dark py-1">Vendor Dashboard</Nav.Link>
                  <Nav.Link href="#" className="text-dark py-1">Vendor Guide</Nav.Link>
                </Nav>
              </div>
            </Col>

            {/* Right Column: Image of Delivery Person and Groceries */}
            <Col lg={6} className="d-none d-lg-block">
              <div className="text-center">
                <img
                  src={DeliveryPersonImage}
                  alt="Delivery Person holding a box of fresh groceries"
                  className="img-fluid"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* --- FEATURES ROW --- */}
      <Container className="my-5">
        <Row className="g-4 text-center justify-content-center">
          {/* ... Feature Cols (omitted for brevity, assume they are here) ... */}
          {/* Feature 1: Best prices & offers */}
          <Col md={12} lg={2} className="p-3 border-end">
            <div className="d-flex flex-column align-items-center">
              <div className="mb-2" style={iconContainerStyle}><Gift color={iconColor} size={24} /></div>
              <h6 className="fw-bold mb-0">Best prices & offers</h6>
              <small className="text-muted">Orders $50 or more</small>
            </div>
          </Col>
          {/* Feature 2: Free delivery */}
          <Col md={12} lg={3} className="p-3 border-end">
             <div className="d-flex flex-column align-items-center">
              <div className="mb-2" style={iconContainerStyle}><Truck color={iconColor} size={24} /></div>
              <h6 className="fw-bold mb-0">Free delivery</h6>
              <small className="text-muted">24/7 amazing services</small>
            </div>
          </Col>
          {/* Feature 3: Great daily deal */}
          <Col md={12} lg={3} className="p-3 border-end">
             <div className="d-flex flex-column align-items-center">
              <div className="mb-2" style={iconContainerStyle}><CardText color={iconColor} size={24} /></div>
              <h6 className="fw-bold mb-0">Great daily deal</h6>
              <small className="text-muted">When you sign up</small>
            </div>
          </Col>
          {/* Feature 4: Wide assortment */}
          <Col md={12} lg={2} className="p-3 border-end">
             <div className="d-flex flex-column align-items-center">
              <div className="mb-2" style={iconContainerStyle}><HandThumbsUp color={iconColor} size={24} /></div>
              <h6 className="fw-bold mb-0">Wide assortment</h6>
              <small className="text-muted">Mega Discounts</small>
            </div>
          </Col>
          {/* Feature 5: Easy returns */}
          <Col md={12} lg={2} className="p-3">
             <div className="d-flex flex-column align-items-center">
              <div className="mb-2" style={iconContainerStyle}><ArrowRepeat color={iconColor} size={24} /></div>
              <h6 className="fw-bold mb-0">Easy returns</h6>
              <small className="text-muted">Within 30 days</small>
            </div>
          </Col>
        </Row>
      </Container>
      
      <hr />

      {/* --- MAIN FOOTER SECTION (New Content) --- */}
      <footer className="pt-5 pb-3">
        <Container>
          <Row className="g-4">
            
            {/* Column 1: Logo & Contact Info */}
            <Col lg={3} md={6}>
              <div className="d-flex align-items-center mb-3">
                <img src={LogoImage} alt="Nest Mart Logo" style={{ width: '40px', marginRight: '10px' }} />
                <h4 className="mb-0 fw-bold" style={{ color: '#2d6a4f' }}>Nest Mart & Grocery</h4>
              </div>
              <p className="text-muted">Awesome grocery website template</p>
              
              {/* Contact Details */}
              <div className="d-flex align-items-start mb-2">
                <GeoAlt size={16} className="me-2 mt-1" style={{ color: iconColor }} />
                <p className="mb-0 text-muted">
                  <strong className="text-dark">Address:</strong> 5171 W Campbell Ave undefined Kent, Utah 53127 United States
                </p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Telephone size={16} className="me-2" style={{ color: iconColor }} />
                <p className="mb-0 text-muted">
                  <strong className="text-dark">Call Us:</strong> (+91) - 540-025-124553
                </p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Envelope size={16} className="me-2" style={{ color: iconColor }} />
                <p className="mb-0 text-muted">
                  <strong className="text-dark">Email:</strong> sale@nest.com
                </p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Clock size={16} className="me-2" style={{ color: iconColor }} />
                <p className="mb-0 text-muted">
                  <strong className="text-dark">Hours:</strong> 10:00 - 18:00, Mon - Sat
                </p>
              </div>
              
            </Col>

            {/* Column 2: Company Links */}
            <Col lg={2} md={6}>
              <h5 style={footerTitleStyle}>Company</h5>
              <Nav className="flex-column">
                <Nav.Link href="#" style={footerLinkStyle}>About Us</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Delivery Information</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Privacy Policy</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Terms & Conditions</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Contact Us</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Support Center</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Careers</Nav.Link>
              </Nav>
            </Col>

            {/* Column 3: Account Links */}
            <Col lg={2} md={6}>
              <h5 style={footerTitleStyle}>Account</h5>
              <Nav className="flex-column">
                <Nav.Link href="#" style={footerLinkStyle}>Sign In</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>View Cart</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>My Wishlist</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Track My Order</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Help Ticket</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Shipping Details</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Compare products</Nav.Link>
              </Nav>
            </Col>

            {/* Column 4: Corporate Links */}
            <Col lg={2} md={6}>
              <h5 style={footerTitleStyle}>Corporate</h5>
              <Nav className="flex-column">
                <Nav.Link href="#" style={footerLinkStyle}>Become a Vendor</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Affiliate Program</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Farm Business</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Farm Careers</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Our Suppliers</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Accessibility</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Promotions</Nav.Link>
              </Nav>
            </Col>

            {/* Column 5: Popular Category Links */}
            <Col lg={3} md={6}>
              <h5 style={footerTitleStyle}>Popular</h5>
              <Nav className="flex-column">
                <Nav.Link href="#" style={footerLinkStyle}>Milk & Flavoured Milk</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Butter and Margarine</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Eggs Substitutes</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Marmalades</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Sour Cream and Dips</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Tea & Kombucha</Nav.Link>
                <Nav.Link href="#" style={footerLinkStyle}>Cheese</Nav.Link>
              </Nav>
            </Col>

          </Row>
          
          <Row className="mt-5">
            {/* Install App Section */}
            <Col md={6}>
              <h6 className="fw-bold mb-3">Install App</h6>
              <p className="text-muted mb-3">From App Store or Google Play</p>
              <div className="d-flex">
                {/* Placeholder for App Store and Google Play buttons */}
                {/* Replace src with actual image paths if available in your public folder */}
                <img 
                  src="/images/app-store.png" // Placeholder path
                  alt="Download on the App Store" 
                  style={{ width: '120px', height: '40px', marginRight: '10px' }} 
                  className="img-fluid border rounded" 
                />
                <img 
                  src="/images/google-play.png" // Placeholder path
                  alt="Get it on Google Play" 
                  style={{ width: '120px', height: '40px' }} 
                  className="img-fluid border rounded" 
                />
              </div>
            </Col>
            
            {/* Secured Payment Gateways */}
            <Col md={6} className="text-md-end mt-4 mt-md-0">
              <h6 className="fw-bold mb-3">Secured Payment Gateways</h6>
              {/* Placeholder for payment logos (Visa, Mastercard, etc.) */}
              <img 
                src="/images/payment-gateways.png" // Placeholder path for the payment row image
                alt="Secured Payment Gateways: Visa, Mastercard, Maestro, American Express" 
                className="img-fluid" 
                style={{ maxHeight: '30px' }} 
              />
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;