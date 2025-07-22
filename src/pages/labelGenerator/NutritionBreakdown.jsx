import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
    TrendingUp,
    Maximize,
    DollarSign,
    Package,
    Zap,
    Apple,
    Heart,
    AlertTriangle,
    Trash2,
    Check,
    X
} from 'lucide-react';

const NutritionBreakdown = ({
    productData,
    nutrition,
    dailyValues,
    allAllergens,
    costPerServing,
    activeLanguage,
    setActiveTab,
    scaleRecipe,
    updateIngredientAmount,
    removeIngredient,
    calculateHealthScore
}) => {
    const { t } = useLanguage();

    return (
        <div className="nutrition-breakdown">
            <h2 className="section-title">{t('labelGenerator.breakdown.title')}</h2>

            {/* Recipe Tools */}
            {productData.ingredients.length > 0 && (
                <div className="recipe-tools">
                    <h3 className="subsection-title">{t('labelGenerator.breakdown.recipeTools')}</h3>
                    <div className="tools-row">
                        <button
                            className="tool-btn"
                            onClick={() => scaleRecipe(0.5)}
                            title="Scale recipe by 50%"
                        >
                            <TrendingUp size={16} /> {t('labelGenerator.breakdown.scale50')}
                        </button>
                        <button
                            className="tool-btn"
                            onClick={() => scaleRecipe(2)}
                            title="Double recipe"
                        >
                            <Maximize size={16} /> {t('labelGenerator.breakdown.double')}
                        </button>
                        <div className="cost-display">
                            <DollarSign size={16} /> ${costPerServing.toFixed(2)}{t('labelGenerator.breakdown.costPerServing')}
                        </div>
                    </div>
                </div>
            )}

            {/* Ingredients List */}
            <div className="ingredients-list">
                <h3 className="subsection-title">
                    {t('labelGenerator.breakdown.ingredients')} ({productData.ingredients.length})
                </h3>

                {productData.ingredients.length === 0 ? (
                    <div className="empty-state">
                        <Package size={48} />
                        <p>{t('labelGenerator.ingredients.noIngredients')}</p>
                        <button
                            className="btn-secondary"
                            onClick={() => setActiveTab('label')}
                        >
                            {t('labelGenerator.ingredients.addIngredients')}
                        </button>
                    </div>
                ) : (
                    <div className="breakdown-table">
                        <div className="table-header">
                            <div className="col-ingredient">{t('labelGenerator.breakdown.ingredient')}</div>
                            <div className="col-amount">{t('labelGenerator.breakdown.grams')}</div>
                            <div className="col-percent">{t('labelGenerator.breakdown.percent')}</div>
                            <div className="col-calories">{t('labelGenerator.breakdown.calories')}</div>
                            <div className="col-fat">{t('labelGenerator.breakdown.fat')}</div>
                            <div className="col-carbs">{t('labelGenerator.breakdown.carbs')}</div>
                            <div className="col-protein">{t('labelGenerator.breakdown.protein')}</div>
                            <div className="col-cost">{t('labelGenerator.breakdown.cost')}</div>
                            <div className="col-actions">{t('labelGenerator.breakdown.actions')}</div>
                        </div>

                        {productData.ingredients
                            .sort((a, b) => b.grams - a.grams)
                            .map(ingredient => (
                                <IngredientRow
                                    key={ingredient.id}
                                    ingredient={ingredient}
                                    onUpdateAmount={updateIngredientAmount}
                                    onRemove={removeIngredient}
                                    activeLanguage={activeLanguage}
                                    t={t}
                                />
                            ))}

                        {/* Totals Row */}
                        <div className="table-row totals-row">
                            <div className="col-ingredient">
                                <strong>{t('labelGenerator.breakdown.totals')}</strong>
                            </div>
                            <div className="col-amount">
                                <strong>
                                    {productData.ingredients.reduce((sum, ing) => sum + ing.grams, 0).toFixed(1)}
                                </strong>
                            </div>
                            <div className="col-percent">
                                <strong>100%</strong>
                            </div>
                            <div className="col-calories">
                                <strong>{nutrition.energy.toFixed(0)}</strong>
                            </div>
                            <div className="col-fat">
                                <strong>{nutrition.fat.toFixed(1)}</strong>
                            </div>
                            <div className="col-carbs">
                                <strong>{nutrition.carbohydrates.toFixed(1)}</strong>
                            </div>
                            <div className="col-protein">
                                <strong>{nutrition.protein.toFixed(1)}</strong>
                            </div>
                            <div className="col-cost">
                                <strong>${costPerServing.toFixed(2)}</strong>
                            </div>
                            <div className="col-actions"></div>
                        </div>

                        {/* Per Serving Row */}
                        <div className="table-row per-serving-row">
                            <div className="col-ingredient">
                                <em>{t('labelGenerator.breakdown.perServing', { size: productData.servingSize })}</em>
                            </div>
                            <div className="col-amount">-</div>
                            <div className="col-percent">-</div>
                            <div className="col-calories">
                                <strong>{nutrition.energy.toFixed(0)} kcal</strong>
                            </div>
                            <div className="col-fat">
                                <strong>{nutrition.fat.toFixed(1)}g</strong>
                            </div>
                            <div className="col-carbs">
                                <strong>{nutrition.carbohydrates.toFixed(1)}g</strong>
                            </div>
                            <div className="col-protein">
                                <strong>{nutrition.protein.toFixed(1)}g</strong>
                            </div>
                            <div className="col-cost">
                                <strong>${costPerServing.toFixed(2)}</strong>
                            </div>
                            <div className="col-actions"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Nutrition Summary */}
            {productData.ingredients.length > 0 && (
                <div className="nutrition-summary">
                    <h3 className="subsection-title">{t('labelGenerator.nutritionAnalysis.title')}</h3>
                    <div className="summary-grid">
                        <div className="summary-card energy">
                            <div className="card-header">
                                <span className="card-icon">
                                    <Zap size={20} />
                                </span>
                                <span className="card-title">{t('labelGenerator.nutritionAnalysis.energy')}</span>
                            </div>
                            <div className="card-value">
                                {nutrition.energy.toFixed(0)} kcal
                            </div>
                            <div className="card-subtitle">
                                {dailyValues.calories.toFixed(1)}% DV
                            </div>
                        </div>

                        <div className="summary-card macros">
                            <div className="card-header">
                                <span className="card-icon">
                                    <Apple size={20} />
                                </span>
                                <span className="card-title">{t('labelGenerator.nutritionAnalysis.macros')}</span>
                            </div>
                            <div className="macro-breakdown">
                                <div className="macro-item">
                                    <span>{t('labelGenerator.nutritionAnalysis.carbsLabel', { value: nutrition.carbohydrates.toFixed(1) })}</span>
                                    <div className="macro-bar">
                                        <div
                                            className="macro-fill carbs"
                                            style={{ width: `${(nutrition.carbohydrates * 4 / nutrition.energy * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="macro-item">
                                    <span>{t('labelGenerator.nutritionAnalysis.proteinLabel', { value: nutrition.protein.toFixed(1) })}</span>
                                    <div className="macro-bar">
                                        <div
                                            className="macro-fill protein"
                                            style={{ width: `${(nutrition.protein * 4 / nutrition.energy * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="macro-item">
                                    <span>{t('labelGenerator.nutritionAnalysis.fatLabel', { value: nutrition.fat.toFixed(1) })}</span>
                                    <div className="macro-bar">
                                        <div
                                            className="macro-fill fat"
                                            style={{ width: `${(nutrition.fat * 9 / nutrition.energy * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="summary-card health">
                            <div className="card-header">
                                <span className="card-icon">
                                    <Heart size={20} />
                                </span>
                                <span className="card-title">{t('labelGenerator.nutritionAnalysis.healthScore')}</span>
                            </div>
                            <div className="health-score">
                                {calculateHealthScore(nutrition)}
                            </div>
                            <div className="card-subtitle">
                                {t('labelGenerator.nutritionAnalysis.basedOnDensity')}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Allergens Summary */}
            {allAllergens.length > 0 && (
                <div className="allergens-summary">
                    <h3 className="subsection-title">{t('labelGenerator.allergens.title')}</h3>
                    <div className="allergen-tags">
                        {allAllergens.map(allergen => (
                            <span key={allergen} className="allergen-tag">
                                <AlertTriangle size={14} /> {allergen}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Enhanced Ingredient Row Component
const IngredientRow = ({ ingredient, onUpdateAmount, onRemove, activeLanguage, t }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editAmount, setEditAmount] = useState(ingredient.grams.toString());

    const handleSave = () => {
        onUpdateAmount(ingredient.id, editAmount);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditAmount(ingredient.grams.toString());
        setIsEditing(false);
    };

    const ingredientCost = (ingredient.cost || 0) * ingredient.grams / 100;

    return (
        <div className="table-row ingredient-row">
            <div className="col-ingredient">
                <span className="ingredient-name">
                    {activeLanguage === 'english' ? ingredient.name : ingredient.arabic}
                </span>
                <span className="ingredient-category">{ingredient.category}</span>
                {ingredient.allergens.length > 0 && (
                    <div className="mini-allergens">
                        {ingredient.allergens.map(allergen => (
                            <span key={allergen} className="mini-allergen">{allergen}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className="col-amount">
                {isEditing ? (
                    <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="edit-input"
                        min="0"
                        step="0.1"
                    />
                ) : (
                    <span onClick={() => setIsEditing(true)} className="editable-amount">
                        {ingredient.grams.toFixed(1)}
                    </span>
                )}
            </div>
            <div className="col-percent">{ingredient.percentage.toFixed(1)}%</div>
            <div className="col-calories">
                {(ingredient.calories * ingredient.grams / 100).toFixed(0)}
            </div>
            <div className="col-fat">
                {(ingredient.fat * ingredient.grams / 100).toFixed(1)}
            </div>
            <div className="col-carbs">
                {(ingredient.carbs * ingredient.grams / 100).toFixed(1)}
            </div>
            <div className="col-protein">
                {(ingredient.protein * ingredient.grams / 100).toFixed(1)}
            </div>
            <div className="col-cost">
                ${ingredientCost.toFixed(2)}
            </div>
            <div className="col-actions">
                {isEditing ? (
                    <div className="edit-actions">
                        <button onClick={handleSave} className="save-btn" title="Save">
                            <Check size={14} />
                        </button>
                        <button onClick={handleCancel} className="cancel-btn" title="Cancel">
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => onRemove(ingredient.id)}
                        className="remove-btn"
                        title={t('labelGenerator.ingredients.removeIngredient')}
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default NutritionBreakdown;