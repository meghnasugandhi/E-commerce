import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { BsCartPlus, BsTrash } from 'react-icons/bs';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';

// --- 1. DUMMY DATA ---
const productData = [
  {
    id: 1,
    name: "J.Crew Mercantile Women's Short",
    image: 'path/to/product-image-1.jpg',
    price: 12.00,
    rating: 4.5,
    reviews: 121,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    stock: 'In Stock',
    weight: '320 gram',
    dimensions: 'N/A',
    buyButton: 'Add to cart',
    buyVariant: 'success',
  },
  {
    id: 2,
    name: "Amazon Essentials Women's Tanks",
    image: 'path/to/product-image-2.jpg',
    price: 14.00,
    rating: 4.0,
    reviews: 35,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    stock: 'Out of stock',
    weight: '370 gram',
    dimensions: 'N/A',
    buyButton: 'Contact Us',
    buyVariant: 'dark',
  },
  {
    id: 3,
    name: "Amazon Brand - Daily Ritual Wom",
    image: 'path/to/product-image-3.jpg',
    price: 15.00,
    rating: 4.5,
    reviews: 125,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    stock: 'In Stock',
    weight: '380 gram',
    dimensions: 'N/A',
    buyButton: 'Add to cart',
    buyVariant: 'success',
  },
];

// --- 2. CSS STYLES (AS JAVASCRIPT OBJECTS) ---

// Define core colors and reusable styles
const COLORS = {
    border: '#dee2e6',
    success: '#28a745',
    danger: '#dc3545',
    dark: '#343a40',
    warning: '#ffc107',
    muted: '#6c757d',
};

const styles = {
    // Styling the table container itself for borders
    table: {
        width: '100%',
        marginBottom: '1rem',
        color: '#212529',
        borderCollapse: 'collapse',
        border: `1px solid ${COLORS.border}`,
    },
    // Styling for table cells (td and th)
    cell: {
        padding: '0.75rem',
        verticalAlign: 'middle',
        border: `1px solid ${COLORS.border} !important`,
    },
    // Feature Column (First Column) Header Style
    featureHeader: {
        backgroundColor: '#ffffff',
        textAlign: 'left',
        fontWeight: '700',
        width: '25%',
        minWidth: '150px',
        color: '#212529',
    },
    // Stock Badge Styles
    badge: {
        padding: '0.4em 0.8em',
        borderRadius: '0.25rem',
        fontWeight: '600',
        whiteSpace: 'nowrap',
        display: 'inline-block',
    },
    badgeSuccess: {
        backgroundColor: COLORS.success,
        color: '#fff',
    },
    badgeDanger: {
        backgroundColor: COLORS.danger,
        color: '#fff',
    },
    // Price Style
    price: {
        color: COLORS.success,
        fontWeight: 'bold',
        fontSize: '1.25rem',
    },
    // Description Style
    description: {
        textAlign: 'justify',
        fontSize: '0.85rem',
        color: COLORS.muted,
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        maxWidth: '300px',
    },
};


// --- 3. HELPER COMPONENTS ---

// Helper component to render the star rating
const StarRating = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div>
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} style={{ color: COLORS.warning }} />)}
        {hasHalfStar && <FaStarHalfAlt key="half" style={{ color: COLORS.warning }} />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} style={{ color: COLORS.warning }} />)}
      </div>
      <span className="ms-2">({reviews})</span>
    </div>
  );
};

// Component to render the stock status badge
const StockStatus = ({ status }) => {
  const badgeStyle = status === 'In Stock' ? styles.badgeSuccess : styles.badgeDanger;
  return (
    <span style={{ ...styles.badge, ...badgeStyle }}>
      {status}
    </span>
  );
};

