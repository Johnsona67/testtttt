import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

const Cart = ({ cart, cartTotal, onClose, onRemove, onUpdateQuantity }) => {
  const handleCheckout = () => {
    // This would typically redirect to a checkout page
    alert('Checkout functionality would be implemented here');
  };

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={64} className="empty-cart-icon" />
            <h3>Your cart is empty</h3>
            <p>Add some beautiful jewelry to get started</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-category">{item.category}</p>
                    <div className="cart-item-price">
                      <span className="current-price">${item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="original-price">${item.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="cart-item-quantity">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="cart-item-total">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => onRemove(item.id)}
                    className="remove-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{cartTotal > 500 ? 'Free' : '$15.00'}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${(cartTotal + (cartTotal > 500 ? 0 : 15)).toFixed(2)}</span>
              </div>
              
              {cartTotal < 500 && (
                <div className="free-shipping-notice">
                  <p>Add ${(500 - cartTotal).toFixed(2)} more for free shipping!</p>
                </div>
              )}
            </div>

            <div className="cart-actions">
              <button className="btn btn-primary btn-full" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <button className="btn btn-outline btn-full" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 