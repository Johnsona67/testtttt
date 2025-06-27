import React from 'react';
import { motion } from 'framer-motion';
import { Diamond, Award, Users, Heart, Sparkles, Clock } from 'lucide-react';
import './About.css';

const About = () => {
  const values = [
    {
      icon: <Diamond size={40} />,
      title: "Craftsmanship",
      description: "Every piece is handcrafted with precision and attention to detail"
    },
    {
      icon: <Award size={40} />,
      title: "Quality",
      description: "We use only the finest materials and gemstones"
    },
    {
      icon: <Heart size={40} />,
      title: "Passion",
      description: "Our love for jewelry drives everything we create"
    },
    {
      icon: <Sparkles size={40} />,
      title: "Innovation",
      description: "We blend traditional techniques with modern design"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Master Jeweler",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      experience: "25+ years"
    },
    {
      name: "Michael Chen",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      experience: "15+ years"
    },
    {
      name: "Emma Rodriguez",
      role: "Gemologist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      experience: "12+ years"
    }
  ];

  return (
    <div className="about">
      <div className="about-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Our Story</h1>
            <p>
              For over three decades, we've been crafting timeless jewelry that tells 
              your unique story. From our humble beginnings to becoming a trusted name 
              in luxury jewelry, our passion for excellence remains unchanged.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          {/* History Section */}
          <motion.section
            className="history-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="history-grid">
              <div className="history-text">
                <h2>A Legacy of Excellence</h2>
                <p>
                  Founded in 1985 by master jeweler Robert Luxe, our company began as a 
                  small family workshop with a simple mission: to create jewelry that 
                  would be treasured for generations. What started with just three 
                  craftsmen has grown into a team of over 50 skilled artisans, each 
                  bringing their unique expertise to every piece we create.
                </p>
                <p>
                  Today, we continue to honor our founder's vision by maintaining the 
                  highest standards of craftsmanship while embracing modern techniques 
                  and sustainable practices. Every piece that leaves our workshop carries 
                  with it the legacy of three decades of dedication to the art of jewelry making.
                </p>
              </div>
              <div className="history-image">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop" 
                  alt="Jewelry Workshop"
                />
              </div>
            </div>
          </motion.section>

          {/* Values Section */}
          <motion.section
            className="values-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Our Values</h2>
            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="value-icon">
                    {value.icon}
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Team Section */}
          <motion.section
            className="team-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Meet Our Team</h2>
            <p className="team-intro">
              Our team of master craftsmen and designers bring decades of combined 
              experience to every piece we create.
            </p>
            <div className="team-grid">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="team-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <p className="member-experience">{member.experience} experience</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            className="stats-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="stats-grid">
              <motion.div
                className="stat-item"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Clock size={40} />
                <h3>35+ Years</h3>
                <p>of Excellence</p>
              </motion.div>
              <motion.div
                className="stat-item"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Users size={40} />
                <h3>50+ Artisans</h3>
                <p>Skilled Craftsmen</p>
              </motion.div>
              <motion.div
                className="stat-item"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Diamond size={40} />
                <h3>10,000+</h3>
                <p>Pieces Created</p>
              </motion.div>
              <motion.div
                className="stat-item"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Award size={40} />
                <h3>100%</h3>
                <p>Customer Satisfaction</p>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default About; 