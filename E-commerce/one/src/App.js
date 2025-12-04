// src/App.jsx

import React from 'react';
// 🚨 IMPORTANT: Add 'Navigate' and ensure 'BrowserRouter as Router' is present
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 

// Import Layout Components
import Header from './components/header.jsx';
import CustomNavbar from './components/Navbar.jsx'; 
import Footer from './components/footer.jsx'; 

// 🚨 STEP 1: IMPORT THE NEW HOME VERSIONS MANAGER
// This component now handles which of the 6 UIs to display based on the URL.
import HomeVersions from './components/HomeVersions.jsx'; 

// Import the Cart Page
import CartPage from './pages/cart.jsx'; 
import MyAccount from './pages/MyAccount.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// 🚨 STEP 2: REMOVE all the individual home content imports (MainContent, PopularProducts, etc.)
// They are now only used inside HomeVersions.jsx
// import MainContent from './components/main.jsx'; // REMOVE
// import FeaturedCategory from './components/featuredcategory.jsx'; // REMOVE
// ... etc.

function App() {
  return (
    <Router> 
      <div className="App">
        {/* Header and Navbar stay here, outside of Routes */}
        <Header/>
        <CustomNavbar/>

        <Routes>
          
          {/* 🚨 NEW ROUTE 1: Dynamic Home Route */}
          {/* This route captures the requested version (e.g., 'Home1', 'Home2') */}
          <Route 
            path="/home/:version" 
            element={<HomeVersions />} 
          />
          
          {/* 🚨 NEW ROUTE 2: Base Path Redirect */}
          {/* If the user types just /, they are automatically redirected to /home/Home1 */}
          <Route 
            path="/" 
            element={<Navigate to="/home/Home1" replace />} 
            
          />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/account/login" element={<Login/>} />
          <Route path="/account/register" element={<Register/>} />
   
          {/* Keep the Cart Route as it is */}
          <Route 
            path="/cart" 
            element={<CartPage />} 
          />
          <Route 
            path="/account" 
            element={<MyAccount />} 
          />

           
          {/* Add routes for other pages (like /account, /wishlist, /compare) here */}

        </Routes>

        {/* Footer stays here, outside of Routes */}
        <Footer/>
      </div>
    </Router>
  );
}

export default App;