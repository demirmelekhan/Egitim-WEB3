// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // -> App.jsx dosyasının doğru import edildiğinden emin olun
import './index.css' // -> Global stilleriniz burada import edilir

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)