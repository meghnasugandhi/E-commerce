import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux'; 

// --- Helper Function (Unchanged) ---

const renderProductCard = (product, index) => (
    <Card key={index} style={{ height: '100%', border: 'none' }}>
        <div style={{ padding: '10px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card.Img variant="top" src={product.image} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
        </div>
        <Card.Body style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Card.Title style={{ fontSize: '14px', fontWeight: '500', height: '40px', overflow: 'hidden' }}>{product.name}</Card.Title>
            <div style={{ fontSize: '14px', color: '#ffc107', marginBottom: '5px' }}>
                ★★★★☆ <span style={{ color: '#6c757d', fontSize: '12px' }}>({(product.rating || 4.0).toFixed(1)})</span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#28a745' }}>
                {product.price}
                <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#6c757d', textDecoration: 'line-through', marginLeft: '8px' }}>
                    {product.oldPrice || `$${(parseFloat(product.price.replace('$', '')) * 1.1).toFixed(2)}`}
                </span>
            </div>
        </Card.Body>
    </Card>
);


// --- Static Product Data (Covers only Top Selling, Trending Products, and Top Rated) ---

const categories = ["Top Selling", "Trending Products", "Recently added", "Top Rated"];

// This array now contains ONLY 9 items, covering 3 columns (3 items per column).
// The third column slot is left open for cart data.
const staticProducts = [
    // Top Selling (3 items)
    { id: 1, name: "Nestle Original Coffee-Mate...", category: "Top Selling", image: "img1.png", rating: 4.0, price: "$32.85", oldPrice: "$35.98" },
    { id: 2, name: "Nestle Original Coffee-Mate...", category: "Top Selling", image: "img2.png", rating: 4.0, price: "$32.85", oldPrice: "$35.98" },
    { id: 3, name: "Nestle Original Coffee-Mate...", category: "Top Selling", image: "img3.png", rating: 4.0, price: "$32.85", oldPrice: "$35.98" },
    
    // Trending Products (3 items)
    { id: 4, name: "Organic Cage-Free Grade A...", category: "Trending Products", image: "img4.png", rating: 4.0, price: "$32.85", oldPrice: "$35.98" },
    { id: 5, name: "Seeds of Change Organic...", category: "Trending Products", image: "img5.png", rating: 4.0, price: "$32.85", oldPrice: "$35.98" },
    { id: 6, name: "Naturally Flavored Cinnamon...", category: "Trending Products", image: "img6.png", rating: 4.0, price: "$32.85", oldPrice: "$35.98" },

    // Top Rated (3 items)
    { id: 10, name: "Foster Farms Takeout Crispy...", category: "Top Rated", image: "img10.png", rating: 4.0, price: "$32.85", oldPrice: "$35.98" },
    { id: 11, name: "Angie's Boomchickapop...", category: "Top Rated", image: "img11.png", rating: 4.0, price: "$32.85", oldPrice: "$35.98" },
    { id: 12, name: "All Natural Italian-Style...", category: "Top Rated", image: "img12.png", rating: 4.0, price: "$32.85", oldPrice: "$35.98" },
];


// --- Main Component ---

const ProductGrid = () => {
    // 2. Access the Cart State (The key is state.cart.items)
    const cartItems = useSelector((state) => state.cart.items); 
    
    // 3. Determine the products for the 'Recently added' section
    const recentCartItems = cartItems
        .slice(-3) 
        .reverse() 
        .map(item => ({
            id: item.id,
            name: item.name,
            image: item.image,
            // Map cart properties to display properties
            price: `$${(item.price).toFixed(2)}`, 
            rating: 4.5, 
            oldPrice: `$${(item.price * 1.1).toFixed(2)}`, 
            category: "Recently added",
        })); 
        
    // 4. Combine all products into a single, ordered array
    const allProducts = new Array(categories.length * 3); // 12 total slots (4 columns * 3 rows)

    categories.forEach((category, colIndex) => {
        let products;
        
        if (category === "Recently added") {
            // **THIS IS THE CRITICAL LINE:** It uses the dynamic cart data.
            products = recentCartItems;
        } else {
            // Uses static data for the other three sections.
            products = staticProducts.filter(p => p.category === category);
        }

        // Distribute the products across the 3 rows in the correct column order.
        products.slice(0, 3).forEach((p, rowIndex) => { 
            // Calculate the flat index: Row Index + (Column Index * Total Rows)
            const flatIndex = rowIndex + (colIndex * 3);
            allProducts[flatIndex] = p;
        });
    });

    const finalProductData = allProducts.filter(p => p !== undefined);
    const totalRows = 3; 

    return (
        <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            {/* --- Header Row --- */}
            <Row className="mb-3">
                {categories.map((category, index) => (
                    <Col key={index} md={3} className="text-left">
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', borderBottom: '2px solid #28a745', display: 'inline-block', paddingBottom: '5px', color: '#333' }}>
                            {category}
                        </h2>
                    </Col>
                ))}
            </Row>
            
            {/* --- Product Rows --- */}
            {[...Array(totalRows)].map((_, rowIndex) => (
                <Row key={rowIndex} className="mb-4">
                    {categories.map((_, colIndex) => {
                        const productIndex = rowIndex + (colIndex * totalRows); 

                        const product = finalProductData[productIndex];

                        return (
                            <Col key={colIndex} md={3}>
                                {product ? renderProductCard(product, productIndex) : null}
                            </Col>
                        );
                    })}
                </Row>
            ))}
        </Container>
    );
};

export default ProductGrid;