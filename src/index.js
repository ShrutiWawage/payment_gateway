import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your main App component
import './index.css'; // Optional: Global CSS for your app
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure there's a div with id 'root' in your index.html
);
