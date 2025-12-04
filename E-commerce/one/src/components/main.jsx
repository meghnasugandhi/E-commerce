import React from 'react';
import { Carousel, Form, Button } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

// === IMPORTANT: THESE IMPORTS USE YOUR ACTUAL LOCAL IMAGES ===
import cor1 from '../images/cor1.jpg'; 
import cor2 from '../images/cor2.jpg';

const carouselItems = [
  {
    id: 1,
    backgroundImage: cor1, 
    title: 'Fresh Vegetables',
    subtitle: 'Big discount',
    text: 'Save up to 50% off on your first order',
    styles: {
      bgColor: '#e8f5e9',
      textAlignment: 'start', // LEFT ALIGNED
      buttonColor: '#4CAF50', 
    }
  },
  {
    id: 2,
    backgroundImage: cor2, 
    title: "Don't miss amazing",
    subtitle: 'grocery deals',
    text: 'Sign up for the daily newsletter',
    styles: {
      bgColor: '#fff8e1', 
      textAlignment: 'start', // CHANGED TO LEFT ALIGNED
      buttonColor: '#4CAF50',
    }
  },
];

const Cor = () => {
  const commonStyles = {
    fullWidthWrapper: {
      padding: '0 15px', 
      margin: '20px auto',
      maxWidth: '100%', 
      boxSizing: 'border-box',
    },
    slideContent: {
      borderRadius: '15px',
      overflow: 'hidden',
      minHeight: '550px', 
      position: 'relative', 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      display: 'flex', 
      alignItems: 'center', 
      padding: '50px', 
    },
    textOverlayContent: {
      position: 'relative', 
      zIndex: 2, 
      maxWidth: '50%', 
      padding: '20px', 
      marginBottom: '40px', 
    },
    title: {
      fontWeight: 800, 
      lineHeight: 1.1,
      color: '#333', 
      fontSize: '3.5em', 
    },
    subtitle: {
        fontWeight: 800, 
        lineHeight: 1.1,
        color: '#333', 
        fontSize: '3.5em', 
        marginBottom: '1rem',
    },
    text: {
      fontSize: '1.2em',
      color: '#6a6a6a', 
      marginBottom: '2rem'
    },
    emailInput: {
      borderRadius: '25px 0 0 25px', 
      padding: '12px 20px',
      maxWidth: '250px', 
      border: '1px solid #ffffff', 
      boxShadow: '0 0 5px rgba(0,0,0,0.1)',
      height: '50px', 
      outline: 'none',
      fontSize: '1em',
      backgroundColor: 'white', 
    },
    subscribeButton: (color) => ({
      backgroundColor: color,
      borderColor: color,
      borderRadius: '0 25px 25px 0', 
      padding: '10px 25px',
      fontWeight: 600,
      height: '50px',
      border: 'none',
    }),
    emailIcon: {
        position: 'absolute',
        top: '50%',
        left: '15px',
        transform: 'translateY(-50%)',
        color: '#6c757d', 
        zIndex: 2,
    }
  };


  return (
    <>
      <div style={commonStyles.fullWidthWrapper}>
        <Carousel 
          controls={true} 
          interval={5000} 
          className="shadow-lg custom-carousel" 
        > 
          {carouselItems.map((item, index) => (
            <Carousel.Item key={item.id}>
              <div 
                className="d-flex align-items-center carousel-slide" 
                style={{
                  ...commonStyles.slideContent, 
                  backgroundColor: item.styles.bgColor,
                  backgroundImage: `url(${item.backgroundImage})`,
                  // To shift the image slightly to the right to make room for text on the left, 
                  // we can adjust backgroundPosition if needed, but 'center' is usually safer.
                }}
                data-slide-index={index} 
              >
                {/* Content Overlay */}
                <div 
                    style={{
                        ...commonStyles.textOverlayContent,
                        // === FIX: Force content to the left (start) for both slides ===
                        marginLeft: '0',
                        marginRight: 'auto',
                        textAlign: 'left',
                    }}
                >
                    <h1 style={commonStyles.title}>
                      {item.title}
                    </h1>
                    <h1 style={commonStyles.subtitle}>
                      {item.subtitle}
                    </h1>
                    <p style={commonStyles.text}>
                      {item.text}
                    </p>
                    
                    <Form 
                        // Remove justify-content-end class
                        className="d-flex" 
                        style={{
                            position: 'relative', 
                            width: '350px',
                            // Remove marginLeft: 'auto'
                            marginLeft: '0', 
                        }}>
                      <div style={commonStyles.emailIcon}>✉️</div> 
                      <Form.Control
                        type="email"
                        placeholder="  Your email address" 
                        style={{
                          ...commonStyles.emailInput,
                          paddingLeft: '40px' 
                        }}
                      />
                      <Button 
                        variant="success" 
                        style={commonStyles.subscribeButton(item.styles.buttonColor)}
                      >
                        Subscribe
                      </Button>
                    </Form>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      
      {/* CRITICAL: Style block for navigation dots and arrows */}
      <style>
        {`
          /* Navigation Dots (Indicators) Styling Override */
          .custom-carousel .carousel-indicators {
            bottom: 35px; 
            z-index: 10; 
          }

          .custom-carousel .carousel-indicators button {
            width: 12px;
            height: 12px;
            border-radius: 50%; 
            background-color: #ffffff; 
            opacity: 1; 
            border: 1px solid #4CAF50; 
            margin: 0 5px;
            box-shadow: none; 
          }

          .custom-carousel .carousel-indicators .active {
            background-color: #4CAF50; 
          }

          /* Arrow Styling */
          .custom-carousel .carousel-control-prev,
          .custom-carousel .carousel-control-next {
            width: 5%; 
            background: rgba(0,0,0,0); 
            opacity: 1; 
          }

          .custom-carousel .carousel-control-prev-icon,
          .custom-carousel .carousel-control-next-icon {
            background-color: #f8f9fa; 
            border-radius: 50%;
            height: 40px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }

          /* Make the actual arrow icon visible */
          .custom-carousel .carousel-control-prev-icon::after {
            content: '<';
            color: #6c757d; 
            font-size: 1.2rem;
            font-weight: bold;
          }
          .custom-carousel .carousel-control-next-icon::after {
            content: '>';
            color: #6c757d; 
            font-size: 1.2rem;
            font-weight: bold;
          }
        `}
      </style>
    </>
  );
};

export default Cor;