import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'; 
import { Link } from 'react-router-dom'; 
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBalanceScale, FaUserCircle, FaMapMarkerAlt, FaTag, FaHeart as FaHeartOutline, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../images/logo.svg'; 
// import MyAccount from '../pages/MyAccount'; 

// ----------------------------------------------------------------------
// 1. Helper Function for generic icon links
// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------
// 2. Custom Dropdown Toggle for Account Icon
// ----------------------------------------------------------------------

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        ref={ref}
        onClick={onClick} 
        className="d-flex flex-column align-items-center text-dark mx-3 text-decoration-none cursor-pointer"
        style={{ userSelect: 'none' }} 
    >
        <span className="position-relative">
            <FaUser size={20} color="#28a745" />
        </span>
        <small className="mt-1">Account</small>
    </div>
));
CustomToggle.displayName = 'CustomToggle'; 

// ----------------------------------------------------------------------
// 3. Account Dropdown Component with Hover Logic (Optimized for Stability)
// ----------------------------------------------------------------------

const AccountDropdown = () => {
    const [show, setShow] = useState(false);
    
    const dropdownItems = [
        { icon: FaUserCircle, label: 'My Account', path: '/account' },
        { icon: FaMapMarkerAlt, label: 'Order Tracking', path: '/orders' },
        { icon: FaTag, label: 'My Voucher', path: '/vouchers' },
        { icon: FaHeartOutline, label: 'My Wishlist', path: '/wishlist' },
        { icon: FaCog, label: 'Setting', path: '/settings' },
        { icon: FaSignOutAlt, label: 'Sign out', path: '/sign-out' },
    ];

    return (
        <Dropdown 
            show={show} 
            onToggle={(isOpen) => setShow(isOpen)} 
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            align="end" 
            as="span" 
        >
            <Dropdown.Toggle as={CustomToggle} id="account-dropdown-toggle" />

            <Dropdown.Menu 
                className="shadow border-0 py-2" // Added py-2 for padding
                style={{ 
                    minWidth: '200px', 
                    marginTop: '0 !important', // ⭐ REMOVED VERTICAL GAP
                    position: 'absolute',
                    zIndex: 1050
                }} 
            >
                {dropdownItems.map((item, index) => (
                    <Dropdown.Item 
                        key={index} 
                        as={Link} 
                        to={item.path} 
                        className="d-flex align-items-center py-2"
                    >
                        {React.createElement(item.icon, { className: 'me-3', size: 18, color: '#6c757d' })}
                        {item.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

// ----------------------------------------------------------------------
// 4. Main Header Component
// ----------------------------------------------------------------------

const Header = () => {
    return (
        <div className="bg-white py-3 border-bottom">
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
                                <Dropdown as={InputGroup.Append}>
                                    <Dropdown.Toggle 
                                        variant="light" 
                                        id="dropdown-basic" 
                                        className="border-end-0"
                                        style={{ backgroundColor: '#f5f5f5', borderTopLeftRadius: '0.25rem', borderBottomLeftRadius: '0.25rem', padding: '0.375rem 1.5rem' }}
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
                                <Button variant="outline-success" type="submit" 
                                            style={{ border: '1px solid #28a745', borderLeft: 'none', backgroundColor: '#fff' }}>
                                    <FaSearch />
                                </Button>
                            </InputGroup>
                        </Form>
                    </div>

                    {/* Icons */}
                    <div className="d-flex align-items-center ms-auto">
                        {renderIconLink(<FaBalanceScale />, 'Compare', 0, Link, '/compare')}
                        {renderIconLink(<FaHeart />, 'Wishlist', 15, Link, '/wishlist')}
                        {renderIconLink(<FaShoppingCart />, 'Cart', 2, Link, '/cart')} 
                        
                        {/* Account Dropdown is inserted here */}
                        <AccountDropdown /> 
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default Header;