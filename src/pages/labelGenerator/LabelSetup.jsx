import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
    Upload,
    Plus,
    Globe,
    Calendar,
    Clock
} from 'lucide-react';

const LabelSetup = ({
    productData,
    labelFormat,
    setLabelFormat,
    activeLanguage,
    setActiveLanguage,
    handleInputChange,
    toggleNutritionalClaim,
    handleLogoUpload,
    labelFormats,
    nutritionalClaims,
    recentIngredients,
    mockIngredients,
    addIngredient,
    isFeatureAvailable
}) => {
    const { t } = useLanguage();

    return (
        <div className="label-setup">
            <h2 className="section-title">{t('labelGenerator.productInfo.title')}</h2>

            {/* Label Format Selector */}
            <div className="form-group">
                <label className="form-label">
                    {t('labelGenerator.productInfo.labelFormat')}
                    <span className="label-info">{t('labelGenerator.productInfo.labelFormatInfo')}</span>
                </label>
                <select
                    className="form-select"
                    value={labelFormat}
                    onChange={(e) => setLabelFormat(e.target.value)}
                >
                    {labelFormats.map(format => (
                        <option key={format.value} value={format.value}>
                            {format.label} ({format.region})
                        </option>
                    ))}
                </select>
                <div className="format-info">
                    {labelFormats.find(f => f.value === labelFormat)?.description}
                </div>
            </div>

            {/* Language Toggle */}
            <div className="language-toggle">
                <button
                    className={`lang-btn ${activeLanguage === 'english' ? 'active' : ''}`}
                    onClick={() => setActiveLanguage('english')}
                >
                    <Globe size={16} /> {t('labelGenerator.languages.english')}
                </button>
                <button
                    className={`lang-btn ${activeLanguage === 'arabic' ? 'active' : ''}`}
                    onClick={() => setActiveLanguage('arabic')}
                >
                    <Globe size={16} /> {t('labelGenerator.languages.arabic')}
                </button>
            </div>

            {/* Product Name */}
            <div className="form-group">
                <label className="form-label">{t('labelGenerator.productInfo.productName')} {t('labelGenerator.productInfo.required')}</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder={activeLanguage === 'english' ? 'Enter product name' : t('labelGenerator.productInfo.productNameAr')}
                    value={productData.productName[activeLanguage]}
                    onChange={(e) => handleInputChange('productName', e.target.value, activeLanguage)}
                    dir={activeLanguage === 'arabic' ? 'rtl' : 'ltr'}
                    required
                />
            </div>

            {/* Company Name */}
            <div className="form-group">
                <label className="form-label">{t('labelGenerator.productInfo.companyName')} {t('labelGenerator.productInfo.required')}</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder={activeLanguage === 'english' ? 'Enter company name' : t('labelGenerator.productInfo.companyNameAr')}
                    value={productData.company[activeLanguage]}
                    onChange={(e) => handleInputChange('company', e.target.value, activeLanguage)}
                    dir={activeLanguage === 'arabic' ? 'rtl' : 'ltr'}
                    required
                />
            </div>

            {/* Logo Upload */}
            <div className="form-group">
                <label className="form-label">{t('labelGenerator.productInfo.companyLogo')}</label>
                <div className="logo-upload">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="logo-input"
                        id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="logo-upload-btn">
                        {productData.logo ? (
                            <img src={productData.logo} alt="Logo" className="logo-preview" />
                        ) : (
                            <div className="upload-placeholder">
                                <Upload size={24} />
                                <span>{t('labelGenerator.productInfo.uploadLogo')}</span>
                            </div>
                        )}
                    </label>
                </div>
            </div>

            {/* Serving Information */}
            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">{t('labelGenerator.productInfo.servingSize')} {t('labelGenerator.productInfo.required')}</label>
                    <input
                        type="number"
                        className="form-input"
                        value={productData.servingSize}
                        onChange={(e) => handleInputChange('servingSize', e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">{t('labelGenerator.productInfo.servingsPerPackage')}</label>
                    <input
                        type="number"
                        className="form-input"
                        value={productData.servingsPerPackage}
                        onChange={(e) => handleInputChange('servingsPerPackage', e.target.value)}
                        min="1"
                        step="0.1"
                    />
                </div>
            </div>

            {/* Product Identification */}
            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">{t('labelGenerator.productInfo.batchNumber')}</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder={t('labelGenerator.productInfo.batchPlaceholder')}
                        value={productData.batchNumber}
                        onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">{t('labelGenerator.productInfo.barcode')}</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder={t('labelGenerator.productInfo.barcodePlaceholder')}
                        value={productData.barcode}
                        onChange={(e) => handleInputChange('barcode', e.target.value)}
                        maxLength="13"
                    />
                </div>
            </div>

            {/* Add Ingredient Section */}
            <div className="add-ingredient-section">
                <h3 className="subsection-title">{t('labelGenerator.ingredients.title')} {t('labelGenerator.productInfo.required')}</h3>
                <IngredientAdder
                    ingredients={mockIngredients}
                    recentIngredients={recentIngredients}
                    onAddIngredient={addIngredient}
                    activeLanguage={activeLanguage}
                    t={t}
                />
            </div>

            {/* Nutritional Claims */}
            {isFeatureAvailable('validation') && (
                <div className="nutritional-claims-section">
                    <h3 className="subsection-title">{t('labelGenerator.nutritionalClaims.title')}</h3>
                    <div className="claims-grid">
                        {nutritionalClaims.map(claim => (
                            <label key={claim.id} className="claim-item">
                                <input
                                    type="checkbox"
                                    checked={productData.nutritionalClaims.includes(claim.id)}
                                    onChange={() => toggleNutritionalClaim(claim.id)}
                                />
                                <span className="claim-label">
                                    {activeLanguage === 'english' ? claim.label : claim.arabic}
                                </span>
                                <span className="claim-criteria">{claim.criteria}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* Dates */}
            <div className="dates-section">
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">
                            <Calendar size={16} /> {t('labelGenerator.dates.productionDate')}
                        </label>
                        <input
                            type="date"
                            className="form-input"
                            value={productData.productionDate}
                            onChange={(e) => handleInputChange('productionDate', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            <Calendar size={16} /> {t('labelGenerator.dates.expiryDate')}
                        </label>
                        <input
                            type="date"
                            className="form-input"
                            value={productData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        <Clock size={16} /> {t('labelGenerator.dates.shelfLife')}
                    </label>
                    <input
                        type="number"
                        className="form-input"
                        value={productData.shelfLife}
                        onChange={(e) => handleInputChange('shelfLife', e.target.value)}
                        min="1"
                        max="60"
                    />
                </div>
            </div>

            {/* Storage Instructions */}
            <div className="form-group">
                <label className="form-label">{t('labelGenerator.storage.instructions')}</label>
                <textarea
                    className="form-textarea"
                    placeholder={activeLanguage === 'english'
                        ? t('labelGenerator.storage.placeholder')
                        : t('labelGenerator.storage.placeholderAr')}
                    value={productData.storageInstructions[activeLanguage]}
                    onChange={(e) => handleInputChange('storageInstructions', e.target.value, activeLanguage)}
                    dir={activeLanguage === 'arabic' ? 'rtl' : 'ltr'}
                    rows="2"
                />
            </div>
        </div>
    );
};

// Enhanced Ingredient Adder Component
const IngredientAdder = ({ ingredients, recentIngredients, onAddIngredient, activeLanguage, t }) => {
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [amount, setAmount] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredIngredients = ingredients.filter(ing =>
        ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ing.arabic.includes(searchTerm) ||
        ing.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        if (selectedIngredient && amount) {
            const ingredient = ingredients.find(ing => ing.name === selectedIngredient);
            if (ingredient) {
                onAddIngredient(ingredient, amount);
                setSelectedIngredient('');
                setAmount('');
                setSearchTerm('');
            }
        }
    };

    const addRecentIngredient = (ingredient) => {
        setSelectedIngredient(ingredient.name);
        setSearchTerm('');
        setShowSuggestions(false);
    };

    return (
        <div className="ingredient-adder">
            <div className="adder-row">
                <div className="ingredient-search">
                    <input
                        type="text"
                        placeholder={t('labelGenerator.ingredients.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowSuggestions(e.target.value.length > 0);
                        }}
                        className="search-input"
                        onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                    />
                    <select
                        value={selectedIngredient}
                        onChange={(e) => setSelectedIngredient(e.target.value)}
                        className="ingredient-select"
                    >
                        <option value="">{t('labelGenerator.ingredients.selectIngredient')}</option>
                        {filteredIngredients.map(ing => (
                            <option key={ing.name} value={ing.name}>
                                {activeLanguage === 'english' ? ing.name : ing.arabic}
                                ({ing.category})
                            </option>
                        ))}
                    </select>

                    {showSuggestions && searchTerm && (
                        <div className="search-suggestions">
                            {filteredIngredients.slice(0, 5).map(ing => (
                                <button
                                    key={ing.name}
                                    className="suggestion-item"
                                    onClick={() => {
                                        setSelectedIngredient(ing.name);
                                        setSearchTerm('');
                                        setShowSuggestions(false);
                                    }}
                                >
                                    <span className="suggestion-name">
                                        {activeLanguage === 'english' ? ing.name : ing.arabic}
                                    </span>
                                    <span className="suggestion-category">{ing.category}</span>
                                    <span className="suggestion-calories">{ing.calories} kcal/100g</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <input
                    type="number"
                    placeholder={t('labelGenerator.ingredients.gramsPlaceholder')}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="amount-input"
                    min="0"
                    step="0.1"
                />
                <button
                    onClick={handleAdd}
                    disabled={!selectedIngredient || !amount}
                    className="add-btn"
                >
                    <Plus size={16} /> {t('labelGenerator.ingredients.add')}
                </button>
            </div>

            {/* Recent Ingredients */}
            {recentIngredients.length > 0 && (
                <div className="recent-ingredients">
                    <span className="recent-label">{t('labelGenerator.ingredients.recent')}</span>
                    <div className="recent-list">
                        {recentIngredients.slice(0, 5).map(ing => (
                            <button
                                key={ing.name}
                                className="recent-item"
                                onClick={() => addRecentIngredient(ing)}
                                title={`Add ${ing.name}`}
                            >
                                {activeLanguage === 'english' ? ing.name.split(',')[0] : ing.arabic}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LabelSetup;