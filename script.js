// Global variables
let categoriesData = {};
let selectedCategory = null;
let selectedSubcategory = null;
let selectedOutputType = null;

// Load categories data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
});

// Load categories from JSON file
async function loadCategories() {
    try {
        const response = await fetch('data/categories.json');
        categoriesData = await response.json();
        console.log('Categories loaded:', categoriesData);
        displayCategories();
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Display categories in Step 1
function displayCategories() {
    const step1 = document.getElementById('step1');
    
    let html = `
        <h2>Step 1: Choose Category</h2>
        <p>Select a category for your visual asset</p>
        <div class="categories-grid">
    `;
    
    categoriesData.categories.forEach(category => {
        html += `
            <button class="category-btn" onclick="selectCategory(${category.id})">
                ${category.name}
            </button>
        `;
    });
    
    html += `</div>`;
    step1.innerHTML = html;
}

// Handle category selection
function selectCategory(categoryId) {
    selectedCategory = categoriesData.categories.find(cat => cat.id === categoryId);
    console.log('Selected category:', selectedCategory);
    
    // Show Step 2
    showStep2();
}

// Show Step 2 - Subcategories
function showStep2() {
    const stepsContainer = document.querySelector('.generator-steps');
    
    let html = `
        <div class="step" id="step1">
            <h2>Step 1: Choose Category ✓</h2>
            <p>Selected: <strong>${selectedCategory.name}</strong></p>
        </div>
        <div class="step active" id="step2">
            <h2>Step 2: Choose Subcategory</h2>
            <p>Select a specific asset type</p>
            <div class="subcategories-grid">
    `;
    
    selectedCategory.subcategories.forEach(sub => {
        html += `
            <button class="subcategory-btn" onclick="selectSubcategory(${sub.id})">
                ${sub.name}
            </button>
        `;
    });
    
    html += `</div></div>`;
    stepsContainer.innerHTML = html;
}

// Handle subcategory selection
function selectSubcategory(subcategoryId) {
    selectedSubcategory = selectedCategory.subcategories.find(sub => sub.id === subcategoryId);
    console.log('Selected subcategory:', selectedSubcategory);
    
    // Show Step 3
    showStep3();
}

// Show Step 3 - Output Types
function showStep3() {
    const stepsContainer = document.querySelector('.generator-steps');
    
    let html = `
        <div class="step" id="step1">
            <h2>Step 1: Choose Category ✓</h2>
            <p>Selected: <strong>${selectedCategory.name}</strong></p>
        </div>
        <div class="step" id="step2">
            <h2>Step 2: Choose Subcategory ✓</h2>
            <p>Selected: <strong>${selectedSubcategory.name}</strong></p>
        </div>
        <div class="step active" id="step3">
            <h2>Step 3: Choose Output Type</h2>
            <p>Select the type of output you want</p>
            <div class="output-types-grid">
    `;
    
    selectedSubcategory.outputTypes.forEach(type => {
        html += `
            <button class="output-type-btn" onclick="selectOutputType('${type}')">
                ${type}
            </button>
        `;
    });
    
    html += `</div></div>`;
    stepsContainer.innerHTML = html;
}

// Handle output type selection
function selectOutputType(outputType) {
    selectedOutputType = outputType;
    console.log('Selected output type:', selectedOutputType);
    
    // Show Step 4
    showStep4();
}

// Show Step 4 - Generate Brief
function showStep4() {
    const stepsContainer = document.querySelector('.generator-steps');
    
    let html = `
        <div class="step" id="step1">
            <h2>Step 1: Choose Category ✓</h2>
            <p>Selected: <strong>${selectedCategory.name}</strong></p>
        </div>
        <div class="step" id="step2">
            <h2>Step 2: Choose Subcategory ✓</h2>
            <p>Selected: <strong>${selectedSubcategory.name}</strong></p>
        </div>
        <div class="step" id="step3">
            <h2>Step 3: Choose Output Type ✓</h2>
            <p>Selected: <strong>${selectedOutputType}</strong></p>
        </div>
        <div class="step active" id="step4">
            <h2>Step 4: Generate Brief</h2>
            <p>AI will generate a random brief for your selection</p>
            <button class="generate-btn" onclick="generateBrief()">
                🎲 Generate Random Brief
            </button>
        </div>
    `;
    
    stepsContainer.innerHTML = html;
}

// Generate random brief (placeholder for now)
function generateBrief() {
    console.log('Generating brief for:', {
        category: selectedCategory.name,
        subcategory: selectedSubcategory.name,
        outputType: selectedOutputType
    });
    
    alert('Brief generation will be implemented in next step!');
}
