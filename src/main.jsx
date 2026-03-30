import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.jsx'
import App from './app.jsx'
import './index.css'

function Root() {
  const [page, setPage] = useState('home');
  if (page === 'birds') return <App onBack={() => setPage('home')} />;
  return <Home onSelect={id => id === 'birds' && setPage('birds')} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)