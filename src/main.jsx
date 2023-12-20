import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Using ReactDOM.createRoot to render the App component into the 'root' element
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrapping the App component in <React.StrictMode>
  // <React.StrictMode> is a tool for highlighting potential problems in the application
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
