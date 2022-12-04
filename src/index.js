import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import TempContextProvider from "./context/TempProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <TempContextProvider>
        <App />
      </TempContextProvider>
    </Router>
  </React.StrictMode>
);
