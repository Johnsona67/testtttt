import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Heart, ShoppingCart } from 'lucide-react';
import './Shop.css';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const products = [
    {
      id: 1,
      name: "Diamond Eternity Ring",
      price: 2499,
      category: "rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 128,
      isNew: true
    },
    {
      id: 2,
      name: "Sapphire Necklace",
      price: 1899,
      category: "necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 95,
      isNew: false
    },
    {
      id: 3,
      name: "Pearl Earrings",
      price: 899,
      category: "earrings",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
      rating: 4,
      reviews: 67,
      isNew: false
    },
    {
      id: 4,
      name: "Gold Bracelet",
      price: 1299,
      category: "bracelets",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
      rating: 4,
      reviews: 89,
      isNew: true
    },
    {
      id: 5,
      name: "Emerald Ring",
      price: 3200,
      category: "rings",
      image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
      rating: 5,
      reviews: 156,
      isNew: false
    },
    {
      id: 6,
      name: "Diamond Pendant",
      price: 1599,
      category: "necklaces",
      image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
      rating: 4,
      reviews: 73,
      isNew: false
    },
    {
      id: 7,
      name: "Ruby Studs",
      price: 699,
      category: "earrings",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
      rating: 4,
      reviews: 45,
      isNew: true
    },
    {
      id: 8,
      name: "Silver Chain",
      price: 599,
      category: "necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      rating: 3,
      reviews: 34,
      isNew: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'rings', name: 'Rings' },
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'bracelets', name: 'Bracelets' }
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest' }
  ];

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.isNew - a.isNew;
        default:
          return 0;
      }
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="shop">
      <div className="shop-header">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our handcrafted jewelry pieces, each telling a unique story
          </motion.p>
        </div>
      </div>

      <div className="shop-content">
        <div className="container">
          {/* Filters and Search */}
          <motion.div
            className="shop-filters"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-controls">
              <div className="filter-group">
                <label>Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="products-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="product-card"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.isNew && <span className="new-badge">New</span>}
                  <div className="product-actions">
                    <button className="action-btn wishlist">
                      <Heart size={20} />
                    </button>
                    <button className="action-btn cart">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < product.rating ? "#d4af37" : "#e0e0e0"}
                          color={i < product.rating ? "#d4af37" : "#e0e0e0"}
                        />
                      ))}
                    </div>
                    <span className="review-count">({product.reviews})</span>
                  </div>
                  <p className="product-price">${product.price.toLocaleString()}</p>
                  <Link to={`/product/${product.id}`} className="view-details">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              className="no-products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No products found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop; 