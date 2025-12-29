// E-commerce/Backend/server.js

// 1. Core package imports (Note: no .js extension needed for packages)
import express from 'express';
import bodyParser from 'body-parser'; 
import cors from 'cors';

// 2. Local module imports (MUST include the .js extension)
import loginRouter from './routes/login.js';        // <--- .js added
import registerRouter from './routes/register.js';    // <--- .js added
import accountRouter from './routes/account.js';      // <--- .js added

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
app.use('/api/account', accountRouter); 

// --- Server Startup ---
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`Account routes available at http://localhost:${PORT}/api/account/...`);
});