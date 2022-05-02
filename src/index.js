import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/configurateStore';
import App from './App';

axios.defaults.baseURL = 'http://localhost:4003';

axios.interceptors.request.use(
  (config) => {
    const tokenClient =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjFmOTYxODVkZTEyZTgyM2U4MzE1MjIxIiwiZW1haWwiOiJhc2QifSwiaWF0IjoxNjQzNzkxMDQxfQ.puUc3PubBUS2IfkF2Q5Y4qRdFIGe4VuUxpeVcSIYqTI';

    const currentConfig = config;

    if (tokenClient) {
      currentConfig.headers.usertoken = tokenClient;
    }
    return currentConfig;
  },
  (error) => Promise.reject(error.response)
);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
