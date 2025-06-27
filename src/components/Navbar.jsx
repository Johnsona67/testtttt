import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Heart } from 'lucide-react';

const Navbar = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">Luxe</span>
            <span className="logo-accent">Jewelry</span>
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu desktop-menu">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="navbar-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="navbar-search">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="navbar-actions">
            <button className="navbar-icon-btn">
              <Heart size={20} />
            </button>
            <button 
              className="navbar-icon-btn cart-btn"
              onClick={onCartClick}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              className="navbar-icon-btn mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 