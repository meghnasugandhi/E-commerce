import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/slices/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import local images
import yogurt from '../images/yogurt.jpg';
import cakeandmilk from '../images/cakeandmilk.png';
import softpaper from '../images/softpaper.jpg';
import cor1 from '../images/cor1.jpg';
import cor2 from '../images/cor2.jpg';
import saltedveggie from '../images/saltedveggie.jpg';
import snack from '../images/snack.png';
import chickenmeatball from '../images/chickenmeatball.jpg';
import quinoa from '../images/quinoa.jpg';
import buffalowings from '../images/buffalowings.jpg';
import corn from '../images/corn.jpg';
import veggi from '../images/veggi.png';
import redapple from '../images/redapple.png';
import strawberry from '../images/strawberry.png';
import blackplum from '../images/blackplum.png';
import peach from '../images/peach.png';
import custardapple from '../images/custardapple.png';
import organickiwi from '../images/organickiwi.png';
import dryginger from '../images/dryginger.jpg';
import salmon from '../images/salmon.jpg';
import icecreamketchep from '../images/icecreamketchep.jpg';

// --- Comprehensive Mock Data for Filtering ---
const allProductsData = [
    // --- Milks & Dairies (3 items) ---
    {
        id: 1, category: 'Milks & Dairies', name: 'Chobani Complete Vanilla Greek Yogurt',
        brand: 'Hodo Foods', rating: 4.8, price: 54.85, originalPrice: 55.80, tag: 'Hot',
        imageUrl: yogurt,
    },
    {
        id: 2, category: 'Milks & Dairies', name: 'Almond Breeze Unsweetened Almond Milk',
        brand: 'Blue Diamond', rating: 4.5, price: 12.50, originalPrice: 13.99, tag: 'New',
        imageUrl: cakeandmilk,
    },
    {
        id: 3, category: 'Milks & Dairies', name: 'Philadelphia Cream Cheese Spread',
        brand: 'Kraft', rating: 4.2, price: 8.99, originalPrice: 9.50, tag: 'Sale',
        imageUrl: softpaper,
    },
    // --- Coffes & Teas (2 items) ---
    {
        id: 4, category: 'Coffes & Teas', name: 'Cafe Altura Organic Coffee Medium Roast',
        brand: 'Old El Paso', rating: 4.0, price: 23.85, originalPrice: 25.00, tag: 'Hot',
        imageUrl: cor1,
    },
    {
        id: 5, category: 'Coffes & Teas', name: 'Tazo Organic Chai Black Tea Bags',
        brand: 'Unilever', rating: 4.6, price: 5.99, originalPrice: 6.50, tag: null,
        imageUrl: cor2,
    },
    // --- Pet Foods (2 items) ---
    {
        id: 6, category: 'Pet Foods', name: 'Blue Diamond Almonds Lightly Salted Vegetables',
        brand: 'NestFood', rating: 4.0, price: 23.85, originalPrice: 25.00, tag: '-4%',
        imageUrl: saltedveggie,
    },
    {
        id: 7, category: 'Pet Foods', name: "Purina ONE SmartBlend Chicken & Rice Dog Food",
        brand: 'Purina', rating: 4.9, price: 35.00, originalPrice: 40.00, tag: 'Hot',
        imageUrl: snack,
    },
    // --- Meats (3 items) ---
    {
        id: 8, category: 'Meats', name: 'All Natural Italian-Style Chicken Meatballs',
        brand: 'Stouffer', rating: 4.0, price: 52.85, originalPrice: 55.80, tag: 'Sale',
        imageUrl: chickenmeatball,
    },
    {
        id: 9, category: 'Meats', name: 'All-Montory Pistachio Butter - 200ml - 400g',
        brand: 'NestFood', rating: 4.0, price: 32.85, originalPrice: 35.80, tag: null,
        imageUrl: quinoa,
    },
    {
        id: 10, category: 'Meats', name: 'Black Forest Sliced Smoked Ham',
        brand: 'Hormel', rating: 4.3, price: 15.20, originalPrice: 16.00, tag: 'New',
        imageUrl: salmon,
    },
    // --- Vegetables (3 items) ---
    {
        id: 11, category: 'Vegetables', name: 'Foster Farms Takeout Crispy Classic Buffalo Wings',
        brand: 'NestFood', rating: 4.0, price: 17.85, originalPrice: 19.80, tag: null,
        imageUrl: buffalowings,
    },
    {
        id: 12, category: 'Vegetables', name: 'Organic Broccoli Florets',
        brand: 'O Organics', rating: 4.1, price: 4.99, originalPrice: 5.50, tag: 'Sale',
        imageUrl: corn,
    },
    {
        id: 13, category: 'Vegetables', name: 'Baby Spinach Bag - 10oz',
        brand: 'Earthbound Farm', rating: 4.7, price: 3.49, originalPrice: 4.00, tag: null,
        imageUrl: veggi,
    },
    // --- Fruits (2 items) ---
    {
        id: 14, category: 'Fruits', name: 'Fresh Gala Apples - 3lb Bag',
        brand: 'Washington', rating: 4.6, price: 6.99, originalPrice: 7.50, tag: 'Hot',
        imageUrl: redapple,
    },
    {
        id: 15, category: 'Fruits', name: 'Dole Bananas (per lb)',
        brand: 'Dole', rating: 4.0, price: 0.59, originalPrice: 0.70, tag: null,
        imageUrl: strawberry,
    },
    // --- Additional Fruits to use remaining images ---
    {
        id: 16, category: 'Fruits', name: 'Organic Black Plums',
        brand: 'Nature\'s Best', rating: 4.3, price: 3.99, originalPrice: 4.50, tag: 'New',
        imageUrl: blackplum,
    },
    {
        id: 17, category: 'Fruits', name: 'Fresh Peaches',
        brand: 'Summer Harvest', rating: 4.5, price: 2.99, originalPrice: 3.25, tag: 'Sale',
        imageUrl: peach,
    },
    {
        id: 18, category: 'Fruits', name: 'Custard Apple',
        brand: 'Tropical Delight', rating: 4.2, price: 4.49, originalPrice: 5.00, tag: null,
        imageUrl: custardapple,
    },
    {
        id: 19, category: 'Fruits', name: 'Organic Kiwi',
        brand: 'Green Valley', rating: 4.6, price: 3.79, originalPrice: 4.20, tag: 'Hot',
        imageUrl: organickiwi,
    },
    // --- Snacks (using remaining images) ---
    {
        id: 20, category: 'Snack', name: 'Seeds of Change Organic Quinoa, Brown, & Red Rice',
        brand: 'NestFood', rating: 4.0, price: 28.85, originalPrice: 32.80, tag: 'Hot',
        imageUrl: dryginger,
    },
    {
        id: 21, category: 'Snack', name: "Angie's Boomchicapop Sweet & Salty Kettle Corn",
        brand: 'StarKist', rating: 4.0, price: 48.85, originalPrice: 52.80, tag: 'New',
        imageUrl: icecreamketchep,
    },
];

