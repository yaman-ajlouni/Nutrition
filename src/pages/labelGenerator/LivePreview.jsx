import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Download } from 'lucide-react';

const LivePreview = ({
    productData,
    nutrition,
    dailyValues,
    allAllergens,
    costPerServing,
    calculateHealthScore,
    labelFormat,
    activeLanguage,
    generateQRCode,
    generateBarcode,
    isFeatureAvailable,
    advancedSettings,
    nutritionalClaims,
    downloadLabel,
    isGeneratingPDF,
    validationErrors
}) => {
    const { t } = useLanguage();

    return (
        <div className="preview-section">
            <div className="preview-container">
                <div className="preview-header">
                    <h2 className="section-title">{t('labelGenerator.preview.title')}</h2>
                    <div className="preview-actions">
                        <button
                            className={`action-btn ${isGeneratingPDF ? 'loading' : ''}`}
                            onClick={downloadLabel}
                            disabled={!isFeatureAvailable('pdf') || isGeneratingPDF || validationErrors.length > 0}
                        >
                            {isGeneratingPDF ? (
                                <>
                                    <div className="spinner"></div>
                                    {t('labelGenerator.preview.generating')}
                                </>
                            ) : (
                                <>
                                    <Download size={18} />
                                    {t('labelGenerator.preview.downloadReport')}
                                </>
                            )}
                        </button>
                        {validationErrors.length > 0 && (
                            <div className="action-warning">
                                {t('labelGenerator.preview.fixErrors')}
                            </div>
                        )}
                    </div>
                </div>

                {/* Label Preview */}
                <NutritionLabel
                    productData={productData}
                    nutrition={nutrition}
                    dailyValues={dailyValues}
                    allergens={allAllergens}
                    format={labelFormat}
                    language={activeLanguage}
                    qrCode={generateQRCode()}
                    barcode={generateBarcode()}
                    isFeatureAvailable={isFeatureAvailable}
                    settings={advancedSettings}
                    nutritionalClaims={nutritionalClaims}
                    t={t}
                />

                {/* Quick Stats */}
                {productData.ingredients.length > 0 && (
                    <div className="quick-stats">
                        <div className="stat-item">
                            <span className="stat-label">{t('labelGenerator.quickStats.caloriesPerServing')}</span>
                            <span className="stat-value">{nutrition.energy.toFixed(0)}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">{t('labelGenerator.quickStats.costPerServing')}</span>
                            <span className="stat-value">${costPerServing.toFixed(2)}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">{t('labelGenerator.quickStats.allergens')}</span>
                            <span className="stat-value">{allAllergens.length}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">{t('labelGenerator.quickStats.healthScore')}</span>
                            <span className="stat-value">{calculateHealthScore(nutrition)}/100</span>
                        </div>
                    </div>
                )}

                {/* Label Format Information */}
                <div className="format-information">
                    <h3 className="subsection-title">Label Information</h3>
                    <div className="format-details">
                        <div className="detail-item">
                            <span className="detail-label">Format:</span>
                            <span className="detail-value">{labelFormat}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Language:</span>
                            <span className="detail-value">{activeLanguage === 'english' ? 'English' : 'العربية'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Serving Size:</span>
                            <span className="detail-value">{productData.servingSize || '100'}g</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Total Weight:</span>
                            <span className="detail-value">
                                {((parseFloat(productData.servingSize) || 100) * (parseFloat(productData.servingsPerPackage) || 1)).toFixed(1)}g
                            </span>
                        </div>
                    </div>
                </div>

                {/* Export Options */}
                <div className="export-options">
                    <h3 className="subsection-title">Export Options</h3>
                    <div className="export-grid">
                        <div className="export-item">
                            <h4>Text Report (.txt)</h4>
                            <p>Comprehensive nutrition report with all calculations and compliance information</p>
                            <small>Includes: Product info, ingredients, nutrition facts, allergens, compliance data</small>
                        </div>
                        <div className="export-item disabled">
                            <h4>PDF Label (.pdf) <span className="pro-badge">Pro</span></h4>
                            <p>Print-ready nutrition label in industry-standard PDF format</p>
                            <small>Upgrade to Pro for PDF export functionality</small>
                        </div>
                        <div className="export-item disabled">
                            <h4>Excel Report (.xlsx) <span className="pro-badge">Pro</span></h4>
                            <p>Detailed spreadsheet with nutritional analysis and cost breakdown</p>
                            <small>Upgrade to Pro for Excel export functionality</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Enhanced Nutrition Label Component
const NutritionLabel = ({
    productData,
    nutrition,
    dailyValues,
    allergens,
    format,
    language,
    qrCode,
    barcode,
    isFeatureAvailable,
    settings,
    nutritionalClaims,
    t
}) => {
    const isArabic = language === 'arabic';
    const formatInfo = {
        GSO_Vertical: { name: 'GSO Vertical', layout: 'vertical' },
        GSO_Tabular: { name: 'GSO Tabular', layout: 'tabular' },
        GSO_Linear: { name: 'GSO Linear', layout: 'linear' },
        FDA_Vertical: { name: 'FDA Vertical', layout: 'vertical' },
        FDA_Tabular: { name: 'FDA Tabular', layout: 'tabular' },
        FDA_Linear: { name: 'FDA Linear', layout: 'linear' }
    };

    const currentFormat = formatInfo[format] || formatInfo.GSO_Vertical;

    return (
        <div className={`nutrition-label ${currentFormat.layout}-layout ${isArabic ? 'arabic' : 'english'} ${settings.fontSize} ${settings.labelOrientation}`} dir={isArabic ? 'rtl' : 'ltr'}>
            {/* Label Header */}
            <div className="label-header">
                {productData.logo && (
                    <img src={productData.logo} alt="Logo" className="label-logo" />
                )}
                <div className="label-product-info">
                    <h3 className="product-name">
                        {productData.productName[language] || (isArabic ? 'اسم المنتج' : 'Product Name')}
                    </h3>
                    <p className="company-name">
                        {productData.company[language] || (isArabic ? 'اسم الشركة' : 'Company Name')}
                    </p>
                    <div className="label-badges">
                        <span className="format-badge">{currentFormat.name}</span>
                        {productData.batchNumber && (
                            <span className="batch-badge">Batch: {productData.batchNumber}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Nutrition Facts */}
            <div className="nutrition-facts">
                <div className="facts-header">
                    <h4>{isArabic ? t('labelGenerator.nutritionLabel.nutritionFactsAr') : t('labelGenerator.nutritionLabel.nutritionFacts')}</h4>
                    <p>
                        {isArabic ? t('labelGenerator.nutritionLabel.perAr') : t('labelGenerator.nutritionLabel.per')} {productData.servingSize || '100'}{isArabic ? t('labelGenerator.nutritionLabel.gramsAr') : t('labelGenerator.nutritionLabel.grams')}
                        {productData.servingsPerPackage && productData.servingsPerPackage !== '1' && (
                            <span className="servings-info">
                                ({productData.servingsPerPackage} {isArabic ? t('labelGenerator.nutritionLabel.servingsAr') : t('labelGenerator.nutritionLabel.servings')})
                            </span>
                        )}
                    </p>
                </div>

                <div className={`nutrition-table ${currentFormat.layout}`}>
                    <div className="nutrition-row energy">
                        <span>{isArabic ? t('labelGenerator.nutritionLabel.energyAr') : t('labelGenerator.nutritionLabel.energy')}</span>
                        <span>
                            {nutrition.energy.toFixed(0)} {isArabic ? t('labelGenerator.nutritionLabel.kcalAr') : t('labelGenerator.nutritionLabel.kcal')}
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.calories.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    <div className="nutrition-row">
                        <span>{isArabic ? t('labelGenerator.nutritionLabel.fatAr') : t('labelGenerator.nutritionLabel.fat')}</span>
                        <span>
                            {nutrition.fat.toFixed(1)}g
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.fat.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    <div className="nutrition-row sub-row">
                        <span>{isArabic ? t('labelGenerator.nutritionLabel.saturatedFatAr') : t('labelGenerator.nutritionLabel.saturatedFat')}</span>
                        <span>
                            {nutrition.saturatedFat.toFixed(1)}g
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.saturatedFat.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    {nutrition.transFat > 0.01 && (
                        <div className="nutrition-row sub-row trans-fat">
                            <span>{isArabic ? t('labelGenerator.nutritionLabel.transFatAr') : t('labelGenerator.nutritionLabel.transFat')}</span>
                            <span>{nutrition.transFat.toFixed(2)}g</span>
                        </div>
                    )}
                    <div className="nutrition-row">
                        <span>{isArabic ? t('labelGenerator.nutritionLabel.carbohydratesAr') : t('labelGenerator.nutritionLabel.carbohydrates')}</span>
                        <span>
                            {nutrition.carbohydrates.toFixed(1)}g
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.carbs.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    <div className="nutrition-row sub-row">
                        <span>{isArabic ? t('labelGenerator.nutritionLabel.sugarsAr') : t('labelGenerator.nutritionLabel.sugars')}</span>
                        <span>
                            {nutrition.sugars.toFixed(1)}g
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.sugars.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    {nutrition.fiber > 0.1 && (
                        <div className="nutrition-row sub-row">
                            <span>{isArabic ? t('labelGenerator.nutritionLabel.fiberAr') : t('labelGenerator.nutritionLabel.fiber')}</span>
                            <span>
                                {nutrition.fiber.toFixed(1)}g
                                {settings.showDailyValues && (
                                    <small className="daily-value"> {dailyValues.fiber.toFixed(0)}% DV</small>
                                )}
                            </span>
                        </div>
                    )}
                    <div className="nutrition-row">
                        <span>{isArabic ? t('labelGenerator.nutritionLabel.proteinAr') : t('labelGenerator.nutritionLabel.protein')}</span>
                        <span>
                            {nutrition.protein.toFixed(1)}g
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.protein.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    <div className="nutrition-row">
                        <span>{isArabic ? t('labelGenerator.nutritionLabel.saltAr') : t('labelGenerator.nutritionLabel.salt')}</span>
                        <span>
                            {nutrition.salt.toFixed(2)}g
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.salt.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>

                    {/* Vitamins & Minerals (if significant amounts) */}
                    {(nutrition.vitaminA > 10 || nutrition.vitaminC > 1 || nutrition.calcium > 10 || nutrition.iron > 0.5) && (
                        <div className="vitamins-minerals">
                            <div className="section-divider">
                                <span>{isArabic ? t('labelGenerator.nutritionLabel.vitaminsAndMineralsAr') : t('labelGenerator.nutritionLabel.vitaminsAndMinerals')}</span>
                            </div>
                            {nutrition.vitaminA > 10 && (
                                <div className="nutrition-row vitamin">
                                    <span>{isArabic ? t('labelGenerator.nutritionLabel.vitaminAAr') : t('labelGenerator.nutritionLabel.vitaminA')}</span>
                                    <span>
                                        {nutrition.vitaminA.toFixed(0)}µg
                                        {settings.showDailyValues && (
                                            <small className="daily-value"> {dailyValues.vitaminA.toFixed(0)}% DV</small>
                                        )}
                                    </span>
                                </div>
                            )}
                            {nutrition.vitaminC > 1 && (
                                <div className="nutrition-row vitamin">
                                    <span>{isArabic ? t('labelGenerator.nutritionLabel.vitaminCAr') : t('labelGenerator.nutritionLabel.vitaminC')}</span>
                                    <span>
                                        {nutrition.vitaminC.toFixed(0)}mg
                                        {settings.showDailyValues && (
                                            <small className="daily-value"> {dailyValues.vitaminC.toFixed(0)}% DV</small>
                                        )}
                                    </span>
                                </div>
                            )}
                            {nutrition.calcium > 10 && (
                                <div className="nutrition-row mineral">
                                    <span>{isArabic ? t('labelGenerator.nutritionLabel.calciumAr') : t('labelGenerator.nutritionLabel.calcium')}</span>
                                    <span>
                                        {nutrition.calcium.toFixed(0)}mg
                                        {settings.showDailyValues && (
                                            <small className="daily-value"> {dailyValues.calcium.toFixed(0)}% DV</small>
                                        )}
                                    </span>
                                </div>
                            )}
                            {nutrition.iron > 0.5 && (
                                <div className="nutrition-row mineral">
                                    <span>{isArabic ? t('labelGenerator.nutritionLabel.ironAr') : t('labelGenerator.nutritionLabel.iron')}</span>
                                    <span>
                                        {nutrition.iron.toFixed(1)}mg
                                        {settings.showDailyValues && (
                                            <small className="daily-value"> {dailyValues.iron.toFixed(0)}% DV</small>
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Nutritional Claims */}
                {productData.nutritionalClaims.length > 0 && (
                    <div className="nutritional-claims">
                        {productData.nutritionalClaims.map(claimId => {
                            const claim = nutritionalClaims.find(c => c.id === claimId);
                            return claim ? (
                                <span key={claimId} className="claim-badge">
                                    {isArabic ? claim.arabic : claim.label}
                                </span>
                            ) : null;
                        })}
                    </div>
                )}
            </div>

            {/* Ingredients Section */}
            <div className="ingredients-section">
                <h4>{isArabic ? t('labelGenerator.nutritionLabel.ingredientsAr') : t('labelGenerator.nutritionLabel.ingredients')}</h4>
                <p>
                    {productData.ingredients.length > 0
                        ? productData.ingredients
                            .sort((a, b) => b.grams - a.grams)
                            .map(ing => isArabic ? ing.arabic : ing.name.split(',')[0])
                            .join(isArabic ? '، ' : ', ')
                        : (isArabic ? t('labelGenerator.nutritionLabel.ingredientsPlaceholderAr') : t('labelGenerator.nutritionLabel.ingredientsPlaceholder'))
                    }
                </p>

                {allergens.length > 0 && (
                    <p className="allergens-text">
                        <strong>{t('labelGenerator.allergens.contains')}</strong> {allergens.join(isArabic ? '، ' : ', ')}
                    </p>
                )}
            </div>

            {/* Label Footer */}
            <div className="label-footer">
                <div className="dates">
                    {productData.productionDate && (
                        <p>{isArabic ? t('labelGenerator.nutritionLabel.productionAr') : t('labelGenerator.nutritionLabel.production')} {productData.productionDate}</p>
                    )}
                    {productData.expiryDate && (
                        <p>{isArabic ? t('labelGenerator.nutritionLabel.bestBeforeAr') : t('labelGenerator.nutritionLabel.bestBefore')} {productData.expiryDate}</p>
                    )}
                    {productData.shelfLife && (
                        <p>{isArabic ? t('labelGenerator.nutritionLabel.shelfLifeAr') : t('labelGenerator.nutritionLabel.shelfLife')} {productData.shelfLife} {isArabic ? t('labelGenerator.nutritionLabel.monthsAr') : t('labelGenerator.nutritionLabel.months')}</p>
                    )}
                </div>

                {productData.storageInstructions[language] && (
                    <p className="storage">
                        {isArabic ? t('labelGenerator.nutritionLabel.storageAr') : t('labelGenerator.nutritionLabel.storage')} {productData.storageInstructions[language]}
                    </p>
                )}

                <div className="label-footer-codes">
                    {isFeatureAvailable('qr') && (
                        <div className="qr-section">
                            <canvas className="qr-code" width="50" height="50" />
                            <p>{isArabic ? t('labelGenerator.nutritionLabel.scanForInfoAr') : t('labelGenerator.nutritionLabel.scanForInfo')}</p>
                        </div>
                    )}

                    {settings.includeBarcode && productData.barcode && (
                        <div className="barcode-section">
                            <canvas className="barcode" width="120" height="30" />
                            <p className="barcode-number">{productData.barcode}</p>
                        </div>
                    )}
                </div>

                {settings.showDailyValues && (
                    <p className="dv-disclaimer">
                        <small>
                            {isArabic
                                ? t('labelGenerator.nutritionLabel.dailyValueDisclaimerAr')
                                : t('labelGenerator.nutritionLabel.dailyValueDisclaimer')
                            }
                        </small>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LivePreview;