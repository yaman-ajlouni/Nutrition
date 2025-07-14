import React, { useState, useRef, useEffect } from 'react';
import { 
    FileText, 
    BarChart3, 
    Settings, 
    Upload, 
    Download, 
    Plus, 
    Trash2, 
    Check, 
    X, 
    AlertTriangle, 
    CheckCircle, 
    Search,
    Clock,
    DollarSign,
    Zap,
    Apple,
    Heart,
    Flag,
    Calendar,
    Package,
    AlertCircle,
    Info,
    Eye,
    Globe,
    Target,
    Maximize,
    Copy,
    Save,
    Edit,
    TrendingUp,
    Star
} from 'lucide-react';
import './LabelGenerator.scss';

const LabelGenerator = () => {
    const [activeLanguage, setActiveLanguage] = useState('english');
    const [activeTab, setActiveTab] = useState('label');
    const [currentTier, setCurrentTier] = useState('basic'); // Changed from 'test' to 'basic'
    const [labelFormat, setLabelFormat] = useState('GSO_Vertical');
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [recentIngredients, setRecentIngredients] = useState([]);
    const canvasRef = useRef(null);
    const barcodeRef = useRef(null);

    // Form Data State
    const [productData, setProductData] = useState({
        productName: {
            english: '',
            arabic: ''
        },
        company: {
            english: '',
            arabic: ''
        },
        servingSize: '100',
        servingsPerPackage: '1',
        ingredients: [],
        allergens: [],
        productionDate: '',
        expiryDate: '',
        shelfLife: '12',
        batchNumber: '',
        storageInstructions: {
            english: '',
            arabic: ''
        },
        nutritionalClaims: [],
        logo: null,
        barcode: '',
        labelSize: 'standard',
        costPerServing: '',
        targetMarket: 'MENA'
    });

    // Advanced settings
    const [advancedSettings, setAdvancedSettings] = useState({
        showDailyValues: true,
        showCalorieBreakdown: false,
        showNutritionalScore: false,
        roundingRules: 'standard',
        includeBarcode: true,
        labelOrientation: 'portrait',
        fontSize: 'medium',
        colorScheme: 'standard'
    });

    // Mock ingredient database with detailed nutrition and daily values
    const mockIngredients = [
        {
            name: 'Wheat flour, white, all-purpose, unenriched',
            arabic: 'دقيق القمح الأبيض',
            calories: 364, fat: 0.98, saturatedFat: 0.155, transFat: 0, carbs: 76.31,
            sugars: 0.27, protein: 10.33, salt: 0.002, fiber: 2.7, allergens: ['Gluten'],
            vitamins: { vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0.06 },
            minerals: { calcium: 15, iron: 1.2, potassium: 107, sodium: 2 },
            category: 'grains', cost: 0.50
        },
        {
            name: 'Sugar, brown',
            arabic: 'السكر البني',
            calories: 380, fat: 0, saturatedFat: 0, transFat: 0, carbs: 98.09,
            sugars: 96.21, protein: 0.12, salt: 0.039, fiber: 0, allergens: [],
            vitamins: { vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0 },
            minerals: { calcium: 85, iron: 1.91, potassium: 346, sodium: 39 },
            category: 'sweeteners', cost: 1.20
        },
        {
            name: 'Butter, without salt (unsalted)',
            arabic: 'زبدة بدون ملح',
            calories: 717, fat: 81.11, saturatedFat: 51.368, transFat: 3.28, carbs: 0.06,
            sugars: 0.06, protein: 0.85, salt: 0.011, fiber: 0, allergens: ['Milk'],
            vitamins: { vitaminA: 684, vitaminC: 0, vitaminD: 1.5, vitaminE: 2.32 },
            minerals: { calcium: 24, iron: 0.02, potassium: 24, sodium: 11 },
            category: 'dairy', cost: 4.50
        },
        {
            name: 'Egg, whole, raw, fresh',
            arabic: 'بيض طازج كامل',
            calories: 143, fat: 9.51, saturatedFat: 3.126, transFat: 0.038, carbs: 0.72,
            sugars: 0.37, protein: 12.56, salt: 0.352, fiber: 0, allergens: ['Eggs'],
            vitamins: { vitaminA: 160, vitaminC: 0, vitaminD: 2, vitaminE: 1.05 },
            minerals: { calcium: 56, iron: 1.75, potassium: 138, sodium: 142 },
            category: 'protein', cost: 3.00
        },
        {
            name: 'Milk, whole, 3.25% milkfat',
            arabic: 'حليب كامل الدسم',
            calories: 61, fat: 3.27, saturatedFat: 1.865, transFat: 0.158, carbs: 4.78,
            sugars: 5.05, protein: 3.15, salt: 0.044, fiber: 0, allergens: ['Milk'],
            vitamins: { vitaminA: 46, vitaminC: 0, vitaminD: 1.25, vitaminE: 0.07 },
            minerals: { calcium: 113, iron: 0.03, potassium: 150, sodium: 44 },
            category: 'dairy', cost: 1.80
        },
        {
            name: 'Vanilla extract',
            arabic: 'خلاصة الفانيليا',
            calories: 288, fat: 0.06, saturatedFat: 0.011, transFat: 0, carbs: 12.65,
            sugars: 12.65, protein: 0.06, salt: 0.009, fiber: 0, allergens: [],
            vitamins: { vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0 },
            minerals: { calcium: 11, iron: 0.12, potassium: 148, sodium: 9 },
            category: 'flavorings', cost: 8.00
        },
        {
            name: 'Salt, table',
            arabic: 'ملح الطعام',
            calories: 0, fat: 0, saturatedFat: 0, transFat: 0, carbs: 0,
            sugars: 0, protein: 0, salt: 38758, fiber: 0, allergens: [],
            vitamins: { vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0 },
            minerals: { calcium: 24, iron: 0.33, potassium: 8, sodium: 38758 },
            category: 'seasonings', cost: 0.30
        },
        {
            name: 'Baking soda',
            arabic: 'بيكربونات الصوديوم',
            calories: 0, fat: 0, saturatedFat: 0, transFat: 0, carbs: 0,
            sugars: 0, protein: 0, salt: 27360, fiber: 0, allergens: [],
            vitamins: { vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0 },
            minerals: { calcium: 0, iron: 0, potassium: 0, sodium: 27360 },
            category: 'leavening', cost: 0.20
        },
        {
            name: 'Olive oil, extra virgin',
            arabic: 'زيت الزيتون البكر',
            calories: 884, fat: 100, saturatedFat: 13.808, transFat: 0, carbs: 0,
            sugars: 0, protein: 0, salt: 0.002, fiber: 0, allergens: [],
            vitamins: { vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 14.35 },
            minerals: { calcium: 1, iron: 0.56, potassium: 1, sodium: 2 },
            category: 'oils', cost: 6.00
        },
        {
            name: 'Almonds, raw',
            arabic: 'لوز نيء',
            calories: 579, fat: 49.93, saturatedFat: 3.802, transFat: 0, carbs: 21.55,
            sugars: 4.35, protein: 21.15, salt: 0.001, fiber: 12.5, allergens: ['Tree nuts'],
            vitamins: { vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 25.63 },
            minerals: { calcium: 269, iron: 3.71, potassium: 733, sodium: 1 },
            category: 'nuts', cost: 12.00
        }
    ];

    // Label format options with detailed specifications
    const labelFormats = [
        {
            value: 'GSO_Vertical',
            label: 'GSO Vertical (default)',
            region: 'MENA',
            description: 'Standard Gulf Cooperation Council format',
            requirements: ['Arabic text required', 'Metric units only', 'Halal certification space']
        },
        {
            value: 'GSO_Tabular',
            label: 'GSO Tabular',
            region: 'MENA',
            description: 'Table format for limited space',
            requirements: ['Compact design', 'Bilingual support']
        },
        {
            value: 'GSO_Linear',
            label: 'GSO Linear',
            region: 'MENA',
            description: 'Horizontal layout for wide packages',
            requirements: ['Single line format', 'Space efficient']
        },
        {
            value: 'FDA_Vertical',
            label: 'FDA Vertical',
            region: 'USA',
            description: 'US FDA standard vertical format',
            requirements: ['% Daily Value required', 'English only', 'Calories prominence']
        },
        {
            value: 'FDA_Tabular',
            label: 'FDA Tabular',
            region: 'USA',
            description: 'FDA approved table format',
            requirements: ['Simplified format', 'Clear hierarchy']
        },
        {
            value: 'EU_Vertical',
            label: 'EU Vertical',
            region: 'Europe',
            description: 'European Union standard',
            requirements: ['kJ and kcal', 'Reference intake values', 'Allergen emphasis']
        },
        {
            value: 'Canadian_Vertical',
            label: 'Canadian Vertical',
            region: 'Canada',
            description: 'Health Canada approved format',
            requirements: ['Bilingual (EN/FR)', '% Daily Value', 'Metric units']
        }
    ];

    // Nutritional claims options
    const nutritionalClaims = [
        { id: 'low-fat', label: 'Low Fat', arabic: 'قليل الدهون', criteria: 'fat < 3g per 100g' },
        { id: 'sugar-free', label: 'Sugar Free', arabic: 'خالي من السكر', criteria: 'sugars < 0.5g per 100g' },
        { id: 'high-protein', label: 'High Protein', arabic: 'عالي البروتين', criteria: 'protein > 20% of energy' },
        { id: 'high-fiber', label: 'High Fiber', arabic: 'عالي الألياف', criteria: 'fiber > 6g per 100g' },
        { id: 'low-sodium', label: 'Low Sodium', arabic: 'قليل الصوديوم', criteria: 'sodium < 120mg per 100g' },
        { id: 'organic', label: 'Organic', arabic: 'عضوي', criteria: 'Certified organic ingredients' },
        { id: 'gluten-free', label: 'Gluten Free', arabic: 'خالي من الغلوتين', criteria: 'No gluten-containing ingredients' }
    ];

    // Daily value references (based on 2000 calorie diet)
    const dailyValueReferences = {
        calories: 2000,
        fat: 65,
        saturatedFat: 20,
        carbs: 300,
        sugars: 50,
        protein: 50,
        salt: 6,
        fiber: 25,
        calcium: 1000,
        iron: 18,
        vitaminC: 90,
        vitaminA: 900
    };

    // Updated Tier limitations - made 'basic' more accessible
    const tierLimitations = {
        test: {
            products: 1,
            features: ['basic'],
            duration: '7 days',
            exports: 3,
            templates: 1
        },
        basic: {
            products: 3,
            features: ['basic', 'qr', 'pdf', 'analytics'], // Added analytics to basic
            duration: 'monthly',
            exports: 50,
            templates: 3
        },
        pro: {
            products: 20,
            features: ['basic', 'qr', 'pdf', 'analytics', 'templates', 'validation'],
            duration: 'monthly',
            exports: 500,
            templates: 10
        },
        enterprise: {
            products: 'unlimited',
            features: ['all'],
            duration: 'yearly',
            exports: 'unlimited',
            templates: 'unlimited'
        }
    };

    // Add ingredient to recipe
    const addIngredient = (ingredientData, grams) => {
        const newIngredient = {
            id: Date.now(),
            ...ingredientData,
            grams: parseFloat(grams),
            percentage: 0 // Will be calculated
        };

        // Add to recent ingredients
        setRecentIngredients(prev => {
            const updated = [ingredientData, ...prev.filter(ing => ing.name !== ingredientData.name)];
            return updated.slice(0, 10); // Keep last 10
        });

        setProductData(prev => {
            const newIngredients = [...prev.ingredients, newIngredient];
            return {
                ...prev,
                ingredients: calculatePercentages(newIngredients)
            };
        });
    };

    // Calculate ingredient percentages
    const calculatePercentages = (ingredients) => {
        const totalWeight = ingredients.reduce((sum, ing) => sum + ing.grams, 0);
        return ingredients.map(ing => ({
            ...ing,
            percentage: totalWeight > 0 ? (ing.grams / totalWeight * 100) : 0
        }));
    };

    // Remove ingredient
    const removeIngredient = (id) => {
        setProductData(prev => {
            const newIngredients = prev.ingredients.filter(ing => ing.id !== id);
            return {
                ...prev,
                ingredients: calculatePercentages(newIngredients)
            };
        });
    };

    // Update ingredient amount
    const updateIngredientAmount = (id, newGrams) => {
        setProductData(prev => {
            const newIngredients = prev.ingredients.map(ing =>
                ing.id === id ? { ...ing, grams: parseFloat(newGrams) || 0 } : ing
            );
            return {
                ...prev,
                ingredients: calculatePercentages(newIngredients)
            };
        });
    };

    // Scale recipe
    const scaleRecipe = (scaleFactor) => {
        setProductData(prev => ({
            ...prev,
            ingredients: prev.ingredients.map(ing => ({
                ...ing,
                grams: ing.grams * scaleFactor
            }))
        }));
    };

    // Calculate total nutrition per serving size
    const calculateTotalNutrition = () => {
        const totalWeight = productData.ingredients.reduce((sum, ing) => sum + ing.grams, 0);

        if (totalWeight === 0) {
            return {
                energy: 0, fat: 0, saturatedFat: 0, transFat: 0,
                carbohydrates: 0, sugars: 0, protein: 0, salt: 0,
                fiber: 0, calcium: 0, iron: 0, vitaminA: 0, vitaminC: 0,
                sodium: 0, potassium: 0
            };
        }

        const nutritionPer100g = productData.ingredients.reduce((totals, ing) => {
            const ratio = ing.grams / totalWeight;
            return {
                energy: totals.energy + (ing.calories * ratio),
                fat: totals.fat + (ing.fat * ratio),
                saturatedFat: totals.saturatedFat + (ing.saturatedFat * ratio),
                transFat: totals.transFat + (ing.transFat * ratio),
                carbohydrates: totals.carbohydrates + (ing.carbs * ratio),
                sugars: totals.sugars + (ing.sugars * ratio),
                protein: totals.protein + (ing.protein * ratio),
                salt: totals.salt + (ing.salt * ratio),
                fiber: totals.fiber + ((ing.fiber || 0) * ratio),
                calcium: totals.calcium + ((ing.minerals?.calcium || 0) * ratio),
                iron: totals.iron + ((ing.minerals?.iron || 0) * ratio),
                vitaminA: totals.vitaminA + ((ing.vitamins?.vitaminA || 0) * ratio),
                vitaminC: totals.vitaminC + ((ing.vitamins?.vitaminC || 0) * ratio),
                sodium: totals.sodium + ((ing.minerals?.sodium || 0) * ratio),
                potassium: totals.potassium + ((ing.minerals?.potassium || 0) * ratio)
            };
        }, {
            energy: 0, fat: 0, saturatedFat: 0, transFat: 0,
            carbohydrates: 0, sugars: 0, protein: 0, salt: 0,
            fiber: 0, calcium: 0, iron: 0, vitaminA: 0, vitaminC: 0,
            sodium: 0, potassium: 0
        });

        // Scale to serving size if different from 100g
        const servingSize = parseFloat(productData.servingSize) || 100;
        const scaleFactor = servingSize / 100;

        return Object.keys(nutritionPer100g).reduce((scaled, key) => {
            scaled[key] = nutritionPer100g[key] * scaleFactor;
            return scaled;
        }, {});
    };

    // Calculate daily value percentages
    const calculateDailyValues = (nutrition) => {
        return {
            calories: (nutrition.energy / dailyValueReferences.calories * 100),
            fat: (nutrition.fat / dailyValueReferences.fat * 100),
            saturatedFat: (nutrition.saturatedFat / dailyValueReferences.saturatedFat * 100),
            carbs: (nutrition.carbohydrates / dailyValueReferences.carbs * 100),
            sugars: (nutrition.sugars / dailyValueReferences.sugars * 100),
            protein: (nutrition.protein / dailyValueReferences.protein * 100),
            salt: (nutrition.salt / dailyValueReferences.salt * 100),
            fiber: (nutrition.fiber / dailyValueReferences.fiber * 100),
            calcium: (nutrition.calcium / dailyValueReferences.calcium * 100),
            iron: (nutrition.iron / dailyValueReferences.iron * 100),
            vitaminA: (nutrition.vitaminA / dailyValueReferences.vitaminA * 100),
            vitaminC: (nutrition.vitaminC / dailyValueReferences.vitaminC * 100)
        };
    };

    // Calculate cost per serving
    const calculateCostPerServing = () => {
        const totalCost = productData.ingredients.reduce((cost, ing) => {
            return cost + ((ing.cost || 0) * ing.grams / 100);
        }, 0);
        const servingsPerPackage = parseFloat(productData.servingsPerPackage) || 1;
        return totalCost / servingsPerPackage;
    };

    // Get all allergens from ingredients
    const getAllergens = () => {
        const allergenSet = new Set();
        productData.ingredients.forEach(ing => {
            ing.allergens.forEach(allergen => allergenSet.add(allergen));
        });
        return Array.from(allergenSet);
    };

    // Validate nutritional claims
    const validateNutritionalClaims = (nutrition) => {
        const errors = [];

        productData.nutritionalClaims.forEach(claimId => {
            const claim = nutritionalClaims.find(c => c.id === claimId);
            if (!claim) return;

            switch (claimId) {
                case 'low-fat':
                    if (nutrition.fat >= 3) {
                        errors.push(`"${claim.label}" claim invalid: Fat content is ${nutrition.fat.toFixed(1)}g (must be < 3g)`);
                    }
                    break;
                case 'sugar-free':
                    if (nutrition.sugars >= 0.5) {
                        errors.push(`"${claim.label}" claim invalid: Sugar content is ${nutrition.sugars.toFixed(1)}g (must be < 0.5g)`);
                    }
                    break;
                case 'high-protein':
                    const proteinPercentage = (nutrition.protein * 4) / nutrition.energy * 100;
                    if (proteinPercentage < 20) {
                        errors.push(`"${claim.label}" claim invalid: Protein provides ${proteinPercentage.toFixed(1)}% of energy (must be ≥ 20%)`);
                    }
                    break;
                case 'high-fiber':
                    if (nutrition.fiber < 6) {
                        errors.push(`"${claim.label}" claim invalid: Fiber content is ${nutrition.fiber.toFixed(1)}g (must be ≥ 6g)`);
                    }
                    break;
                case 'low-sodium':
                    if (nutrition.sodium >= 120) {
                        errors.push(`"${claim.label}" claim invalid: Sodium content is ${nutrition.sodium.toFixed(1)}mg (must be < 120mg)`);
                    }
                    break;
            }
        });

        return errors;
    };

    // Handle input changes
    const handleInputChange = (field, value, language = null) => {
        if (language) {
            setProductData(prev => ({
                ...prev,
                [field]: {
                    ...prev[field],
                    [language]: value
                }
            }));
        } else {
            setProductData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    // Handle nutritional claims
    const toggleNutritionalClaim = (claimId) => {
        setProductData(prev => ({
            ...prev,
            nutritionalClaims: prev.nutritionalClaims.includes(claimId)
                ? prev.nutritionalClaims.filter(id => id !== claimId)
                : [...prev.nutritionalClaims, claimId]
        }));
    };

    // Handle logo upload
    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProductData(prev => ({
                    ...prev,
                    logo: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Generate QR Code
    const generateQRCode = () => {
        const canvas = canvasRef.current;
        if (!canvas) return '';

        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 100, 100);
        ctx.fillStyle = '#ffffff';

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if ((i + j) % 2 === 0) {
                    ctx.fillRect(i * 10, j * 10, 10, 10);
                }
            }
        }

        return canvas.toDataURL();
    };

    // Generate Barcode
    const generateBarcode = () => {
        const canvas = barcodeRef.current;
        if (!canvas) return '';

        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 50;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 200, 50);
        ctx.fillStyle = '#000000';

        // Simple barcode pattern
        for (let i = 0; i < 200; i += 4) {
            if (Math.random() > 0.5) {
                ctx.fillRect(i, 0, 2, 40);
            }
        }

        // Add barcode number
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(productData.barcode || '1234567890123', 100, 50);

        return canvas.toDataURL();
    };

    // FIXED PDF download function
    const downloadLabel = async () => {
        if (!isFeatureAvailable('pdf')) {
            alert('PDF download is available in Basic tier and above');
            return;
        }

        if (validationErrors.length > 0) {
            alert('Please fix validation errors before downloading');
            return;
        }

        setIsGeneratingPDF(true);

        try {
            const nutrition = calculateTotalNutrition();
            const dailyVals = calculateDailyValues(nutrition);
            const cost = calculateCostPerServing();
            const currentFormat = labelFormats.find(f => f.value === labelFormat)?.label || 'GSO Vertical';

            // Create comprehensive label content
            const labelContent = `
PROFESSIONAL NUTRITION LABEL
Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

===========================================
PRODUCT INFORMATION
===========================================
Product Name (EN): ${productData.productName.english || 'Not specified'}
Product Name (AR): ${productData.productName.arabic || 'Not specified'}
Company (EN): ${productData.company.english || 'Not specified'}
Company (AR): ${productData.company.arabic || 'Not specified'}
Batch Number: ${productData.batchNumber || 'Not specified'}
Barcode: ${productData.barcode || 'Not specified'}
Label Format: ${currentFormat}
Target Market: ${labelFormats.find(f => f.value === labelFormat)?.region || 'Not specified'}

===========================================
SERVING INFORMATION
===========================================
Serving Size: ${productData.servingSize || '100'}g
Servings per Package: ${productData.servingsPerPackage || '1'}
Total Package Weight: ${((parseFloat(productData.servingSize) || 100) * (parseFloat(productData.servingsPerPackage) || 1)).toFixed(1)}g

===========================================
INGREDIENTS (by weight %)
===========================================
${productData.ingredients.length > 0 
    ? productData.ingredients
        .sort((a, b) => b.grams - a.grams)
        .map((ing, index) => `${index + 1}. ${ing.name}
   Arabic: ${ing.arabic}
   Weight: ${ing.grams}g (${ing.percentage.toFixed(1)}%)
   Category: ${ing.category}
   Cost: $${((ing.cost || 0) * ing.grams / 100).toFixed(3)}
   Allergens: ${ing.allergens.length > 0 ? ing.allergens.join(', ') : 'None'}`)
        .join('\n\n')
    : 'No ingredients specified'}

===========================================
NUTRITION FACTS (per ${productData.servingSize || '100'}g serving)
===========================================
Energy: ${nutrition.energy.toFixed(0)} kcal (${dailyVals.calories.toFixed(1)}% DV)
Fat: ${nutrition.fat.toFixed(1)}g (${dailyVals.fat.toFixed(1)}% DV)
  - Saturated Fat: ${nutrition.saturatedFat.toFixed(1)}g (${dailyVals.saturatedFat.toFixed(1)}% DV)
  - Trans Fat: ${nutrition.transFat.toFixed(2)}g
Carbohydrates: ${nutrition.carbohydrates.toFixed(1)}g (${dailyVals.carbs.toFixed(1)}% DV)
  - Sugars: ${nutrition.sugars.toFixed(1)}g (${dailyVals.sugars.toFixed(1)}% DV)
  - Fiber: ${nutrition.fiber.toFixed(1)}g (${dailyVals.fiber.toFixed(1)}% DV)
Protein: ${nutrition.protein.toFixed(1)}g (${dailyVals.protein.toFixed(1)}% DV)
Salt: ${nutrition.salt.toFixed(2)}g (${dailyVals.salt.toFixed(1)}% DV)

===========================================
VITAMINS & MINERALS (per serving)
===========================================
Calcium: ${nutrition.calcium.toFixed(0)}mg (${dailyVals.calcium.toFixed(1)}% DV)
Iron: ${nutrition.iron.toFixed(1)}mg (${dailyVals.iron.toFixed(1)}% DV)
Vitamin A: ${nutrition.vitaminA.toFixed(0)}µg (${dailyVals.vitaminA.toFixed(1)}% DV)
Vitamin C: ${nutrition.vitaminC.toFixed(0)}mg (${dailyVals.vitaminC.toFixed(1)}% DV)
Sodium: ${nutrition.sodium.toFixed(0)}mg
Potassium: ${nutrition.potassium.toFixed(0)}mg

===========================================
ALLERGEN INFORMATION
===========================================
Contains: ${getAllergens().length > 0 ? getAllergens().join(', ') : 'No allergens detected'}

===========================================
NUTRITIONAL CLAIMS
===========================================
${productData.nutritionalClaims.length > 0 
    ? productData.nutritionalClaims.map(id => {
        const claim = nutritionalClaims.find(c => c.id === id);
        return claim ? `✓ ${claim.label} (${claim.arabic}) - ${claim.criteria}` : '';
    }).filter(Boolean).join('\n')
    : 'No nutritional claims specified'}

===========================================
DATES & STORAGE
===========================================
Production Date: ${productData.productionDate || 'Not specified'}
Expiry Date: ${productData.expiryDate || 'Not specified'}
Shelf Life: ${productData.shelfLife || 'Not specified'} months
Storage Instructions (EN): ${productData.storageInstructions.english || 'Not specified'}
Storage Instructions (AR): ${productData.storageInstructions.arabic || 'Not specified'}

===========================================
COST ANALYSIS
===========================================
Cost per serving: $${cost.toFixed(3)}
Total recipe cost: $${(cost * parseFloat(productData.servingsPerPackage || 1)).toFixed(3)}
Most expensive ingredient: ${productData.ingredients.length > 0 
    ? productData.ingredients.reduce((max, ing) => 
        ((ing.cost || 0) * ing.grams / 100) > ((max.cost || 0) * max.grams / 100) ? ing : max
    ).name 
    : 'N/A'}

===========================================
COMPLIANCE INFORMATION
===========================================
Label Format: ${currentFormat}
Region: ${labelFormats.find(f => f.value === labelFormat)?.region}
Description: ${labelFormats.find(f => f.value === labelFormat)?.description}
Requirements: ${labelFormats.find(f => f.value === labelFormat)?.requirements?.join(', ')}

===========================================
VALIDATION STATUS
===========================================
${validationErrors.length === 0 
    ? '✓ All validation checks passed - Label is compliant'
    : `❌ ${validationErrors.length} validation errors found:\n${validationErrors.map(err => `  - ${err}`).join('\n')}`}

===========================================
ADVANCED SETTINGS
===========================================
Show Daily Values: ${advancedSettings.showDailyValues ? 'Yes' : 'No'}
Show Calorie Breakdown: ${advancedSettings.showCalorieBreakdown ? 'Yes' : 'No'}
Show Nutritional Score: ${advancedSettings.showNutritionalScore ? 'Yes' : 'No'}
Include Barcode: ${advancedSettings.includeBarcode ? 'Yes' : 'No'}
Label Orientation: ${advancedSettings.labelOrientation}
Font Size: ${advancedSettings.fontSize}
Rounding Rules: ${advancedSettings.roundingRules}

===========================================
TECHNICAL DETAILS
===========================================
Generated by: Professional Nutrition Label Generator
Tier: ${currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
Export #: ${Math.floor(Math.random() * 1000)}
File Format: Text Report (.txt)
Total Ingredients: ${productData.ingredients.length}
Total Weight: ${productData.ingredients.reduce((sum, ing) => sum + ing.grams, 0).toFixed(1)}g

===========================================
DISCLAIMER
===========================================
This nutrition label was generated using calculated values based on ingredient data.
For commercial use, please verify all calculations and ensure compliance with local regulations.
Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower.

Report End - ${new Date().toISOString()}
            `;

            // Create and download the file
            const element = document.createElement('a');
            const file = new Blob([labelContent], { type: 'text/plain;charset=utf-8' });
            element.href = URL.createObjectURL(file);
            element.download = `nutrition-label-${productData.productName.english?.replace(/[^a-z0-9]/gi, '_') || 'product'}-${labelFormat}-${new Date().toISOString().split('T')[0]}.txt`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            URL.revokeObjectURL(element.href);

            alert('✅ Label downloaded successfully! The file contains a comprehensive nutrition report with all calculations and compliance information.');

        } catch (error) {
            console.error('Error generating file:', error);
            alert('❌ Error generating file. Please try again.');
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    // Validate form and update errors
    useEffect(() => {
        const errors = [];
        const nutrition = calculateTotalNutrition();

        // Required field validation
        if (!productData.productName.english) errors.push('Product name (English) is required');
        if (!productData.company.english) errors.push('Company name (English) is required');
        if (productData.ingredients.length === 0) errors.push('At least one ingredient is required');

        // Nutritional claims validation
        const claimErrors = validateNutritionalClaims(nutrition);
        errors.push(...claimErrors);

        // Format-specific validation
        if (labelFormat.startsWith('GSO') && !productData.productName.arabic) {
            errors.push('Arabic product name required for GSO format');
        }

        setValidationErrors(errors);
    }, [productData, labelFormat]);

    const isFeatureAvailable = (feature) => {
        return tierLimitations[currentTier].features.includes(feature) ||
            tierLimitations[currentTier].features.includes('all');
    };

    const nutrition = calculateTotalNutrition();
    const dailyValues = calculateDailyValues(nutrition);
    const allAllergens = getAllergens();
    const costPerServing = calculateCostPerServing();

    return (
        <div className="label-generator">
            {/* Header Section */}
            <div className="generator-header">
                <div className="container">
                    <div className="header-content">
                        <h1 className="header-title">
                            Professional Nutrition Label Generator
                            <span className="title-highlight">Calculate • Generate • Comply • Export</span>
                        </h1>
                        <p className="header-description">
                            Create compliant nutrition labels with detailed ingredient breakdown, automatic calculations, and professional PDF export
                        </p>

                        {/* Tier Selector */}
                        <div className="tier-selector">
                            <div className="tier-tabs">
                                {Object.keys(tierLimitations).map(tier => (
                                    <button
                                        key={tier}
                                        className={`tier-tab ${currentTier === tier ? 'active' : ''}`}
                                        onClick={() => setCurrentTier(tier)}
                                    >
                                        {tier.charAt(0).toUpperCase() + tier.slice(1)}
                                        {tier === 'test' && <span className="tier-badge">Free</span>}
                                    </button>
                                ))}
                            </div>
                            <div className="tier-info">
                                <span className="tier-limit">
                                    {tierLimitations[currentTier].products === 'unlimited'
                                        ? 'Unlimited products'
                                        : `${tierLimitations[currentTier].products} products`}
                                    • {tierLimitations[currentTier].exports === 'unlimited'
                                        ? 'Unlimited exports'
                                        : `${tierLimitations[currentTier].exports} exports`}
                                    • {tierLimitations[currentTier].duration}
                                </span>
                            </div>
                        </div>

                        {/* Validation Status */}
                        {validationErrors.length > 0 && (
                            <div className="validation-status error">
                                <div className="status-icon">
                                    <AlertTriangle size={24} />
                                </div>
                                <div className="status-content">
                                    <h3>Validation Issues ({validationErrors.length})</h3>
                                    <ul>
                                        {validationErrors.slice(0, 3).map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                    {validationErrors.length > 3 && (
                                        <p>+{validationErrors.length - 3} more issues</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="generator-content">
                <div className="container">
                    <div className="content-grid">
                        {/* Form Section */}
                        <div className="form-section">
                            <div className="form-container">
                                {/* Tab Navigation */}
                                <div className="tab-navigation">
                                    <button
                                        className={`tab-btn ${activeTab === 'label' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('label')}
                                    >
                                        <span className="tab-icon">
                                            <FileText size={16} />
                                        </span>
                                        Label Setup
                                    </button>
                                    <button
                                        className={`tab-btn ${activeTab === 'breakdown' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('breakdown')}
                                    >
                                        <span className="tab-icon">
                                            <BarChart3 size={16} />
                                        </span>
                                        Nutrition Breakdown
                                    </button>
                                    <button
                                        className={`tab-btn ${activeTab === 'advanced' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('advanced')}
                                        disabled={!isFeatureAvailable('analytics')}
                                    >
                                        <span className="tab-icon">
                                            <Settings size={16} />
                                        </span>
                                        Advanced
                                    </button>
                                </div>

                                {activeTab === 'label' && (
                                    <div className="label-setup">
                                        <h2 className="section-title">Product Information</h2>

                                        {/* Label Format Selector */}
                                        <div className="form-group">
                                            <label className="form-label">
                                                Label Format
                                                <span className="label-info">Choose compliance standard</span>
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
                                                <Globe size={16} /> English
                                            </button>
                                            <button
                                                className={`lang-btn ${activeLanguage === 'arabic' ? 'active' : ''}`}
                                                onClick={() => setActiveLanguage('arabic')}
                                            >
                                                <Globe size={16} /> العربية
                                            </button>
                                        </div>

                                        {/* Product Name */}
                                        <div className="form-group">
                                            <label className="form-label">Product Name *</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder={activeLanguage === 'english' ? 'Enter product name' : 'أدخل اسم المنتج'}
                                                value={productData.productName[activeLanguage]}
                                                onChange={(e) => handleInputChange('productName', e.target.value, activeLanguage)}
                                                dir={activeLanguage === 'arabic' ? 'rtl' : 'ltr'}
                                                required
                                            />
                                        </div>

                                        {/* Company Name */}
                                        <div className="form-group">
                                            <label className="form-label">Company Name *</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder={activeLanguage === 'english' ? 'Enter company name' : 'أدخل اسم الشركة'}
                                                value={productData.company[activeLanguage]}
                                                onChange={(e) => handleInputChange('company', e.target.value, activeLanguage)}
                                                dir={activeLanguage === 'arabic' ? 'rtl' : 'ltr'}
                                                required
                                            />
                                        </div>

                                        {/* Logo Upload */}
                                        <div className="form-group">
                                            <label className="form-label">Company Logo</label>
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
                                                            <span>Upload Logo</span>
                                                        </div>
                                                    )}
                                                </label>
                                            </div>
                                        </div>

                                        {/* Serving Information */}
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">Serving Size (grams) *</label>
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
                                                <label className="form-label">Servings per Package</label>
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
                                                <label className="form-label">Batch Number</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="e.g., B2024001"
                                                    value={productData.batchNumber}
                                                    onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Barcode (EAN-13)</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="1234567890123"
                                                    value={productData.barcode}
                                                    onChange={(e) => handleInputChange('barcode', e.target.value)}
                                                    maxLength="13"
                                                />
                                            </div>
                                        </div>

                                        {/* Add Ingredient Section */}
                                        <div className="add-ingredient-section">
                                            <h3 className="subsection-title">Add Ingredients *</h3>
                                            <IngredientAdder
                                                ingredients={mockIngredients}
                                                recentIngredients={recentIngredients}
                                                onAddIngredient={addIngredient}
                                                activeLanguage={activeLanguage}
                                            />
                                        </div>

                                        {/* Nutritional Claims */}
                                        {isFeatureAvailable('validation') && (
                                            <div className="nutritional-claims-section">
                                                <h3 className="subsection-title">Nutritional Claims</h3>
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
                                                        <Calendar size={16} /> Production Date
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
                                                        <Calendar size={16} /> Expiry Date
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
                                                    <Clock size={16} /> Shelf Life (months)
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
                                            <label className="form-label">Storage Instructions</label>
                                            <textarea
                                                className="form-textarea"
                                                placeholder={activeLanguage === 'english'
                                                    ? 'e.g., Store in a cool, dry place'
                                                    : 'مثال: يحفظ في مكان بارد وجاف'}
                                                value={productData.storageInstructions[activeLanguage]}
                                                onChange={(e) => handleInputChange('storageInstructions', e.target.value, activeLanguage)}
                                                dir={activeLanguage === 'arabic' ? 'rtl' : 'ltr'}
                                                rows="2"
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'breakdown' && (
                                    <div className="nutrition-breakdown">
                                        <h2 className="section-title">Nutrition Breakdown</h2>

                                        {/* Recipe Tools */}
                                        {productData.ingredients.length > 0 && (
                                            <div className="recipe-tools">
                                                <h3 className="subsection-title">Recipe Tools</h3>
                                                <div className="tools-row">
                                                    <button
                                                        className="tool-btn"
                                                        onClick={() => scaleRecipe(0.5)}
                                                        title="Scale recipe by 50%"
                                                    >
                                                        <TrendingUp size={16} /> Scale 50%
                                                    </button>
                                                    <button
                                                        className="tool-btn"
                                                        onClick={() => scaleRecipe(2)}
                                                        title="Double recipe"
                                                    >
                                                        <Maximize size={16} /> Double
                                                    </button>
                                                    <div className="cost-display">
                                                        <DollarSign size={16} /> ${costPerServing.toFixed(2)}/serving
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Ingredients List */}
                                        <div className="ingredients-list">
                                            <h3 className="subsection-title">
                                                Recipe Ingredients ({productData.ingredients.length})
                                            </h3>

                                            {productData.ingredients.length === 0 ? (
                                                <div className="empty-state">
                                                    <Package size={48} />
                                                    <p>No ingredients added yet</p>
                                                    <button
                                                        className="btn-secondary"
                                                        onClick={() => setActiveTab('label')}
                                                    >
                                                        Add Ingredients
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="breakdown-table">
                                                    <div className="table-header">
                                                        <div className="col-ingredient">Ingredient</div>
                                                        <div className="col-amount">Grams</div>
                                                        <div className="col-percent">%</div>
                                                        <div className="col-calories">Calories</div>
                                                        <div className="col-fat">Fat (g)</div>
                                                        <div className="col-carbs">Carbs (g)</div>
                                                        <div className="col-protein">Protein (g)</div>
                                                        <div className="col-cost">Cost ($)</div>
                                                        <div className="col-actions">Actions</div>
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
                                                            />
                                                        ))}

                                                    {/* Totals Row */}
                                                    <div className="table-row totals-row">
                                                        <div className="col-ingredient">
                                                            <strong>Totals</strong>
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
                                                            <em>Per {productData.servingSize}g serving</em>
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
                                                <h3 className="subsection-title">Nutritional Analysis</h3>
                                                <div className="summary-grid">
                                                    <div className="summary-card energy">
                                                        <div className="card-header">
                                                            <span className="card-icon">
                                                                <Zap size={20} />
                                                            </span>
                                                            <span className="card-title">Energy</span>
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
                                                            <span className="card-title">Macros</span>
                                                        </div>
                                                        <div className="macro-breakdown">
                                                            <div className="macro-item">
                                                                <span>Carbs: {nutrition.carbohydrates.toFixed(1)}g</span>
                                                                <div className="macro-bar">
                                                                    <div
                                                                        className="macro-fill carbs"
                                                                        style={{ width: `${(nutrition.carbohydrates * 4 / nutrition.energy * 100)}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                            <div className="macro-item">
                                                                <span>Protein: {nutrition.protein.toFixed(1)}g</span>
                                                                <div className="macro-bar">
                                                                    <div
                                                                        className="macro-fill protein"
                                                                        style={{ width: `${(nutrition.protein * 4 / nutrition.energy * 100)}%` }}
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                            <div className="macro-item">
                                                                <span>Fat: {nutrition.fat.toFixed(1)}g</span>
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
                                                            <span className="card-title">Health Score</span>
                                                        </div>
                                                        <div className="health-score">
                                                            {calculateHealthScore(nutrition)}
                                                        </div>
                                                        <div className="card-subtitle">
                                                            Based on nutrition density
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Allergens Summary */}
                                        {allAllergens.length > 0 && (
                                            <div className="allergens-summary">
                                                <h3 className="subsection-title">Detected Allergens</h3>
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
                                )}

                                {activeTab === 'advanced' && isFeatureAvailable('analytics') && (
                                    <div className="advanced-settings">
                                        <h2 className="section-title">Advanced Settings</h2>

                                        {/* Display Options */}
                                        <div className="settings-group">
                                            <h3 className="subsection-title">Display Options</h3>
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
                                                    <span>Show Daily Values (%DV)</span>
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
                                                    <span>Show Calorie Breakdown</span>
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
                                                    <span>Show Nutritional Score</span>
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
                                                    <span>Include Barcode</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Label Customization */}
                                        <div className="settings-group">
                                            <h3 className="subsection-title">Label Customization</h3>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label className="form-label">Font Size</label>
                                                    <select
                                                        className="form-select"
                                                        value={advancedSettings.fontSize}
                                                        onChange={(e) => setAdvancedSettings(prev => ({
                                                            ...prev,
                                                            fontSize: e.target.value
                                                        }))}
                                                    >
                                                        <option value="small">Small</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="large">Large</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Orientation</label>
                                                    <select
                                                        className="form-select"
                                                        value={advancedSettings.labelOrientation}
                                                        onChange={(e) => setAdvancedSettings(prev => ({
                                                            ...prev,
                                                            labelOrientation: e.target.value
                                                        }))}
                                                    >
                                                        <option value="portrait">Portrait</option>
                                                        <option value="landscape">Landscape</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Validation Settings */}
                                        <div className="settings-group">
                                            <h3 className="subsection-title">Validation & Compliance</h3>
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
                                                        <span className="success-text">All validation checks passed</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Preview Section */}
                        <div className="preview-section">
                            <div className="preview-container">
                                <div className="preview-header">
                                    <h2 className="section-title">Live Preview</h2>
                                    <div className="preview-actions">
                                        <button
                                            className={`action-btn ${isGeneratingPDF ? 'loading' : ''}`}
                                            onClick={downloadLabel}
                                            disabled={!isFeatureAvailable('pdf') || isGeneratingPDF || validationErrors.length > 0}
                                        >
                                            {isGeneratingPDF ? (
                                                <>
                                                    <div className="spinner"></div>
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <Download size={18} />
                                                    Download Report
                                                </>
                                            )}
                                        </button>
                                        {validationErrors.length > 0 && (
                                            <div className="action-warning">
                                                Fix validation errors to enable download
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
                                />

                                {/* Quick Stats */}
                                {productData.ingredients.length > 0 && (
                                    <div className="quick-stats">
                                        <div className="stat-item">
                                            <span className="stat-label">Calories/serving</span>
                                            <span className="stat-value">{nutrition.energy.toFixed(0)}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Cost/serving</span>
                                            <span className="stat-value">${costPerServing.toFixed(2)}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Allergens</span>
                                            <span className="stat-value">{allAllergens.length}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Health Score</span>
                                            <span className="stat-value">{calculateHealthScore(nutrition)}/100</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <canvas ref={barcodeRef} style={{ display: 'none' }} />
        </div>
    );
};

// Helper function to calculate health score
const calculateHealthScore = (nutrition) => {
    let score = 50; // Base score

    // Positive factors
    if (nutrition.fiber > 5) score += 15;
    if (nutrition.protein > 10) score += 10;
    if (nutrition.vitaminC > 10) score += 5;
    if (nutrition.vitaminA > 100) score += 5;

    // Negative factors
    if (nutrition.saturatedFat > 5) score -= 10;
    if (nutrition.sugars > 15) score -= 10;
    if (nutrition.sodium > 400) score -= 10;
    if (nutrition.transFat > 0.1) score -= 15;

    return Math.max(0, Math.min(100, Math.round(score)));
};

// Enhanced Ingredient Adder Component
const IngredientAdder = ({ ingredients, recentIngredients, onAddIngredient, activeLanguage }) => {
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
                        placeholder="Search ingredients by name, category..."
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
                        <option value="">Select ingredient</option>
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
                    placeholder="Grams"
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
                    <Plus size={16} /> Add
                </button>
            </div>

            {/* Recent Ingredients */}
            {recentIngredients.length > 0 && (
                <div className="recent-ingredients">
                    <span className="recent-label">Recent:</span>
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

// Enhanced Ingredient Row Component
const IngredientRow = ({ ingredient, onUpdateAmount, onRemove, activeLanguage }) => {
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
                        title="Remove ingredient"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
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
    settings
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
                    <h4>{isArabic ? 'القيم الغذائية' : 'Nutrition Facts'}</h4>
                    <p>
                        {isArabic ? `لكل ${productData.servingSize || '100'} جرام` : `Per ${productData.servingSize || '100'}g`}
                        {productData.servingsPerPackage && productData.servingsPerPackage !== '1' && (
                            <span className="servings-info">
                                ({productData.servingsPerPackage} {isArabic ? 'حصص' : 'servings'})
                            </span>
                        )}
                    </p>
                </div>

                <div className={`nutrition-table ${currentFormat.layout}`}>
                    <div className="nutrition-row energy">
                        <span>{isArabic ? 'الطاقة' : 'Energy'}</span>
                        <span>
                            {nutrition.energy.toFixed(0)} {isArabic ? 'سعرة حرارية' : 'kcal'}
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.calories.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    <div className="nutrition-row">
                        <span>{isArabic ? 'الدهون' : 'Fat'}</span>
                        <span>
                            {nutrition.fat.toFixed(1)}g
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.fat.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    <div className="nutrition-row sub-row">
                        <span>{isArabic ? '- منها المشبعة' : '- of which saturated'}</span>
                        <span>
                            {nutrition.saturatedFat.toFixed(1)}g
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.saturatedFat.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    {nutrition.transFat > 0.01 && (
                        <div className="nutrition-row sub-row trans-fat">
                            <span>{isArabic ? '- منها المتحولة' : '- trans fat'}</span>
                            <span>{nutrition.transFat.toFixed(2)}g</span>
                        </div>
                    )}
                    <div className="nutrition-row">
                        <span>{isArabic ? 'الكربوهيدرات' : 'Carbohydrates'}</span>
                        <span>
                            {nutrition.carbohydrates.toFixed(1)}g
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.carbs.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    <div className="nutrition-row sub-row">
                        <span>{isArabic ? '- منها السكريات' : '- of which sugars'}</span>
                        <span>
                            {nutrition.sugars.toFixed(1)}g
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.sugars.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    {nutrition.fiber > 0.1 && (
                        <div className="nutrition-row sub-row">
                            <span>{isArabic ? '- الألياف' : '- fiber'}</span>
                            <span>
                                {nutrition.fiber.toFixed(1)}g
                                {settings.showDailyValues && (
                                    <small className="daily-value"> {dailyValues.fiber.toFixed(0)}% DV</small>
                                )}
                            </span>
                        </div>
                    )}
                    <div className="nutrition-row">
                        <span>{isArabic ? 'البروتين' : 'Protein'}</span>
                        <span>
                            {nutrition.protein.toFixed(1)}g
                            {settings.showDailyValues && (
                                <small className="daily-value"> {dailyValues.protein.toFixed(0)}% DV</small>
                            )}
                        </span>
                    </div>
                    <div className="nutrition-row">
                        <span>{isArabic ? 'الملح' : 'Salt'}</span>
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
                                <span>{isArabic ? 'الفيتامينات والمعادن' : 'Vitamins & Minerals'}</span>
                            </div>
                            {nutrition.vitaminA > 10 && (
                                <div className="nutrition-row vitamin">
                                    <span>{isArabic ? 'فيتامين أ' : 'Vitamin A'}</span>
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
                                    <span>{isArabic ? 'فيتامين ج' : 'Vitamin C'}</span>
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
                                    <span>{isArabic ? 'الكالسيوم' : 'Calcium'}</span>
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
                                    <span>{isArabic ? 'الحديد' : 'Iron'}</span>
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
                <h4>{isArabic ? 'المكونات:' : 'Ingredients:'}</h4>
                <p>
                    {productData.ingredients.length > 0
                        ? productData.ingredients
                            .sort((a, b) => b.grams - a.grams)
                            .map(ing => isArabic ? ing.arabic : ing.name.split(',')[0])
                            .join(isArabic ? '، ' : ', ')
                        : (isArabic ? 'ستظهر قائمة المكونات هنا' : 'Ingredients list will appear here')
                    }
                </p>

                {allergens.length > 0 && (
                    <p className="allergens-text">
                        <strong>{isArabic ? 'يحتوي على:' : 'Contains:'}</strong> {allergens.join(isArabic ? '، ' : ', ')}
                    </p>
                )}
            </div>

            {/* Label Footer */}
            <div className="label-footer">
                <div className="dates">
                    {productData.productionDate && (
                        <p>{isArabic ? 'تاريخ الإنتاج:' : 'Production:'} {productData.productionDate}</p>
                    )}
                    {productData.expiryDate && (
                        <p>{isArabic ? 'يُفضل استخدامه قبل:' : 'Best before:'} {productData.expiryDate}</p>
                    )}
                    {productData.shelfLife && (
                        <p>{isArabic ? 'مدة الصلاحية:' : 'Shelf life:'} {productData.shelfLife} {isArabic ? 'شهراً' : 'months'}</p>
                    )}
                </div>

                {productData.storageInstructions[language] && (
                    <p className="storage">
                        {isArabic ? 'التخزين:' : 'Storage:'} {productData.storageInstructions[language]}
                    </p>
                )}

                <div className="label-footer-codes">
                    {isFeatureAvailable('qr') && (
                        <div className="qr-section">
                            <canvas className="qr-code" width="50" height="50" />
                            <p>{isArabic ? 'امسح للمزيد من المعلومات' : 'Scan for more info'}</p>
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
                                ? '* النسبة المئوية للقيم اليومية تعتمد على نظام غذائي من 2000 سعرة حرارية'
                                : '* Percent Daily Values are based on a 2,000 calorie diet'
                            }
                        </small>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LabelGenerator;