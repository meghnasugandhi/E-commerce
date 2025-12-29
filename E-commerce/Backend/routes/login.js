import express from 'express';
import jwt from 'jsonwebtoken'; // 1. Import JWT
import { query } from '../services/db.service.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body; 
    
    if (!usernameOrEmail || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Username/Email and password are required.' 
        });
    }

    try {
        const sql = 'SELECT id, username, email, password_hash FROM users WHERE username = ? OR email = ?';
        const users = await query(sql, [usernameOrEmail, usernameOrEmail]);
        
        const user = users[0];

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid username/email or password.' 
            });
        }

        // --- PLAINTEXT COMPARISON ---
        const isPasswordValid = (password === user.password_hash);

        if (isPasswordValid) {
            // 2. Generate the JWT Token
            // We hide the user ID and username inside the token
            const token = jwt.sign(
                { id: user.id, username: user.username }, 
                process.env.JWT_SECRET, // Make sure this is in your .env file
                { expiresIn: '24h' }    // Token valid for 24 hours
            );

            // 3. Send the token back to the frontend
            return res.status(200).json({ 
                success: true, 
                message: 'Login successful! Welcome back.',
                token: token, // <--- The frontend will save this
                user: { 
                    id: user.id, 
                    username: user.username, 
                    email: user.email 
                }
            });
        } else {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid username/email or password.' 
            });
        }
    } catch (error) {
        console.error("❌ Login route database error:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: 'An internal server error occurred.' 
        });
    }
});

export default router;