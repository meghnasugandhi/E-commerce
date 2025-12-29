import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Table, Form } from 'react-bootstrap';
import { FaHome, FaShoppingCart, FaTrashAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------
// 1. Redux Selectors and Actions (Import or Define here if needed)
// ----------------------------------------------------------------------

// Assuming these are imported from your slice files:
// import { removeItemFromWishlist, selectWishlistItems, selectWishlistCount } from '../slices/wishlistSlice';
// import { addItem } from '../slices/cartSlice';

// Placeholder definitions for demonstration/testing
const selectWishlistItems = (state) => state.wishlist.items;
const selectWishlistCount = (state) => state.wishlist.count;
const removeItemFromWishlist = (id) => ({ type: 'wishlist/removeItemFromWishlist', payload: id });
const addItemToCart = (item) => ({ type: 'cart/addItem', payload: item });

// ----------------------------------------------------------------------
// 2. Mock Data for Visualization (Replace with actual Redux data)
// ----------------------------------------------------------------------
// NOTE: If your Redux store is running, the real data will override this.
/*
const mockWishlistItems = [
    { id: 1, name: 'Bield Roast Choo Cheese Lightly Salted', price: 2.43, stock: true, rating: 4.0, image: 'mock-product-1.jpg' },
    { id: 2, name: 'Fresh Organic Whole Milk', price: 4.99, stock: false, rating: 4.8, image: 'mock-product-2.jpg' },
    { id: 3, name: 'Premium Ground Coffee Beans', price: 12.50, stock: true, rating: 4.5, image: 'mock-product-3.jpg' },
];
*/

// ----------------------------------------------------------------------
// 3. Wishlist Component
// ----------------------------------------------------------------------

const Wishlist = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectWishlistItems);
    const count = useSelector(selectWishlistCount);

    const [selectedItems, setSelectedItems] = useState([]);
    
    // Fallback if Redux state is empty (using mock data for visual development)
    const wishlistItems = items.length > 0 ? items : (window.location.host.includes('localhost') ? [] : []);
    
    const overallTotal = wishlistItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    // Since the image shows a price summary above the table, we calculate it here.

    const handleToggleSelect = (id) => {
        setSelectedItems(prev => 
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const handleToggleAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(wishlistItems.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleRemoveItem = (id) => {
        dispatch(removeItemFromWishlist(id));
    };

    const handleAddToCart = (item) => {
        dispatch(addItemToCart({ ...item, quantity: 1 }));
    };

    return (
        <Container fluid className="py-5 px-5">
            {/* Breadcrumb Area */}
            <Row className="mb-4">
                <Col>
                    <div className="text-muted small">
                        <FaHome className="me-2 text-success" />
                        <Link to="/" className="text-decoration-none text-muted">Home</Link>
                        {' > '}
                        <Link to="/shop" className="text-decoration-none text-muted">Shop</Link>
                        {' > Filter'}
                    </div>
                </Col>
            </Row>
            
            <Row className="align-items-center mb-4 pb-3 border-bottom">
                {/* Title and Count */}
                <Col xs={12} md={6}>
                    <h1 className="fw-bolder" style={{ color: '#253d4e' }}>Your Wishlist</h1>
                    <p className="text-muted mt-2">
                        There are **{count}** products in this list
                    </p>
                </Col>

                {/* Summary (Top Right) */}
                <Col xs={12} md={6} className="text-md-end d-flex justify-content-end align-items-center">
                    <h3 className="text-success me-3 mb-0">${overallTotal}</h3>
                    <div className="stock-status me-3 p-1 px-2 border rounded text-success" style={{ backgroundColor: '#def6e4', fontSize: '0.85em' }}>
                        In Stock
                    </div>
                    <Button variant="success" className="d-flex align-items-center me-3">
                        <FaShoppingCart className="me-2" /> Add all to cart
                    </Button>
                    {/* Trash Icon */}
                    <FaTrashAlt size={20} className="text-muted cursor-pointer" onClick={() => setSelectedItems([])} /> 
                </Col>
            </Row>
            
            {/* Wishlist Table */}
            <Card className="shadow-sm border-0">
                <Table responsive hover className="align-middle mb-0">
                    <thead style={{ backgroundColor: '#f5f5f5' }}>
                        <tr>
                            <th style={{ width: '5%' }}>
                                <Form.Check 
                                    type="checkbox" 
                                    checked={selectedItems.length === wishlistItems.length && wishlistItems.length > 0}
                                    onChange={handleToggleAll}
                                />
                            </th>
                            <th style={{ width: '40%' }}>Product</th>
                            <th style={{ width: '15%' }}>Price</th>
                            <th style={{ width: '15%' }}>Stock Status</th>
                            <th style={{ width: '15%' }}>Action</th>
                            <th style={{ width: '10%' }}>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlistItems.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Form.Check 
                                        type="checkbox" 
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleToggleSelect(item.id)}
                                    />
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        {/* Placeholder for Product Image */}
                                        <img 
                                            src={item.image || 'https://via.placeholder.com/60x60?text=Product'} 
                                            alt={item.name} 
                                            height="60" 
                                            className="me-3 border rounded"
                                        />
                                        <div>
                                            <Link to={`/product/${item.id}`} className="fw-bold text-success text-decoration-none" style={{ color: '#253d4e !important' }}>
                                                {item.name}
                                            </Link>
                                            <div className="text-muted small">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} size={10} className={i < Math.floor(item.rating) ? 'text-warning' : 'text-light'} />
                                                ))}
                                                <span className="ms-1">({item.rating.toFixed(1)})</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-success fw-bold">${item.price.toFixed(2)}</td>
                                <td>
                                    <span className={`badge ${item.stock ? 'bg-success-light text-success' : 'bg-danger-light text-danger'}`} 
                                          style={{ backgroundColor: item.stock ? '#def6e4' : '#fde0e0', color: item.stock ? '#28a745' : '#dc3545', padding: '0.4em 0.8em', fontSize: '0.8em' }}>
                                        {item.stock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td>
                                    <Button 
                                        variant="success" 
                                        size="sm" 
                                        disabled={!item.stock}
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        <FaShoppingCart className="me-1" /> Add to cart
                                    </Button>
                                </td>
                                <td>
                                    <FaTrashAlt 
                                        size={18} 
                                        className="text-muted cursor-pointer"
                                        onClick={() => handleRemoveItem(item.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                        {wishlistItems.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-muted py-5">
                                    Your wishlist is empty. Start adding some products!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};

export default Wishlist;