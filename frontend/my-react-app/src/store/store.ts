import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import productReducer from './allProducts';

import cscReducer from "./csc";
// import cartReducer from './reducer';

// Configure the store
const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    colorSizeCategory: cscReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
