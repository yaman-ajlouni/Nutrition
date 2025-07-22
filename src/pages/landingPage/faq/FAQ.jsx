import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Mail, Phone, MessageCircle, HelpCircle, ClipboardList, Settings, DollarSign, User } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import './FAQ.scss';

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState('general');
    const [openQuestions, setOpenQuestions] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
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

    // Get translations for FAQ section
    const categoriesData = t('landingPage.faq.categories', []);
    const faqDataTranslations = t('landingPage.faq.faqData', {});
    const helpOptionsData = t('landingPage.faq.helpSection.options', []);

    const categories = categoriesData.length > 0 ? categoriesData.map((cat, index) => {
        const icons = [<HelpCircle />, <ClipboardList />, <Settings />, <DollarSign />, <User />];
        return {
            id: cat.id,
            name: cat.name,
            icon: icons[index] || <HelpCircle />
        };
    }) : [
        { id: 'general', name: 'General', icon: <HelpCircle /> },
        { id: 'compliance', name: 'Compliance & Regulations', icon: <ClipboardList /> },
        { id: 'technical', name: 'Technical Features', icon: <Settings /> },
        { id: 'pricing', name: 'Pricing & Plans', icon: <DollarSign /> },
        { id: 'account', name: 'Account & Support', icon: <User /> }
    ];

    const faqData = Object.keys(faqDataTranslations).length > 0 ? faqDataTranslations : {
        general: [
            {
                question: "What is nutrition labeling and why do I need it for MENA region?",
                answer: "Nutrition labeling provides consumers with essential nutritional information about food products. In the MENA region, it helps improve consumer health awareness and ensures transparency. Our platform follows GSO 9/2013 standards since Syria lacks specific compliance standards, making it suitable for regional food manufacturers."
            },
            {
                question: "How accurate are your nutrition calculations?",
                answer: "Our calculations achieve 99% accuracy using MENA region FAO food composition tables combined with advanced algorithms. The platform accounts for cooking methods, ingredient interactions, and nutrient retention factors to provide precise nutrition facts."
            },
            {
                question: "What types of food products can I analyze?",
                answer: "Our platform works for virtually all food products including baked goods, beverages, snacks, dairy products, prepared foods, and traditional MENA cuisine. Our database includes thousands of local and regional ingredients."
            },
            {
                question: "How long does it take to generate a nutrition label?",
                answer: "Once you input your recipe ingredients and quantities, nutrition labels are generated instantly. The initial setup typically takes 5-15 minutes depending on recipe complexity, compared to weeks for traditional lab testing."
            },
            {
                question: "Do you provide customer support?",
                answer: "Yes, we offer email support for Basic plans, phone support for Professional plans, and dedicated account managers for Enterprise customers. Our team includes nutrition labeling experts and food technicians."
            }
        ],
        compliance: [
            {
                question: "Are your nutrition labels GSO 9/2013 compliant?",
                answer: "Yes, all nutrition labels generated meet GSO 9/2013 requirements including nutrient panels, ingredient lists in descending order by weight, allergen highlighting, and proper Arabic language formatting. We follow Gulf food labeling standards."
            },
            {
                question: "Can I use calculated nutrition facts instead of lab testing?",
                answer: "For most standard nutrition labeling, yes. GSO standards allow nutrition facts to be calculated using appropriate databases and methods. However, lab testing may be required for specific health claims or specialized products."
            },
            {
                question: "How do you handle allergen labeling?",
                answer: "Our platform automatically detects major allergens in ingredients and generates appropriate allergen statements with highlighted warnings. We track allergens at the ingredient level but you must verify with suppliers for cross-contamination risks."
            },
            {
                question: "What about bilingual labeling requirements?",
                answer: "Our platform supports both Arabic and English labeling with proper compliance formatting. You can toggle between languages and generate labels that meet regional multilingual requirements."
            },
            {
                question: "What if my products are audited for compliance?",
                answer: "Our calculations are based on recognized databases and GSO-accepted methods. We provide detailed calculation reports and source documentation that you can present during regulatory audits."
            }
        ],
        technical: [
            {
                question: "How do I input complex recipes with multiple preparation steps?",
                answer: "Our platform handles multi-step recipes, cooking losses, yield calculations, and ingredient substitutions. You can account for preparation methods and processing effects. Professional services can help optimize complex recipe setups."
            },
            {
                question: "Can I integrate this with my existing business systems?",
                answer: "Yes, Professional and Enterprise plans include API access for integration with ERP systems, inventory management, and other business tools. We also offer data export in multiple formats including Excel and CSV."
            },
            {
                question: "How do QR codes work with the nutrition labels?",
                answer: "Our system auto-generates unique QR codes for each product that link to public product pages showing complete nutrition information. Premium features include QR analytics to track consumer engagement and scan counts."
            },
            {
                question: "What if an ingredient isn't in your database?",
                answer: "You can add custom ingredients with their nutritional profiles. Our database is regularly updated with new MENA region ingredients. Our team can assist with finding appropriate nutritional data when needed."
            },
            {
                question: "How secure is my recipe data?",
                answer: "We use enterprise-grade encryption, secure data centers, and strict access controls. Your recipe data is never shared with competitors. Enterprise customers get additional security features including custom data retention policies."
            }
        ],
        pricing: [
            {
                question: "Is there really a free trial?",
                answer: "Yes, all plans include a genuine 14-day free trial with full access to features. No credit card required to start. You can calculate nutrition facts, generate labels, and test QR code functionality during your trial."
            },
            {
                question: "What happens when I exceed my product limit?",
                answer: "You'll receive notifications as you approach your plan limits. Basic plans are limited to 3 products monthly, Professional to 20 products. Enterprise plans offer unlimited products. You can upgrade anytime with immediate effect."
            },
            {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel anytime. You'll retain access until the end of your current billing period and can export all your data. We offer a 30-day money-back guarantee for new subscriptions."
            },
            {
                question: "Do you offer discounts for local businesses?",
                answer: "Yes, we offer special pricing for qualifying startups, educational institutions, and small local food producers in the MENA region. Contact our sales team for discount eligibility and pricing details."
            },
            {
                question: "What's included in the Enterprise plan?",
                answer: "Enterprise includes unlimited products, bulk submissions via Excel/CSV, API access, dedicated account manager, compliance dashboard, unlimited team members, custom certificates, and priority support. Pricing varies based on specific needs."
            }
        ],
        account: [
            {
                question: "Can multiple team members access our account?",
                answer: "Yes, Professional plans include 5 user seats and Enterprise plans include unlimited users. You can set different permission levels (view-only, editor, admin) and track changes to recipes with version control."
            },
            {
                question: "How do you backup my data?",
                answer: "We perform automated daily backups with multiple redundancy layers stored in secure, geographically distributed data centers. You can export your own backups anytime in multiple formats."
            },
            {
                question: "Can I import existing recipes from spreadsheets?",
                answer: "Yes, we provide recipe import tools for Excel and CSV files. Enterprise plans include bulk import capabilities and our team can help migrate data from other nutrition software or legacy systems."
            },
            {
                question: "What happens to my data if I cancel?",
                answer: "You retain access to export all your data for 30 days after cancellation. Your account is archived for an additional 60 days before permanent deletion, giving you ample time to retrieve information."
            },
            {
                question: "Do you provide training on the platform?",
                answer: "Yes, we provide video tutorials, documentation, and help center resources for all users. Professional and Enterprise customers get personalized onboarding sessions and ongoing training for new team members."
            }
        ]
    };

    const toggleQuestion = (questionIndex) => {
        setOpenQuestions(prev => ({
            ...prev,
            [questionIndex]: !prev[questionIndex]
        }));
    };

    const filteredQuestions = faqData[activeCategory]?.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <section className="faq" ref={sectionRef}>
            <div className="faq-container">
                {/* Section Header */}
                <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
                    <div className="section-badge">
                        <span>{t('landingPage.faq.sectionBadge', 'Help Center')}</span>
                    </div>
                    <h2 className="section-title">
                        {t('landingPage.faq.title.part1', 'Frequently Asked')}
                        <span className="highlight">{t('landingPage.faq.title.highlight', ' Questions')}</span>
                    </h2>
                    <p className="section-description">
                        {t('landingPage.faq.description', 'Common questions about nutrition labeling, GSO compliance, and platform features. Can\'t find what you need? Contact support.')}
                    </p>
                </div>

                {/* Search Bar */}
                <div className={`search-section ${isVisible ? 'animate-in' : ''}`}>
                    <div className="search-box">
                        <div className="search-icon">
                            <Search />
                        </div>
                        <input
                            type="text"
                            placeholder={t('landingPage.faq.searchPlaceholder', 'Search for answers...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                {/* Category Navigation */}
                <div className={`category-nav ${isVisible ? 'animate-in' : ''}`}>
                    {categories.map((category, index) => (
                        <button
                            key={category.id}
                            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                            style={{ '--delay': `${index * 0.1}s` }}
                        >
                            <span className="category-icon">{category.icon}</span>
                            <span className="category-name">{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* FAQ Content */}
                <div className={`faq-content ${isVisible ? 'animate-in' : ''}`}>
                    {filteredQuestions.length > 0 ? (
                        <div className="questions-list">
                            {filteredQuestions.map((faq, index) => (
                                <div
                                    key={index}
                                    className="question-item"
                                    style={{ '--delay': `${index * 0.1}s` }}
                                >
                                    <button
                                        className={`question-header ${openQuestions[index] ? 'open' : ''}`}
                                        onClick={() => toggleQuestion(index)}
                                    >
                                        <span className="question-text">{faq.question}</span>
                                        <span className="question-icon">
                                            <ChevronDown />
                                        </span>
                                    </button>

                                    <div className={`answer-content ${openQuestions[index] ? 'open' : ''}`}>
                                        <div className="answer-text">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">
                                <Search />
                            </div>
                            <h3>{t('landingPage.faq.noResults.title', 'No results found')}</h3>
                            <p>{t('landingPage.faq.noResults.description', 'Try different keywords or browse categories above.')}</p>
                        </div>
                    )}
                </div>

                {/* Still Need Help Section */}
                <div className={`help-section ${isVisible ? 'animate-in' : ''}`}>
                    <div className="help-content">
                        <h3 className="help-title">
                            {t('landingPage.faq.helpSection.title', 'Still Need Help?')}
                        </h3>
                        <p className="help-description">
                            {t('landingPage.faq.helpSection.description', 'Our nutrition labeling experts are here to help with specific questions about GSO compliance, complex recipes, or technical implementation.')}
                        </p>
                        <div className="help-options">
                            <div className="help-option" style={{ '--delay': '0.1s' }}>
                                <div className="option-icon">
                                    <Mail />
                                </div>
                                <div className="option-content">
                                    <h4>{helpOptionsData[0]?.title || t('landingPage.faq.helpSection.options.0.title', 'Email Support')}</h4>
                                    <p>{helpOptionsData[0]?.description || t('landingPage.faq.helpSection.options.0.description', 'Get detailed answers to complex questions')}</p>
                                    <button className="option-button">
                                        {helpOptionsData[0]?.buttonText || t('landingPage.faq.helpSection.options.0.buttonText', 'Send Email')}
                                    </button>
                                </div>
                            </div>

                            <div className="help-option" style={{ '--delay': '0.2s' }}>
                                <div className="option-icon">
                                    <Phone />
                                </div>
                                <div className="option-content">
                                    <h4>{helpOptionsData[1]?.title || t('landingPage.faq.helpSection.options.1.title', 'Schedule a Call')}</h4>
                                    <p>{helpOptionsData[1]?.description || t('landingPage.faq.helpSection.options.1.description', 'Talk directly with our nutrition experts')}</p>
                                    <button className="option-button">
                                        {helpOptionsData[1]?.buttonText || t('landingPage.faq.helpSection.options.1.buttonText', 'Book Call')}
                                    </button>
                                </div>
                            </div>

                            <div className="help-option" style={{ '--delay': '0.3s' }}>
                                <div className="option-icon">
                                    <MessageCircle />
                                </div>
                                <div className="option-content">
                                    <h4>{helpOptionsData[2]?.title || t('landingPage.faq.helpSection.options.2.title', 'Live Chat')}</h4>
                                    <p>{helpOptionsData[2]?.description || t('landingPage.faq.helpSection.options.2.description', 'Quick answers during business hours')}</p>
                                    <button className="option-button">
                                        {helpOptionsData[2]?.buttonText || t('landingPage.faq.helpSection.options.2.buttonText', 'Start Chat')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;