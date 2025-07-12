import React, { useState } from 'react';
import './Pricing.scss';

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
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
            limitations: [
                "Limited to 3 products monthly",
                "Basic support only"
            ],
            buttonText: "Start Free Trial",
            buttonStyle: "outline"
        },
        {
            name: "Professional",
            description: "Ideal for growing manufacturers and mid-size producers",
            monthlyPrice: 89,
            yearlyPrice: 71,
            popular: true,
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
            limitations: [],
            buttonText: "Start Free Trial",
            buttonStyle: "primary"
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
            limitations: [],
            buttonText: "Contact Sales",
            buttonStyle: "outline"
        }
    ];

    const additionalFeatures = [
        {
            title: "All Plans Include",
            features: [
                "14-day free trial",
                "GSO 9/2013 compliance",
                "99% calculation accuracy",
                "Data security & encryption",
                "Mobile responsive interface",
                "Regular database updates"
            ]
        }
    ];

    return (
        <section className="pricing">
            <div className="pricing-container">
                {/* Section Header */}
                <div className="section-header">
                    <div className="section-badge">
                        <span>Pricing Plans</span>
                    </div>
                    <h2 className="section-title">
                        Simple, Transparent Pricing
                        <span className="highlight"> for Every Business Size</span>
                    </h2>
                    <p className="section-description">
                        Choose the perfect plan for your food manufacturing needs.
                        Core nutrition calculation engine with no hidden fees.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="billing-toggle">
                    <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>Monthly</span>
                    <button
                        className={`toggle-switch ${isYearly ? 'yearly' : 'monthly'}`}
                        onClick={() => setIsYearly(!isYearly)}
                    >
                        <span className="toggle-slider"></span>
                    </button>
                    <span className={`toggle-label ${isYearly ? 'active' : ''}`}>
                        Yearly
                        <span className="savings-badge">Save 20%</span>
                    </span>
                </div>

                {/* Pricing Cards */}
                <div className="pricing-grid">
                    {plans.map((plan, index) => (
                        <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                            {plan.popular && (
                                <div className="popular-badge">
                                    <span>Most Popular</span>
                                </div>
                            )}

                            <div className="plan-header">
                                <h3 className="plan-name">{plan.name}</h3>
                                <p className="plan-description">{plan.description}</p>

                                <div className="plan-price">
                                    <span className="currency">$</span>
                                    <span className="amount">
                                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                    </span>
                                    <span className="period">/month</span>
                                </div>

                                {isYearly && (
                                    <div className="yearly-note">
                                        Billed annually (${plan.yearlyPrice * 12}/year)
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

                                {plan.name !== "Enterprise" && (
                                    <p className="trial-note">No credit card required</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Features */}
                <div className="additional-features">
                    <div className="features-section">
                        <h3 className="features-title">All Plans Include</h3>
                        <div className="features-grid">
                            {additionalFeatures[0].features.map((feature, index) => (
                                <div key={index} className="feature-badge">
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
                <div className="pricing-cta">
                    <div className="cta-content">
                        <h3 className="cta-title">Still Have Questions?</h3>
                        <p className="cta-description">
                            Our nutrition labeling experts are here to help you choose the right plan
                            and answer any questions about GSO compliance or implementation.
                        </p>
                        <div className="cta-buttons">
                            <button className="btn-primary">
                                Schedule a Demo
                            </button>
                            <button className="btn-outline">
                                Contact Sales
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
                            <span className="badge-title">30-Day Money Back Guarantee</span>
                            <span className="badge-subtitle">Risk-free trial with full refund</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;