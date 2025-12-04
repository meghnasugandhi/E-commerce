
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    count: 0,
    total: 0.00,
    isCartOpen: false, // UI state for the cart drawer/modal
};

/**
 * Helper function to calculate the total price, ensuring accuracy.
 */
const calculateTotal = (items) => {
    // We use .toFixed(2) in the display layer, but calculations should stay in float/number
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Adds an item or increments its quantity
        addItem: (state, action) => {
            const { id, name, price, image } = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ id, name, price, quantity: 1, image });
            }

            state.count += 1; // Increment total item count
            state.total = calculateTotal(state.items); // Update total
        },

        // Decrements item quantity or removes it if quantity hits zero
        decrementItem: (state, action) => {
            const id = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === id);

            if (existingItemIndex !== -1) {
                const item = state.items[existingItemIndex];
                if (item.quantity > 0) {
                    state.count -= 1; // Decrement total item count
                    
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        // Remove item if quantity is 1
                        state.items.splice(existingItemIndex, 1);
                    }
                    
                    state.total = calculateTotal(state.items); // Update total
                }
            }
        },

        // Removes an item completely from the cart
        removeItem: (state, action) => {
            const id = action.payload;
            const itemToRemove = state.items.find(item => item.id === id);

            if (itemToRemove) {
                state.count -= itemToRemove.quantity;
                state.items = state.items.filter(item => item.id !== id);
                state.total = calculateTotal(state.items); // Update total
            }
        },

        // Toggles the visibility of the cart drawer/modal
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },

        // 💡 NEW REDUCER TO FIX THE ERROR
        /**
         * Clears all items from the cart and resets count/total.
         */
        clearCart: (state) => {
            state.items = [];
            state.count = 0;
            state.total = 0.00;
        },
    },
});

// 💡 EXPORT clearCart along with the others
export const { addItem, decrementItem, removeItem, toggleCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;