import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BuyPage from './buy.js'
import SellPage from './sell.js'
import HomePage from './home.js'




const Header = () => (
  <header>
    <nav>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex' }}>
        <li style={{ marginRight: '15px' }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ marginRight: '15px' }}>
          <Link to="/buy">Buy a Home</Link>
        </li>
        <li style={{ marginRight: '15px' }}>
          <Link to="/sell">Sell a Home</Link>
        </li>
      </ul>
    </nav>
  </header>
);




function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/sell" element={<SellPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
