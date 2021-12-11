import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import localStorage from "redux-persist/lib/storage";

import user from "../features/user";
import product from "../features/product";
import category from "../features/category";
import productState from "../features/productState";
import cart from "../features/cart";

const rootReducer = combineReducers({
  user:user,
  product:product,
  category:category,
  productState:productState,
  cart:cart,
});

const persistConfig = {
  key: "root",
  storage:localStorage,
};

const persistReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
  
  export default store;
