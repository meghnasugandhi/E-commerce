import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; 
import wishlistReducer from './slices/wishlistSlice'; // This import is used now

/**
 * Configure the Redux store.
 * The 'cart' and 'wishlist' state properties will be managed by their respective reducers.
 */
const store = configureStore({
    reducer: {
        cart: cartReducer, 
        // ⭐ ADDED THE WISHLIST REDUCER HERE
        wishlist: wishlistReducer, // The key 'wishlist' is how you access the state (e.g., state.wishlist.items)
    },
    // Redux Toolkit includes thunk and DevTools extension support by default
});

export default store;