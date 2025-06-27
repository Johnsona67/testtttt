import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Star, Filter, Grid, List, ShoppingBag } from 'lucide-react';
import { products, categories, getProductsByCategory } from '../data/products';

const Shop = ({ addToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 5000]);

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setSelectedCategory(category);
    
    let filtered = getProductsByCategory(category);
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, priceRange, searchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="shop">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Shop Our Collection</h1>
          <p>Discover timeless pieces that tell your unique story</p>
        </div>

        <div className="shop-content">
          {/* Filters Sidebar */}
          <aside className="shop-filters">
            <div className="filter-section">
              <h3>Categories</h3>
              <div className="filter-options">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`filter-option ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                    <span className="filter-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-slider"
                />
                <div className="price-inputs">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    placeholder="Min"
                    className="price-input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    placeholder="Max"
                    className="price-input"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <main className="shop-main">
            {/* Toolbar */}
            <div className="shop-toolbar">
              <div className="toolbar-left">
                <span className="results-count">
                  {filteredProducts.length} products
                </span>
              </div>
              
              <div className="toolbar-right">
                <div className="sort-controls">
                  <label htmlFor="sort">Sort by:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
                
                <div className="view-controls">
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`products-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className={`product-card ${viewMode === 'list' ? 'list-card' : ''}`}>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      <div className="product-overlay">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingBag size={16} />
                          Add to Cart
                        </button>
                      </div>
                      {product.originalPrice > product.price && (
                        <div className="sale-badge">Sale</div>
                      )}
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      
                      <div className="product-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < Math.floor(product.rating) ? "#d4af37" : "none"}
                              color="#d4af37"
                            />
                          ))}
                        </div>
                        <span className="rating-text">({product.reviews})</span>
                      </div>
                      
                      <div className="product-price">
                        <span className="current-price">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="original-price">${product.originalPrice}</span>
                        )}
                      </div>
                      
                      <div className="product-features">
                        {product.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="feature-tag">{feature}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-products">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or browse all categories</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop; 