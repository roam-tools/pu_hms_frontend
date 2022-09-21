
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'
import storageSession from 'redux-persist/lib/storage/session'
import auth from './features/auth';

const authPersistConfig = {
  key: 'auth',
  storage: storageSession
};

const persistConfig = {
  key: 'root',
  whitelist: ['auth', 'hostel'],
  storage: storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth)
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