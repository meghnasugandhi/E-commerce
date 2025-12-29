import express from 'express'; 
import jwt from 'jsonwebtoken'; // 1. Import JWT
import { query } from '../services/db.service.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { 
        username, 
        email, 
        password, 
        confirmPassword, 
        securityCode, 
        userType, 
        agreedToTerms 
    } = req.body;

    const actualSecurityCode = '8675';

    // --- Server-Side Validation ---
    if (!username || !email || !password || !confirmPassword || !securityCode || !userType) {
        return res.status(400).json({ message: 'All required fields are missing.' });
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

    try {
        // 1. Check if user already exists
        const existingUsers = await query('SELECT id FROM users WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }
        
        // 2. Prepare the plain password for insertion
        const plainPassword = password;

        // 3. Save the new user to the database
        const insertQuery = `
            INSERT INTO users 
            (username, email, password_hash, user_type) 
            VALUES (?, ?, ?, ?)
        `;
        const values = [
            username, 
            email, 
            plainPassword,
            userType 
        ];

        const result = await query(insertQuery, values);

        // 4. GENERATE JWT TOKEN
        // We use the new ID from the database and the username provided
        const token = jwt.sign(
            { id: result.insertId, username: username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        console.log('New User Registered. Insert ID:', result.insertId);

        // 5. Send success response INCLUDING the token
        res.status(201).json({ 
            success: true,
            message: 'Account created successfully!', 
            token: token, // <--- Add this
            user: { 
                id: result.insertId, 
                username: username, 
                email: email,
                userType: userType
            } 
        });

    } catch (error) {
        console.error('Database registration error:', error);
        res.status(500).json({ message: 'An internal server error occurred during registration.' });
    }
});

export default router;