import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './Pricing.scss';

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);
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

    // Get translations for pricing section
    const plansData = t('landingPage.pricing.plans', []);
    const additionalFeaturesData = t('landingPage.pricing.additionalFeatures.features', []);

    const plans = plansData.length > 0 ? plansData.map((planData, index) => ({
        name: planData.name,
        description: planData.description,
        monthlyPrice: planData.monthlyPrice,
        yearlyPrice: planData.yearlyPrice,
        popular: planData.popular,
        popularBadge: planData.popularBadge,
        features: planData.features,
        buttonText: planData.buttonText,
        buttonStyle: planData.buttonStyle,
        trialNote: planData.trialNote
    })) : [
        {
            name: "Basic",
            description: "Perfect for small food businesses and startups",
            monthlyPrice: 29,
            yearlyPrice: 23,
            popular: false,
            features: [
                "Up to 3 products per month",
                "Basic ingredient database",
                "Standard GSO-compliant templates",
                "Manual product entry",
                "Basic compliance checks",
                "PDF & PNG exports",
                "Email support",
                "Help center access"
            ],
            buttonText: "Start Free Trial",
            buttonStyle: "outline",
            trialNote: "No credit card required"
        },
        {
            name: "Professional",
            description: "Ideal for growing manufacturers and mid-size producers",
            monthlyPrice: 89,
            yearlyPrice: 71,
            popular: true,
            popularBadge: "Most Popular",
            features: [
                "Up to 20 products per month",
                "Complete ingredient database",
                "Advanced label templates",
                "Bilingual labels (Arabic/English)",
                "Priority review queue",
                "Team collaboration (5 users)",
                "QR code generation",
                "Label validation reports",
                "Product history dashboard",
                "Email & phone support",
                "Onboarding session",
                "Food technician support"
            ],
            buttonText: "Start Free Trial",
            buttonStyle: "primary",
            trialNote: "No credit card required"
        },
        {
            name: "Enterprise",
            description: "For large-scale manufacturers and distributors",
            monthlyPrice: 299,
            yearlyPrice: 239,
            popular: false,
            features: [
                "Unlimited products",
                "Bulk product submissions",
                "Excel/CSV import capabilities",
                "API access & integrations",
                "Compliance dashboard",
                "Dedicated account manager",
                "Multi-user access (unlimited)",
                "Custom certificates & badges",
                "Private label support",
                "Advanced QR analytics",
                "Regulatory update training",
                "24/7 priority support"
            ],
            buttonText: "Contact Sales",
            buttonStyle: "outline"
        }
    ];

    const additionalFeatures = additionalFeaturesData.length > 0 ? additionalFeaturesData : [
        "14-day free trial",
        "GSO 9/2013 compliance",
        "99% calculation accuracy",
        "Data security & encryption",
        "Mobile responsive interface",
        "Regular database updates"
    ];

    return (
        <section className="pricing" ref={sectionRef}>
            <div className="pricing-container">
                {/* Section Header */}
                <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
                    <div className="section-badge">
                        <span>{t('landingPage.pricing.sectionBadge', 'Pricing Plans')}</span>
                    </div>
                    <h2 className="section-title">
                        {t('landingPage.pricing.title.part1', 'Simple, Transparent Pricing')}
                        <span className="highlight">{t('landingPage.pricing.title.highlight', ' for Every Business Size')}</span>
                    </h2>
                    <p className="section-description">
                        {t('landingPage.pricing.description', 'Choose the perfect plan for your food manufacturing needs. Core nutrition calculation engine with no hidden fees.')}
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className={`billing-toggle ${isVisible ? 'animate-in' : ''}`}>
                    <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>
                        {t('landingPage.pricing.billingToggle.monthly', 'Monthly')}
                    </span>
                    <button
                        className={`toggle-switch ${isYearly ? 'yearly' : 'monthly'}`}
                        onClick={() => setIsYearly(!isYearly)}
                    >
                        <span className="toggle-slider"></span>
                    </button>
                    <span className={`toggle-label ${isYearly ? 'active' : ''}`}>
                        {t('landingPage.pricing.billingToggle.yearly', 'Yearly')}
                        <span className="savings-badge">
                            {t('landingPage.pricing.billingToggle.savingsBadge', 'Save 20%')}
                        </span>
                    </span>
                </div>

                {/* Pricing Cards */}
                <div className={`pricing-grid ${isVisible ? 'animate-in' : ''}`}>
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                            style={{ '--delay': `${index * 0.1}s` }}
                        >
                            {plan.popular && (
                                <div className="popular-badge">
                                    <span>{plan.popularBadge || t('landingPage.pricing.plans.1.popularBadge', 'Most Popular')}</span>
                                </div>
                            )}

                            <div className="plan-header">
                                <h3 className="plan-name">{plan.name}</h3>
                                <p className="plan-description">{plan.description}</p>

                                <div className="plan-price">
                                    <span className="currency">{t('landingPage.pricing.currency', '$')}</span>
                                    <span className="amount">
                                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                    </span>
                                    <span className="period">{t('landingPage.pricing.period', '/month')}</span>
                                </div>

                                {isYearly && (
                                    <div className="yearly-note">
                                        {t('landingPage.pricing.yearlyNote', 'Billed annually (${price}/year)', {
                                            price: plan.yearlyPrice * 12
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="plan-features">
                                <ul className="features-list">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="feature-item">
                                            <span className="feature-icon">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M9 12l2 2 4-4" />
                                                </svg>
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="plan-action">
                                <button className={`plan-button ${plan.buttonStyle}`}>
                                    {plan.buttonText}
                                </button>

                                {plan.trialNote && (
                                    <p className="trial-note">{plan.trialNote}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Features */}
                <div className={`additional-features ${isVisible ? 'animate-in' : ''}`}>
                    <div className="features-section">
                        <h3 className="features-title">
                            {t('landingPage.pricing.additionalFeatures.title', 'All Plans Include')}
                        </h3>
                        <div className="features-grid">
                            {additionalFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="feature-badge"
                                    style={{ '--delay': `${index * 0.1}s` }}
                                >
                                    <span className="badge-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M9 12l2 2 4-4" />
                                            <circle cx="12" cy="12" r="9" />
                                        </svg>
                                    </span>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className={`pricing-cta ${isVisible ? 'animate-in' : ''}`}>
                    <div className="cta-content">
                        <h3 className="cta-title">
                            {t('landingPage.pricing.cta.title', 'Still Have Questions?')}
                        </h3>
                        <p className="cta-description">
                            {t('landingPage.pricing.cta.description', 'Our nutrition labeling experts are here to help you choose the right plan and answer any questions about GSO compliance or implementation.')}
                        </p>
                        <div className="cta-buttons">
                            <button className="btn-primary">
                                {t('landingPage.pricing.cta.buttons.primary', 'Schedule a Demo')}
                            </button>
                            <button className="btn-outline">
                                {t('landingPage.pricing.cta.buttons.secondary', 'Contact Sales')}
                            </button>
                        </div>
                    </div>

                    <div className="guarantee-badge">
                        <div className="badge-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M9 12l2 2 4-4" />
                                <circle cx="12" cy="12" r="9" />
                            </svg>
                        </div>
                        <div className="badge-content">
                            <span className="badge-title">
                                {t('landingPage.pricing.cta.guarantee.title', '30-Day Money Back Guarantee')}
                            </span>
                            <span className="badge-subtitle">
                                {t('landingPage.pricing.cta.guarantee.subtitle', 'Risk-free trial with full refund')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;