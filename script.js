// Global variables
let categoriesData = {};
let briefTemplates = {};
let selectedCategory = null;
let selectedSubcategory = null;
let selectedOutputType = null;
let currentBrief = '';

// Load data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadBriefTemplates();
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

// Load brief templates
async function loadBriefTemplates() {
    try {
        const response = await fetch('./data/brief-templates.json');
        briefTemplates = await response.json();
        console.log('Brief templates loaded successfully');
    } catch (error) {
        console.error('Error loading brief templates:', error);
        // Fallback jika gagal load
        briefTemplates = {
            'social-media': {
                'instagram-post': [
                    'Create an engaging Instagram post for a modern brand launching their new product. Focus on lifestyle photography with warm, natural lighting.'
                ]
            }
        };
    }
}

// Random placeholders untuk brief templates
const placeholders = {
    brand_type: ['fashion', 'tech', 'food', 'lifestyle', 'fitness', 'beauty', 'travel', 'education'],
    product_category: ['clothing', 'gadgets', 'supplements', 'accessories', 'books', 'software', 'services'],
    age_group: ['young adults', 'millennials', 'Gen Z', 'professionals', 'seniors', 'teenagers'],
    gender: ['person', 'woman', 'man', 'individual'],
    location_type: ['urban', 'outdoor', 'home', 'office', 'studio', 'natural'],
    business_type: ['startup', 'restaurant', 'consulting firm', 'retail store', 'agency', 'clinic'],
    color_scheme: ['warm earth tones', 'cool blues and whites', 'vibrant rainbow', 'monochrome', 'pastel colors'],
    number: ['3', '5', '7', '10'],
    discount_percentage: ['20', '30', '50', '70'],
    season: ['Spring', 'Summer', 'Fall', 'Winter'],
    event_type: ['conference', 'workshop', 'product launch', 'webinar', 'networking event'],
    industry: ['technology', 'healthcare', 'finance', 'education', 'retail', 'manufacturing'],
    target_audience: ['young professionals', 'small business owners', 'students', 'families', 'entrepreneurs']
};

// Function untuk replace placeholders dengan random values
function replacePlaceholders(template) {
    let result = template;
    
    // Find all placeholders in format {placeholder_name}
    const matches = template.match(/\{([^}]+)\}/g);
    
    if (matches) {
        matches.forEach(match => {
            const key = match.slice(1, -1); // Remove { and }
            if (placeholders[key]) {
                const randomValue = placeholders[key][Math.floor(Math.random() * placeholders[key].length)];
                result = result.replace(match, randomValue);
            }
        });
    }
    
    return result;
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
            <p>Selected: <strong>${selectedCategory.name}</strong> 
            <button class="back-btn" onclick="resetToStep1()">Change</button></p>
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
            <p>Selected: <strong>${selectedCategory.name}</strong> 
            <button class="back-btn" onclick="resetToStep1()">Change</button></p>
        </div>
        <div class="step" id="step2">
            <h2>Step 2: Choose Subcategory ✓</h2>
            <p>Selected: <strong>${selectedSubcategory.name}</strong> 
            <button class="back-btn" onclick="goBackToStep2()">Change</button></p>
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
            <p>Selected: <strong>${selectedCategory.name}</strong> 
            <button class="back-btn" onclick="resetToStep1()">Change</button></p>
        </div>
        <div class="step" id="step2">
            <h2>Step 2: Choose Subcategory ✓</h2>
            <p>Selected: <strong>${selectedSubcategory.name}</strong> 
            <button class="back-btn" onclick="goBackToStep2()">Change</button></p>
        </div>
        <div class="step" id="step3">
            <h2>Step 3: Choose Output Type ✓</h2>
            <p>Selected: <strong>${selectedOutputType}</strong> 
            <button class="back-btn" onclick="goBackToStep3()">Change</button></p>
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

// Main function untuk generate brief
function generateBrief() {
    console.log('Generating brief for:', {
        category: selectedCategory.name,
        subcategory: selectedSubcategory.name,
        outputType: selectedOutputType
    });
    
    // Generate client scenario brief dengan 3 bagian
    currentBrief = `Generate random detailed client scenario:

* Category: ${selectedCategory.name}
* Subcategory: ${selectedSubcategory.name}
* Output Type: ${selectedOutputType}

Create realistic client case with:
* Random client name & industry
* Specific detailed project context
* Exact requirements as freelancer needs
* All relevant business details

---

You are a professional AI prompt engineer. Based on the detailed client briefing above, create a comprehensive generation prompt for: **${selectedOutputType}**

[Master template yang smart - adjust content berdasarkan Output Type yang diinput]
IF Output Type = Image → focus on visual specifications  
IF Output Type = Design Structure/Layout → focus on layout requirements
IF Output Type = Code-based Graphics → focus on technical specs
IF Output Type = Data Visualization → focus on data presentation
[Universal professional prompt engineering guidelines]

---

Based on the prompt specifications above, generate the **${selectedOutputType}** now.`;
    
    console.log('Generated brief:', currentBrief);
    displayGeneratedBrief();
}