// --- Product Card Component ---
const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const getTagVariant = (tag) => {
        if (tag === 'Hot') return 'danger';
        if (tag === 'Sale') return 'info';
        if (tag === 'New') return 'success';
        if (tag && tag.endsWith('%')) return 'warning';
        return 'secondary';
    };

    const handleAddToCart = () => {
        // Create cart item object with required properties
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl,
            quantity: 1, // Default quantity when first added
            brand: product.brand,
            rating: product.rating
        };
        
        // Dispatch the addItem action to Redux store
        dispatch(addItem(cartItem));
        
        // Optional: Show a success message or notification
        console.log(`Added ${product.name} to cart`);
        // You can replace this with a toast notification
        alert(`Added ${product.name} to cart!`);
    };

    return (
        <Col xs={12} sm={6} md={6} xl={3} className="mb-4">
            <Card className="product-card border-0 shadow-sm h-100 position-relative rounded-3 overflow-hidden">
                {/* Product Tag/Badge */}
                {product.tag && (
                    <span className={`product-tag badge bg-${getTagVariant(product.tag)} position-absolute top-0 start-0 m-2 rounded-1 p-2`}>
                        {product.tag}
                    </span>
                )}
                
                {/* Product Image */}
                <Card.Img 
                    variant="top" 
                    src={product.imageUrl} 
                    alt={product.name} 
                    style={{ 
                        height: '200px', 
                        objectFit: 'cover', 
                        padding: '10px',
                        width: '100%'
                    }} 
                />

                <Card.Body className="d-flex flex-column">
                    <p className="product-category text-muted small mb-1">{product.category}</p>
                    <Card.Title className="product-name fs-6 mb-2 text-truncate fw-semibold" style={{ height: '3rem' }}>
                        {product.name}
                    </Card.Title>
                    
                    {/* Rating Section */}
                    <div className="product-rating small mb-2 text-warning">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                        <span className="text-muted"> ({product.rating.toFixed(1)})</span>
                    </div>
                    
                    <p className="product-brand small text-muted mb-3">By <strong>{product.brand}</strong></p>
                    
                    {/* Price and Add Button */}
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div>
                            <span className="product-price fw-bold me-2 fs-5" style={{ color: '#3bb77e' }}>
                                ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice > product.price && (
                                <span className="product-original-price text-muted text-decoration-line-through small">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>
                        <Button 
                            variant="success" 
                            size="sm"
                            className="rounded-pill px-3 py-2 fw-semibold"
                            style={{ backgroundColor: '#3bb77e', borderColor: '#3bb77e' }}
                            onClick={handleAddToCart}
                        >
                            <i className="bi bi-cart-plus me-1"></i> Add
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

// --- Popular Products Main Component ---
const PopularProducts = () => {
    const [activeFilter, setActiveFilter] = useState('All'); 

    const categories = ['All', 'Milks & Dairies', 'Coffes & Teas', 'Pet Foods', 'Meats', 'Vegetables', 'Fruits', 'Snack'];
    
    const filteredProducts = useMemo(() => {
        if (activeFilter === 'All') {
            return allProductsData.slice(0, 8); 
        }
        return allProductsData.filter(product => product.category === activeFilter);
    }, [activeFilter]);
    
    return (
        <Container className="my-5">
            {/* Header Section */}
            <Row className="align-items-center mb-4 border-bottom pb-3">
                <Col md={4}>
                    <h2 className="display-6 fw-bold">Popular Products</h2>
                </Col>
                
                {/* Category Filters */}
                <Col md={8}>
                    <div className="d-flex justify-content-md-end align-items-center flex-wrap overflow-auto">
                        {categories.map((cat, index) => (
                            <Button 
                                key={index} 
                                variant="link" 
                                className={`text-decoration-none px-2 py-1 mx-1 mx-md-2 fw-semibold flex-shrink-0 ${activeFilter === cat ? 'active-filter' : 'text-muted'}`}
                                onClick={() => setActiveFilter(cat)}
                                style={activeFilter === cat ? { 
                                    color: '#3bb77e', 
                                    borderBottom: '2px solid #3bb77e' 
                                } : { color: '#6c757d' }}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </Col>
            </Row>

            {/* Products Grid */}
            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <Col>
                        <p className="text-center text-muted py-5">No products found in the selected category.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default PopularProducts;