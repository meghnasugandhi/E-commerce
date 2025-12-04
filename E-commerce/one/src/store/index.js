


import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; // Make sure the path is correct

/**
 * Configure the Redux store.
 * The 'cart' state property will be managed by cartReducer.
 */
const store = configureStore({
    reducer: {
        cart: cartReducer, // The key 'cart' is how you access the state (e.g., state.cart.items)
        // Add other reducers here as your app grows
    },
    // Redux Toolkit includes thunk and DevTools extension support by default
});

export default store;