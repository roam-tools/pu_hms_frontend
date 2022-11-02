import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'antd/dist/antd.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import store from './store.js';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import { App } from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

let persistore = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistore}>
      <App />
    </PersistGate>
  </Provider>
);

serviceWorkerRegistration.unregister();

