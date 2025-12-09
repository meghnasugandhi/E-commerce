// E-commerce/Backend/routes/register.js

const express = require('express');
const router = express.Router();

// ⚠️ Note: In a real-world application, you would:
// 1. Hash the password (e.g., using bcrypt).
// 2. Validate the email/username is unique in your database.
// 3. Save the new user's details to the database (MongoDB, PostgreSQL, etc.).
// 4. Implement proper error handling and send meaningful status codes.

// Mock Database (Replace this with actual database integration)
const users = []; 

router.post('/register', (req, res) => {
    const { 
        username, 
        email, 
        password, 
        confirmPassword, 
        securityCode, 
        userType, 
        agreedToTerms 
    } = req.body;

    const actualSecurityCode = '8675'; // Matches the frontend logic

    // Basic Server-Side Validation
    if (!username || !email || !password || !confirmPassword || !securityCode) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    if (securityCode !== actualSecurityCode) {
        return res.status(400).json({ message: 'Security code is incorrect.' });
    }

    if (!agreedToTerms) {
        return res.status(400).json({ message: 'You must agree to terms & Policy.' });
    }

    // Check if user already exists (Mock check)
    if (users.find(user => user.email === email)) {
        return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // Create the new user object (Mock Save)
    const newUser = {
        id: Date.now(), // Mock ID
        username,
        email,
        // In production, save the HASHED password, not the raw one!
        password, 
        userType,
        createdAt: new Date()
    };
    users.push(newUser); // Save to mock array

    console.log('New User Registered:', newUser);

    // Send a success response
    res.status(201).json({ 
        message: 'Account created successfully!', 
        user: { 
            id: newUser.id, 
            username: newUser.username, 
            email: newUser.email,
            userType: newUser.userType
        } 
    });
});

module.exports = router;