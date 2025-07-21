import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.scss';
import nutrition from '../../assets/images/nutrition.jpg'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { language, changeLanguage, isRTL } = useLanguage();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en';
        changeLanguage(newLanguage);
    };

    // Handle navigation to sections on landing page
    const handleNavigation = (path, sectionId = null) => {
        closeMenu();

        if (sectionId && location.pathname === '/') {
            // If we're on the landing page, scroll to section
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (sectionId && location.pathname !== '/') {
            // If we're not on landing page, navigate to home then scroll
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Regular navigation
            navigate(path);
        }
    };

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className={`navigation ${isScrolled ? 'scrolled' : ''} ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="nav-container">
                {/* Logo */}
                <Link to="/" className="nav-logo" onClick={closeMenu}>
                    <img src={nutrition} alt="تغذيتك" className="logo-image" />
                </Link>

                {/* Desktop Menu */}
                <ul className="nav-menu">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
                            onClick={() => handleNavigation('/', 'home')}
                        >
                            {language === 'ar' ? 'الرئيسية' : 'Home'}
                        </button>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/label-generator"
                            className={`nav-link ${isActiveLink('/label-generator') ? 'active' : ''}`}
                        >
                            {language === 'ar' ? 'مولد التسميات' : 'Label Generator'}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/database"
                            className={`nav-link ${isActiveLink('/database') ? 'active' : ''}`}
                        >
                            {language === 'ar' ? 'قاعدة البيانات' : 'Database'}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/reports"
                            className={`nav-link ${isActiveLink('/reports') ? 'active' : ''}`}
                        >
                            {language === 'ar' ? 'التقارير' : 'Reports'}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => handleNavigation('/', 'services')}
                        >
                            {language === 'ar' ? 'الخدمات' : 'Services'}
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => handleNavigation('/', 'about')}
                        >
                            {language === 'ar' ? 'من نحن' : 'About'}
                        </button>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/contact"
                            className={`nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
                        >
                            {language === 'ar' ? 'تواصل معنا' : 'Contact'}
                        </Link>
                    </li>
                </ul>

                {/* Language Switcher & CTA */}
                <div className="nav-actions">
                    <button
                        className="language-switcher"
                        onClick={toggleLanguage}
                        aria-label="Switch Language"
                    >
                        <span className="language-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M2 12h20"></path>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                        </span>
                        <span className="language-text">
                            {language === 'en' ? 'العربية' : 'English'}
                        </span>
                    </button>

                    <div className="nav-cta">
                        <Link to="/label-generator" className="btn-primary">
                            {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle mobile menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-content">
                    <ul className="mobile-nav-menu">
                        <li className="mobile-nav-item">
                            <button
                                className={`mobile-nav-link ${isActiveLink('/') ? 'active' : ''}`}
                                onClick={() => handleNavigation('/', 'home')}
                            >
                                {language === 'ar' ? 'الرئيسية' : 'Home'}
                            </button>
                        </li>
                        <li className="mobile-nav-item">
                            <Link
                                to="/label-generator"
                                className={`mobile-nav-link ${isActiveLink('/label-generator') ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                {language === 'ar' ? 'مولد التسميات' : 'Label Generator'}
                            </Link>
                        </li>
                        <li className="mobile-nav-item">
                            <Link
                                to="/database"
                                className={`mobile-nav-link ${isActiveLink('/database') ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                {language === 'ar' ? 'قاعدة البيانات' : 'Database'}
                            </Link>
                        </li>
                        <li className="mobile-nav-item">
                            <Link
                                to="/reports"
                                className={`mobile-nav-link ${isActiveLink('/reports') ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                {language === 'ar' ? 'التقارير' : 'Reports'}
                            </Link>
                        </li>
                        <li className="mobile-nav-item">
                            <button
                                className="mobile-nav-link"
                                onClick={() => handleNavigation('/', 'services')}
                            >
                                {language === 'ar' ? 'الخدمات' : 'Services'}
                            </button>
                        </li>
                        <li className="mobile-nav-item">
                            <button
                                className="mobile-nav-link"
                                onClick={() => handleNavigation('/', 'about')}
                            >
                                {language === 'ar' ? 'من نحن' : 'About'}
                            </button>
                        </li>
                        <li className="mobile-nav-item">
                            <Link
                                to="/contact"
                                className={`mobile-nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                {language === 'ar' ? 'تواصل معنا' : 'Contact'}
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Language Switcher */}
                    <div className="mobile-language-switcher">
                        <button
                            className="mobile-language-btn"
                            onClick={toggleLanguage}
                        >
                            <span className="language-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M2 12h20"></path>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                            </span>
                            <span>
                                {language === 'en' ? 'العربية' : 'English'}
                            </span>
                        </button>
                    </div>

                    <div className="mobile-cta">
                        <Link to="/label-generator" className="btn-primary" onClick={closeMenu}>
                            {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;