import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Button, Form, Table, Alert } from 'react-bootstrap';
import {
  House,
  ClipboardCheck,
  Truck,
  GeoAlt,
  Person,
  BoxArrowRight,
  Speedometer2,
  CheckCircle,
  Pencil,
  Trash,
  Phone,
  Envelope,
  Map,
  Building,
  Globe,
  Calendar
} from 'react-bootstrap-icons';

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
      <Nav.Link
        onClick={() => setActiveSection('dashboard')}
        className={`d-flex align-items-center mb-2 p-3 rounded ${activeSection === 'dashboard' ? 'bg-success text-white' : 'text-dark'}`}
      >
        <Speedometer2 size={20} className="me-3" />
        <strong>Dashboard</strong>
      </Nav.Link>

      <Nav.Link
        onClick={() => setActiveSection('orders')}
        className={`d-flex align-items-center p-3 rounded ${activeSection === 'orders' ? 'bg-success text-white' : 'text-dark'}`}
      >
        <ClipboardCheck size={20} className="me-3" />
        Orders
      </Nav.Link>
      <Nav.Link
        onClick={() => setActiveSection('track-order')}
        className={`d-flex align-items-center p-3 rounded ${activeSection === 'track-order' ? 'bg-success text-white' : 'text-dark'}`}
      >
        <Truck size={20} className="me-3" />
        Track Your Order
      </Nav.Link>
      <Nav.Link
        onClick={() => setActiveSection('address')}
        className={`d-flex align-items-center p-3 rounded ${activeSection === 'address' ? 'bg-success text-white' : 'text-dark'}`}
      >
        <GeoAlt size={20} className="me-3" />
        My Address
      </Nav.Link>
      <Nav.Link
        onClick={() => setActiveSection('account-details')}
        className={`d-flex align-items-center p-3 rounded ${activeSection === 'account-details' ? 'bg-success text-white' : 'text-dark'}`}
      >
        <Person size={20} className="me-3" />
        Account Details
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          setActiveSection('logout');
          setTimeout(() => {
            alert('You have been logged out successfully!');
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
  const orders = [
    {
      id: '#12345',
      date: 'Nov 15, 2024',
      status: 'Delivered',
      total: '$245.99',
      items: 3
    },
    {
      id: '#12344',
      date: 'Nov 10, 2024',
      status: 'Processing',
      total: '$189.50',
      items: 2
    },
    {
      id: '#12343',
      date: 'Nov 5, 2024',
      status: 'Shipped',
      total: '$345.75',
      items: 4
    }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <h2 className="mb-4">My Orders</h2>
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
      </Card.Body>
    </Card>
  );
};

// Track Order Component
const TrackOrderContent = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);

  const trackOrder = () => {
    if (trackingId) {
      setTrackingInfo({
        id: trackingId,
        status: 'In Transit',
        estimatedDelivery: 'Nov 20, 2024',
        currentLocation: 'Distribution Center, Chicago',
        steps: [
          { status: 'Order Placed', date: 'Nov 15', completed: true },
          { status: 'Processing', date: 'Nov 16', completed: true },
          { status: 'Shipped', date: 'Nov 17', completed: true },
          { status: 'In Transit', date: 'Nov 18', completed: true },
          { status: 'Out for Delivery', date: 'Nov 19', completed: false },
          { status: 'Delivered', date: 'Nov 20', completed: false }
        ]
      });
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
              <Button variant="success" className="ms-2" onClick={trackOrder}>
                <Truck className="me-2" />
                Track
              </Button>
            </div>
            <Form.Text className="text-muted">
              You can find your tracking number in your order confirmation email.
            </Form.Text>
          </Form.Group>
        </div>

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
                  {index < trackingInfo.steps.length - 1 && (
                    <div className="flex-grow-1 ms-3">
                      <div className={`border-top ${step.completed ? 'border-success' : 'border-light'}`} style={{ height: '2px' }}></div>
                    </div>
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
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'Rosie Johnson',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      phone: '(123) 456-7890',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'Rosie Johnson',
      street: '456 Business Ave',
      city: 'Brooklyn',
      state: 'NY',
      zip: '11201',
      phone: '(987) 654-3210',
      isDefault: false
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  const handleAddAddress = () => {
    const newId = addresses.length + 1;
    setAddresses([...addresses, { ...newAddress, id: newId, isDefault: false }]);
    setNewAddress({
      type: 'Home',
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
    });
    setShowForm(false);
  };

  const setDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id) => {
    if (addresses.length > 1) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    } else {
      alert('You must have at least one address');
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">My Addresses</h2>
          <Button variant="success" onClick={() => setShowForm(!showForm)}>
            <Pencil className="me-2" />
            Add New Address
          </Button>
        </div>

        {showForm && (
          <Card className="mb-4">
            <Card.Body>
              <h5>Add New Address</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address Type</Form.Label>
                    <Form.Select
                      value={newAddress.type}
                      onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                  placeholder="Enter street address"
                />
              </Form.Group>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      placeholder="City"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                      placeholder="State"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={newAddress.zip}
                      onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                      placeholder="ZIP Code"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                  placeholder="Phone number"
                />
              </Form.Group>
              <div className="d-flex gap-2">
                <Button variant="success" onClick={handleAddAddress}>
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
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2"
                        onClick={() => setDefaultAddress(address.id)}
                      >
                        Set as Default
                      </Button>
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
const AccountDetailsContent = ({ userName, setUserName }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: 'Rosie',
    lastName: 'Johnson',
    email: 'rosie.johnson@example.com',
    phone: '(123) 456-7890',
    company: 'TechCorp Inc.',
    country: 'United States',
    city: 'New York'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveDetails = () => {
    alert('Account details updated successfully!');
    setUserName(`${userInfo.firstName}`);
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <h2 className="mb-4">Account Details</h2>
        
        <Form>
          <h5 className="mb-3">Personal Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={userInfo.lastName}
                  onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
            />
          </Form.Group>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  value={userInfo.company}
                  onChange={(e) => setUserInfo({...userInfo, company: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  value={userInfo.country}
                  onChange={(e) => setUserInfo({...userInfo, country: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={userInfo.city}
                  onChange={(e) => setUserInfo({...userInfo, city: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Button variant="success" className="mb-5" onClick={handleSaveDetails}>
            Save Changes
          </Button>
          
          <hr className="my-4" />
          
          <h5 className="mb-3">Change Password</h5>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Button variant="success" onClick={handleChangePassword}>
            Change Password
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

const MyAccount = ({ initialUserName = 'Rosie' }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userName, setUserName] = useState(initialUserName);

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
        return <AccountDetailsContent userName={userName} setUserName={setUserName} />;
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