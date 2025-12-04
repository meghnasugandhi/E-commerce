import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';

// Import your icons
import milkIcon from '../images/milksanddairies.svg';
import clothingIcon from '../images/clothingandbeauty.svg'; 
import petFoodIcon from '../images/petfood.svg';
import bakingIcon from '../images/bakingandmaterial.svg';
import fruitIcon from '../images/freshfruits.svg';
import drinksIcon from '../images/winesanddrinks.svg';
import seafoodIcon from '../images/freshseafood.svg';
import fastFoodIcon from '../images/fastfood.svg';
import vegetablesIcon from '../images/vegetables.svg';
import juiceIcon from '../images/breadandjuice.svg';

const categories = [
    { name: "Milks and Dairies", icon: milkIcon },
    { name: "Clothing & beauty", icon: clothingIcon },
    { name: "Pet Foods & Toy", icon: petFoodIcon },
    { name: "Baking material", icon: bakingIcon },
    { name: "Fresh Fruit", icon: fruitIcon },
    { name: "Wines & Drinks", icon: drinksIcon },
    { name: "Fresh Seafood", icon: seafoodIcon },
    { name: "Fast food", icon: fastFoodIcon },
    { name: "Vegetables", icon: vegetablesIcon },
    { name: "Bread and Juice", icon: juiceIcon },
    { name: "Pet Foods & Toy", icon: petFoodIcon }, 
];

const CategorySidebar2 = () => {
    return (
        <Card className="category-sidebar shadow-sm h-100" style={{ minHeight: '600px' }}> {/* Adjusted minHeight to 600px */}
            <ListGroup variant="flush" className="h-100">
                {categories.map((category, index) => (
                    <ListGroup.Item 
                        key={index} 
                        action 
                        className="d-flex align-items-center py-2"
                        style={{ minHeight: '40px' }} 
                    >
                        <img 
                            src={category.icon} 
                            alt={category.name} 
                            className="category-icon me-3" 
                            style={{ width: '22px', height: '22px' }} 
                        />
                        <span className="category-text fs-6">{category.name}</span>
                    </ListGroup.Item>
                ))}
                
                <ListGroup.Item className="d-flex align-items-center py-3 border-0 mt-auto" style={{ minHeight: '45px' }}>
                    <PlusCircle size={22} className="me-3 text-success" />
                    <span className="text-success fw-bold fs-6">Show more...</span>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default CategorySidebar2;