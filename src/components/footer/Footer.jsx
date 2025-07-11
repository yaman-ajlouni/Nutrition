import React, { useState } from 'react';
import logo from '../../assets/images/nutrition.jpg'
import './Footer.scss';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter signup
        console.log('Newsletter signup:', email);
        setEmail('');
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-main">
                    {/* Company Section */}
                    <div className="footer-section company-section">
                        <div className="footer-logo">
                            <img src={logo} alt="تغذيتك" className="logo-image" />
                        </div>
                        <p className="company-description">
                            Professional nutrition facts calculator designed for food manufacturers.
                            Generate FDA-compliant nutrition labels quickly and accurately.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="YouTube">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="footer-section">
                        <h3 className="footer-title">Product</h3>
                        <ul className="footer-links">
                            <li><a href="#features">Features</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                            <li><a href="#calculator">Nutrition Calculator</a></li>
                            <li><a href="#database">Ingredient Database</a></li>
                            <li><a href="#api">API Access</a></li>
                            <li><a href="#integrations">Integrations</a></li>
                        </ul>
                    </div>

                    {/* Solutions Links */}
                    <div className="footer-section">
                        <h3 className="footer-title">Solutions</h3>
                        <ul className="footer-links">
                            <li><a href="#food-manufacturers">Food Manufacturers</a></li>
                            <li><a href="#restaurants">Restaurants</a></li>
                            <li><a href="#bakeries">Bakeries</a></li>
                            <li><a href="#beverage-companies">Beverage Companies</a></li>
                            <li><a href="#supplement-brands">Supplement Brands</a></li>
                            <li><a href="#enterprise">Enterprise Solutions</a></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div className="footer-section">
                        <h3 className="footer-title">Resources</h3>
                        <ul className="footer-links">
                            <li><a href="#help-center">Help Center</a></li>
                            <li><a href="#documentation">Documentation</a></li>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#blog">Blog</a></li>
                            <li><a href="#case-studies">Case Studies</a></li>
                            <li><a href="#webinars">Webinars</a></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="footer-section">
                        <h3 className="footer-title">Company</h3>
                        <ul className="footer-links">
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#careers">Careers</a></li>
                            <li><a href="#press">Press</a></li>
                            <li><a href="#partners">Partners</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="#support">Support</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="footer-section newsletter-section">
                        <h3 className="footer-title">Stay Updated</h3>
                        <p className="newsletter-description">
                            Get the latest updates on nutrition labeling regulations and platform features.
                        </p>
                        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="newsletter-input"
                                />
                                <button type="submit" className="newsletter-button">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                        <div className="trust-badges">
                            <div className="trust-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <span>SSL Secured</span>
                            </div>
                            <div className="trust-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
                                    <path d="M9 11V7a3 3 0 0 1 6 0v4" />
                                </svg>
                                <span>FDA Compliant</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <div className="copyright">
                            <p>&copy; 2025 تغذيتك. All rights reserved.</p>
                        </div>
                        <div className="legal-links">
                            <a href="#privacy">Privacy Policy</a>
                            <a href="#terms">Terms of Service</a>
                            <a href="#cookies">Cookie Policy</a>
                            <a href="#security">Security</a>
                        </div>
                        <div className="certification">
                            <span className="cert-text">Certified for FDA Compliance</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;