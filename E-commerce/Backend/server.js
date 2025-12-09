// E-commerce/Backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import your existing routers
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register'); 

// Import the new account router
const accountRouter = require('./routes/account'); // <--- NEW IMPORT

const app = express();
const PORT = 5000; 

// --- Middleware Setup ---
app.use(cors()); 
app.use(bodyParser.json());

// --- Routes ---
// Existing authentication routes
app.use('/api', loginRouter);
app.use('/api', registerRouter); 

// New route for all account-related operations
// You can structure this to require authentication middleware in a real app
app.use('/api/account', accountRouter); // <--- NEW ACCOUNT ROUTE

// --- Server Startup ---
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`Account routes available at http://localhost:${PORT}/api/account/...`);
});