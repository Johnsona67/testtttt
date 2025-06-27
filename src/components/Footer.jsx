import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Diamond, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Rings', path: '/shop?category=rings' },
      { name: 'Necklaces', path: '/shop?category=necklaces' },
      { name: 'Earrings', path: '/shop?category=earrings' },
      { name: 'Bracelets', path: '/shop?category=bracelets' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Story', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' }
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Shipping', path: '/shipping' },
      { name: 'Returns', path: '/returns' }
    ]
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, url: 'https://facebook.com' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com' },
    { icon: <Instagram size={20} />, url: 'https://instagram.com' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Section */}
            <motion.div
              className="footer-brand"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/" className="footer-logo">
                <Diamond className="logo-icon" />
                <span>LuxeJewelry</span>
              </Link>
              <p>
                Crafting timeless jewelry pieces that tell your unique story. 
                For over three decades, we've been creating exceptional pieces 
                that stand the test of time.
              </p>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ y: -3, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Shop Links */}
            <motion.div
              className="footer-links"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3>Shop</h3>
              <ul>
                {footerLinks.shop.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              className="footer-links"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Company</h3>
              <ul>
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              className="footer-links"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3>Support</h3>
              <ul>
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="footer-contact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3>Contact</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={16} />
                  <span>info@luxejewelry.com</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter */}
          <motion.div
            className="newsletter-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="newsletter-content">
              <h3>Stay Updated</h3>
              <p>Subscribe to our newsletter for exclusive offers and new collections</p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="bottom-content">
            <p>&copy; {currentYear} LuxeJewelry. All rights reserved.</p>
            <div className="bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 