import { Users, Award, Heart, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>Our Story</h1>
            <p className="hero-subtitle">
              Crafting timeless elegance since 1995, we've been dedicated to bringing 
              you the finest jewelry that celebrates life's most precious moments.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="grid grid-2">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <p>
                At Luxe Jewelry, we believe that every piece of jewelry tells a story. 
                Our mission is to create exceptional pieces that not only enhance your 
                beauty but also become cherished heirlooms passed down through generations.
              </p>
              <p>
                We source only the finest materials and work with master craftsmen to 
                ensure each piece meets our exacting standards. From engagement rings 
                to everyday elegance, we're here to help you find the perfect piece 
                that speaks to your heart.
              </p>
            </div>
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=400&fit=crop" 
                alt="Craftsmanship"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Award size={32} />
              </div>
              <h3>Quality</h3>
              <p>
                We never compromise on quality. Every piece is crafted with precision 
                and attention to detail, using only the finest materials available.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <Heart size={32} />
              </div>
              <h3>Passion</h3>
              <p>
                Our love for jewelry drives everything we do. We're passionate about 
                creating pieces that bring joy and beauty to your life.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <Shield size={32} />
              </div>
              <h3>Trust</h3>
              <p>
                We've built our reputation on trust and transparency. You can count on 
                us to provide honest advice and exceptional service.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <Users size={32} />
              </div>
              <h3>Community</h3>
              <p>
                We're proud to be part of your community, celebrating life's milestones 
                and creating lasting relationships with our customers.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate people behind Luxe Jewelry</p>
          </div>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" 
                  alt="John Smith"
                />
              </div>
              <div className="member-info">
                <h3>John Smith</h3>
                <p className="member-title">Founder & Master Jeweler</p>
                <p>
                  With over 25 years of experience, John brings his passion for 
                  craftsmanship to every piece we create.
                </p>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face" 
                  alt="Sarah Johnson"
                />
              </div>
              <div className="member-info">
                <h3>Sarah Johnson</h3>
                <p className="member-title">Design Director</p>
                <p>
                  Sarah's creative vision and attention to detail ensure that every 
                  design is both beautiful and timeless.
                </p>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" 
                  alt="Michael Chen"
                />
              </div>
              <div className="member-info">
                <h3>Michael Chen</h3>
                <p className="member-title">Gemologist</p>
                <p>
                  Michael's expertise in gemology ensures that every stone we use 
                  meets our rigorous quality standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Years of Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Unique Designs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfaction Guaranteed</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 