import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'; 
import { Link } from 'react-router-dom'; 
import { 
    FaSearch, FaHeart, FaShoppingCart, FaUser, 
    FaBalanceScale, FaUserCircle, FaMapMarkerAlt, 
    FaTag, FaHeart as FaHeartOutline, FaCog, FaSignOutAlt 
} from 'react-icons/fa';
import Logo from '../images/logo.svg'; 

// --- Redux Selectors ---
export const selectCartCount = (state) => state.cart.count;
export const selectWishlistCount = (state) => state.wishlist.count;

// --- Helper for Badge Icons ---
const renderIconLink = (IconComponent, label, badgeCount, LinkComponent, path) => (
    <div className="d-flex flex-column align-items-center text-dark mx-3 text-decoration-none">
        <LinkComponent to={path} className="text-dark text-decoration-none d-flex flex-column align-items-center">
            <span className="position-relative">
                {React.cloneElement(IconComponent, { size: 20, color: '#28a745' })}
                {badgeCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge bg-success rounded-pill" 
                          style={{ fontSize: '0.6em', padding: '0.4em 0.6em', minWidth: '20px' }}>
                        {badgeCount}
                    </span>
                )}
            </span>
            <small className="mt-1">{label}</small>
        </LinkComponent>
    </div>
);

// --- Custom Toggle for Account ---
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={onClick} 
        className="d-flex flex-column align-items-center text-dark mx-3 text-decoration-none cursor-pointer"
        style={{ userSelect: 'none', cursor: 'pointer' }} 
    >
        <span className="position-relative">
            <FaUser size={20} color="#28a745" />
        </span>
        <small className="mt-1">Account</small>
    </div>
));
CustomToggle.displayName = 'CustomToggle'; 

// --- ✅ FIXED: Account Dropdown Component (NO VENDOR ITEMS) ---
const AccountDropdown = () => {
    const [show, setShow] = useState(false);
    
    // ✅ CORRECTED: Only Account-related items, NO vendor items
    const dropdownItems = [
        { icon: FaUserCircle, label: 'My Account', path: '/account' },
        { icon: FaMapMarkerAlt, label: 'Order Tracking', path: '/orders' },
        { icon: FaTag, label: 'My Voucher', path: '/vouchers' },
        { icon: FaHeartOutline, label: 'My Wishlist', path: '/wishlist' },
        { icon: FaCog, label: 'Settings', path: '/settings' },
        { icon: FaSignOutAlt, label: 'Sign out', path: '/logout' },
    ];

    return (
        <Dropdown 
            show={show} 
            onToggle={(isOpen) => setShow(isOpen)} 
            align="end" 
            as="span" 
        >
            <Dropdown.Toggle as={CustomToggle} id="account-dropdown-toggle" />

            <Dropdown.Menu 
                className="shadow border-0 py-2" 
                style={{ 
                    minWidth: '200px', 
                    marginTop: '5px',
                    position: 'absolute',
                    zIndex: 2000
                }} 
            >
                {dropdownItems.map((item, index) => (
                    <Dropdown.Item 
                        key={index} 
                        as={Link} 
                        to={item.path} 
                        className="d-flex align-items-center py-2"
                        style={{ transition: 'background-color 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        {React.createElement(item.icon, { className: 'me-3', size: 18, color: '#6c757d' })}
                        {item.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

// --- Main Header Component ---
const Header = () => {
    const cartCount = useSelector(selectCartCount); 
    const wishlistCount = useSelector(selectWishlistCount);

    return (
        <div className="bg-white py-3 border-bottom sticky-top" style={{ zIndex: 1000 }}>
            <Container fluid className="px-5">
                <div className="d-flex justify-content-between align-items-center">
                    
                    {/* Logo */}
                    <Link to="/" className="d-flex align-items-center"> 
                        <img src={Logo} height="40" alt="Nest Mart & Grocery Logo" />
                    </Link>

                    {/* Search Bar */}
                    <div className="d-none d-lg-flex w-100 mx-5"> 
                        <Form className="d-flex w-100 justify-content-center">
                            <InputGroup style={{ maxWidth: '600px', height: '45px' }}>
                                <Dropdown>
                                    <Dropdown.Toggle 
                                        variant="light" 
                                        className="border-end-0"
                                        style={{ 
                                            backgroundColor: '#f5f5f5', 
                                            borderTopRightRadius: '0', 
                                            borderBottomRightRadius: '0', 
                                            padding: '0.375rem 1.5rem' 
                                        }}
                                    >
                                        All Categories
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/categories/1">Category 1</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/categories/2">Category 2</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as={Link} to="/categories">More</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                
                                <Form.Control 
                                    type="search" 
                                    placeholder="Search for items..." 
                                    className="border-start-0"
                                    style={{ borderLeft: 'none' }}
                                />
                                <Button 
                                    variant="outline-success" 
                                    type="submit" 
                                    style={{ border: '1px solid #28a745', borderLeft: 'none', backgroundColor: '#fff' }}
                                >
                                    <FaSearch />
                                </Button>
                            </InputGroup>
                        </Form>
                    </div>

                    {/* Icons & Account */}
                    <div className="d-flex align-items-center ms-auto">
                        {renderIconLink(<FaBalanceScale />, 'Compare', 0, Link, '/compare')}
                        {renderIconLink(<FaHeart />, 'Wishlist', wishlistCount, Link, '/wishlist')}
                        {renderIconLink(<FaShoppingCart />, 'Cart', cartCount, Link, '/cart')} 
                        
                        <AccountDropdown /> 
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default Header;