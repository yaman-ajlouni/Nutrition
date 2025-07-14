import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import nutrition from '../../assets/images/nutrition.jpg'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

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
        <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
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
                            Home
                        </button>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/label-generator"
                            className={`nav-link ${isActiveLink('/label-generator') ? 'active' : ''}`}
                        >
                            Label Generator
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/database"
                            className={`nav-link ${isActiveLink('/database') ? 'active' : ''}`}
                        >
                            Database
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/reports"
                            className={`nav-link ${isActiveLink('/reports') ? 'active' : ''}`}
                        >
                            Reports
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => handleNavigation('/', 'services')}
                        >
                            Services
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="nav-link"
                            onClick={() => handleNavigation('/', 'about')}
                        >
                            About
                        </button>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/contact"
                            className={`nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* CTA Button */}
                <div className="nav-cta">
                    <Link to="/label-generator" className="btn-primary">
                        Get Started
                    </Link>
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
                                Home
                            </button>
                        </li>
                        <li className="mobile-nav-item">
                            <Link
                                to="/label-generator"
                                className={`mobile-nav-link ${isActiveLink('/label-generator') ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                Label Generator
                            </Link>
                        </li>
                        <li className="mobile-nav-item">
                            <Link
                                to="/database"
                                className={`mobile-nav-link ${isActiveLink('/database') ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                Ingredient Database
                            </Link>
                        </li>
                        <li className="mobile-nav-item">
                            <Link
                                to="/reports"
                                className={`mobile-nav-link ${isActiveLink('/reports') ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                Reports
                            </Link>
                        </li>
                        <li className="mobile-nav-item">
                            <button
                                className="mobile-nav-link"
                                onClick={() => handleNavigation('/', 'services')}
                            >
                                Services
                            </button>
                        </li>
                        <li className="mobile-nav-item">
                            <button
                                className="mobile-nav-link"
                                onClick={() => handleNavigation('/', 'about')}
                            >
                                About
                            </button>
                        </li>
                        <li className="mobile-nav-item">
                            <Link
                                to="/contact"
                                className={`mobile-nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <div className="mobile-cta">
                        <Link to="/label-generator" className="btn-primary" onClick={closeMenu}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;