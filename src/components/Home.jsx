import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import './Home.css';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Diamond Eternity Ring",
      price: "$2,499",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      rating: 5
    },
    {
      id: 2,
      name: "Sapphire Necklace",
      price: "$1,899",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      rating: 5
    },
    {
      id: 3,
      name: "Pearl Earrings",
      price: "$899",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
      rating: 4
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="hero-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Sparkles size={20} />
              <span>Premium Collection</span>
            </motion.div>
            <h1>
              Timeless Elegance
              <br />
              <span className="gradient-text">In Every Piece</span>
            </h1>
            <p>
              Discover our curated collection of fine jewelry, crafted with precision 
              and designed to tell your unique story.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn-primary">
                Shop Now
                <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop" 
              alt="Luxury Jewelry"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Featured Collections</h2>
            <p>Handpicked pieces that define luxury and sophistication</p>
          </motion.div>

          <motion.div
            className="featured-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                className="featured-card"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-image">
                  <img src={product.image} alt={product.name} />
                  <div className="card-overlay">
                    <Link to={`/product/${product.id}`} className="view-btn">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{product.name}</h3>
                  <div className="card-rating">
                    {[...Array(product.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#d4af37" color="#d4af37" />
                    ))}
                  </div>
                  <p className="card-price">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Crafting Excellence Since 1985</h2>
              <p>
                Our master jewelers combine traditional techniques with modern innovation 
                to create pieces that stand the test of time. Each creation tells a story 
                of passion, precision, and unparalleled beauty.
              </p>
              <Link to="/about" className="btn-outline">
                Our Story
                <ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop" 
                alt="Jewelry Crafting"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 