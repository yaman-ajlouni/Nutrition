import React, { useState } from 'react';
import './Pricing.scss';

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
        {
            name: "Starter",
            description: "Perfect for small food businesses getting started",
            monthlyPrice: 49,
            yearlyPrice: 39,
            popular: false,
            features: [
                "Up to 25 products",
                "Basic ingredient database",
                "Standard nutrition labels",
                "PDF & PNG exports",
                "Email support",
                "Basic allergen tracking",
                "Recipe storage",
                "FDA compliance check"
            ],
            limitations: [
                "Limited to 25 products",
                "Basic support only"
            ],
            buttonText: "Start Free Trial",
            buttonStyle: "outline"
        },
        {
            name: "Professional",
            description: "Ideal for growing manufacturers and mid-size factories",
            monthlyPrice: 149,
            yearlyPrice: 119,
            popular: true,
            features: [
                "Up to 500 products",
                "Complete ingredient database (10,000+ items)",
                "Advanced nutrition calculations",
                "All export formats + API access",
                "Priority support & phone support",
                "Advanced allergen management",
                "Batch processing",
                "Team collaboration (5 users)",
                "Custom ingredients",
                "Nutritional analysis reports",
                "Label customization",
                "Version control"
            ],
            limitations: [],
            buttonText: "Start Free Trial",
            buttonStyle: "primary"
        },
        {
            name: "Enterprise",
            description: "For large-scale manufacturers with complex needs",
            monthlyPrice: 399,
            yearlyPrice: 319,
            popular: false,
            features: [
                "Unlimited products",
                "Complete database + custom additions",
                "Advanced AI-powered calculations",
                "Full API access & integrations",
                "Dedicated account manager",
                "Complete allergen suite",
                "Advanced batch operations",
                "Unlimited team members",
                "Custom formulation tools",
                "Advanced analytics & reporting",
                "White-label solutions",
                "Custom integrations",
                "Regulatory compliance suite",
                "Multi-facility management"
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
                "99.9% calculation accuracy",
                "FDA compliant labels",
                "Data security & encryption",
                "Regular database updates",
                "Mobile responsive interface"
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
                        All plans include our core nutrition calculation engine with no hidden fees.
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
                                    <span className="period">/{isYearly ? 'month' : 'month'}</span>
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

                {/* FAQ Section */}
                <div className="pricing-faq">
                    <h3 className="faq-title">Frequently Asked Questions</h3>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <h4 className="faq-question">Can I change plans anytime?</h4>
                            <p className="faq-answer">
                                Yes, you can upgrade or downgrade your plan at any time.
                                Changes take effect immediately and billing is prorated.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4 className="faq-question">Is there a setup fee?</h4>
                            <p className="faq-answer">
                                No setup fees for any plan. Start your 14-day free trial
                                immediately and begin calculating nutrition facts right away.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4 className="faq-question">What payment methods do you accept?</h4>
                            <p className="faq-answer">
                                We accept all major credit cards, PayPal, and ACH transfers
                                for Enterprise customers. All payments are processed securely.
                            </p>
                        </div>

                        <div className="faq-item">
                            <h4 className="faq-question">Do you offer custom enterprise solutions?</h4>
                            <p className="faq-answer">
                                Yes, we work with large manufacturers to create custom solutions
                                including API integrations, white-label options, and dedicated support.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="pricing-cta">
                    <div className="cta-content">
                        <h3 className="cta-title">Still Have Questions?</h3>
                        <p className="cta-description">
                            Our nutrition labeling experts are here to help you choose the right plan
                            and answer any questions about compliance or implementation.
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