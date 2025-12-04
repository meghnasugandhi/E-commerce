import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import home6Image from "../images/home6.jpg";

const Home6 = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log("Subscribed with email:", email);
    alert(`Thank you for subscribing with email: ${email}`);
    e.target.reset();
  };

  const categories = [
    { name: "Cake", link: "/cake" },
    { name: "Coffees", link: "/coffees" },
    { name: "Pet Foods", link: "/pet-foods" },
    { name: "Vegetables", link: "/vegetables" }
  ];

  const styles = {
    container: {
      padding: 0,
      margin: 0,
      width: "100%"
    },
    backgroundContainer: {
      position: "relative",
      width: "100%",
      minHeight: "70vh" // Reduced from 100vh to 70vh
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px 0" // Added padding for better spacing
    },
    content: {
      textAlign: "center",
      color: "white",
      padding: "20px"
    },
    heading: {
      fontSize: "2.5rem", // Reduced from 3.5rem
      fontWeight: "bold",
      marginBottom: "1.5rem", // Reduced from 2rem
      letterSpacing: "1px"
    },
    formControl: {
      borderRadius: "0",
      padding: "12px 20px", // Reduced padding
      fontSize: "0.95rem",
      border: "none",
      height: "48px" // Reduced from 55px
    },
    subscribeButton: {
      borderRadius: "0",
      padding: "12px 30px", // Reduced padding
      fontWeight: "bold",
      backgroundColor: "#f8b500",
      border: "none",
      color: "#000",
      fontSize: "0.95rem",
      height: "48px", // Reduced from 55px
      marginLeft: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      textDecoration: "none"
    },
    categoriesContainer: {
      marginTop: "2rem", // Reduced from 4rem
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px" // Reduced from 30px
    },
    categoryLink: {
      backgroundColor: "transparent",
      border: "none",
      padding: "10px 20px", // Reduced padding
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none",
      display: "inline-block"
    },
    categoryTitle: {
      fontSize: "1.4rem", // Reduced from 1.8rem
      fontWeight: "bold",
      margin: 0,
      color: "white",
      textTransform: "uppercase",
      letterSpacing: "1px",
      transition: "color 0.3s ease"
    },
    formRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "1rem"
    }
  };

  return (
    <Container fluid style={styles.container}>
      <div style={styles.backgroundContainer}>
        <Image 
          src={home6Image} 
          alt="Background" 
          style={styles.backgroundImage}
        />
        
        <div style={styles.overlay}>
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} style={styles.content}>
                <h1 style={styles.heading}>
                  What are you looking for?
                </h1>
                
                <Form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
                  <div style={styles.formRow}>
                    <div style={{ flex: "1", maxWidth: "350px" }}>
                      <Form.Group controlId="email" style={{ margin: 0 }}>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Your email address"
                          required
                          style={styles.formControl}
                        />
                      </Form.Group>
                    </div>
                    <div>
                      <Button 
                        type="submit" 
                        style={styles.subscribeButton}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e0a800"}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#f8b500"}
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </Form>
                
                <div style={styles.categoriesContainer}>
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={category.link}
                      style={styles.categoryLink}
                      onMouseOver={() => setHoveredCategory(category.name)}
                      onMouseOut={() => setHoveredCategory(null)}
                      onClick={() => console.log(`Navigating to ${category.link}`)}
                    >
                      <h3 
                        style={{
                          ...styles.categoryTitle,
                          color: hoveredCategory === category.name ? "black" : "white"
                        }}
                      >
                        {category.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Container>
  );
};

export default Home6;