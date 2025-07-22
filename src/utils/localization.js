// Import navbar translations
import enNavbar from '../locale/en/navbar.json';
import arNavbar from '../locale/ar/navbar.json';

// Import landingPage translations
import enIntro from '../locale/en/landingPage/intro.json';
import arIntro from '../locale/ar/landingPage/intro.json';
import enHowItWorks from '../locale/en/landingPage/howItWorks.json';
import arHowItWorks from '../locale/ar/landingPage/howItWorks.json';
import enFeatures from '../locale/en/landingPage/features.json';
import arFeatures from '../locale/ar/landingPage/features.json';
import enPricing from '../locale/en/landingPage/pricing.json';
import arPricing from '../locale/ar/landingPage/pricing.json';
import enFAQ from '../locale/en/landingPage/faq.json';
import arFAQ from '../locale/ar/landingPage/faq.json';
import enFinalCTA from '../locale/en/landingPage/finalCTA.json';
import arFinalCTA from '../locale/ar/landingPage/finalCTA.json';

// Import labelGenerator translations
import enLabelGenerator from '../locale/en/labelGenerator/labelGenerator.json';
import arLabelGenerator from '../locale/ar/labelGenerator/labelGenerator.json';

// Import footer translations
import enFooter from '../locale/en/footer.json';
import arFooter from '../locale/ar/footer.json';

const localization = {
    en: {
        navbar: enNavbar,
        landingPage: {
            intro: enIntro,
            howItWorks: enHowItWorks,
            features: enFeatures,
            pricing: enPricing,
            faq: enFAQ,
            finalCTA: enFinalCTA,
        },
        labelGenerator: enLabelGenerator,
        footer: enFooter,
    },
    ar: {
        navbar: arNavbar,
        landingPage: {
            intro: arIntro,
            howItWorks: arHowItWorks,
            features: arFeatures,
            pricing: arPricing,
            faq: arFAQ,
            finalCTA: arFinalCTA,
        },
        labelGenerator: arLabelGenerator,
        footer: arFooter,
    }
};

/**
 * Get translation for a specific key
 * @param {string} language - The language code (en, ar)
 * @param {string} path - The dot-separated path to the translation (e.g., 'footer.company.description')
 * @param {object} params - Optional parameters to replace in the translation
 * @returns {string} - The translated string
 */
export const getTranslation = (language, path, params = {}) => {
    const keys = path.split('.');
    let value = localization[language];

    // Navigate through the object path
    for (const key of keys) {
        if (value && value[key]) {
            value = value[key];
        } else {
            console.warn(`Translation key not found: ${path} for language ${language}`);
            return path; // Return the path as fallback
        }
    }

    // Replace parameters in the string if any
    if (typeof value === 'string' && params) {
        return Object.entries(params).reduce((result, [param, paramValue]) => {
            return result.replace(`{{${param}}}`, paramValue);
        }, value);
    }

    return value;
};

/**
 * Loads a specific section's translations
 * @param {string} language - The language code (en, ar)
 * @param {string} section - The section path (e.g., 'footer')
 * @returns {object} - The translation object for that section
 */
export const loadTranslationSection = (language, section) => {
    const keys = section.split('.');
    let value = localization[language];

    for (const key of keys) {
        if (value && value[key]) {
            value = value[key];
        } else {
            console.warn(`Translation section not found: ${section} for language ${language}`);
            return {}; // Return empty object as fallback
        }
    }

    return value;
};

export default localization;