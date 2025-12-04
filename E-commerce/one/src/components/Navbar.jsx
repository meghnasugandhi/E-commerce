// src/components/Navbar.jsx
import React from 'react';
// 🚨 STEP 1: Link component is already imported
import { Link } from 'react-router-dom'; 
import { 
    Navbar, 
    Nav, 
    NavDropdown, 
    Button, 
    Dropdown, 
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { 
    FaThList, 
    FaTags, 
    FaHeadset, 
    FaPlus,
    FaAngleDown,
    FaAngleRight 
} from 'react-icons/fa'; 

// Assuming this image path is correct in your project structure
import megaMenuBannerImage from '../images/banner-menu.png'; 

// --- MODIFIED: Update homeLinks to use the correct path format ---
const homeLinks = [
    { name: "Home 1", path: "/home/Home1" },
    { name: "Home 2", path: "/home/Home2" },
    { name: "Home 3", path: "/home/Home3" },
    { name: "Home 4", path: "/home/Home4" },
    { name: "Home 5", path: "/home/Home5" },
    { name: "Home 6", path: "/home/Home6" },
];

// --- ✅ MODIFIED: The complete pagesLinks array with React Router paths ---
const pagesLinks = [
    // Matches the image order
    { name: "About Us", path: "/pages/about-us" },
    { name: "Contact", path: "/pages/contact" },
    { name: "My Account", path: "/account/my-account" },
    { name: "Login", path: "/account/login" },
    { name: "Register", path: "/account/register" },
    { name: "Forgot password", path: "/account/forgot-password" },
    { name: "Reset password", path: "/account/reset-password" },
    { name: "Purchase Guide", path: "/pages/purchase-guide" },
    { name: "Privacy Policy", path: "/pages/privacy-policy" },
    { name: "Terms of Service", path: "/pages/terms-of-service" },
    { name: "404 Page", path: "/404" },
];

// ... (rest of blogLinks, vendorLinks, shopLinks, categories, megaMenuContent data arrays remain the same)
const blogLinks = [
    { name: "Blog Category Grid", link: "#blog/category/grid" },
    { name: "Blog Category List", link: "#blog/category/list" },
    { name: "Blog Category Big", link: "#blog/category/big" },
    { name: "Blog Category Wide", link: "#blog/category/wide" },
    { name: "Single Post", link: "#blog/single/post", hasSubmenu: true },
];

const vendorLinks = [
    { name: "Vendors Grid", link: "#vendors/grid" },
    { name: "Vendors List", link: "#vendors/list" },
    { name: "Vendor Details 01", link: "#vendor/details/01" },
    { name: "Vendor Details 02", link: "#vendor/details/02" },
    { name: "Vendor Dashboard", link: "#vendor/dashboard" },
    { name: "Vendor Guide", link: "#vendor/guide" },
];

const shopLinks = [
    { name: "Shop Grid – Right Sidebar", link: "#shop/grid/right" },
    { name: "Shop Grid – Left Sidebar", link: "#shop/grid/left" },
    { name: "Shop List – Right Sidebar", link: "#shop/list/right" },
    { name: "Shop List – Left Sidebar", link: "#shop/list/left" },
    { name: "Shop – Wide", link: "#shop/wide" },
    { name: "Single Product", link: "#single/product", hasSubmenu: true },
    { name: "Shop – Filter", link: "#shop/filter" },
    { name: "Shop – Wishlist", link: "#shop/wishlist" },
    { name: "Shop – Cart", link: "#shop/cart" },
    { name: "Shop – Checkout", link: "#shop/checkout" },
    { name: "Shop – Compare", link: "#shop/compare" },
    { name: "Shop Invoice", link: "#shop/invoice", hasSubmenu: true },
];

const categories = [
    { name: "Milks and Dairies", icon: "🥛" }, 
    { name: "Wines & Drinks", icon: "🍷" },
    { name: "Clothing & beauty", icon: "👗" },
    { name: "Fresh Seafood", icon: "🐟" },
    { name: "Pet Foods & Toy", icon: "🦴" },
    { name: "Fast food", icon: "🍔" },
    { name: "Baking material", icon: "🍞" },
    { name: "Vegetables", icon: "🥦" },
    { name: "Fresh Fruit", icon: "🍎" },
    { name: "Bread and Juice", icon: "🥖" },
];

const megaMenuContent = [
    {
        title: "Fruit & Vegetables",
        links: [
            { name: "Meat & Poultry", link: "#" },
            { name: "Fresh Vegetables", link: "#" },
            { name: "Herbs & Seasonings", link: "#" },
            { name: "Cuts & Sprouts", link: "#" },
            { name: "Exotic Fruits & Veggies", link: "#" },
            { name: "Packaged Produce", link: "#" },
        ]
    },
    {
        title: "Breakfast & Dairy",
        links: [
            { name: "Milk & Flavoured Milk", link: "#" },
            { name: "Butter and Margarine", link: "#" },
            { name: "Eggs Substitutes", link: "#" },
            { name: "Marmalades", link: "#" },
            { name: "Sour Cream", link: "#" },
            { name: "Cheese", link: "#" },
        ]
    },
    {
        title: "Meat & Seafood",
        links: [
            { name: "Breakfast Sausage", link: "#" },
            { name: "Dinner Sausage", link: "#" },
            { name: "Chicken", link: "#" },
            { name: "Sliced Deli Meat", link: "#" },
            { name: "Wild Caught Fillets", link: "#" },
            { name: "Crab and Shellfish", link: "#" },
        ]
    }
];


const CustomNavbar = () => {
    
    // ... (Your existing styles remain the same)
    const categoryMenuStyle = {
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        width: '550px',
        left: '0',
        marginTop: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    };
    
    const categoryItemStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        margin: '5px',
        borderRadius: '8px',
        border: '1px solid #eee',
        transition: 'background-color 0.2s',
        cursor: 'pointer',
        backgroundColor: 'white',
        fontWeight: '500'
    };
    
    const showMoreStyle = {
        color: '#28a745',
        fontWeight: 'bold',
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    };
    
    const menuItemStyle = {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#333',
        fontWeight: '500',
        transition: 'background-color 0.1s',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };
    
    const menuContainerStyle = {
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        minWidth: '250px'
    };

    const megaMenuStyle = {
        minWidth: '950px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '30px',
        position: 'absolute',
        left: '0',
        transform: 'translateX(0)',
        marginTop: '10px'
    };

    const megaMenuColumnStyle = {
        flex: 1, 
        minWidth: '150px',
    };

    const megaMenuTitleStyle = {
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: '15px',
        fontSize: '1.1rem',
        paddingLeft: '20px'
    };
    
    const megaMenuLinkStyle = {
        padding: '5px 20px',
        fontSize: '0.95rem',
        color: '#555',
        fontWeight: '400',
        transition: 'color 0.2s ease-in-out',
        display: 'block'
    };

    const megaMenuBannerStyle = {
        flexShrink: 0,
        width: '300px',
        backgroundColor: '#fce4ec',
        borderRadius: '8px',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };

    return (
        <Navbar expand="lg" className="py-3" style={{ borderBottom: '1px solid #eee' }}>
            <Container fluid className="px-5">
                <Row className="w-100 align-items-center">
                    {/* Left Section - Categories Dropdown */}
                    <Col lg="auto" className="pe-0">
                        <Dropdown>
                            <Dropdown.Toggle 
                                variant="success" 
                                id="categories-dropdown"
                                className="d-flex align-items-center"
                                style={{ backgroundColor: '#28a745', borderColor: '#28a745', fontWeight: 'bold' }}
                            >
                                <FaThList className="me-2" /> 
                                Browse All Categories
                                <FaAngleDown className="ms-2" /> 
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={categoryMenuStyle}>
                                <div className="d-flex flex-wrap">
                                    {categories.map((cat, index) => (
                                        <div key={index} style={{ width: '50%' }}>
                                            <div 
                                                style={categoryItemStyle} 
                                                onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f8e9'}
                                                onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                                            >
                                                <div style={{ fontSize: '1.8rem', color: '#28a745', marginRight: '10px' }}>
                                                    {cat.icon} 
                                                </div>
                                                {cat.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Dropdown.Item as="div" style={showMoreStyle} onClick={() => alert("Show More Categories!")}>
                                    <FaPlus className="me-2" /> Show more...
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    {/* Center Section - Navigation Links */}
                    <Col lg className="px-0">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="w-100 justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    {/* Deals Link */}
                                    <Nav.Link href="#deals" className="d-flex align-items-center me-3" style={{ color: '#28a745', fontWeight: 'bold' }}>
                                        <FaTags className="me-2" />
                                        **Deals**
                                    </Nav.Link>

                                    {/* Home Dropdown using Link */}
                                    <NavDropdown 
                                        title={<span style={{ color: '#28a745', fontWeight: 'bold' }}>Home</span>} 
                                        id="home-dropdown" 
                                        className="me-3" 
                                        menuVariant="light"
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        <div style={menuContainerStyle}>
                                            {homeLinks.map((item, index) => (
                                                // Link implementation
                                                <NavDropdown.Item 
                                                    key={index} 
                                                    as={Link} 
                                                    to={item.path} 
                                                    style={menuItemStyle}
                                                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                                                >
                                                    {item.name}
                                                </NavDropdown.Item>
                                            ))}
                                        </div>
                                    </NavDropdown>

                                    {/* Regular Links */}
                                    <Nav.Link href="#about" className="me-3" style={{ color: 'black', fontWeight: 'bold' }}>About</Nav.Link>
                                    
                                    {/* Shop Dropdown */}
                                    <NavDropdown 
                                        title="Shop" 
                                        id="shop-dropdown" 
                                        className="me-3" 
                                        style={{ fontWeight: 'bold' }}
                                        menuVariant="light"
                                    >
                                        <div style={menuContainerStyle}>
                                            {shopLinks.map((item, index) => (
                                                <NavDropdown.Item 
                                                    key={index} 
                                                    href={item.link} 
                                                    style={menuItemStyle}
                                                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                                                >
                                                    {item.name}
                                                    {item.hasSubmenu && <FaAngleRight size={12} />}
                                                </NavDropdown.Item>
                                            ))}
                                        </div>
                                    </NavDropdown>

                                    {/* VENDORS Dropdown */}
                                    <NavDropdown 
                                        title="Vendors" 
                                        id="vendors-dropdown" 
                                        className="me-3" 
                                        style={{ fontWeight: 'bold' }}
                                        menuVariant="light"
                                    >
                                        <div style={menuContainerStyle}>
                                            {vendorLinks.map((item, index) => (
                                                <NavDropdown.Item 
                                                    key={index} 
                                                    href={item.link} 
                                                    style={menuItemStyle}
                                                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                                                >
                                                    {item.name}
                                                </NavDropdown.Item>
                                            ))}
                                        </div>
                                    </NavDropdown>
                                    
                                    {/* MEGA MENU Dropdown */}
                                    <NavDropdown 
                                        title="Mega menu" 
                                        id="mega-menu-dropdown" 
                                        className="me-3 position-static" 
                                        style={{ fontWeight: 'bold' }}
                                        menuVariant="light"
                                    >
                                        <Dropdown.Menu style={megaMenuStyle}> 
                                            {megaMenuContent.map((column, colIndex) => (
                                                <div key={colIndex} style={megaMenuColumnStyle}>
                                                    <h6 style={megaMenuTitleStyle}>{column.title}</h6>
                                                    {column.links.map((link, linkIndex) => (
                                                        <NavDropdown.Item 
                                                            key={linkIndex} 
                                                            href={link.link} 
                                                            as="a" 
                                                            style={megaMenuLinkStyle}
                                                            onMouseOver={e => e.currentTarget.style.color = '#28a745'} 
                                                            onMouseOut={e => e.currentTarget.style.color = '#555'}
                                                        >
                                                            {link.name}
                                                        </NavDropdown.Item>
                                                    ))}
                                                </div>
                                            ))}

                                            {/* The Hot Deals Banner */}
                                            <div style={megaMenuBannerStyle}>
                                                <span style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '0.8rem', color: '#999' }}>HOT DEALS</span>
                                                
                                                <div style={{
                                                    position: 'absolute', top: '15px', right: '15px', 
                                                    backgroundColor: '#ffeb3b', color: '#333', 
                                                    borderRadius: '50%', width: '60px', height: '60px', 
                                                    display: 'flex', flexDirection: 'column', 
                                                    justifyContent: 'center', alignItems: 'center', 
                                                    fontWeight: 'bold', fontSize: '0.9rem', lineHeight: '1'
                                                }}>
                                                    <span>25%</span>
                                                    <span>off</span>
                                                </div>
                                                
                                                <h3 style={{ fontWeight: 'bold', color: '#333', marginTop: '40px', fontSize: '1.6rem', lineHeight: '1.2' }}>
                                                    Don't miss <br/>
                                                    <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '1.3rem' }}>Trending</span>
                                                </h3>
                                                
                                                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>Save to 50%</p>
                                                
                                                <img 
                                                    src={megaMenuBannerImage} 
                                                    alt="Hot Deals Banner" 
                                                    style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain', marginTop: 'auto' }}
                                                />
                                                
                                                <Button variant="success" style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: 'white', fontWeight: 'bold', marginTop: '15px' }}>
                                                    Shop now
                                                </Button>
                                            </div>
                                        </Dropdown.Menu>
                                    </NavDropdown>
                                    
                                    {/* BLOG Dropdown */}
                                    <NavDropdown 
                                        title="Blog" 
                                        id="blog-dropdown" 
                                        className="me-3" 
                                        style={{ fontWeight: 'bold' }}
                                        menuVariant="light"
                                    >
                                        <div style={menuContainerStyle}>
                                            {blogLinks.map((item, index) => (
                                                <NavDropdown.Item 
                                                    key={index} 
                                                    href={item.link} 
                                                    style={menuItemStyle}
                                                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                                                >
                                                    {item.name}
                                                    {item.hasSubmenu && <FaAngleRight size={12} />}
                                                </NavDropdown.Item>
                                            ))}
                                        </div>
                                    </NavDropdown>

                                    {/* PAGES Dropdown - UPDATED TO USE REACT ROUTER LINK */}
                                    <NavDropdown 
                                        title={<span style={{ fontWeight: 'bold', color: '#28a745' }}>Pages</span>} 
                                        id="pages-dropdown" 
                                        className="me-3" 
                                        style={{ fontWeight: 'bold' }}
                                        menuVariant="light"
                                    >
                                        <div style={menuContainerStyle}>
                                            {pagesLinks.map((item, index) => (
                                                // 🚨 KEY CHANGE: Using as={Link} and the 'to' prop
                                                <NavDropdown.Item 
                                                    key={index} 
                                                    as={Link} // Use Link component
                                                    to={item.path} // Use the correct path 
                                                    style={menuItemStyle}
                                                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f1f1'}
                                                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
                                                >
                                                    {item.name}
                                                </NavDropdown.Item>
                                            ))}
                                        </div>
                                    </NavDropdown>

                                    <Nav.Link href="#contact" className="me-3" style={{ color: 'black', fontWeight: 'bold' }}>Contact</Nav.Link>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>

                    {/* Right Section - Support Center */}
                    <Col lg="auto" className="ps-0">
                        <div className="d-flex align-items-center justify-content-end">
                            <FaHeadset size={30} style={{ color: '#28a745' }} />
                            <div className="ms-3 text-end">
                                <div style={{ fontSize: '1.5rem', color: '#28a745', fontWeight: 'bolder', lineHeight: '1' }}>
                                    **1900 - 888**
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                                    24/7 Support Center
                                </div>
                            </div>
                        </div>
                    </Col> 
                </Row>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;