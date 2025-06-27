import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import AIWebsiteAssistant from './components/AIWebsiteAssistant';
import { WebsiteContentProvider } from './context/WebsiteContentContext';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isWebsiteAssistantOpen, setIsWebsiteAssistantOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <WebsiteContentProvider>
      <Router>
        <div className="App">
          <Navbar 
            cartCount={cartCount} 
            onCartClick={() => setIsCartOpen(true)}
          />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop addToCart={addToCart} />} />
              <Route 
                path="/product/:id" 
                element={<ProductDetail addToCart={addToCart} />} 
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          
          {/* AI Chat Floating Button */}
          <button 
            className="ai-chat-button"
            onClick={() => setIsAIChatOpen(true)}
            title="Chat with AI Designer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M12 8v4"/>
              <path d="M12 16h.01"/>
            </svg>
            <span>AI Designer</span>
          </button>

          {/* Website Assistant Floating Button */}
          <button 
            className="website-assistant-button"
            onClick={() => setIsWebsiteAssistantOpen(true)}
            title="AI Website Assistant"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            <span>Website AI</span>
          </button>
          
          {isCartOpen && (
            <Cart
              cart={cart}
              cartTotal={cartTotal}
              onClose={() => setIsCartOpen(false)}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          )}
          
          <AIChat 
            isOpen={isAIChatOpen}
            onClose={() => setIsAIChatOpen(false)}
          />

          <AIWebsiteAssistant
            isOpen={isWebsiteAssistantOpen}
            onClose={() => setIsWebsiteAssistantOpen(false)}
          />
        </div>
      </Router>
    </WebsiteContentProvider>
  );
}

export default App;
