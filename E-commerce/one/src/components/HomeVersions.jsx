// src/components/HomeVersions.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

// 🚨 STEP A: IMPORT ALL YOUR CONTENT COMPONENTS HERE
import MainContent from './main.jsx'; 
import FeaturedCategory from './featuredcategory.jsx';
import PopularProducts from './popularproducts.jsx';
import DealsOfTheDay from './dealsoftheday.jsx';
import DailyBestSells from './dailybestsells.jsx';
import Main2 from './main2.jsx';
import Category2 from './category2.jsx';

// Existing layout for Home3
import TwoColumnLayout from './TwoColumnLayout.jsx';
// 🌟 NEW: Importing the layout component created in the previous step
import ProductListingLayout from './ProductListingLayout.jsx'; 

import S2 from './s2';
import ProductGrid from './section.jsx'; 
import Main4 from './main4.jsx';

import ThreeColumnBanners from './Threecolumn.jsx';
import Home6 from './home6.jsx';

// Function to decide which UI to render
const renderHomeVersion = (versionName) => {
  switch (versionName) {
    case 'Home1':
      return (
        <>
          <MainContent/>
          <FeaturedCategory/>
          <PopularProducts/>
          <DailyBestSells/> 
          <DealsOfTheDay/> 
        </>
      );
    case 'Home2':
      return (
        <>
          
          <Main2/>
          <PopularProducts/>
          <DailyBestSells/>
          <DealsOfTheDay/>          
         <Category2/> 
        </>
      );
    case 'Home3':
      return (
        <>
          
          
          {/* WRAP THE CONTENT IN THE ORIGINAL TwoColumnLayout COMPONENT */}
          <TwoColumnLayout> 
            
            {/* These components will now render in the main (right) column */}
             <MainContent/>
            <DealsOfTheDay/> 
            <DailyBestSells/> 
<S2/>
            
            
          
 </TwoColumnLayout>
</>
 );
    // ⬇️ ADD CASES FOR HOME 4, 5, AND 6 HERE ⬇️
    case 'Home4':
      return (
        <>
          {/* 🌟 KEY CHANGE: Using ProductListingLayout (with filters on the side) */}
          <ProductListingLayout> 
            {/* These components will now be the main content (col-lg-9) */}
            
            
            
            <PopularProducts/>
            <DealsOfTheDay/>
            <S2/>
            
          </ProductListingLayout>
        </>
      );
    case 'Home5':
      return (
        <>
          {/* 1. The Category Cards (Top section of your image) */}
       
          
          {/* 2. The Three-Column Banners (Bottom section of your image) */}
          <ThreeColumnBanners/>
          <FeaturedCategory/>
          <PopularProducts/>
          {/* 3. Other components, like daily deals or main content */}
          <DailyBestSells/>
<DealsOfTheDay/> 
<ProductGrid/>
          <MainContent/>
        </>
      );
    case 'Home6':
      return (
        <>
         
            <Home6/>
            <PopularProducts/>
          <DealsOfTheDay/> 
         <ProductGrid/>
          
          <PopularProducts/>
          
        </>
      );
    default:
      return <h1>Home Page Version **{versionName}** Not Found.</h1>;
  }
};

function HomeVersions() {
  // Read the version (e.g., 'Home3') from the URL
  const { version } = useParams(); 

  return (
    <div className="home-versions-container">
      {renderHomeVersion(version)}
    </div>
  );
}

export default HomeVersions;