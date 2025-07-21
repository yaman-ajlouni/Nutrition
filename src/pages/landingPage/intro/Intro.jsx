import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './Intro.scss';

const Intro = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={`intro ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="intro-container">

        <div className="intro-content">
          <div className={`intro-text ${isVisible ? 'animate-in' : ''}`}>
            <h1 className="intro-title">
              {t('landingPage.intro.title.part1')}
              <span className="highlight">{t('landingPage.intro.title.highlight')}</span>
              <br />
              {t('landingPage.intro.title.part2')}
            </h1>

            <p className="intro-description">
              {t('landingPage.intro.description')}
            </p>

            <div className="intro-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
                    <path d="M9 11V7a3 3 0 0 1 6 0v4" />
                  </svg>
                </div>
                <span>{t('landingPage.intro.features.gsoCompliant')}</span>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2v20M2 12h20" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <span>{t('landingPage.intro.features.preciseCalculations')}</span>
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
                <span>{t('landingPage.intro.features.smartQrCodes')}</span>
              </div>
            </div>

            <div className="intro-actions">
              <button className="btn-primary-large">
                <span>{t('landingPage.intro.buttons.startCalculating')}</span>
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button className="btn-secondary">
                <span>{t('landingPage.intro.buttons.viewDemo')}</span>
                <div className="btn-ripple"></div>
              </button>
            </div>

            <div className="intro-stats">
              <div className="stat-item">
                <span className="stat-number">200</span>
                <span className="stat-suffix">+</span>
                <span className="stat-label">{t('landingPage.intro.stats.localProducts')}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">5K</span>
                <span className="stat-suffix">+</span>
                <span className="stat-label">{t('landingPage.intro.stats.labelsGenerated')}</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">99</span>
                <span className="stat-suffix">%</span>
                <span className="stat-label">{t('landingPage.intro.stats.accuracyRate')}</span>
              </div>
            </div>
          </div>

          <div className={`intro-visual ${isVisible ? 'animate-in' : ''}`}>
            <div className="visual-card">
              <div className="card-header">
                <div className="card-title">{t('landingPage.intro.nutritionFacts.title')}</div>
                <div className="card-subtitle">{t('landingPage.intro.nutritionFacts.per100g')}</div>
              </div>

              <div className="nutrition-item">
                <span className="nutrition-label">{t('landingPage.intro.nutritionFacts.energy')}</span>
                <span className="nutrition-value">250 kcal</span>
              </div>

              <div className="nutrition-item">
                <span className="nutrition-label">{t('landingPage.intro.nutritionFacts.totalFat')}</span>
                <span className="nutrition-value">12g</span>
              </div>

              <div className="nutrition-item">
                <span className="nutrition-label">{t('landingPage.intro.nutritionFacts.saturatedFat')}</span>
                <span className="nutrition-value">5g</span>
              </div>

              <div className="nutrition-item">
                <span className="nutrition-label">{t('landingPage.intro.nutritionFacts.carbohydrates')}</span>
                <span className="nutrition-value">31g</span>
              </div>

              <div className="nutrition-item">
                <span className="nutrition-label">{t('landingPage.intro.nutritionFacts.sugars')}</span>
                <span className="nutrition-value">15g</span>
              </div>

              <div className="nutrition-item">
                <span className="nutrition-label">{t('landingPage.intro.nutritionFacts.protein')}</span>
                <span className="nutrition-value">8g</span>
              </div>

              <div className="nutrition-item">
                <span className="nutrition-label">{t('landingPage.intro.nutritionFacts.salt')}</span>
                <span className="nutrition-value">1.2g</span>
              </div>

              <div className="calculation-badge">
                <span className="badge-text">{t('landingPage.intro.nutritionFacts.autoCalculated')}</span>
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