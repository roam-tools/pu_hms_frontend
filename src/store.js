
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'
import storageSession from 'redux-persist/lib/storage/session'
import login from './slices/login';

const loginPersistConfig = {
  key: 'login',
  storage: storageSession
};

const persistConfig = {
  key: 'root',
  whitelist: ['login', 'hostel'],
  storage: storage,
};

const rootReducer = combineReducers({
  login: persistReducer(loginPersistConfig, login)
});

const persistReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;