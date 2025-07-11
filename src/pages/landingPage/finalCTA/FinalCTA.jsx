import React from 'react';
import './FinalCTA.scss';

const FinalCTA = () => {
  return (
    <section className="final-cta">
      <div className="final-cta-container">
        {/* Main CTA Content */}
        <div className="cta-content">
          <div className="cta-header">
            <div className="cta-badge">
              <span>Ready to Get Started?</span>
            </div>
            
            <h2 className="cta-title">
              Transform Your Nutrition Labeling Process
              <span className="highlight"> Today</span>
            </h2>
            
            <p className="cta-description">
              Join hundreds of food manufacturers who have streamlined their nutrition 
              labeling with our accurate, FDA-compliant platform. Start your free trial 
              and see results in minutes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="cta-actions">
            <button className="btn-primary">
              Start 14-Day Free Trial
              <span className="btn-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </button>
            
            <button className="btn-secondary">
              Schedule a Demo
            </button>
          </div>

          {/* Trust Elements */}
          <div className="trust-elements">
            <div className="trust-item">
              <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="9"/>
              </svg>
              <span>No credit card required</span>
            </div>
            
            <div className="trust-item">
              <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>30-day money back guarantee</span>
            </div>
            
            <div className="trust-item">
              <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Expert support included</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Food Manufacturers</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Labels Generated</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Platform Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;