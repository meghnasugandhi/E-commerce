import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Filter } from 'react-feather'; 

// 🚨 IMPORTANT: Adjust this path if your images folder is not directly in 'src/components'
// Based on the last successful compilation step (after I fixed the path)
import lettuceImage from '../images/saltedveggie.jpg'; 

// Define the exact colors from the UI design
const UI_COLORS = {
  primaryGreen: '#3BB77E', 
  lightGreen: '#ECF5F0',    
  headerText: '#253D4E',    
  priceValue: '#3BB77E',    
  cardShadow: '0 4px 12px rgba(0, 0, 0, 0.06)', 
  cardBorderColor: 'rgba(0, 0, 0, 0.05)',
};

const PriceFilter = () => {
  // State for Price Range (Using one state for the *maximum* value displayed by the single slider)
  // We'll set a hard min of 500 for the purpose of the UI clone
  const MIN_PRICE = 500;
  const MAX_SLIDER_VALUE = 1000;
  const [currentMaxPrice, setCurrentMaxPrice] = useState(MAX_SLIDER_VALUE);

  // State for Checkbox Filters
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedConditions, setSelectedConditions] = useState({});

  const colorFilters = [
    { label: "Red", count: 56, id: 'color-red' },
    { label: "Green", count: 78, id: 'color-green' },
    { label: "Blue", count: 54, id: 'color-blue' },
  ];

  const conditionFilters = [
    { label: "New", count: 1506, id: 'condition-new' },
    { label: "Refurbished", count: 27, id: 'condition-refurb' },
    { label: "Used", count: 45, id: 'condition-used' },
  ];

  // --- Handlers ---
  
  const handlePriceChange = (event) => {
    setCurrentMaxPrice(Number(event.target.value));
  };

  const handleCheckboxChange = (event, setState) => {
    const { id, checked } = event.target;
    setState(prevState => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const applyFilters = () => {
    // 🚨 IMPORTANT: In a real app, you would dispatch an action or call an API here.
    const filters = {
      price: { min: MIN_PRICE, max: currentMaxPrice },
      colors: Object.keys(selectedColors).filter(key => selectedColors[key]),
      conditions: Object.keys(selectedConditions).filter(key => selectedConditions[key]),
    };
    
    // For demonstration, we'll log the filter state instead of calling an API
    console.log('Applying Filters:', filters);
    // You could replace the console.log with a toast or status message here.
    alert('Filters Applied! Check the console for the filter object.'); 
  };
  
  // Custom Styles for the Price Slider (to make the native input look like the UI design)
  // Note: This CSS targets the native range input to maintain functionality while mimicking the design
  const RangeInputStyles = `
    /* Hides the default appearance */
    input[type='range'] {
      -webkit-appearance: none;
      width: 100%;
      height: 8px;
      margin: 10px 0;
      background: transparent; /* Needed for Safari */
    }
    
    /* The track (background bar) */
    input[type='range']::-webkit-slider-runnable-track {
      width: 100%;
      height: 8px;
      cursor: pointer;
      background: ${UI_COLORS.lightGreen}; 
      border-radius: 4px;
    }
    
    /* The thumb (handle) */
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background: ${UI_COLORS.primaryGreen};
      cursor: pointer;
      margin-top: -5px; /* Centers the thumb vertically on the track */
      border: 3px solid #fff;
      box-shadow: 0 0 5px rgba(0,0,0,0.1);
    }
    
    /* Since we're using a single slider for the max range, we simulate the 'filled' track visually */
    input[type='range'] {
      background: linear-gradient(
        to right, 
        ${UI_COLORS.primaryGreen} 0%, 
        ${UI_COLORS.primaryGreen} ${((currentMaxPrice - MIN_PRICE) / (MAX_SLIDER_VALUE - MIN_PRICE)) * 100}%, 
        ${UI_COLORS.lightGreen} ${((currentMaxPrice - MIN_PRICE) / (MAX_SLIDER_VALUE - MIN_PRICE)) * 100}%, 
        ${UI_COLORS.lightGreen} 100%
      );
      background-repeat: no-repeat;
    }

    /* Style checkboxes to match the theme */
    .form-check-input:checked {
        background-color: ${UI_COLORS.primaryGreen};
        border-color: ${UI_COLORS.primaryGreen};
    }
    .form-check-input:focus {
        box-shadow: 0 0 0 0.25rem ${UI_COLORS.primaryGreen + '40'};
    }
  `;


  return (
    // Card with rounded corners, subtle border, and shadow
    <Card 
      className="price-filter-card mb-4"
      style={{ 
        borderRadius: '15px', 
        border: `1px solid ${UI_COLORS.cardBorderColor}`, 
        boxShadow: UI_COLORS.cardShadow 
      }}
    >
      {/* 🚨 Embedding custom styles for the range input to make it functional AND look right */}
      <style>{RangeInputStyles}</style>

      <Card.Body className="p-3">
        
        {/* === 1. Header: Fill by price === */}
        <h5 
          className="card-title mb-3" 
          style={{ 
            fontWeight: 700, 
            fontSize: '1.2rem', 
            color: UI_COLORS.headerText,
          }}
        >
          Fill by price
          {/* Green underline styling */}
          <div style={{ width: '40px', height: '3px', backgroundColor: UI_COLORS.primaryGreen, marginTop: '5px' }} />
        </h5>

        {/* === 2. Functional Price Range Slider === */}
        <div className="price-range-slider mb-4">
          
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_SLIDER_VALUE}
            step="10"
            value={currentMaxPrice}
            onChange={handlePriceChange}
            className="form-range" // Apply BS class for utility
          />

          {/* Price labels (dynamically updated) */}
          <div className="d-flex justify-content-between">
            <span style={{ fontSize: '0.9rem', color: '#666' }}>From: <strong style={{ color: UI_COLORS.priceValue }}>${MIN_PRICE}</strong></span>
            <span style={{ fontSize: '0.9rem', color: '#666' }}>To: <strong style={{ color: UI_COLORS.priceValue }}>${currentMaxPrice}</strong></span>
          </div>
        </div>
        
        {/* === 3. Color Filter Section (Functional Checkboxes) === */}
        <h6 className="mt-4 mb-2" style={{ fontWeight: 700, color: UI_COLORS.headerText }}>Color</h6>
        {colorFilters.map(filter => (
          <Form.Check 
            key={filter.id}
            type="checkbox"
            id={filter.id}
            checked={!!selectedColors[filter.id]}
            onChange={(e) => handleCheckboxChange(e, setSelectedColors)}
            label={
              <span style={{ color: '#555' }}>
                {filter.label} ({filter.count})
              </span>
            }
            className="mb-1"
          />
        ))}

        {/* === 4. Item Condition Section (Functional Checkboxes) === */}
        <h6 className="mt-4 mb-2" style={{ fontWeight: 700, color: UI_COLORS.headerText }}>Item Condition</h6>
        {conditionFilters.map(filter => (
          <Form.Check 
            key={filter.id}
            type="checkbox"
            id={filter.id}
            checked={!!selectedConditions[filter.id]}
            onChange={(e) => handleCheckboxChange(e, setSelectedConditions)}
            label={
              <span style={{ color: '#555' }}>
                {filter.label} ({filter.count})
              </span>
            }
            className="mb-1"
          />
        ))}

        {/* === 5. Filter Button & Lettuce Image === */}
        <div className="d-flex justify-content-between align-items-end mt-4 position-relative" style={{ overflow: 'hidden' }}>
          
          <Button 
            variant="success" 
            onClick={applyFilters}
            style={{ 
              backgroundColor: UI_COLORS.primaryGreen, 
              borderColor: UI_COLORS.primaryGreen,
              borderRadius: '5px',
              padding: '8px 15px',
              fontWeight: 600,
              fontSize: '0.9rem',
              zIndex: 10, 
            }}
          >
            <Filter size={16} className="me-2" /> Filter
          </Button>

          {/* Lettuce Image (Positioned to overlap and sit at the bottom right) */}
          <img 
            src={lettuceImage} 
            alt="Fresh Lettuce" 
            style={{
              position: 'absolute',
              right: '-20px', 
              bottom: '-15px', 
              width: '120px', 
              height: 'auto',
              opacity: 1, 
              zIndex: 1,
              pointerEvents: 'none' 
            }}
          />
        </div>

      </Card.Body>
    </Card>
  );
};

export default PriceFilter;