// Function untuk display generated brief
function displayGeneratedBrief() {
    const stepsContainer = document.querySelector('.generator-steps');
    
    let html = `
        <div class="step" id="step1">
            <h2>Step 1: Choose Category ✓</h2>
            <p>Selected: <strong>${selectedCategory.name}</strong> 
            <button class="back-btn" onclick="resetToStep1()">Change</button></p>
        </div>
        <div class="step" id="step2">
            <h2>Step 2: Choose Subcategory ✓</h2>
            <p>Selected: <strong>${selectedSubcategory.name}</strong> 
            <button class="back-btn" onclick="goBackToStep2()">Change</button></p>
        </div>
        <div class="step" id="step3">
            <h2>Step 3: Choose Output Type ✓</h2>
            <p>Selected: <strong>${selectedOutputType}</strong> 
            <button class="back-btn" onclick="goBackToStep3()">Change</button></p>
        </div>
        <div class="step active" id="step4">
            <h2>Step 4: Generated Brief</h2>
            
            <!-- Section 1: Client Scenario -->
            <div class="brief-section">
                <h3>📋 Client Briefing</h3>
                <div class="brief-content">
                    <p>Generate random detailed client scenario:</p>
                    <ul>
                        <li><strong>Category:</strong> ${selectedCategory.name}</li>
                        <li><strong>Subcategory:</strong> ${selectedSubcategory.name}</li>
                        <li><strong>Output Type:</strong> ${selectedOutputType}</li>
                    </ul>
                    <p>Create realistic client case with:</p>
                    <ul>
                        <li>Random client name & industry</li>
                        <li>Specific detailed project context</li>
                        <li>Exact requirements as freelancer needs</li>
                        <li>All relevant business details</li>
                    </ul>
                </div>
            </div>

            <!-- Section 2: Prompt Engineering -->
            <div class="brief-section">
                <h3>🔧 Prompt Engineering</h3>
                <div class="brief-content">
                    <p>You are a professional AI prompt engineer. Based on the detailed client briefing above, create a comprehensive generation prompt for: <strong>${selectedOutputType}</strong></p>
                    <p>[Master template yang smart - adjust content berdasarkan Output Type yang diinput]</p>
                    <ul>
                        <li>IF Output Type = Image → focus on visual specifications</li>
                        <li>IF Output Type = Design Structure/Layout → focus on layout requirements</li>
                        <li>IF Output Type = Code-based Graphics → focus on technical specs</li>
                        <li>IF Output Type = Data Visualization → focus on data presentation</li>
                    </ul>
                    <p>[Universal professional prompt engineering guidelines]</p>
                </div>
            </div>

            <!-- Section 3: Final Generation -->
            <div class="brief-section">
                <h3>⚡ Final Generation</h3>
                <div class="brief-content">
                    <p>Based on the prompt specifications above, generate the <strong>${selectedOutputType}</strong> now.</p>
                </div>
            </div>

            <div class="button-group">
                <button class="btn btn-secondary" onclick="regenerateBrief()">
                    🎲 Generate New Brief
                </button>
                <button class="btn btn-primary" onclick="proceedToPrompts()">
                    ✨ Generate Prompts
                </button>
                <button class="btn btn-back" onclick="showStep4()">
                    ← Back
                </button>
            </div>
        </div>
    `;
    
    stepsContainer.innerHTML = html;
}

// Function untuk regenerate brief
function regenerateBrief() {
    generateBrief();
}

// Function untuk proceed ke step 5 (prompt generation)
function proceedToPrompts() {
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
        <div class="step" id="step4">
            <h2>Step 4: Generated Brief ✓</h2>
            <p>Brief created successfully</p>
        </div>
        <div class="step active" id="step5">
            <h2>Step 5: AI Prompt Generation</h2>
            <div class="prompt-generation">
                <p>Generating 3 AI prompts based on your brief...</p>
                <div class="loading-animation">
                    <div class="spinner"></div>
                </div>
            </div>
            <div class="button-group">
                <button class="btn btn-back" onclick="goBackToBrief()">
                    ← Back to Brief
                </button>
            </div>
        </div>
    `;
    
    stepsContainer.innerHTML = html;
    
    // Simulate loading dan generate prompts
    setTimeout(generatePrompts, 2000);
}

// Function untuk kembali ke brief
function goBackToBrief() {
    displayGeneratedBrief();
}

// Placeholder function untuk generate prompts (Step 5)
function generatePrompts() {
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
        <div class="step" id="step4">
            <h2>Step 4: Generated Brief ✓</h2>
            <p>Brief created successfully</p>
        </div>
        <div class="step active" id="step5">
            <h2>Step 5: AI Prompt Options</h2>
            <p>Choose one of these AI prompts to create your visual asset:</p>
            <div class="prompt-options">
                <div class="prompt-option">
                    <h4>Option 1: Detailed Prompt</h4>
                    <p>Coming soon in next implementation...</p>
                </div>
                <div class="prompt-option">
                    <h4>Option 2: Creative Prompt</h4>
                    <p>Coming soon in next implementation...</p>
                </div>
                <div class="prompt-option">
                    <h4>Option 3: Simple Prompt</h4>
                    <p>Coming soon in next implementation...</p>
                </div>
            </div>
            <div class="button-group">
                <button class="btn btn-back" onclick="goBackToBrief()">
                    ← Back to Brief
                </button>
            </div>
        </div>
    `;
    
    stepsContainer.innerHTML = html;
}

// Reset to step 1
function resetToStep1() {
    selectedCategory = null;
    selectedSubcategory = null;
    selectedOutputType = null;
    displayCategories();
}

// Go back to previous step
function goBackToStep2() {
    selectedSubcategory = null;
    selectedOutputType = null;
    showStep2();
}

function goBackToStep3() {
    selectedOutputType = null;
    showStep3();
}
