// src/components/CategorySidebar.jsx

import React from 'react';
// 🚨 Adjust this path if your images folder is NOT directly inside 'src/components'
// Based on your folder structure, it looks like it is.
import logo from '../images/logo.svg'; 
import custardapple from '../images/custardapple.png';
import packedfood from '../images/packedfood.png';
import strawberry from '../images/strawberry.png'; 
import { Card, ListGroup, Badge } from 'react-bootstrap';

// Define the exact colors from the UI design
const UI_COLORS = {
  headerBg: '#FFFFFF',
  cardBorderColor: 'rgba(0, 0, 0, 0.05)', // Very light gray border
  cardShadow: '0 4px 12px rgba(0, 0, 0, 0.06)', // Subtle shadow
  countBg: '#ECF5F0', // Light green background for the count badge
  countText: '#3B8267', // Darker green text for the count badge
  categoryText: '#253D4E', // Dark text for category name
  activeHoverBg: '#F3FBF5', // Lightest green for hover effect
};

const CategorySidebar = () => {
  // Data structure to hold category details
  const categories = [
    // Note: Using logo.svg and custardapple.png as placeholders for the custom icons
    { name: "Milks & Dairies", count: 30, imageSrc: custardapple },
    { name: "Clothing", count: 35, imageSrc: logo }, 
    { name: "Pet Foods", count: 42, imageSrc: packedfood },
    { name: "Baking material", count: 68, imageSrc: packedfood }, 
    { name: "Fresh Fruit", count: 87, imageSrc: strawberry },
  ];

  return (
    // Card with rounded corners, subtle border, and shadow
    <Card 
      className="category-sidebar-card mb-4"
      style={{ 
        borderRadius: '15px', 
        border: `1px solid ${UI_COLORS.cardBorderColor}`, 
        boxShadow: UI_COLORS.cardShadow 
      }}
    >
      <Card.Body className="p-0">
        
        {/* === 1. Category Header === */}
        <h5 
          className="card-title p-3 mb-0" 
          style={{ 
            fontWeight: 700, 
            fontSize: '1.2rem', 
            color: UI_COLORS.categoryText,
            paddingBottom: '0.75rem',
          }}
        >
          Category
          {/* Green underline styling */}
          <div style={{ width: '40px', height: '3px', backgroundColor: UI_COLORS.countText, marginTop: '5px' }} />
        </h5>

        {/* === 2. Category List === */}
        <ListGroup variant="flush">
          {categories.map((category, index) => (
            <ListGroup.Item 
              key={index} 
              action
              // Apply border radius to the first and last item for perfect matching with the card
              className={`d-flex justify-content-between align-items-center py-3 px-3 category-item ${index === categories.length - 1 ? 'border-bottom-0 rounded-bottom' : ''}`}
              style={{ 
                borderLeft: 'none', 
                borderRight: 'none', 
                backgroundColor: UI_COLORS.headerBg,
                // Custom hover effect to match the light green background
                '--bs-list-group-action-hover-bg': UI_COLORS.activeHoverBg,
              }}
            >
              <div className="d-flex align-items-center">
                {/* Icon/Image (with gradient style applied via CSS/image asset) */}
                <img 
                  src={category.imageSrc} 
                  alt={category.name} 
                  className="me-3"
                  // Adjust size to match the UI icon size
                  style={{ width: '30px', height: '30px', objectFit: 'contain' }} 
                />
                <span style={{ color: UI_COLORS.categoryText, fontWeight: 600, fontSize: '0.95rem' }}>
                  {category.name}
                </span>
              </div>
              
              {/* Count Badge */}
              <Badge 
                pill 
                bg="light" 
                className="category-count"
                style={{ 
                  backgroundColor: UI_COLORS.countBg, 
                  color: UI_COLORS.countText, 
                  fontSize: '0.8rem', 
                  fontWeight: 700,
                  minWidth: '35px', 
                  padding: '5px 8px' // Adjusted padding for larger pill size
                }}
              >
                {category.count}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default CategorySidebar;