import React, { useState } from 'react';
import './Features.scss';

const Features = () => {
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    {
      title: "Comprehensive Ingredient Database",
      description: "Access over 10,000 pre-loaded ingredients with complete nutritional profiles. Add custom ingredients and save your frequently used items.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          <path d="M8 7h8"/>
          <path d="M8 11h8"/>
          <path d="M8 15h6"/>
        </svg>
      ),
      highlight: "10,000+ Ingredients"
    },
    {
      title: "FDA Compliant Calculations",
      description: "Generate nutrition labels that meet all FDA requirements. Our algorithms follow official USDA and FDA guidelines for accurate compliance.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"/>
          <path d="M9 11V7a3 3 0 0 1 6 0v4"/>
        </svg>
      ),
      highlight: "100% Compliant"
    },
    {
      title: "Batch Recipe Processing",
      description: "Process multiple recipes simultaneously. Perfect for factories with large product portfolios. Save time with bulk operations.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
          <path d="M9 14l2 2 4-4"/>
        </svg>
      ),
      highlight: "Bulk Processing"
    },
    {
      title: "Advanced Allergen Tracking",
      description: "Automatically detect and track all 14 major allergens. Generate allergen statements and warnings for packaging compliance.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      highlight: "14 Allergens"
    },
    {
      title: "Multiple Export Formats",
      description: "Download nutrition labels in PNG, PDF, SVG, or print-ready formats. API access for direct integration with your systems.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      ),
      highlight: "5+ Formats"
    },
    {
      title: "Real-time Collaboration",
      description: "Team access with role-based permissions. Share recipes, collaborate on formulations, and maintain version control.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      highlight: "Team Ready"
    }
  ];

  const benefits = [
    {
      title: "Reduce Labeling Costs by 75%",
      description: "Eliminate expensive third-party lab testing for standard nutrition facts. Our calculations meet industry standards at a fraction of the cost.",
      metric: "75%",
      unit: "Cost Reduction"
    },
    {
      title: "Save 10+ Hours Per Product",
      description: "What used to take days of manual calculation now takes minutes. Focus on product development instead of paperwork.",
      metric: "10+",
      unit: "Hours Saved"
    },
    {
      title: "99.9% Calculation Accuracy",
      description: "Our algorithms are validated against laboratory results. Trust in precise nutrition facts for regulatory compliance.",
      metric: "99.9%",
      unit: "Accuracy Rate"
    },
    {
      title: "Scale to Unlimited Products",
      description: "Whether you have 10 or 10,000 products, our platform scales with your business. No limits on recipes or calculations.",
      metric: "∞",
      unit: "Products"
    }
  ];

  return (
    <section className="features">
      <div className="features-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span>Platform Capabilities</span>
          </div>
          <h2 className="section-title">
            Everything You Need for
            <span className="highlight"> Nutrition Labeling</span>
          </h2>
          <p className="section-description">
            Our comprehensive platform provides all the tools food manufacturers need 
            to create accurate, compliant nutrition labels efficiently and cost-effectively.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            <span className="tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </span>
            Features
          </button>
          <button 
            className={`tab-button ${activeTab === 'benefits' ? 'active' : ''}`}
            onClick={() => setActiveTab('benefits')}
          >
            <span className="tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="9"/>
              </svg>
            </span>
            Benefits
          </button>
        </div>

        {/* Features Tab Content */}
        {activeTab === 'features' && (
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-header">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <div className="feature-highlight">
                    {feature.highlight}
                  </div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
                <div className="feature-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits Tab Content */}
        {activeTab === 'benefits' && (
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-metric">
                  <span className="metric-number">{benefit.metric}</span>
                  <span className="metric-unit">{benefit.unit}</span>
                </div>
                <div className="benefit-content">
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="features-cta">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Transform Your Nutrition Labeling?</h3>
            <p className="cta-description">
              Join leading food manufacturers who have streamlined their labeling process with our platform.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">
                Start 14-Day Free Trial
              </button>
              <button className="btn-outline">
                Request Product Demo
              </button>
            </div>
          </div>
          
          <div className="cta-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">500+</span>
                <span className="stat-label">Active Manufacturers</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Labels Generated</span>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Customer Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;