import { useEffect, useState } from 'react';
import './HowItWorks.scss';

const HowItWorks = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const section = document.querySelector('.how-it-works');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    const steps = [
        {
            id: 1,
            title: "Add Ingredients",
            description: "Input your recipe with precise quantities. Our MENA database includes thousands of food items with nutritional profiles.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    <path d="M8 7h8" />
                    <path d="M8 11h8" />
                    <path d="M8 15h6" />
                </svg>
            )
        },
        {
            id: 2,
            title: "Configure Product",
            description: "Set serving size, package info, and category. Auto-detect allergens and special tags like 'low fat' from our database.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="M9 14l2 2 4-4" />
                </svg>
            )
        },
        {
            id: 3,
            title: "Smart Analysis",
            description: "Calculate nutrition facts, flag warnings for high sugar/sodium, and check compliance against GSO 9/2013 standards.",
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
            title: "Generate Labels & QR",
            description: "Create GSO-compliant labels with QR codes linking to product pages. Download in multiple formats or use API integration.",
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
                {/* Background decorative elements */}
                <div className="background-decoration">
                    <div className="decoration-shape shape-1"></div>
                    <div className="decoration-shape shape-2"></div>
                    <div className="decoration-dots"></div>
                </div>

                {/* Section Header */}
                <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
                    <div className="section-badge">
                        <span>Process</span>
                    </div>
                    <h2 className="section-title">
                        How It Works
                    </h2>
                    <p className="section-description">
                        Simple 4-step process for accurate, GSO-compliant nutrition labeling
                        for MENA region food manufacturers.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className={`steps-grid ${isVisible ? 'animate-in' : ''}`}>
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="step-card"
                            style={{ '--delay': `${index * 0.2}s` }}
                        >
                            <div className="step-number">
                                {step.id}
                            </div>

                            <div className="step-icon">
                                {step.icon}
                            </div>

                            <div className="step-content">
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>

                            {/* Progress indicator */}
                            <div className="step-progress">
                                <div className="progress-bar"></div>
                            </div>

                            {/* Connector Arrow */}
                            {index < steps.length - 1 && (
                                <div className="step-arrow">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M5 12h14" />
                                        <path d="M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={`section-cta ${isVisible ? 'animate-in' : ''}`}>
                    <div className="cta-content">
                        <h3 className="cta-title">Ready to Calculate Your Nutrition Facts?</h3>
                        <p className="cta-description">
                            Join hundreds of food producers who trust our platform for accurate nutrition labeling.
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
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;