import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './shared/styles/animations.css';
import { ThemeProvider } from './shared/context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);