// --- 4. MAIN COMPONENT ---
const ProductCompare = () => {
  const productCount = productData.length;

  // Function to determine button variant style
  const getButtonVariantStyle = (variant) => {
      if (variant === 'success') return { backgroundColor: COLORS.success, borderColor: COLORS.success };
      if (variant === 'dark') return { backgroundColor: COLORS.dark, borderColor: COLORS.dark };
      return {};
  };

  return (
    <Container className="my-5">
      {/* Page Header */}
      <div className="mb-4">
        <p className="text-muted small">Home &gt; Shop &gt; **Compare**</p>
        <h2 className="fw-bold">Products Compare 🛍️</h2>
        <p className="text-muted">There are **{productCount}** products to compare</p>
      </div>

      {/* Product Images Row - Note: Images are simulated with text */}
      <Row className="mb-4 align-items-end" style={{ minHeight: '180px' }}>
        <Col xs={12} md={3} className="text-center d-flex align-items-end justify-content-center">
          <span className="text-muted">Preview</span>
        </Col>
        {productData.map((product) => (
          <Col xs={12} md={3} key={product.id} className="text-center d-flex justify-content-center align-items-center">
            {/* Replace with actual Image component usage */}
            

[Image of {product.name} product]
 
          </Col>
        ))}
        {/* Empty column filling */}
        {productCount < 4 && [...Array(4 - productCount)].map((_, i) => <Col xs={12} md={3} key={`empty-${i}`} />)}
      </Row>

      {/* Comparison Table */}
      <div className="table-responsive">
        <Table style={styles.table}>
          <tbody>
            {/* Row: Name */}
            <tr>
              <th style={{ ...styles.cell, ...styles.featureHeader }}>Name</th>
              {productData.map((product) => (
                <td key={`name-${product.id}`} style={styles.cell} className="fw-bold">{product.name}</td>
              ))}
            </tr>

            {/* Row: Price */}
            <tr>
              <th style={{ ...styles.cell, ...styles.featureHeader }}>Price</th>
              {productData.map((product) => (
                <td key={`price-${product.id}`} style={{ ...styles.cell, ...styles.price }}>
                  ${product.price.toFixed(2)}
                </td>
              ))}
            </tr>

            {/* Row: Rating */}
            <tr>
              <th style={{ ...styles.cell, ...styles.featureHeader }}>Rating</th>
              {productData.map((product) => (
                <td key={`rating-${product.id}`} style={styles.cell}>
                  <StarRating rating={product.rating} reviews={product.reviews} />
                </td>
              ))}
            </tr>

            {/* Row: Description */}
            <tr>
              <th style={{ ...styles.cell, ...styles.featureHeader }}>Description</th>
              {productData.map((product) => (
                <td key={`description-${product.id}`} style={{ ...styles.cell, ...styles.description }}>
                  {product.description}
                </td>
              ))}
            </tr>

            {/* Row: Stock Status */}
            <tr>
              <th style={{ ...styles.cell, ...styles.featureHeader }}>Stock status</th>
              {productData.map((product) => (
                <td key={`stock-${product.id}`} style={styles.cell}>
                  <StockStatus status={product.stock} />
                </td>
              ))}
            </tr>

            {/* Row: Weight */}
            <tr>
              <th style={{ ...styles.cell, ...styles.featureHeader }}>Weight</th>
              {productData.map((product) => (
                <td key={`weight-${product.id}`} style={styles.cell} className="fw-bold">{product.weight}</td>
              ))}
            </tr>

            {/* Row: Dimensions */}
            <tr>
              <th style={{ ...styles.cell, ...styles.featureHeader }}>Dimensions</th>
              {productData.map((product) => (
                <td key={`dimensions-${product.id}`} style={styles.cell} className="text-muted">{product.dimensions}</td>
              ))}
            </tr>

            {/* Row: Buy Now / Action */}
            <tr>
              <th style={{ ...styles.cell, ...styles.featureHeader }}>Buy now</th>
              {productData.map((product) => (
                <td key={`buy-${product.id}`} style={styles.cell}>
                  <Button 
                    style={getButtonVariantStyle(product.buyVariant)} 
                    disabled={product.stock === 'Out of stock'}
                  >
                    {product.buyButton === 'Add to cart' && <BsCartPlus className="me-2" />}
                    {product.buyButton === 'Contact Us' && <HiOutlineChatBubbleLeftRight className="me-2" />}
                    {product.buyButton}
                  </Button>
                </td>
              ))}
            </tr>

            {/* Row: Remove Product */}
            <tr>
              <th style={{ ...styles.cell, ...styles.featureHeader }}></th>
              {productData.map((product) => (
                <td key={`remove-${product.id}`} style={styles.cell}>
                  <Button variant="link" 
                    style={{ color: COLORS.danger, textDecoration: 'none', fontSize: '0.85rem', padding: '0' }}
                  >
                    <BsTrash className="me-1" /> Remove
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ProductCompare;