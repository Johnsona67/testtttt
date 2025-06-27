import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would typically send the form data to a server
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with us today.</p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Have questions about our jewelry or need assistance with your order? 
              Our team is here to help you find the perfect piece.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">
                  <Phone size={24} />
                </div>
                <div className="method-details">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                  <p>Monday - Friday: 9AM - 6PM</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <Mail size={24} />
                </div>
                <div className="method-details">
                  <h3>Email</h3>
                  <p>hello@luxejewelry.com</p>
                  <p>We respond within 24 hours</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <MapPin size={24} />
                </div>
                <div className="method-details">
                  <h3>Visit Us</h3>
                  <p>123 Luxury Lane</p>
                  <p>Beverly Hills, CA 90210</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <Clock size={24} />
                </div>
                <div className="method-details">
                  <h3>Store Hours</h3>
                  <p>Monday - Friday: 10AM - 7PM</p>
                  <p>Saturday: 10AM - 6PM</p>
                  <p>Sunday: 12PM - 5PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What is your return policy?</h3>
              <p>
                We offer a 30-day return policy for all items in their original condition. 
                Custom pieces and engraved items are non-returnable.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer jewelry cleaning services?</h3>
              <p>
                Yes! We provide complimentary cleaning and inspection services for all 
                jewelry purchased from us. Just bring your pieces to our store.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Can you resize rings?</h3>
              <p>
                Absolutely! We offer ring resizing services for most styles. The cost 
                varies depending on the complexity of the design.
              </p>
            </div>
            
            <div className="faq-item">
              <h3>Do you ship internationally?</h3>
              <p>
                Currently, we ship to the United States and Canada. International 
                shipping may be available for select items.
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <h2>Visit Our Store</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <MapPin size={48} />
              <p>Interactive map would be embedded here</p>
              <p>123 Luxury Lane, Beverly Hills, CA 90210</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact; 