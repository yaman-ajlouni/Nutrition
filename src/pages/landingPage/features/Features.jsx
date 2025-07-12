import React, { useState } from 'react';
import './Features.scss';

const Features = () => {
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    {
      title: "MENA Region Food Database",
      description: "Access MENA region FAO food database with auto-suggest. Add custom ingredients and save frequently used items.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8" />
          <path d="M8 11h8" />
          <path d="M8 15h6" />
        </svg>
      ),
      highlight: "Regional Database"
    },
    {
      title: "GSO 9/2013 Compliance",
      description: "Generate nutrition labels meeting GSO 9/2013 requirements. Automatic validation for nutrient panels and allergen declarations.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
          <path d="M9 11V7a3 3 0 0 1 6 0v4" />
        </svg>
      ),
      highlight: "100% Compliant"
    },
    {
      title: "Smart QR Code Generation",
      description: "Auto-generate QR codes linking to product pages. Track scan analytics with premium features.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 7v4a1 1 0 0 0 1 1h4" />
          <path d="M21 17v-4a1 1 0 0 0-1-1h-4" />
          <path d="M21 7v4a1 1 0 0 1-1 1h-4" />
          <path d="M3 17v-4a1 1 0 0 1 1-1h4" />
          <path d="M9 9h1v1H9z" />
          <path d="M14 14h1v1h-1z" />
        </svg>
      ),
      highlight: "Smart QR Codes"
    },
    {
      title: "Allergen Detection & Tags",
      description: "Auto-detect allergens and suggest tags like 'low fat', 'sugar free' based on database analysis.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      highlight: "Auto-Detection"
    },
    {
      title: "Multilingual Support",
      description: "Toggle between Arabic and English interfaces. Generate compliant labels in both languages.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M5 8l6 6" />
          <path d="M4 14l6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="M22 22l-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
      ),
      highlight: "Arabic/English"
    },
    {
      title: "Team Collaboration",
      description: "Multi-user access with role permissions. Share recipes and maintain version control.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      highlight: "Team Ready"
    }
  ];

  const benefits = [
    {
      title: "Reduce Labeling Costs by 70%",
      description: "Eliminate expensive lab testing for standard nutrition facts. Meet regional standards at fraction of the cost.",
      metric: "70%",
      unit: "Cost Reduction"
    },
    {
      title: "Save 8+ Hours Per Product",
      description: "Manual calculations that took days now take minutes. Focus on product development instead of paperwork.",
      metric: "8+",
      unit: "Hours Saved"
    },
    {
      title: "99% Calculation Accuracy",
      description: "Algorithms validated against lab results and regional standards. Trust precise nutrition facts for compliance.",
      metric: "99%",
      unit: "Accuracy Rate"
    },
    {
      title: "Scale Your Production",
      description: "Whether you have 3 or 300 products, our platform scales with your business needs across all subscription tiers.",
      metric: "∞",
      unit: "Scalability"
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
            Complete platform for MENA region food manufacturers to create
            accurate, GSO-compliant nutrition labels efficiently.
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
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="9" />
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
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">150+</span>
                <span className="stat-label">Active Producers</span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">5K+</span>
                <span className="stat-label">Labels Generated</span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">4.8</span>
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