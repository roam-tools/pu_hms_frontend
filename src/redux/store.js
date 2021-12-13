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
import authentication from "../features/authentication";
import hostel from "../features/hostel";

const rootReducer = combineReducers({
  user:authentication,
  hostel:hostel
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
