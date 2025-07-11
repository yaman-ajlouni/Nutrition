import { useState, useEffect } from 'react';
import './Navbar.scss';
import nutrition from '../../assets/images/nutrition.jpg'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
        <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                {/* Logo */}
                <div className="nav-logo">
                    <img src={nutrition} alt="تغذيتك" className="logo-image" />
                </div>

                {/* Desktop Menu */}
                <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="#home" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#calculator" className="nav-link">Calculator</a>
                    </li>
                    <li className="nav-item">
                        <a href="#database" className="nav-link">Database</a>
                    </li>
                    <li className="nav-item">
                        <a href="#reports" className="nav-link">Reports</a>
                    </li>
                    <li className="nav-item">
                        <a href="#services" className="nav-link">Services</a>
                    </li>
                    <li className="nav-item">
                        <a href="#about" className="nav-link">About</a>
                    </li>
                    <li className="nav-item">
                        <a href="#contact" className="nav-link">Contact</a>
                    </li>
                </ul>

                {/* CTA Button */}
                <div className="nav-cta">
                    <button className="btn-primary">Get Started</button>
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
                            <a href="#home" className="mobile-nav-link" onClick={closeMenu}>Home</a>
                        </li>
                        <li className="mobile-nav-item">
                            <a href="#calculator" className="mobile-nav-link" onClick={closeMenu}>Nutrition Calculator</a>
                        </li>
                        <li className="mobile-nav-item">
                            <a href="#database" className="mobile-nav-link" onClick={closeMenu}>Ingredient Database</a>
                        </li>
                        <li className="mobile-nav-item">
                            <a href="#reports" className="mobile-nav-link" onClick={closeMenu}>Reports</a>
                        </li>
                        <li className="mobile-nav-item">
                            <a href="#services" className="mobile-nav-link" onClick={closeMenu}>Services</a>
                        </li>
                        <li className="mobile-nav-item">
                            <a href="#about" className="mobile-nav-link" onClick={closeMenu}>About</a>
                        </li>
                        <li className="mobile-nav-item">
                            <a href="#contact" className="mobile-nav-link" onClick={closeMenu}>Contact</a>
                        </li>
                    </ul>
                    <div className="mobile-cta">
                        <button className="btn-primary" onClick={closeMenu}>Get Started</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;