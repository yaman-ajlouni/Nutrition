import React, { useEffect, useState } from 'react';
import './Intro.scss';

const Intro = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="intro">
      <div className="intro-container">
        {/* Background decorative elements */}
        <div className="background-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>

        {/* Main Content */}
        <div className="intro-content">
          <div className={`intro-text ${isVisible ? 'animate-in' : ''}`}>
            <h1 className="intro-title">
              Smart Nutrition Labeling
              <span className="highlight"> Platform</span>
              <br />
              For MENA Food Manufacturers
            </h1>

            <p className="intro-description">
              Generate GSO-compliant nutrition labels with QR codes in minutes.
              Designed for MENA region food producers with accurate calculations
              and regulatory compliance.
            </p>

            <div className="intro-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
                    <path d="M9 11V7a3 3 0 0 1 6 0v4" />
                  </svg>
                </div>
                <span>GSO Compliant</span>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2v20M2 12h20" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <span>Precise Calculations</span>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>
                </div>
                <span>Smart QR Codes</span>
              </div>
            </div>

            <div className="intro-actions">
              <button className="btn-primary-large">
                <span>Start Calculating Now</span>
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button className="btn-secondary">
                <span>View Demo</span>
                <div className="btn-ripple"></div>
              </button>
            </div>

            <div className="intro-stats">
              <div className="stat-item">
                <span className="stat-number">200</span>
                <span className="stat-suffix">+</span>
                <span className="stat-label">Local Products</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">5K</span>
                <span className="stat-suffix">+</span>
                <span className="stat-label">Labels Generated</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">99</span>
                <span className="stat-suffix">%</span>
                <span className="stat-label">Accuracy Rate</span>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className={`intro-visual ${isVisible ? 'animate-in' : ''}`}>
            <div className="visual-card">
              <div className="card-header">
                <div className="card-title">Nutrition Facts</div>
                <div className="card-subtitle">Per 100g</div>
              </div>

              <div className="nutrition-item">
                <span className="nutrition-label">Energy</span>
                <span className="nutrition-value">250 kcal</span>
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
                <span className="nutrition-label">Carbohydrates</span>
                <span className="nutrition-value">31g</span>
              </div>

              <div className="nutrition-item">
                <span className="nutrition-label">Sugars</span>
                <span className="nutrition-value">15g</span>
              </div>

              <div className="nutrition-item">
                <span className="nutrition-label">Protein</span>
                <span className="nutrition-value">8g</span>
              </div>

              <div className="nutrition-item">
                <span className="nutrition-label">Salt</span>
                <span className="nutrition-value">1.2g</span>
              </div>

              <div className="calculation-badge">
                <span className="badge-text">Auto-calculated</span>
                <div className="badge-icon">✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;