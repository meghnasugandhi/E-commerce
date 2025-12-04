import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";

// =======================
// IMAGE IMPORTS
// =======================
import cornImage from "../images/corn.jpg";
import orangeImage from "../images/dryginger.jpg";
import peaImage from "../images/veggi.png";
import peachImg from "../images/peach.png";
import redAppleImg from "../images/redapple.png";
import snackImg from "../images/snack.png";
import vegetablesImg from "../images/veggi.png";
import strawberryImg from "../images/strawberry.png";
import blackPlumImg from "../images/blackplum.png";
import custardAppleImg from "../images/custardapple.png";
import coffeeTeaImg from "../images/cor2.jpg";
import headphoneImg from "../images/cor1.jpg";

// =======================
// PRODUCT LIST
// =======================
const products = [
  {
    id: 1,
    name: "Fresh Corn Organic",
    price: 23.55,
    oldPrice: "$25.00",
    badge: "Save 15%",
    badgeType: "success",
    image: cornImage,
  },
  {
    id: 2,
    name: "Dry Ginger Premium Quality",
    price: 23.55,
    oldPrice: "$25.00",
    badge: "Save 25%",
    badgeType: "success",
    image: orangeImage,
  },
  {
    id: 3,
    name: "Fresh Green Peas",
    price: 23.55,
    oldPrice: "$25.00",
    badge: "New",
    badgeType: "primary",
    image: peaImage,
  },
  {
    id: 4,
    name: "Juicy Peach Imported",
    price: 23.55,
    oldPrice: "$25.00",
    badge: "Bestseller",
    badgeType: "warning",
    image: peachImg,
  },
  {
    id: 5,
    name: "Red Apples Premium",
    price: 19.99,
    oldPrice: "$22.00",
    badge: "Save 10%",
    badgeType: "success",
    image: redAppleImg,
  },
  {
    id: 6,
    name: "Healthy Snacks Pack",
    price: 12.55,
    oldPrice: "$15.00",
    badge: "New",
    badgeType: "primary",
    image: snackImg,
  },
  {
    id: 7,
    name: "Mixed Vegetables Premium",
    price: 18.99,
    oldPrice: "$22.50",
    badge: "Save 5%",
    badgeType: "success",
    image: vegetablesImg,
  },
  {
    id: 8,
    name: "Fresh Strawberries",
    price: 14.95,
    oldPrice: "$18.00",
    badge: "Hot",
    badgeType: "danger",
    image: strawberryImg,
  },
  {
    id: 9,
    name: "Black Plum Premium",
    price: 9.55,
    oldPrice: "$12.00",
    badge: "New",
    badgeType: "primary",
    image: blackPlumImg,
  },
  {
    id: 10,
    name: "Custard Apple Fresh",
    price: 11.99,
    oldPrice: "$14.00",
    badge: "Save 20%",
    badgeType: "success",
    image: custardAppleImg,
  },
  {
    id: 11,
    name: "Premium Coffee & Tea",
    price: 7.99,
    oldPrice: "$10.00",
    badge: "New",
    badgeType: "primary",
    image: coffeeTeaImg,
  },
  {
    id: 12,
    name: "Headphones (High Quality)",
    price: 12.99,
    oldPrice: "$20.00",
    badge: "Deal",
    badgeType: "warning",
    image: headphoneImg,
  },
];

const SCROLL_AMOUNT = 300;

const DailyBestSells = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      // Check if scroll is at the beginning
      setCanScrollLeft(el.scrollLeft > 0);
      // Check if scroll is at the end (allowing for minor floating point error)
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    update();
    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const handlePrev = () => scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  const handleNext = () => scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });

  return (
    <>
      <style>{`
        .daily-best-root { padding: 28px 18px; }
        .daily-title { font-weight: 700; margin-bottom: 18px; font-size: 1.25rem; }

        .banner-card {
          background: linear-gradient(180deg,#e8f7f0 0%, #f3f9f5 100%);
          border-radius: 12px;
          padding: 18px;
          height: 100%;
        }

        /* ----------------------------------- */
        /* SCROLLING RELATED CSS FIXES/UPDATES */
        /* ----------------------------------- */
        .scroll-wrap {
          position: relative; /* FIX: Added position relative for arrow positioning */
          padding: 0 10px; /* Optional: Add padding so arrows are not right on the edge */
        }

        .scroll-container {
          display: flex;
          gap: 18px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 10px 6px 16px;
          white-space: nowrap;
          scrollbar-width: none;
        }
        .scroll-container::-webkit-scrollbar { display: none; }

        .product-card {
          min-width: 240px;
          max-width: 240px;
          border-radius: 12px;
          border: 1px solid #eee;
          background: #fff;
          flex-shrink: 0;
        }

        .badge-pos {
          position: absolute; 
          left: 10px; 
          top: 10px; 
          z-index: 5;
        }

        .arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          border: none; /* Ensure no default button border */
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        .arrow-btn:hover {
          opacity: 1;
        }
        .arrow-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        .arrow-left { left: 0px; } /* Adjusted from -12px to 0px */
        .arrow-right { right: 0px; } /* Adjusted from -12px to 0px */

        .product-img { 
          height: 160px; 
          object-fit: contain; 
          padding: 18px; 
        }

        .title-truncate {
          font-size: 0.92rem;
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>

      <Container fluid className="daily-best-root">
        <div className="daily-title">Daily Best Sells</div>

        <Row>
          {/* LEFT BANNER */}
          <Col md={3}>
            <Card className="banner-card border-0">
              <h4 style={{ fontWeight: 700 }}>Bring nature into your home</h4>
              <Button variant="success" className="rounded-pill px-4 mt-2">Shop Now</Button>

              <img src={cornImage} alt="banner" className="img-fluid rounded mt-3" />
            </Card>
          </Col>

          {/* RIGHT SCROLL ROW */}
          <Col md={9}>
            <div className="scroll-wrap">

              {/* Scroll Buttons */}
              <Button 
                className="arrow-btn arrow-left" 
                onClick={handlePrev} 
                disabled={!canScrollLeft}
              >
                ❮
              </Button>
              <Button 
                className="arrow-btn arrow-right" 
                onClick={handleNext} 
                disabled={!canScrollRight}
              >
                ❯
              </Button>

              {/* Scrollable Container */}
              <div ref={scrollRef} className="scroll-container">
                {products.map((p) => (
                  <Card key={p.id} className="product-card">
                    <div className="badge-pos">
                      <Badge bg={p.badgeType}>{p.badge}</Badge>
                    </div>

                    <Card.Img src={p.image} className="product-img" />

                    <Card.Body>
                      <Card.Title className="title-truncate">{p.name}</Card.Title>

                      <div className="mt-2">
                        <span style={{ fontWeight: 700, color: "#1b7a3a" }}>${p.price}</span>{" "}
                        <span style={{ textDecoration: "line-through", color: "#888" }}>{p.oldPrice}</span>
                      </div>

                      {/* ADD TO CART LOGIC HERE */}
                      <Button
                        variant="success"
                        className="add-btn w-100 mt-3"
                        onClick={() =>
                          dispatch(
                            addItem({
                              id: p.id,
                              name: p.name,
                              price: p.price,
                              image: p.image,
                            })
                          )
                        }
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DailyBestSells;