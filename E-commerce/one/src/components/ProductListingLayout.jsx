import React from 'react';

// Assuming you have components for the main parts of your page
// These names are based on the structure visible in your images.
import ProductGrid from './section.jsx';
import Main4 from './main4.jsx'; 
import PriceFilter from './PriceFilter.jsx'; 
import PopularProducts from './popularproducts.jsx';
import CategorySidebar from './CategorySidebar.jsx';
import Newproducts from './Newproducts.jsx';
import S1 from './s1.jsx';
import Category2 from './category2.jsx';
import section from './section.jsx';
/**
 * A layout component tailored for the product listing page.
 * It provides a main content area for the category tabs and product grid,
 * and a dedicated sidebar area for filters and promotional content.
 */
const ProductListingLayout = ({ children }) => {
    return (
        // Container for the whole page section. container-fluid provides full width.
        <div className="product-listing-wrapper container-fluid py-4">
            
            {/* 🌟 1. FULL WIDTH COMPONENT 🌟 */}
            <div className="mb-4">
                <Main4/>
            </div>
            
            {/* 2. TWO-COLUMN GRID (Corrected to be a single 'row' container) */}
            <div className="row">
                
                {/* 2a. MAIN CONTENT COLUMN (Left side: 9/12 on large, 8/12 on medium) */}
                <div className='content-column col-lg-9 col-md-8'>
                    {children}
                </div>
                
                {/* 2b. SIDEBAR COLUMN (Right side: 3/12 on large, 4/12 on medium) 
                    🎯 KEY FIX: Moved the sidebar column to be the *last* child 
                    inside the "row" to position it on the right.
                */}
                <div 
                    className="sidebar-column col-lg-3 col-md-4" 
                    // style={{ backgroundColor: '#f8f9fa' }} // Optional: For visual debugging
                >
                    
                    {/* Renders standard sidebar content */}
                    <div className="mb-4">
                        <CategorySidebar />
                    </div>

                    <div className="mb-4">
                        <PriceFilter />
                    </div>

                    <div className="mb-4">
                        <Newproducts />
                    </div>
                    
                    {/* The S1 component at the bottom */}
                    <S1 /> 
                    
                </div>
                
            </div> {/* End of the single 'row' container */}
             <div className="mb-4">
                <Category2/>
            </div>
            <div className="mb-4">
               <ProductGrid/>
            </div>
        </div>
    );
};

export default ProductListingLayout;