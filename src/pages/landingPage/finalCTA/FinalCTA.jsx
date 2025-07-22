import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './FinalCTA.scss';

const FinalCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  // Animation intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Get translations for final CTA section
  const trustElementsData = t('landingPage.finalCTA.trustElements', []);
  const statsData = t('landingPage.finalCTA.stats', []);

  const trustElements = trustElementsData.length > 0 ? trustElementsData : [
    { text: "No credit card required" },
    { text: "30-day money back guarantee" },
    { text: "Expert nutrition support" }
  ];

  const stats = statsData.length > 0 ? statsData : [
    { number: "200+", label: "Food Producers" },
    { number: "5K+", label: "Labels Generated" },
    { number: "GSO", label: "Compliant Standards" },
    { number: "QR", label: "Smart Codes" }
  ];

  return (
    <section className="final-cta" ref={sectionRef}>
      <div className="final-cta-container">
        {/* Main CTA Content */}
        <div className={`cta-content ${isVisible ? 'animate-in' : ''}`}>
          <div className="cta-header">
            <div className="cta-badge">
              <span>{t('landingPage.finalCTA.badge', 'Ready to Get Started?')}</span>
            </div>
            <h2 className="cta-title">
              {t('landingPage.finalCTA.title.part1', 'Transform Your Nutrition Labeling Process')}
              <span className="highlight">{t('landingPage.finalCTA.title.highlight', ' Today')}</span>
            </h2>
            <p className="cta-description">
              {t('landingPage.finalCTA.description', 'Join hundreds of MENA food manufacturers using our GSO-compliant platform. Start your free trial and generate professional labels with QR codes in minutes.')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`cta-actions ${isVisible ? 'animate-in' : ''}`}>
            <button className="btn-primary">
              {t('landingPage.finalCTA.buttons.primary', 'Start 14-Day Free Trial')}
              <span className="btn-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            <button className="btn-secondary">
              {t('landingPage.finalCTA.buttons.secondary', 'Schedule a Demo')}
            </button>
          </div>

          {/* Trust Elements */}
          <div className={`trust-elements ${isVisible ? 'animate-in' : ''}`}>
            {trustElements.map((item, index) => (
              <div
                key={index}
                className="trust-item"
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="trust-icon">
                  {index === 0 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 12l2 2 4-4" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  )}
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`stats-section ${isVisible ? 'animate-in' : ''}`}>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card"
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;