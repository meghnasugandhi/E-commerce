// login.js

const express = require('express');
const router = express.Router();

// --- Simple Mock Database/User Store ---
const MOCK_USER = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123' // REMINDER: Use a hashing library like bcrypt in production!
};

// Hardcoded CAPTCHA value from your frontend for simulation
const CAPTCHA_CODE = '8675'; 

// --- API Endpoint: POST /api/login ---
router.post('/login', (req, res) => {
    const { usernameOrEmail, password, securityCode } = req.body;
    
    // Basic input validation
    if (!usernameOrEmail || !password || !securityCode) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required.' 
        });
    }

    // 1. CAPTCHA Validation
    if (securityCode !== CAPTCHA_CODE) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid security code. Please check the CAPTCHA.' 
        });
    }

    // 2. User Authentication
    const isMatch = (
        (usernameOrEmail === MOCK_USER.username || usernameOrEmail === MOCK_USER.email) &&
        password === MOCK_USER.password
    );

    if (isMatch) {
        // Successful login
        // In a real app, you'd generate a JWT token here and send it back.
        return res.status(200).json({ 
            success: true, 
            message: 'Login successful! Welcome back.',
            user: { username: MOCK_USER.username, email: MOCK_USER.email }
        });
    } else {
        // Failed login
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid username/email or password.' 
        });
    }
});

module.exports = router;