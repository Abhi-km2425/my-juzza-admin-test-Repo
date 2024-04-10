import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/Store.js"
import { Provider } from 'react-redux';
import 'react-calendar/dist/Calendar.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <ToastContainer />
      <App />

    </PersistGate>
  </Provider>
);
