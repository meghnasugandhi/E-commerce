import React, { useState, useEffect } from "react";
import { Carousel, Card, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Category2 = () => {
  const [index, setIndex] = useState(0);

  // Categories with actual image URLs from Nest frontend
  const categories = [
    [
      { 
        id: 1, 
        name: "Fresh", 
        subname: "Seafood", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-1.svg" 
      },
      { 
        id: 2, 
        name: "Noodles", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-2.svg" 
      },
      { 
        id: 3, 
        name: "Rice", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-3.svg" 
      },
      { 
        id: 4, 
        name: "Fastfood", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-4.svg" 
      },
      { 
        id: 5, 
        name: "Ice cream", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-5.svg" 
      },
      { 
        id: 6, 
        name: "Milks and", 
        subname: "Dairies", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-6.svg" 
      }
    ],
    [
      { 
        id: 7, 
        name: "Wines &", 
        subname: "Alcohol", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-7.svg" 
      },
      { 
        id: 8, 
        name: "Clothing &", 
        subname: "Beauty", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-8.svg" 
      },
      { 
        id: 9, 
        name: "Pet Foods & Toy", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-11.svg" 
      },
      { 
        id: 10, 
        name: "Packaged fast food", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-4.svg" 
      },
      { 
        id: 11, 
        name: "Baking material", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-7.svg" 
      },
      { 
        id: 12, 
        name: "All Categories", 
        icon: "https://nest-frontend-v6.vercel.app/assets/imgs/theme/icons/category-8.svg" 
      }
    ]
  ];

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === categories.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <Container fluid className="my-5 px-5" style={{ maxWidth: "1800px" }}>
      {/* Header Section - Exact match to image */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: "#253D4E", fontSize: "2.5rem" }}>
          Shop by Categories
        </h2>
        <a 
          href="#" 
          className="text-decoration-none fw-bold"
          style={{ 
            color: "#3BB77E", 
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          All Categories 
          <span style={{ fontSize: "1.4rem", marginLeft: "5px" }}>&gt;</span>
        </a>
      </div>

      {/* Horizontal Line */}
      <hr style={{ 
        border: "none", 
        height: "3px", 
        backgroundColor: "#3BB77E", 
        margin: "25px 0 40px 0" 
      }} />

      {/* Category Carousel */}
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        controls={true}
        interval={null} // We handle auto-slide manually
        className="category-carousel"
      >
        {categories.map((slideCategories, slideIndex) => (
          <Carousel.Item key={slideIndex}>
            <Row className="g-5 justify-content-center">
              {slideCategories.map((category) => (
                <Col xs={6} sm={4} lg={2} xl={2} key={category.id}>
                  <Card 
                    className="category-card text-center h-100 border-0"
                    style={{ 
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      boxShadow: "none"
                    }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center p-4">
                      {/* Category Icon with Image */}
                      <div 
                        className="category-icon mb-4 d-flex align-items-center justify-content-center"
                        style={{ 
                          width: "100px",
                          height: "100px",
                          backgroundColor: "#3BB77E",
                          borderRadius: "50%",
                          overflow: "hidden",
                          padding: "20px"
                        }}
                      >
                        <img 
                          src={category.icon} 
                          alt={category.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            filter: "brightness(0) invert(1)" // Makes the icon white
                          }}
                        />
                      </div>
                      
                      {/* Category Name */}
                      <Card.Text 
                        className="category-name fw-bold mb-0 text-center"
                        style={{ 
                          color: "#253D4E",
                          fontSize: "1.2rem",
                          lineHeight: "1.4"
                        }}
                      >
                        {category.name}
                        {category.subname && (
                          <>
                            <br />
                            {category.subname}
                          </>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Custom Navigation Buttons */}
      <div className="d-flex justify-content-center mt-5">
        <button
          className="btn me-4 d-flex align-items-center justify-content-center"
          onClick={() => setIndex((prev) => (prev > 0 ? prev - 1 : categories.length - 1))}
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#3BB77E",
            border: "none",
            borderRadius: "50%",
            color: "white",
            fontSize: "1.8rem",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(59, 183, 126, 0.3)"
          }}
        >
          &larr;
        </button>
        <button
          className="btn d-flex align-items-center justify-content-center"
          onClick={() => setIndex((prev) => (prev < categories.length - 1 ? prev + 1 : 0))}
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#3BB77E",
            border: "none",
            borderRadius: "50%",
            color: "white",
            fontSize: "1.8rem",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(59, 183, 126, 0.3)"
          }}
        >
          &rarr;
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="d-flex justify-content-center mt-4">
        {categories.map((_, idx) => (
          <div
            key={idx}
            className="mx-2"
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: index === idx ? "#3BB77E" : "#C5EAD9",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>

      <style jsx>{`
        .category-card {
          transition: all 0.3s ease;
        }
        
        .category-card:hover {
          transform: translateY(-8px);
        }
        
        .category-card:hover .category-icon {
          transform: scale(1.15);
          transition: transform 0.3s ease;
          box-shadow: 0 8px 25px rgba(59, 183, 126, 0.4);
        }
        
        .carousel-control-prev,
        .carousel-control-next {
          display: none; /* Hide default Bootstrap controls */
        }
        
        /* Wider container styling */
        .container-fluid {
          padding-left: 80px;
          padding-right: 80px;
        }
      `}</style>
    </Container>
  );
};

export default Category2;