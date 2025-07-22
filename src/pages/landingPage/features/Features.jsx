import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './Features.scss';

const Features = () => {
  const [activeTab, setActiveTab] = useState('features');
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

  // Get translations for features section
  const featuresData = t('landingPage.features.features', []);
  const benefitsData = t('landingPage.features.benefits', []);

  const features = [
    {
      title: featuresData[0]?.title || "MENA Region Food Database",
      description: featuresData[0]?.description || "Access MENA region FAO food database with auto-suggest. Add custom ingredients and save frequently used items.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8" />
          <path d="M8 11h8" />
          <path d="M8 15h6" />
        </svg>
      ),
      highlight: featuresData[0]?.highlight || "Regional Database"
    },
    {
      title: featuresData[1]?.title || "GSO 9/2013 Compliance",
      description: featuresData[1]?.description || "Generate nutrition labels meeting GSO 9/2013 requirements. Automatic validation for nutrient panels and allergen declarations.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
          <path d="M9 11V7a3 3 0 0 1 6 0v4" />
        </svg>
      ),
      highlight: featuresData[1]?.highlight || "100% Compliant"
    },
    {
      title: featuresData[2]?.title || "Smart QR Code Generation",
      description: featuresData[2]?.description || "Auto-generate QR codes linking to product pages. Track scan analytics with premium features.",
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
      highlight: featuresData[2]?.highlight || "Smart QR Codes"
    },
    {
      title: featuresData[3]?.title || "Allergen Detection & Tags",
      description: featuresData[3]?.description || "Auto-detect allergens and suggest tags like 'low fat', 'sugar free' based on database analysis.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      highlight: featuresData[3]?.highlight || "Auto-Detection"
    },
    {
      title: featuresData[4]?.title || "Multilingual Support",
      description: featuresData[4]?.description || "Toggle between Arabic and English interfaces. Generate compliant labels in both languages.",
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
      highlight: featuresData[4]?.highlight || "Arabic/English"
    },
    {
      title: featuresData[5]?.title || "Team Collaboration",
      description: featuresData[5]?.description || "Multi-user access with role permissions. Share recipes and maintain version control.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      highlight: featuresData[5]?.highlight || "Team Ready"
    }
  ];

  const benefits = [
    {
      title: benefitsData[0]?.title || "Reduce Labeling Costs by 70%",
      description: benefitsData[0]?.description || "Avoid expensive lab testing for standard nutrition facts. Create GSO-compliant labels quickly and affordably — perfect for small and medium producers.",
      metric: benefitsData[0]?.metric || "70%",
      unit: benefitsData[0]?.unit || "Cost Reduction"
    },
    {
      title: benefitsData[1]?.title || "Save Over 8 Hours Per Product",
      description: benefitsData[1]?.description || "Manual calculations that took days now take minutes. Spend less time on paperwork and more time improving your products.",
      metric: benefitsData[1]?.metric || "8+",
      unit: benefitsData[1]?.unit || "Hours Saved"
    },
    {
      title: benefitsData[2]?.title || "Trust Every Label You Create",
      description: benefitsData[2]?.description || "Our system is built on validated data and aligned with GSO 9/2013 standards — ensuring your labels are accurate and regulator-ready.",
      metric: benefitsData[2]?.metric || "99%",
      unit: benefitsData[2]?.unit || "Accuracy"
    },
    {
      title: benefitsData[3]?.title || "Scalable for Any Team",
      description: benefitsData[3]?.description || "Whether you're starting small or managing large production lines, our platform supports every tier with powerful, flexible tools.",
      metric: benefitsData[3]?.metric || "∞",
      unit: benefitsData[3]?.unit || "From 3 Products to 300"
    },
    {
      title: benefitsData[4]?.title || "Health-Ready & Export-Ready",
      description: benefitsData[4]?.description || "Labels are automatically checked to meet both Syrian licensing requirements and Gulf export regulations — no guesswork, no rework.",
      metric: benefitsData[4]?.metric || "✓",
      unit: benefitsData[4]?.unit || "Ministry & GSO Compliant"
    }
  ];

  return (
    <section className="features" ref={sectionRef}>
      <div className="features-container">
        {/* Section Header */}
        <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
          <div className="section-badge">
            <span>{t('landingPage.features.sectionBadge', 'Platform Capabilities')}</span>
          </div>
          <h2 className="section-title">
            {t('landingPage.features.title.part1', 'Everything You Need for')}
            <span className="highlight">{t('landingPage.features.title.highlight', ' Nutrition Labeling')}</span>
          </h2>
          <p className="section-description">
            {t('landingPage.features.description', 'Complete platform for MENA region food manufacturers to create accurate, GSO-compliant nutrition labels efficiently.')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`tab-navigation ${isVisible ? 'animate-in' : ''}`}>
          <button
            className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            <span className="tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
            {t('landingPage.features.tabs.features', 'Features')}
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
            {t('landingPage.features.tabs.benefits', 'Benefits')}
          </button>
        </div>

        {/* Features Tab Content */}
        {activeTab === 'features' && (
          <div className={`features-grid ${isVisible ? 'animate-in' : ''}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                style={{ '--delay': `${index * 0.1}s` }}
              >
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
          <div className={`benefits-grid ${isVisible ? 'animate-in' : ''}`}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card"
                style={{ '--delay': `${index * 0.1}s` }}
              >
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
        <div className={`features-cta ${isVisible ? 'animate-in' : ''}`}>
          <div className="cta-content">
            <h3 className="cta-title">
              {t('landingPage.features.cta.title', 'Ready to Transform Your Nutrition Labeling?')}
            </h3>
            <p className="cta-description">
              {t('landingPage.features.cta.description', 'Join leading food manufacturers who have streamlined their labeling process with our platform.')}
            </p>
            <div className="cta-buttons">
              <button className="btn-primary">
                {t('landingPage.features.cta.buttons.primary', 'Start 14-Day Free Trial')}
              </button>
              <button className="btn-outline">
                {t('landingPage.features.cta.buttons.secondary', 'Request Product Demo')}
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
                <span className="stat-number">
                  {t('landingPage.features.cta.stats.0.number', '150+')}
                </span>
                <span className="stat-label">
                  {t('landingPage.features.cta.stats.0.label', 'Active Producers')}
                </span>
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
                <span className="stat-number">
                  {t('landingPage.features.cta.stats.1.number', '5K+')}
                </span>
                <span className="stat-label">
                  {t('landingPage.features.cta.stats.1.label', 'Labels Generated')}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">
                  {t('landingPage.features.cta.stats.2.number', '4.8')}
                </span>
                <span className="stat-label">
                  {t('landingPage.features.cta.stats.2.label', 'Customer Rating')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;