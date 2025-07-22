import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
    X,
    CheckCircle
} from 'lucide-react';

const AdvancedSettings = ({
    advancedSettings,
    setAdvancedSettings,
    validationErrors,
    isFeatureAvailable
}) => {
    const { t } = useLanguage();

    if (!isFeatureAvailable('analytics')) {
        return (
            <div className="advanced-settings">
                <h2 className="section-title">{t('labelGenerator.advancedSettings.title')}</h2>
                <div className="feature-locked">
                    <p>{t('labelGenerator.validation.downloadAvailable')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="advanced-settings">
            <h2 className="section-title">{t('labelGenerator.advancedSettings.title')}</h2>

            {/* Display Options */}
            <div className="settings-group">
                <h3 className="subsection-title">{t('labelGenerator.advancedSettings.displayOptions')}</h3>
                <div className="settings-grid">
                    <label className="setting-item">
                        <input
                            type="checkbox"
                            checked={advancedSettings.showDailyValues}
                            onChange={(e) => setAdvancedSettings(prev => ({
                                ...prev,
                                showDailyValues: e.target.checked
                            }))}
                        />
                        <span>{t('labelGenerator.advancedSettings.showDailyValues')}</span>
                    </label>
                    <label className="setting-item">
                        <input
                            type="checkbox"
                            checked={advancedSettings.showCalorieBreakdown}
                            onChange={(e) => setAdvancedSettings(prev => ({
                                ...prev,
                                showCalorieBreakdown: e.target.checked
                            }))}
                        />
                        <span>{t('labelGenerator.advancedSettings.showCalorieBreakdown')}</span>
                    </label>
                    <label className="setting-item">
                        <input
                            type="checkbox"
                            checked={advancedSettings.showNutritionalScore}
                            onChange={(e) => setAdvancedSettings(prev => ({
                                ...prev,
                                showNutritionalScore: e.target.checked
                            }))}
                        />
                        <span>{t('labelGenerator.advancedSettings.showNutritionalScore')}</span>
                    </label>
                    <label className="setting-item">
                        <input
                            type="checkbox"
                            checked={advancedSettings.includeBarcode}
                            onChange={(e) => setAdvancedSettings(prev => ({
                                ...prev,
                                includeBarcode: e.target.checked
                            }))}
                        />
                        <span>{t('labelGenerator.advancedSettings.includeBarcode')}</span>
                    </label>
                </div>
            </div>

            {/* Label Customization */}
            <div className="settings-group">
                <h3 className="subsection-title">{t('labelGenerator.advancedSettings.labelCustomization')}</h3>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">{t('labelGenerator.advancedSettings.fontSize')}</label>
                        <select
                            className="form-select"
                            value={advancedSettings.fontSize}
                            onChange={(e) => setAdvancedSettings(prev => ({
                                ...prev,
                                fontSize: e.target.value
                            }))}
                        >
                            <option value="small">{t('labelGenerator.advancedSettings.small')}</option>
                            <option value="medium">{t('labelGenerator.advancedSettings.medium')}</option>
                            <option value="large">{t('labelGenerator.advancedSettings.large')}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">{t('labelGenerator.advancedSettings.orientation')}</label>
                        <select
                            className="form-select"
                            value={advancedSettings.labelOrientation}
                            onChange={(e) => setAdvancedSettings(prev => ({
                                ...prev,
                                labelOrientation: e.target.value
                            }))}
                        >
                            <option value="portrait">{t('labelGenerator.advancedSettings.portrait')}</option>
                            <option value="landscape">{t('labelGenerator.advancedSettings.landscape')}</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Rounding Rules */}
            <div className="settings-group">
                <h3 className="subsection-title">Rounding Rules</h3>
                <div className="form-group">
                    <label className="form-label">Rounding Method</label>
                    <select
                        className="form-select"
                        value={advancedSettings.roundingRules}
                        onChange={(e) => setAdvancedSettings(prev => ({
                            ...prev,
                            roundingRules: e.target.value
                        }))}
                    >
                        <option value="standard">Standard (0.5 rounds up)</option>
                        <option value="conservative">Conservative (always round down)</option>
                        <option value="precise">Precise (1 decimal place)</option>
                    </select>
                    <div className="format-info">
                        <small>
                            {advancedSettings.roundingRules === 'standard' && 'Values ending in 0.5 or higher round up'}
                            {advancedSettings.roundingRules === 'conservative' && 'All values round down for conservative labeling'}
                            {advancedSettings.roundingRules === 'precise' && 'Shows one decimal place for better accuracy'}
                        </small>
                    </div>
                </div>
            </div>

            {/* Color Scheme */}
            <div className="settings-group">
                <h3 className="subsection-title">Label Design</h3>
                <div className="form-group">
                    <label className="form-label">Color Scheme</label>
                    <select
                        className="form-select"
                        value={advancedSettings.colorScheme}
                        onChange={(e) => setAdvancedSettings(prev => ({
                            ...prev,
                            colorScheme: e.target.value
                        }))}
                    >
                        <option value="standard">Standard (Black & White)</option>
                        <option value="corporate">Corporate (Brand Colors)</option>
                        <option value="minimal">Minimal (Clean Design)</option>
                        <option value="traditional">Traditional (Classic Layout)</option>
                    </select>
                </div>
            </div>

            {/* Export Options */}
            <div className="settings-group">
                <h3 className="subsection-title">Export Options</h3>
                <div className="settings-grid">
                    <label className="setting-item">
                        <input
                            type="checkbox"
                            checked={true}
                            disabled
                        />
                        <span>Include detailed report</span>
                    </label>
                    <label className="setting-item">
                        <input
                            type="checkbox"
                            checked={true}
                            disabled
                        />
                        <span>Include ingredient breakdown</span>
                    </label>
                    <label className="setting-item">
                        <input
                            type="checkbox"
                            checked={advancedSettings.includeBarcode}
                            onChange={(e) => setAdvancedSettings(prev => ({
                                ...prev,
                                includeBarcode: e.target.checked
                            }))}
                        />
                        <span>Include barcode in export</span>
                    </label>
                    <label className="setting-item">
                        <input
                            type="checkbox"
                            checked={true}
                            disabled
                        />
                        <span>Include compliance information</span>
                    </label>
                </div>
            </div>

            {/* Validation Settings */}
            <div className="settings-group">
                <h3 className="subsection-title">{t('labelGenerator.advancedSettings.validation')}</h3>
                <div className="validation-checks">
                    {validationErrors.map((error, index) => (
                        <div key={index} className="validation-error">
                            <span className="error-icon">
                                <X size={16} />
                            </span>
                            <span className="error-text">{error}</span>
                        </div>
                    ))}
                    {validationErrors.length === 0 && (
                        <div className="validation-success">
                            <span className="success-icon">
                                <CheckCircle size={16} />
                            </span>
                            <span className="success-text">{t('labelGenerator.validation.allPassed')}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Compliance Information */}
            <div className="settings-group">
                <h3 className="subsection-title">Compliance Information</h3>
                <div className="compliance-info">
                    <div className="info-card">
                        <h4>Label Standards</h4>
                        <ul>
                            <li>FDA compliance for US markets</li>
                            <li>GSO standards for MENA region</li>
                            <li>EU nutrition labeling requirements</li>
                            <li>Health Canada guidelines</li>
                        </ul>
                    </div>
                    <div className="info-card">
                        <h4>Validation Rules</h4>
                        <ul>
                            <li>Nutritional claims verification</li>
                            <li>Required field validation</li>
                            <li>Regional format compliance</li>
                            <li>Allergen disclosure requirements</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Data Sources */}
            <div className="settings-group">
                <h3 className="subsection-title">Data Sources & Accuracy</h3>
                <div className="data-sources">
                    <p><strong>Ingredient Database:</strong> USDA FoodData Central, comprehensive nutrition database with over 300,000 food items</p>
                    <p><strong>Daily Values:</strong> Based on 2,000 calorie diet as per FDA guidelines</p>
                    <p><strong>Allergen Information:</strong> FDA recognized allergen categories (Big 8)</p>
                    <p><strong>Update Frequency:</strong> Database updated quarterly with latest nutritional research</p>
                    <div className="accuracy-note">
                        <small>
                            <strong>Note:</strong> Calculated values are estimates based on ingredient data.
                            For commercial labeling, laboratory analysis may be required for complete accuracy.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedSettings;