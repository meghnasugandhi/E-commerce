import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { StarFill } from 'react-bootstrap-icons'; 

// 1. 🚨 IMAGE IMPORTS: Assuming Newproducts.jsx is in a folder like 'src/components', 
// the path to 'src/images' is '../images'. Adjust this path if needed.
import image1 from '../images/custardapple.png'; // Replaces orangeJuiceImage
import image2 from '../images/peach.png';         // Replaces bananaImage
import image3 from '../images/redapple.png';      // Replaces watermelonImage


/**
 * Renders the "New products" section as seen in the image.
 * Uses React Bootstrap's Card and ListGroup components for structure.
 */
const Newproducts = () => {
    // Helper component for rendering the star rating
    const StarRating = ({ rating }) => {
        const totalStars = 5;
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            // Custom orange for filled, light gray for empty
            const color = i <= rating ? '#e7711b' : '#dee2e6'; 
            stars.push(
                <StarFill 
                    key={i} 
                    size={14} 
                    style={{ color: color, marginInlineEnd: '2px' }} 
                />
            );
        }
        return <div className="d-flex align-items-center">{stars}</div>;
    };

    // Data array for the products
    const products = [
        { 
            name: "Chen Cardigan", 
            price: "$99.50", 
            rating: 4.5, 
            image: image1 // <--- USING IMPORTED IMAGE
        },
        { 
            name: "Chen Sweater", 
            price: "$89.50", 
            rating: 3.5, 
            image: image2 // <--- USING IMPORTED IMAGE
        },
        { 
            name: "Colorful Jacket", 
            price: "$25", 
            rating: 3, 
            image: image3 // <--- USING IMPORTED IMAGE
        },
    ];

    return (
        <Card className="mt-4 border-0 shadow-sm">
            <Card.Body className="p-4">
                {/* Header Section */}
                <h3 className="mb-3" style={{ fontSize: '1.5rem', fontWeight: '500' }}>
                    New products
                </h3>
                <div className="mb-4" style={{ borderBottom: '2px solid #55c57a', width: '30%', marginLeft: 0, paddingBottom: '0.5rem' }}>
                    {/* Light gray line beneath the active green line */}
                    <div style={{ borderBottom: '2px solid #e9ecef', width: '100%' }}></div> 
                </div>

                {/* List of Products */}
                <ListGroup variant="flush">
                    {products.map((product, index) => (
                        <ListGroup.Item 
                            key={index} 
                            className="d-flex align-items-center p-0" 
                            style={{ borderBottom: index < products.length - 1 ? '1px solid #dee2e6' : 'none', paddingBlock: '1rem' }}
                        >
                            {/* Product Image */}
                            <div style={{ width: '80px', height: '80px', flexShrink: 0, marginRight: '1rem' }}>
                                <img 
                                    src={product.image} // <--- IMAGE SOURCE IS NOW THE IMPORTED VARIABLE
                                    alt={product.name} 
                                    className="img-fluid rounded" 
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex-grow-1">
                                <p className="mb-1" style={{ color: '#4CAF50', fontWeight: '600', fontSize: '1rem' }}>
                                    {product.name}
                                </p>
                                <p className="mb-1 text-dark" style={{ fontWeight: '500', fontSize: '1.1rem' }}>
                                    {product.price}
                                </p>
                                <StarRating rating={product.rating} />
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default Newproducts;