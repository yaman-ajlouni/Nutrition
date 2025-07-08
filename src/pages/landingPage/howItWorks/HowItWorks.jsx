import React from 'react';
import './HowItWorks.scss';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "Add Your Ingredients",
            description: "Input your recipe ingredients with precise quantities. Our extensive database includes over 10,000 food items with detailed nutritional profiles.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            )
        },
        {
            id: 2,
            title: "Configure Serving Size",
            description: "Set your product's serving size and package information. Our system automatically adjusts calculations for different portion sizes and units.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 6h18l-2 13H5L3 6z" />
                    <path d="M3 6l2-4h14l2 4" />
                    <circle cx="9" cy="10" r="1" />
                    <circle cx="15" cy="10" r="1" />
                </svg>
            )
        },
        {
            id: 3,
            title: "Advanced Processing",
            description: "Our AI-powered engine calculates nutrition facts considering cooking methods, ingredient interactions, and nutrient retention factors.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2v20" />
                    <path d="M2 12h20" />
                    <path d="M19.07 4.93l-14.14 14.14" />
                    <path d="M4.93 4.93l14.14 14.14" />
                    <circle cx="12" cy="12" r="1" />
                </svg>
            )
        },
        {
            id: 4,
            title: "Generate Compliant Labels",
            description: "Get FDA-compliant nutrition labels instantly. Download in multiple formats including PNG, PDF, and print-ready versions for packaging.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                </svg>
            )
        }
    ];

    return (
        <section className="how-it-works">
            <div className="how-it-works-container">
                {/* Section Header */}
                <div className="section-header">
                    <div className="section-badge">
                        <span>Process</span>
                    </div>
                    <h2 className="section-title">
                        How It Works
                    </h2>
                    <p className="section-description">
                        Our streamlined 4-step process makes nutrition fact calculation simple,
                        accurate, and compliant for food manufacturers of all sizes.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="steps-grid">
                    {steps.map((step, index) => (
                        <div key={step.id} className={`step-card ${index % 2 === 0 ? 'left' : 'right'}`}>
                            <div className="step-number">
                                <span>{step.id}</span>
                            </div>

                            <div className="step-icon">
                                {step.icon}
                            </div>

                            <div className="step-content">
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="step-connector">
                                    <div className="connector-line"></div>
                                    <div className="connector-arrow">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M5 12h14" />
                                            <path d="M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="section-cta">
                    <div className="cta-content">
                        <h3 className="cta-title">Ready to Calculate Your Nutrition Facts?</h3>
                        <p className="cta-description">
                            Join hundreds of food manufacturers who trust our platform for accurate nutrition labeling.
                        </p>
                        <div className="cta-buttons">
                            <button className="btn-primary">
                                Start Free Trial
                            </button>
                            <button className="btn-outline">
                                Schedule Demo
                            </button>
                        </div>
                    </div>

                    <div className="cta-visual">
                        <div className="visual-elements">
                            <div className="element element-1">
                                <div className="element-content">
                                    <div className="element-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
                                            <path d="M9 11V7a3 3 0 0 1 6 0v4" />
                                        </svg>
                                    </div>
                                    <span>FDA Approved</span>
                                </div>
                            </div>

                            <div className="element element-2">
                                <div className="element-content">
                                    <div className="element-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>
                                    <span>Instant Results</span>
                                </div>
                            </div>

                            <div className="element element-3">
                                <div className="element-content">
                                    <div className="element-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                                        </svg>
                                    </div>
                                    <span>High Precision</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;