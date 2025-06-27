import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { getProductById } from '../data/products';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container">
        <div className="product-not-found">
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="btn btn-primary">
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-content">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/shop">Shop</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          <div className="product-detail-grid">
            {/* Product Images */}
            <div className="product-images">
              <div className="main-image">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="product-main-img"
                />
                <button className="wishlist-btn">
                  <Heart size={20} />
                </button>
              </div>
              
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info-detail">
              <div className="product-header">
                <h1>{product.name}</h1>
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        fill={i < Math.floor(product.rating) ? "#d4af37" : "none"}
                        color="#d4af37"
                      />
                    ))}
                  </div>
                  <span className="rating-text">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="product-price-detail">
                <span className="current-price">${product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="original-price">${product.originalPrice}</span>
                    <span className="discount">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              <div className="product-features">
                <h3>Features</h3>
                <ul className="features-list">
                  {product.features.map((feature, index) => (
                    <li key={index}>
                      <Check size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="product-actions">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      min="1"
                      className="quantity-input"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="action-buttons">
                  <button
                    className="btn btn-primary btn-large"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingBag size={20} />
                    Add to Cart
                  </button>
                  
                  <button className="btn btn-secondary btn-large">
                    <Heart size={20} />
                    Add to Wishlist
                  </button>
                </div>

                {!product.inStock && (
                  <p className="out-of-stock">This item is currently out of stock</p>
                )}
              </div>

              <div className="product-meta">
                <div className="meta-item">
                  <strong>Category:</strong> {product.category}
                </div>
                <div className="meta-item">
                  <strong>Availability:</strong> 
                  <span className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <section className="related-products">
            <h2>You might also like</h2>
            <div className="related-grid">
              {/* This would typically show related products */}
              <div className="related-placeholder">
                <p>Related products would appear here</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 