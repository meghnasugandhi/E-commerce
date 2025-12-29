// E-commerce/Backend/routes/account.js

// 1. Change 'require' to 'import'
import express from 'express'; 
const router = express.Router();

// --- MOCK DATA STORE (unchanged content) ---
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
// ... (rest of mock data remains the same)

let mockAddresses = [
    // ... (mockAddresses content remains the same)
];

const mockOrders = [
    // ... (mockOrders content remains the same)
];

// ---------------------------------------------------------------------

// ... (all router definitions remain the same) ...

/**
 * FIX: Route for the base /api/account path
 * Responds gracefully to a GET request on the root path of this router.
 */
router.get('/', (req, res) => {
    // ... (route content remains the same)
});

// ... (all other routes for /details, /orders, /addresses, /track/:trackingId remain the same) ...


// 2. Change 'module.exports' to 'export default'
export default router; // <--- THIS IS THE FINAL FIX for the export error