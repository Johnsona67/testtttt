import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, ArrowLeft, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: parseInt(id),
    name: "Diamond Eternity Ring",
    price: 2499,
    originalPrice: 2999,
    category: "rings",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop"
    ],
    rating: 5,
    reviews: 128,
    description: "This stunning diamond eternity ring features a continuous band of brilliant-cut diamonds, each carefully selected for its exceptional clarity and brilliance. The classic design ensures timeless elegance that will be treasured for generations.",
    specifications: {
      "Material": "18K White Gold",
      "Diamond Quality": "VS1-VS2 Clarity, F-G Color",
      "Total Carat Weight": "2.5 carats",
      "Ring Size": "Available in sizes 4-10",
      "Setting": "Pave setting",
      "Finish": "Polished"
    },
    features: [
      "Conflict-free diamonds",
      "Lifetime warranty",
      "Free resizing",
      "Professional cleaning included"
    ],
    sizes: ["4", "5", "6", "7", "8", "9", "10"]
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Add to cart logic here
    console.log('Added to cart:', { ...product, quantity, size: selectedSize });
  };

  return (
    <div className="product-detail">
      <div className="container">
        <motion.div
          className="breadcrumb"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/shop" className="back-link">
            <ArrowLeft size={20} />
            Back to Shop
          </Link>
        </motion.div>

        <div className="product-layout">
          {/* Product Images */}
          <motion.div
            className="product-images"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
              <button className="wishlist-btn">
                <Heart size={24} />
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
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="product-info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="product-header">
              <h1>{product.name}</h1>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={i < product.rating ? "#d4af37" : "#e0e0e0"}
                      color={i < product.rating ? "#d4af37" : "#e0e0e0"}
                    />
                  ))}
                </div>
                <span className="review-count">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="product-pricing">
              <div className="price-container">
                <span className="current-price">${product.price.toLocaleString()}</span>
                <span className="original-price">${product.originalPrice.toLocaleString()}</span>
                <span className="discount-badge">{discount}% OFF</span>
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="size-selection">
              <h3>Select Size</h3>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="quantity-selector">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button className="btn-primary" onClick={addToCart}>
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="btn-secondary">
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="shipping-info">
              <div className="info-item">
                <Truck size={20} />
                <div>
                  <h4>Free Shipping</h4>
                  <p>Free standard shipping on orders over $500</p>
                </div>
              </div>
              <div className="info-item">
                <Shield size={20} />
                <div>
                  <h4>Secure Payment</h4>
                  <p>100% secure payment processing</p>
                </div>
              </div>
              <div className="info-item">
                <RotateCcw size={20} />
                <div>
                  <h4>Easy Returns</h4>
                  <p>30-day return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div
          className="specifications"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>Specifications</h2>
          <div className="specs-grid">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="spec-item">
                <h4>{key}</h4>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail; 