import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Array of product objects in the wishlist
    count: 0,  // Total number of unique items in the wishlist (for the header badge)
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        /**
         * Adds an item to the wishlist if it's not already present.
         * Toggling (adding/removing on the same action) is usually handled by the component.
         * This reducer specifically ensures the item is only added once.
         */
        addItemToWishlist: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            if (!existingItem) {
                state.items.push(product);
                state.count += 1; // Increment count only if a NEW unique item is added
            }
            // If it exists, we do nothing (it's already wishlisted)
        },

        /**
         * Removes an item from the wishlist.
         */
        removeItemFromWishlist: (state, action) => {
            const id = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === id);

            if (existingItemIndex !== -1) {
                // Remove the item from the array
                state.items.splice(existingItemIndex, 1);
                state.count -= 1; // Decrement the count
            }
        },

        /**
         * Clears all items from the wishlist.
         */
        clearWishlist: (state) => {
            state.items = [];
            state.count = 0;
        },
    },
});

// ⭐ Selector to easily access the wishlist count in Header.js
// state.wishlist is the slice name defined in your store.js
export const selectWishlistCount = (state) => state.wishlist.count;

export const { 
    addItemToWishlist, 
    removeItemFromWishlist, 
    clearWishlist 
} = wishlistSlice.actions;

export default wishlistSlice.reducer;