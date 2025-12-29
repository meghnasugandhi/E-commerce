// src/App.jsx - CORRECTED

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 

// Import Layout Components
import Header from './components/header.jsx';
import CustomNavbar from './components/Navbar.jsx'; 
import Footer from './components/footer.jsx'; 

// Import Page Components
import HomeVersions from './components/HomeVersions.jsx'; 
import CartPage from './pages/cart.jsx'; 
import MyAccount from './pages/MyAccount.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Wishlist from './pages/Wishlist.jsx';
import ProductCompare from './pages/ProductCompare.jsx';
import ForgotPasswordUI from './pages/ForgotPasswordUI.jsx';
import Contact from './pages/Contact.jsx'; // Contact Page


function App() {
    return (
        <Router> 
            <div className="App">
                <Header/>
                <CustomNavbar/>

                <Routes>
                    <Route path="/pages/contact" element={<Contact />} />
                    
                    {/* 1. Base Path Redirect: / redirects to /home/Home1 */}
                    <Route 
                        path="/" 
                        element={<Navigate to="/home/Home1" replace />} 
                    />
                    
                    {/* 2. Dynamic Home Route: Handles /home/Home1, /home/Home2, etc. */}
                    <Route 
                        path="/home/:version" 
                        element={<HomeVersions />} 
                    />

                    {/* 3. CORE FIX: Account Dashboard Route (Must be uncommented and clean) */}
                    <Route 
                        path="/account" 
                        element={<MyAccount />} 
                    />
                    
                    {/* 4. Login and Register Pages (Adjusted to use clean paths /login and /register) */}
                    {/* NOTE: If you must use /account/login and /account/register, keep those paths. */}
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />

                    {/* Redirection for old paths, if needed: */}
                    <Route path="/account/login" element={<Navigate to="/login" replace />} />
                    <Route path="/account/register" element={<Navigate to="/register" replace />} />
            
                    {/* 5. Cart Route */}
                    <Route 
                        path="/cart" 
                        element={<CartPage />} 
                    />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route 
                        path="/compare" 
                        element={<ProductCompare />} 
                    />
                    <Route 
                        path="/account/forgot-password"
                        element={<ForgotPasswordUI />} 
                    />
                    
                    {/* 6. Fallback Route for 404 Not Found */}
                  
                </Routes>

                <Footer/>
            </div>
        </Router>
    );
}

export default App;