// E-commerce/Backend/routes/account.js

const express = require('express');
const router = express.Router();

// --- MOCK DATA STORE (In a real app, this would be your database) ---
const mockUserData = {
    userName: 'Rosie',
    firstName: 'Rosie',
    lastName: 'Johnson',
    email: 'rosie.johnson@example.com',
    phone: '(123) 456-7890',
    company: 'TechCorp Inc.',
    country: 'United States',
    city: 'New York'
};

let mockAddresses = [
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
];

const mockOrders = [
    { id: '#12345', date: 'Nov 15, 2024', status: 'Delivered', total: '$245.99', items: 3 },
    { id: '#12344', date: 'Nov 10, 2024', status: 'Processing', total: '$189.50', items: 2 },
    { id: '#12343', date: 'Nov 5, 2024', status: 'Shipped', total: '$345.75', items: 4 }
];

// ---------------------------------------------------------------------

/**
 * FIX: Route for the base /api/account path
 * Responds gracefully to a GET request on the root path of this router.
 */
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the Account Dashboard API! Access specific data via /details, /orders, etc.',
        endpoints: ['/details', '/orders', '/addresses', '/track/:id']
    });
});

/**
 * 1. ACCOUNT DETAILS ROUTES
 * Handles fetching and updating user personal information.
 */
router.get('/details', (req, res) => {
    // In a real app: Retrieve user data based on the authenticated session/token
    res.json({
        success: true,
        data: mockUserData
    });
});

router.post('/details', (req, res) => {
    const { firstName, lastName, email, phone, company, country, city } = req.body;

    // Simulate updating the user data in the mock store
    mockUserData.firstName = firstName;
    mockUserData.lastName = lastName;
    mockUserData.email = email;
    mockUserData.phone = phone;
    mockUserData.company = company;
    mockUserData.country = country;
    mockUserData.city = city;
    mockUserData.userName = firstName; // Update the dashboard name

    res.json({
        success: true,
        message: 'Account details updated successfully!',
        userName: mockUserData.userName // Send updated name back to frontend
    });
});

router.post('/change-password', (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    // ⚠️ Real app: Check if currentPassword is correct (by hashing and comparing with DB hash)
    if (currentPassword === '12345' || true) { // Mock success
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'New passwords do not match.' });
        }
        // ⚠️ Real app: Hash and save the newPassword to the database
        res.json({ success: true, message: 'Password changed successfully!' });
    } else {
        res.status(401).json({ success: false, message: 'Incorrect current password.' });
    }
});

/**
 * 2. ORDERS ROUTES
 * Handles fetching list of orders.
 */
router.get('/orders', (req, res) => {
    res.json({
        success: true,
        data: mockOrders
    });
});

/**
 * 3. ADDRESS ROUTES
 * Handles CRUD operations for addresses.
 */
router.get('/addresses', (req, res) => {
    res.json({
        success: true,
        data: mockAddresses
    });
});

router.post('/addresses', (req, res) => {
    const newAddress = req.body;
    
    // Generate new ID (mock) and add to the array
    const newId = Date.now();
    const addressToSave = { ...newAddress, id: newId, isDefault: false };
    mockAddresses.push(addressToSave);
    
    res.status(201).json({
        success: true,
        message: 'Address added successfully!',
        data: addressToSave
    });
});

router.post('/addresses/default/:id', (req, res) => {
    const idToSetDefault = parseInt(req.params.id);
    
    // Mock setting default: clear previous default, set new default
    mockAddresses = mockAddresses.map(addr => ({
        ...addr,
        isDefault: addr.id === idToSetDefault
    }));

    res.json({
        success: true,
        message: 'Default address updated.',
        data: mockAddresses.find(addr => addr.id === idToSetDefault)
    });
});

router.delete('/addresses/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);

    // Prevent deleting the only address or a default address in a real scenario
    if (mockAddresses.length <= 1) {
        return res.status(400).json({ success: false, message: 'Cannot delete the last remaining address.' });
    }

    mockAddresses = mockAddresses.filter(addr => addr.id !== idToDelete);
    
    res.json({
        success: true,
        message: 'Address deleted successfully.'
    });
});


/**
 * 4. TRACK ORDER ROUTE
 * Handles fetching tracking information.
 */
router.get('/track/:trackingId', (req, res) => {
    const trackingId = req.params.trackingId;
    
    // Mock logic: return fixed info if ID exists, or a 404
    if (trackingId.startsWith('TRK')) {
        res.json({
            success: true,
            data: {
                id: trackingId,
                status: 'In Transit',
                estimatedDelivery: 'Dec 12, 2025',
                currentLocation: 'Distribution Center, Austin, TX',
                steps: [
                    { status: 'Order Placed', date: 'Dec 08', completed: true },
                    { status: 'Processing', date: 'Dec 09', completed: true },
                    { status: 'Shipped', date: 'Dec 10', completed: true },
                    { status: 'In Transit', date: 'Dec 11', completed: true },
                    { status: 'Out for Delivery', date: 'Dec 12', completed: false },
                    { status: 'Delivered', date: 'Dec 12', completed: false }
                ]
            }
        });
    } else {
        res.status(404).json({ success: false, message: 'Tracking ID not found.' });
    }
});


module.exports = router;