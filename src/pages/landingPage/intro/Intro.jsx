import React from 'react';
import './Intro.scss';

const Intro = () => {
  return (
    <section className="intro">
      <div className="intro-container">
        {/* Main Content */}
        <div className="intro-content">
          <div className="intro-text">
            <h1 className="intro-title">
              Professional Nutrition Facts
              <span className="highlight"> Calculator</span>
              <br />
              For Food Factories & Plants
            </h1>
            
            <p className="intro-description">
              Calculate precise nutrition facts for your food production with our advanced 
              calculator designed specifically for factories and manufacturing plants. 
              Generate compliant nutrition labels, analyze ingredients, and ensure 
              regulatory compliance with ease.
            </p>

            <div className="intro-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"/>
                    <path d="M9 11V7a3 3 0 0 1 6 0v4"/>
                  </svg>
                </div>
                <span>FDA Compliant Labels</span>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2v20M2 12h20"/>
                    <circle cx="12" cy="12" r="9"/>
                  </svg>
                </div>
                <span>Precise Calculations</span>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <span>Detailed Reports</span>
              </div>
            </div>

            <div className="intro-actions">
              <button className="btn-primary-large">
                Start Calculating Now
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              
              <button className="btn-secondary">
                View Demo
              </button>
            </div>

            <div className="intro-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Food Factories</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Products Analyzed</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Accuracy Rate</span>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="intro-visual">
            <div className="visual-card">
              <div className="card-header">
                <div className="card-title">Nutrition Facts</div>
                <div className="card-subtitle">Per 100g</div>
              </div>
              
              <div className="nutrition-item">
                <span className="nutrition-label">Calories</span>
                <span className="nutrition-value">250</span>
              </div>
              
              <div className="nutrition-item">
                <span className="nutrition-label">Total Fat</span>
                <span className="nutrition-value">12g</span>
              </div>
              
              <div className="nutrition-item">
                <span className="nutrition-label">Saturated Fat</span>
                <span className="nutrition-value">5g</span>
              </div>
              
              <div className="nutrition-item">
                <span className="nutrition-label">Cholesterol</span>
                <span className="nutrition-value">30mg</span>
              </div>
              
              <div className="nutrition-item">
                <span className="nutrition-label">Sodium</span>
                <span className="nutrition-value">460mg</span>
              </div>
              
              <div className="nutrition-item">
                <span className="nutrition-label">Total Carbohydrate</span>
                <span className="nutrition-value">31g</span>
              </div>
              
              <div className="nutrition-item">
                <span className="nutrition-label">Protein</span>
                <span className="nutrition-value">8g</span>
              </div>

              <div className="calculation-badge">
                <span className="badge-text">Auto-calculated</span>
                <div className="badge-icon">✓</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="floating-element element-1">
              <div className="element-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="9"/>
                </svg>
              </div>
            </div>
            
            <div className="floating-element element-2">
              <div className="element-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;