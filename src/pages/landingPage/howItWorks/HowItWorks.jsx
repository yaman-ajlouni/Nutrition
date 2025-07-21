import { useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './HowItWorks.scss';

const HowItWorks = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLanguage();

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
            title: t('landingPage.howItWorks.steps.step1.title'),
            description: t('landingPage.howItWorks.steps.step1.description'),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
            )
        },
        {
            id: 2,
            title: t('landingPage.howItWorks.steps.step2.title'),
            description: t('landingPage.howItWorks.steps.step2.description'),
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
            id: 3,
            title: t('landingPage.howItWorks.steps.step3.title'),
            description: t('landingPage.howItWorks.steps.step3.description'),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="M9 14l2 2 4-4" />
                </svg>
            )
        },
        {
            id: 4,
            title: t('landingPage.howItWorks.steps.step4.title'),
            description: t('landingPage.howItWorks.steps.step4.description'),
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
            id: 5,
            title: t('landingPage.howItWorks.steps.step5.title'),
            description: t('landingPage.howItWorks.steps.step5.description'),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <rect x="7" y="7" width="3" height="3" />
                    <rect x="14" y="7" width="3" height="3" />
                    <rect x="7" y="14" width="3" height="3" />
                    <rect x="14" y="14" width="3" height="3" />
                </svg>
            )
        },
        {
            id: 6,
            title: t('landingPage.howItWorks.steps.step6.title'),
            description: t('landingPage.howItWorks.steps.step6.description'),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="6,9 6,2 18,2 18,9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
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
                        <span>{t('landingPage.howItWorks.badge')}</span>
                    </div>
                    <h2 className="section-title">
                        {t('landingPage.howItWorks.title')}
                    </h2>
                    <p className="section-description">
                        {t('landingPage.howItWorks.description')}
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
                        <h3 className="cta-title">{t('landingPage.howItWorks.cta.title')}</h3>
                        <p className="cta-description">
                            {t('landingPage.howItWorks.cta.description')}
                        </p>
                        <div className="cta-buttons">
                            <button className="btn-primary">
                                {t('landingPage.howItWorks.cta.primaryButton')}
                            </button>
                            <button className="btn-outline">
                                {t('landingPage.howItWorks.cta.secondaryButton')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;