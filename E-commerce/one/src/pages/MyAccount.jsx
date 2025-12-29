import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Button, Form, Table, Alert, Spinner } from 'react-bootstrap';
import {
    House, ClipboardCheck, Truck, GeoAlt, Person, BoxArrowRight,
    Speedometer2, CheckCircle, Pencil, Trash, Phone, Map // Envelope and Globe removed
} from 'react-bootstrap-icons';
// import { Link } from 'react-router-dom'; 

const API_BASE_URL = 'http://localhost:5000/api/account'; // Base URL for the account backend

// --- Component Definitions ---

// Component to render the Breadcrumb navigation
const BreadcrumbNav = () => (
    <div className="mb-4">
        <span className="text-muted">
            <a href="/home" className="text-success text-decoration-none">
                <House size={16} className="me-1" />
                Home
            </a>
            <span className="mx-2">/</span>
            <a href="/pages" className="text-dark text-decoration-none">
                Pages
            </a>
            <span className="mx-2">/</span>
            My Account
        </span>
    </div>
);

// Component to render the sidebar navigation
const AccountSidebar = ({ activeSection, setActiveSection }) => (
    <Card className="border-0 shadow-sm">
        <Nav className="flex-column">
            {/* List of links */}
            {[
                { key: 'dashboard', label: 'Dashboard', Icon: Speedometer2 },
                { key: 'orders', label: 'Orders', Icon: ClipboardCheck },
                { key: 'track-order', label: 'Track Your Order', Icon: Truck },
                { key: 'address', label: 'My Address', Icon: GeoAlt },
                { key: 'account-details', label: 'Account Details', Icon: Person },
            ].map(({ key, label, Icon }) => (
                <Nav.Link
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`d-flex align-items-center p-3 rounded ${activeSection === key ? 'bg-success text-white' : 'text-dark'}`}
                >
                    <Icon size={20} className="me-3" />
                    <strong>{label}</strong>
                </Nav.Link>
            ))}
            
            {/* Logout Link */}
            <Nav.Link
                onClick={() => {
                    setActiveSection('logout');
                    setTimeout(() => {
                        alert('You have been logged out successfully!');
                        // Redirect to login page here in a real app
                        setActiveSection('dashboard');
                    }, 500);
                }}
                className="text-dark d-flex align-items-center p-3 rounded"
            >
                <BoxArrowRight size={20} className="me-3" />
                Logout
            </Nav.Link>
        </Nav>
    </Card>
);

// Dashboard Component
const DashboardContent = ({ userName, setActiveSection }) => (
    <Card className="border-0 shadow-sm">
        <Card.Body>
            <h2 className="mb-4">Hello {userName}!</h2>
            <p className="lead">
                From your account dashboard, you can easily check & view your{' '}
                <Button variant="link" className="text-success p-0" onClick={() => setActiveSection('orders')}>
                    recent orders
                </Button>
                , manage your{' '}
                <Button variant="link" className="text-success p-0" onClick={() => setActiveSection('address')}>
                    shipping and billing addresses
                </Button>{' '}
                and{' '}
                <Button variant="link" className="text-success p-0" onClick={() => setActiveSection('account-details')}>
                    edit your password and account details.
                </Button>
            </p>
            
            <div className="row mt-5">
                <div className="col-md-6 mb-4">
                    <Card className="h-100 border-success border-1">
                        <Card.Body>
                            <Card.Title className="text-success">
                                <ClipboardCheck className="me-2" />
                                Recent Orders
                            </Card.Title>
                            <Card.Text>
                                View your recent orders, check their status, and manage returns.
                            </Card.Text>
                            <Button variant="success" onClick={() => setActiveSection('orders')}>
                                View Orders
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6 mb-4">
                    <Card className="h-100 border-success border-1">
                        <Card.Body>
                            <Card.Title className="text-success">
                                <Person className="me-2" />
                                Account Details
                            </Card.Title>
                            <Card.Text>
                                Update your personal information, email, and password.
                            </Card.Text>
                            <Button variant="success" onClick={() => setActiveSection('account-details')}>
                                Edit Details
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Card.Body>
    </Card>
);

