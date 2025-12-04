// src/index.js (Updated)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// 1. Import the Redux Provider component
import { Provider } from 'react-redux'; 
// 2. Import your configured store
import store from './store'; // Assumes your store file is located at ./store/index.js or just ./store.js

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* 3. Wrap the App component with the Provider and pass the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();