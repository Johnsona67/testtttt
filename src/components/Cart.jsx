import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <motion.div
            className="empty-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag size={80} />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/shop" className="btn-primary">
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <motion.div
          className="cart-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/shop" className="back-link">
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
          <h1>Shopping Cart</h1>
        </motion.div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-size">Size: {item.size}</p>
                  <p className="item-price">${item.price.toLocaleString()}</p>
                </div>
                <div className="item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>
                <div className="item-total">
                  <p>${(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="cart-summary"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            <div className="summary-item">
              <span>Tax</span>
              <span>${tax.toLocaleString()}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
            <div className="shipping-info">
              <p>Free shipping on orders over $500</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 