// Orders Component
const OrdersContent = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/orders`);
                const data = await response.json();
                
                if (response.ok && data.success) {
                    setOrders(data.data);
                } else {
                    setError(data.message || 'Failed to fetch orders.');
                }
            } catch (err) {
                setError('Network error: Could not connect to the backend.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <Alert variant="info" className="d-flex align-items-center"><Spinner animation="border" size="sm" className="me-2" /> Loading orders...</Alert>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body>
                <h2 className="mb-4">My Orders</h2>
                {orders.length === 0 ? (
                    <Alert variant="warning">You have no orders yet.</Alert>
                ) : (
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Items</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>
                                        <Button variant="link" className="p-0 text-decoration-none">
                                            {order.id}
                                        </Button>
                                    </td>
                                    <td>{order.date}</td>
                                    <td>
                                        <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : order.status === 'Shipped' ? 'bg-info' : 'bg-warning'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.total}</td>
                                    <td>{order.items} items</td>
                                    <td>
                                        <Button variant="outline-success" size="sm" className="me-2">
                                            View
                                        </Button>
                                        <Button variant="outline-danger" size="sm">
                                            Cancel
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
    );
};

// Track Order Component
const TrackOrderContent = () => {
    const [trackingId, setTrackingId] = useState('');
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const trackOrder = async () => {
        if (!trackingId) return;

        setLoading(true);
        setError(null);
        setTrackingInfo(null);

        try {
            const response = await fetch(`${API_BASE_URL}/track/${trackingId}`);
            const data = await response.json();

            if (response.ok && data.success) {
                setTrackingInfo(data.data);
            } else {
                setError(data.message || 'Order tracking failed. Please check the ID.');
            }
        } catch (err) {
            setError('Network error during tracking.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body>
                <h2 className="mb-4">Track Your Order</h2>
                <div className="mb-4">
                    <Form.Group>
                        <Form.Label>Enter Tracking Number</Form.Label>
                        <div className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="e.g., TRK123456789"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                            />
                            <Button variant="success" className="ms-2" onClick={trackOrder} disabled={loading}>
                                <Truck className="me-2" />
                                {loading ? 'Tracking...' : 'Track'}
                            </Button>
                        </div>
                        <Form.Text className="text-muted">
                            You can find your tracking number in your order confirmation email.
                        </Form.Text>
                    </Form.Group>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                
                {trackingInfo && (
                    <div className="mt-4">
                        <Alert variant="info">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>Tracking ID:</strong> {trackingInfo.id}
                                    <br />
                                    <strong>Status:</strong> {trackingInfo.status}
                                    <br />
                                    <strong>Estimated Delivery:</strong> {trackingInfo.estimatedDelivery}
                                </div>
                                <div className="text-end">
                                    <strong>Current Location:</strong><br />
                                    {trackingInfo.currentLocation}
                                </div>
                            </div>
                        </Alert>

                        <h5 className="mt-4 mb-3">Shipping Progress</h5>
                        <div className="tracking-progress">
                            {/* Simplified tracking steps display */}
                            {trackingInfo.steps.map((step, index) => (
                                <div key={index} className="d-flex align-items-center mb-3">
                                    <div className={`rounded-circle ${step.completed ? 'bg-success' : 'bg-light'} border border-success`}
                                        style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {step.completed ? <CheckCircle size={20} className="text-white" /> : <span className="text-muted">{index + 1}</span>}
                                    </div>
                                    <div className="ms-3">
                                        <strong>{step.status}</strong>
                                        <div className="text-muted">{step.date}</div>
                                    </div>
                                    {/* Line separator (simplified) */}
                                    {index < trackingInfo.steps.length - 1 && (
                                        <div className="flex-grow-1 ms-3" style={{ height: '2px', backgroundColor: step.completed ? '#28a745' : '#ccc', marginTop: '10px', marginBottom: '10px' }}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

// Address Component
const AddressContent = () => {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [newAddress, setNewAddress] = useState({
        type: 'Home', name: '', street: '', city: '', state: '', zip: '', phone: ''
    });

    const fetchAddresses = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/addresses`);
            const data = await response.json();
            if (response.ok && data.success) {
                setAddresses(data.data);
            } else {
                setError(data.message || 'Failed to load addresses.');
            }
        } catch (err) {
            setError('Network error: Could not load addresses.');
        } finally {
            setLoading(false);
        }
    };
    
    // Fetch Addresses on load
    useEffect(() => {
        fetchAddresses();
    }, []); // Empty dependency array means run once on mount

    // Add New Address
    const handleAddAddress = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/addresses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAddress)
            });
            const data = await response.json();
            
            if (response.ok && data.success) {
                setAddresses([...addresses, data.data]);
                setSuccessMessage(data.message);
                setShowForm(false);
                setNewAddress({ type: 'Home', name: '', street: '', city: '', state: '', zip: '', phone: '' });
            } else {
                setError(data.message || 'Failed to add address.');
            }
        } catch (err) {
            setError('Network error: Failed to save address.');
        }
    };

    // Set Default Address
    const setDefaultAddress = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/addresses/default/${id}`, {
                method: 'POST',
            });
            const data = await response.json();
            
            if (response.ok && data.success) {
                fetchAddresses(); // Re-fetch to update isDefault flags
                setSuccessMessage(data.message);
            } else {
                setError(data.message || 'Failed to set default address.');
            }
        } catch (err) {
            setError('Network error: Failed to set default.');
        }
    };

    // Delete Address
    const deleteAddress = async (id) => {
        if (addresses.length <= 1) {
            setError('You must have at least one address.');
            return;
        }
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/addresses/${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();

                if (response.ok && data.success) {
                    setAddresses(addresses.filter(addr => addr.id !== id));
                    setSuccessMessage(data.message);
                } else {
                    setError(data.message || 'Failed to delete address.');
                }
            } catch (err) {
                setError('Network error: Failed to delete address.');
            }
        }
    };

    if (loading) return <Alert variant="info" className="d-flex align-items-center"><Spinner animation="border" size="sm" className="me-2" /> Loading addresses...</Alert>;

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">My Addresses</h2>
                    <Button variant="success" onClick={() => setShowForm(!showForm)}>
                        <Pencil className="me-2" />
                        {showForm ? 'Cancel' : 'Add New Address'}
                    </Button>
                </div>

                {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
                {successMessage && <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>{successMessage}</Alert>}

                {showForm && (
                    <Card className="mb-4">
                        <Card.Body>
                            <h5>Add New Address</h5>
                            <Row>
                                <Col md={6}><Form.Group className="mb-3"><Form.Label>Address Type</Form.Label><Form.Select value={newAddress.type} onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}><option value="Home">Home</option><option value="Work">Work</option><option value="Other">Other</option></Form.Select></Form.Group></Col>
                                <Col md={6}><Form.Group className="mb-3"><Form.Label>Full Name</Form.Label><Form.Control type="text" value={newAddress.name} onChange={(e) => setNewAddress({...newAddress, name: e.target.value})} placeholder="Enter full name" /></Form.Group></Col>
                            </Row>
                            <Form.Group className="mb-3"><Form.Label>Street Address</Form.Label><Form.Control type="text" value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} placeholder="Enter street address" /></Form.Group>
                            <Row>
                                <Col md={4}><Form.Group className="mb-3"><Form.Label>City</Form.Label><Form.Control type="text" value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} placeholder="City" /></Form.Group></Col>
                                <Col md={4}><Form.Group className="mb-3"><Form.Label>State</Form.Label><Form.Control type="text" value={newAddress.state} onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} placeholder="State" /></Form.Group></Col>
                                <Col md={4}><Form.Group className="mb-3"><Form.Label>ZIP Code</Form.Label><Form.Control type="text" value={newAddress.zip} onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})} placeholder="ZIP Code" /></Form.Group></Col>
                            </Row>
                            <Form.Group className="mb-3"><Form.Label>Phone Number</Form.Label><Form.Control type="tel" value={newAddress.phone} onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})} placeholder="Phone number" /></Form.Group>
                            <div className="d-flex gap-2">
                                <Button variant="success" onClick={handleAddAddress} disabled={!newAddress.name || !newAddress.street}>
                                    Save Address
                                </Button>
                                <Button variant="outline-secondary" onClick={() => setShowForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                )}

                <Row>
                    {addresses.map((address) => (
                        <Col md={6} key={address.id} className="mb-4">
                            <Card className={`h-100 ${address.isDefault ? 'border-success border-2' : 'border'}`}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <span className="badge bg-success">{address.type}</span>
                                            {address.isDefault && (
                                                <span className="badge bg-primary ms-2">Default</span>
                                            )}
                                        </div>
                                        <div>
                                            {!address.isDefault && (
                                                <Button
                                                    variant="outline-success"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => setDefaultAddress(address.id)}
                                                >
                                                    Set as Default
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => deleteAddress(address.id)}
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                    <Card.Text>
                                        <strong>{address.name}</strong><br />
                                        <Map className="me-2" />
                                        {address.street}<br />
                                        {address.city}, {address.state} {address.zip}<br />
                                        <Phone className="me-2" />
                                        {address.phone}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
};

// Account Details Component
const AccountDetailsContent = ({ setParentUserName }) => {
    const [userInfo, setUserInfo] = useState({
        firstName: '', lastName: '', email: '', phone: '', company: '', country: '', city: ''
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '', newPassword: '', confirmPassword: ''
    });
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Fetch details on component mount - FIX FOR react-hooks/exhaustive-deps
    useEffect(() => {
        const fetchDetails = async () => {
            setLoadingDetails(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/details`);
                const data = await response.json();
                
                if (response.ok && data.success) {
                    setUserInfo(data.data);
                    // setParentUserName is a stable function from the parent, safe to use here.
                    setParentUserName(data.data.firstName); 
                } else {
                    setError(data.message || 'Failed to load account details.');
                }
            } catch (err) {
                setError('Network error: Could not load account details.');
            } finally {
                setLoadingDetails(false);
            }
        };

        fetchDetails();
    }, [setParentUserName]); 

    const handleSaveDetails = async () => {
        setError(null);
        setSuccessMessage(null);
        try {
            const response = await fetch(`${API_BASE_URL}/details`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo)
            });
            const data = await response.json();
            
            if (response.ok && data.success) {
                setSuccessMessage(data.message);
                setParentUserName(userInfo.firstName); // Update dashboard name
            } else {
                setError(data.message || 'Failed to save details.');
            }
        } catch (err) {
            setError('Network error: Failed to save details.');
        }
    };

    const handleChangePassword = async () => {
        setError(null);
        setSuccessMessage(null);
        setLoadingPassword(true);

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setError('New passwords do not match!');
            setLoadingPassword(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(passwordForm)
            });
            const data = await response.json();

            if (response.ok && data.success) {
                setSuccessMessage(data.message);
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setError(data.message || 'Failed to change password.');
            }
        } catch (err) {
            setError('Network error: Failed to change password.');
        } finally {
            setLoadingPassword(false);
        }
    };

    if (loadingDetails) return <Alert variant="info" className="d-flex align-items-center"><Spinner animation="border" size="sm" className="me-2" /> Loading account details...</Alert>;

    return (
        <Card className="border-0 shadow-sm">
            <Card.Body>
                <h2 className="mb-4">Account Details</h2>
                
                {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
                {successMessage && <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>{successMessage}</Alert>}
                
                <Form>
                    <h5 className="mb-3">Personal Information</h5>
                    <Row>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>First Name</Form.Label><Form.Control type="text" value={userInfo.firstName} onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}/></Form.Group></Col>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Last Name</Form.Label><Form.Control type="text" value={userInfo.lastName} onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}/></Form.Group></Col>
                    </Row>
                    
                    <Form.Group className="mb-3"><Form.Label>Email Address</Form.Label><Form.Control type="email" value={userInfo.email} onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}/></Form.Group>
                    
                    <Row>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Phone Number</Form.Label><Form.Control type="tel" value={userInfo.phone} onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}/></Form.Group></Col>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Company</Form.Label><Form.Control type="text" value={userInfo.company} onChange={(e) => setUserInfo({...userInfo, company: e.target.value})}/></Form.Group></Col>
                    </Row>
                    
                    <Row>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>Country</Form.Label><Form.Control type="text" value={userInfo.country} onChange={(e) => setUserInfo({...userInfo, country: e.target.value})}/></Form.Group></Col>
                        <Col md={6}><Form.Group className="mb-3"><Form.Label>City</Form.Label><Form.Control type="text" value={userInfo.city} onChange={(e) => setUserInfo({...userInfo, city: e.target.value})}/></Form.Group></Col>
                    </Row>
                    
                    <Button variant="success" className="mb-5" onClick={handleSaveDetails}>
                        Save Changes
                    </Button>
                    
                    <hr className="my-4" />
                    
                    <h5 className="mb-3">Change Password</h5>
                    <Row>
                        <Col md={4}><Form.Group className="mb-3"><Form.Label>Current Password</Form.Label><Form.Control type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}/></Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3"><Form.Label>New Password</Form.Label><Form.Control type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}/></Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3"><Form.Label>Confirm New Password</Form.Label><Form.Control type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}/></Form.Group></Col>
                    </Row>
                    
                    <Button variant="success" onClick={handleChangePassword} disabled={loadingPassword}>
                        {loadingPassword ? 'Changing...' : 'Change Password'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

// --- Main MyAccount Component ---

const MyAccount = ({ initialUserName = 'Rosie' }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [userName, setUserName] = useState(initialUserName); // State to hold the dynamic username

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <DashboardContent userName={userName} setActiveSection={setActiveSection} />;
            case 'orders':
                return <OrdersContent />;
            case 'track-order':
                return <TrackOrderContent />;
            case 'address':
                return <AddressContent />;
            case 'account-details':
                // Pass the setUserName function down so AccountDetails can update the dashboard name
                return <AccountDetailsContent setParentUserName={setUserName} />; 
            default:
                return <DashboardContent userName={userName} setActiveSection={setActiveSection} />;
        }
    };

    return (
        <Container className="my-5">
            <BreadcrumbNav />
            <Row>
                <Col md={3}>
                    <AccountSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
                </Col>
                <Col md={9}>
                    {renderContent()}
                </Col>
            </Row>
        </Container>
    );
};

export default MyAccount;