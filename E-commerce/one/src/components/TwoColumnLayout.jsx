import React from 'react';

// 🚨 IMPORTANT: You need to import the components that make up your fixed sidebar.
import CategorySidebar from './CategorySidebar'; // To hold "Category" list
import PriceFilter from './PriceFilter';       // To hold "Fill by price" filter and other filters
import Newproducts from './Newproducts';       // To hold "New products" section
import S1 from './s1'; // Large promotional component

import Category2 from './category2';
import ProductGrid from './section';
/**
 * A reusable layout component for pages that require a left-hand sidebar
 * for navigation and filtering, and a main content area on the right.
 */
const TwoColumnLayout = ({ children }) => {
    return (
        // The container needs proper padding/margins.
        <div className="two-column-wrapper container-fluid py-4"> 
            
            {/* Using 'row' with 'h-100' still helps with overall column stretching */}
            <div className="row h-100"> 
                
                {/* === 1. Left Column: Sidebar (col-lg-3) === */}
                <div 
                    className="sidebar-column col-lg-3 col-md-4" 
                    // Consider adding a background color here to visually confirm the height of the column itself
                    // style={{ backgroundColor: '#f8f9fa' }} 
                >
                    
                    {/* Renders standard sidebar content 
                        🎯 KEY CHANGE: Added 'mb-4' (margin-bottom: 1.5rem) to increase vertical spacing.
                    */}
                    <div className="mb-4">
                        <CategorySidebar />
                    </div>

                    <div className="mb-4">
                        <PriceFilter />
                    </div>

                    <div className="mb-4">
                        <Newproducts />
                    </div>
                    
                    {/* The S1 component at the bottom, kept without extra bottom margin */}
                    <S1 /> 
                    
                </div>

                {/* === 2. Right Column: Main Content (col-lg-9) === */}
                <div className="content-column col-lg-9 col-md-8">
                    
                    {children}
                    
                </div>
                <div>
                    <Category2/>
                    <ProductGrid/>
                </div>
            </div>
        </div>
    );
};

export default TwoColumnLayout;