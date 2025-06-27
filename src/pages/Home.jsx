import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import { useWebsiteContent } from '../context/WebsiteContentContext';

const Home = () => {
  const { websiteContent, designSettings, isLoading } = useWebsiteContent();
  const featuredProducts = products.slice(0, 4);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading website content...</p>
      </div>
    );
  }

  // Generate dynamic styles based on design settings
  const getDynamicStyles = () => {
    const styles = {
      // Background styles
      background: designSettings.backgroundType === 'gradient' 
        ? designSettings.backgroundGradient 
        : designSettings.backgroundType === 'image' 
        ? `url(${designSettings.backgroundImage})` 
        : designSettings.backgroundColor,
      
      // Typography styles
      fontFamily: designSettings.headingFont,
      color: designSettings.textColor,
      
      // Container styles
      padding: designSettings.containerPadding,
      margin: designSettings.elementMargin,
      
      // Border and shadow styles
      borderRadius: designSettings.borderRadius,
      border: `${designSettings.borderWidth} solid ${designSettings.borderColor}`,
      boxShadow: designSettings.boxShadow,
      
      // Animation styles
      transition: `all ${designSettings.transitionDuration} ease`,
      
      // Section visibility
      display: 'block'
    };

    return styles;
  };

  const dynamicStyles = getDynamicStyles();

  return (
    <div className="home" style={{ 
      background: dynamicStyles.background,
      fontFamily: designSettings.bodyFont,
      color: dynamicStyles.color,
      transition: dynamicStyles.transition
    }}>
      {/* Hero Section */}
      {designSettings.showHero && (
        <section className="hero" style={{ 
          minHeight: designSettings.heroSectionHeight,
          padding: dynamicStyles.padding,
          margin: dynamicStyles.margin
        }}>
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title" style={{ 
                  fontFamily: designSettings.headingFont,
                  fontSize: designSettings.fontSize.h1,
                  color: designSettings.primaryColor
                }}>
                  {websiteContent.headline}
                </h1>
                <p className="hero-description" style={{ 
                  fontSize: designSettings.fontSize.body,
                  margin: dynamicStyles.margin
                }}>
                  {websiteContent.description}
                </p>
                <div className="hero-actions">
                  <Link to="/shop" className="btn btn-primary" style={{
                    backgroundColor: designSettings.primaryColor,
                    borderRadius: dynamicStyles.borderRadius,
                    padding: designSettings.elementPadding,
                    transition: dynamicStyles.transition,
                    boxShadow: dynamicStyles.boxShadow
                  }}>
                    {websiteContent.ctaText}
                    <ArrowRight size={20} />
                  </Link>
                  <Link to="/about" className="btn btn-secondary" style={{
                    border: `2px solid ${designSettings.secondaryColor}`,
                    color: designSettings.secondaryColor,
                    borderRadius: dynamicStyles.borderRadius,
                    padding: designSettings.elementPadding,
                    transition: dynamicStyles.transition
                  }}>
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="hero-image">
                <img 
                  src={websiteContent.heroImage}
                  alt="Luxury Jewelry"
                  className="hero-img"
                  style={{
                    borderRadius: dynamicStyles.borderRadius,
                    boxShadow: dynamicStyles.boxShadow,
                    transition: dynamicStyles.transition
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {designSettings.showFeatures && (
        <section className="features" style={{ 
          padding: dynamicStyles.padding,
          margin: dynamicStyles.margin
        }}>
          <div className="container">
            <div className="features-grid">
              <div className="feature-card" style={{
                borderRadius: dynamicStyles.borderRadius,
                border: dynamicStyles.border,
                boxShadow: dynamicStyles.boxShadow,
                padding: designSettings.elementPadding,
                transition: dynamicStyles.transition
              }}>
                <div className="feature-icon">💎</div>
                <h3 style={{ 
                  fontFamily: designSettings.headingFont,
                  fontSize: designSettings.fontSize.h3,
                  color: designSettings.primaryColor
                }}>Premium Quality</h3>
                <p style={{ fontSize: designSettings.fontSize.body }}>Only the finest materials and craftsmanship in every piece</p>
              </div>
              <div className="feature-card" style={{
                borderRadius: dynamicStyles.borderRadius,
                border: dynamicStyles.border,
                boxShadow: dynamicStyles.boxShadow,
                padding: designSettings.elementPadding,
                transition: dynamicStyles.transition
              }}>
                <div className="feature-icon">🚚</div>
                <h3 style={{ 
                  fontFamily: designSettings.headingFont,
                  fontSize: designSettings.fontSize.h3,
                  color: designSettings.primaryColor
                }}>Free Shipping</h3>
                <p style={{ fontSize: designSettings.fontSize.body }}>Complimentary shipping on all orders over $500</p>
              </div>
              <div className="feature-card" style={{
                borderRadius: dynamicStyles.borderRadius,
                border: dynamicStyles.border,
                boxShadow: dynamicStyles.boxShadow,
                padding: designSettings.elementPadding,
                transition: dynamicStyles.transition
              }}>
                <div className="feature-icon">🔄</div>
                <h3 style={{ 
                  fontFamily: designSettings.headingFont,
                  fontSize: designSettings.fontSize.h3,
                  color: designSettings.primaryColor
                }}>Easy Returns</h3>
                <p style={{ fontSize: designSettings.fontSize.body }}>30-day return policy for your peace of mind</p>
              </div>
              <div className="feature-card" style={{
                borderRadius: dynamicStyles.borderRadius,
                border: dynamicStyles.border,
                boxShadow: dynamicStyles.boxShadow,
                padding: designSettings.elementPadding,
                transition: dynamicStyles.transition
              }}>
                <div className="feature-icon">🛡️</div>
                <h3 style={{ 
                  fontFamily: designSettings.headingFont,
                  fontSize: designSettings.fontSize.h3,
                  color: designSettings.primaryColor
                }}>Lifetime Warranty</h3>
                <p style={{ fontSize: designSettings.fontSize.body }}>We stand behind the quality of our jewelry</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {designSettings.showProducts && (
        <section className="featured-products" style={{ 
          padding: dynamicStyles.padding,
          margin: dynamicStyles.margin
        }}>
          <div className="container">
            <div className="section-header">
              <h2 style={{ 
                fontFamily: designSettings.headingFont,
                fontSize: designSettings.fontSize.h2,
                color: designSettings.primaryColor
              }}>Featured Collection</h2>
              <p style={{ fontSize: designSettings.fontSize.body }}>Our most popular pieces, handpicked for you</p>
            </div>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div key={product.id} className="product-card" style={{
                  borderRadius: dynamicStyles.borderRadius,
                  border: dynamicStyles.border,
                  boxShadow: dynamicStyles.boxShadow,
                  transition: dynamicStyles.transition
                }}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} style={{
                      borderRadius: dynamicStyles.borderRadius
                    }} />
                    <div className="product-overlay">
                      <Link to={`/product/${product.id}`} className="btn btn-primary" style={{
                        backgroundColor: designSettings.primaryColor,
                        borderRadius: dynamicStyles.borderRadius,
                        padding: designSettings.elementPadding
                      }}>
                        <ShoppingBag size={16} />
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 style={{ 
                      fontFamily: designSettings.headingFont,
                      fontSize: designSettings.fontSize.h3,
                      color: designSettings.textColor
                    }}>{product.name}</h3>
                    <div className="product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < Math.floor(product.rating) ? designSettings.primaryColor : "none"}
                            color={designSettings.primaryColor}
                          />
                        ))}
                      </div>
                      <span className="rating-text">({product.reviews})</span>
                    </div>
                    <div className="product-price">
                      <span className="current-price" style={{ color: designSettings.primaryColor }}>${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link to="/shop" className="btn btn-outline" style={{
                border: `2px solid ${designSettings.secondaryColor}`,
                color: designSettings.secondaryColor,
                borderRadius: dynamicStyles.borderRadius,
                padding: designSettings.elementPadding,
                transition: dynamicStyles.transition
              }}>
                View All Products
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {designSettings.customSections.map((section) => (
        <section key={section.id} className="custom-section" style={{ 
          padding: dynamicStyles.padding,
          margin: dynamicStyles.margin,
          display: section.visible ? 'block' : 'none'
        }}>
          <div className="container">
            <h2 style={{ 
              fontFamily: designSettings.headingFont,
              fontSize: designSettings.fontSize.h2,
              color: designSettings.primaryColor
            }}>{section.title}</h2>
            <p style={{ fontSize: designSettings.fontSize.body }}>{section.content}</p>
          </div>
        </section>
      ))}

      {/* Newsletter Section */}
      {designSettings.showNewsletter && (
        <section className="newsletter" style={{ 
          padding: dynamicStyles.padding,
          margin: dynamicStyles.margin,
          background: designSettings.backgroundType === 'gradient' 
            ? designSettings.backgroundGradient 
            : designSettings.backgroundColor
        }}>
          <div className="container">
            <div className="newsletter-content">
              <h2 style={{ 
                fontFamily: designSettings.headingFont,
                fontSize: designSettings.fontSize.h2,
                color: designSettings.textColor
              }}>Stay in the Loop</h2>
              <p style={{ fontSize: designSettings.fontSize.body }}>Be the first to know about new collections, exclusive offers, and jewelry care tips.</p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="form-input"
                  style={{
                    borderRadius: dynamicStyles.borderRadius,
                    border: dynamicStyles.border,
                    padding: designSettings.elementPadding,
                    transition: dynamicStyles.transition
                  }}
                  required
                />
                <button type="submit" className="btn btn-primary" style={{
                  backgroundColor: designSettings.primaryColor,
                  borderRadius: dynamicStyles.borderRadius,
                  padding: designSettings.elementPadding,
                  transition: dynamicStyles.transition
                }}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home; 