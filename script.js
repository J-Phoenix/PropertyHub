// Real Estate Website JavaScript
// PropertyHub - Complete functionality

// Sample property data
const properties = [
    {
        id: 1,
        title: "Luxury Villa in Bhopal Hills",
        type: "buy",
        price: 450000,
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        location: "Bhopal Hills, Bhopal",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
        description: "Beautiful luxury villa with modern amenities, swimming pool, and garden. Perfect for families.",
        features: ["Swimming Pool", "Garden", "Garage", "Security", "Modern Kitchen"],
        agent: "Rajesh Kumar",
        phone: "+91 98765-43210"
    },
    {
        id: 2,
        title: "Modern Apartment Downtown",
        type: "rent",
        price: 25000,
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        location: "New Market, Bhopal",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        description: "Stylish 2-bedroom apartment in the heart of the city with all modern amenities.",
        features: ["Elevator", "Parking", "24/7 Security", "Gym", "Balcony"],
        agent: "Priya Sharma",
        phone: "+91 87654-32109"
    },
    {
        id: 3,
        title: "Family House with Garden",
        type: "buy",
        price: 320000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        location: "Arera Colony, Bhopal",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
        description: "Spacious family home with large garden, perfect for children and pets.",
        features: ["Large Garden", "Parking", "Storage Room", "Modern Kitchen", "Quiet Area"],
        agent: "Amit Patel",
        phone: "+91 76543-21098"
    },
    {
        id: 4,
        title: "Studio Apartment Near IT Park",
        type: "rent",
        price: 15000,
        bedrooms: 1,
        bathrooms: 1,
        area: 600,
        location: "IT Park, Bhopal",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
        description: "Compact studio apartment perfect for young professionals. Walking distance to IT companies.",
        features: ["Furnished", "High-speed Internet", "AC", "Parking", "24/7 Security"],
        agent: "Neha Singh",
        phone: "+91 65432-10987"
    },
    {
        id: 5,
        title: "Penthouse with City View",
        type: "buy",
        price: 750000,
        bedrooms: 4,
        bathrooms: 4,
        area: 3200,
        location: "DB City Mall, Bhopal",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
        description: "Luxurious penthouse with panoramic city views and premium finishes.",
        features: ["City View", "Premium Finishes", "Private Elevator", "Terrace Garden", "Jacuzzi"],
        agent: "Vikram Gupta",
        phone: "+91 54321-09876"
    },
    {
        id: 6,
        title: "Cozy 1BHK for Rent",
        type: "rent",
        price: 18000,
        bedrooms: 1,
        bathrooms: 1,
        area: 800,
        location: "MP Nagar, Bhopal",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        description: "Well-maintained 1BHK apartment in a peaceful residential area.",
        features: ["Furnished", "Parking", "Security", "Market Nearby", "Public Transport"],
        agent: "Sunita Jain",
        phone: "+91 43210-98765"
    }
];

// Current user data (in-memory storage)
let currentUser = null;
let filteredProperties = [...properties];
let currentPropertyType = 'buy';
let currentPage = 1;
const propertiesPerPage = 6;

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const propertyTypeButtons = document.querySelectorAll('.type-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const propertiesGrid = document.getElementById('propertiesGrid');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupEventListeners();
    renderProperties();
    updatePropertyTypeSelector();
    setupSmoothScrolling();
}

function setupEventListeners() {
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Property type selector
    propertyTypeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.dataset.type;
            setPropertyType(type);
        });
    });

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            setFilter(filter);
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function setPropertyType(type) {
    currentPropertyType = type;
    
    // Update button states
    propertyTypeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === type) {
            btn.classList.add('active');
        }
    });

    // Update price placeholder based on type
    const priceSelect = document.getElementById('priceRange');
    if (priceSelect) {
        priceSelect.innerHTML = type === 'rent' 
            ? `<option value="">Monthly Rent</option>
               <option value="0-20000">₹0 - ₹20k</option>
               <option value="20000-40000">₹20k - ₹40k</option>
               <option value="40000-60000">₹40k - ₹60k</option>
               <option value="60000+">₹60k+</option>`
            : `<option value="">Price Range</option>
               <option value="0-100000">₹0 - ₹1L</option>
               <option value="100000-300000">₹1L - ₹3L</option>
               <option value="300000-500000">₹3L - ₹5L</option>
               <option value="500000+">₹5L+</option>`;
    }

    filterProperties();
}

function setFilter(filter) {
    // Update filter button states
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });

    // Filter properties
    if (filter === 'all') {
        filteredProperties = [...properties];
    } else {
        filteredProperties = properties.filter(property => property.type === filter);
    }

    currentPage = 1;
    renderProperties();
}

function searchProperties() {
    const location = document.getElementById('locationInput').value.toLowerCase();
    const priceRange = document.getElementById('priceRange').value;
    const bedrooms = document.getElementById('bedrooms').value;

    filteredProperties = properties.filter(property => {
        let matches = true;

        // Location filter
        if (location && !property.location.toLowerCase().includes(location)) {
            matches = false;
        }

        // Price range filter
        if (priceRange && priceRange !== '') {
            const [min, max] = priceRange.includes('+') 
                ? [parseInt(priceRange.replace('+', '')), Infinity]
                : priceRange.split('-').map(p => parseInt(p));
            
            if (property.price < min || property.price > max) {
                matches = false;
            }
        }

        // Bedrooms filter
        if (bedrooms && property.bedrooms < parseInt(bedrooms)) {
            matches = false;
        }

        return matches;
    });

    currentPage = 1;
    renderProperties();
    
    // Scroll to properties section
    document.getElementById('properties').scrollIntoView({
        behavior: 'smooth'
    });

    showNotification(`Found ${filteredProperties.length} properties matching your criteria.`);
}

function filterProperties() {
    // Apply current filters
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    setFilter(activeFilter);
}

function renderProperties() {
    if (!propertiesGrid) return;

    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const propertiesToShow = filteredProperties.slice(0, endIndex);

    propertiesGrid.innerHTML = '';

    if (propertiesToShow.length === 0) {
        propertiesGrid.innerHTML = `
            <div class="no-properties">
                <i class="fas fa-home" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
                <h3>No Properties Found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }

    propertiesToShow.forEach(property => {
        const propertyCard = createPropertyCard(property);
        propertiesGrid.appendChild(propertyCard);
    });

    // Update load more button visibility
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = endIndex >= filteredProperties.length ? 'none' : 'block';
    }
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
        <div class="property-image">
            <img src="${property.image}" alt="${property.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Property+Image'">
            <div class="property-badge ${property.type}">${property.type === 'rent' ? 'For Rent' : 'For Sale'}</div>
            <div class="property-price">₹${formatPrice(property.price)}${property.type === 'rent' ? '/month' : ''}</div>
        </div>
        <div class="property-content">
            <h3>${property.title}</h3>
            <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
            <div class="property-details">
                <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                <span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                <span><i class="fas fa-expand-arrows-alt"></i> ${property.area} sq ft</span>
            </div>
            <div class="property-actions">
                <button class="view-btn" onclick="viewProperty(${property.id})">View Details</button>
                <button class="contact-btn" onclick="contactAgent('${property.agent}', '${property.phone}')">Contact Agent</button>
            </div>
        </div>
    `;
    return card;
}

function formatPrice(price) {
    if (price >= 100000) {
        return (price / 100000).toFixed(1) + 'L';
    } else if (price >= 1000) {
        return (price / 1000).toFixed(0) + 'k';
    }
    return price.toString();
}

function loadMoreProperties() {
    currentPage++;
    renderProperties();
}

function viewProperty(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    const modal = document.getElementById('propertyModal');
    const propertyDetail = document.getElementById('propertyDetail');

    propertyDetail.innerHTML = `
        <div class="property-detail-header">
            <img src="${property.image}" alt="${property.title}" onerror="this.src='https://via.placeholder.com/600x400?text=Property+Image'">
            <div class="property-detail-info">
                <h2>${property.title}</h2>
                <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <div class="property-price-large">₹${formatPrice(property.price)}${property.type === 'rent' ? '/month' : ''}</div>
                <div class="property-type-badge ${property.type}">${property.type === 'rent' ? 'For Rent' : 'For Sale'}</div>
            </div>
        </div>
        
        <div class="property-detail-content">
            <div class="property-description">
                <h3>Description</h3>
                <p>${property.description}</p>
            </div>
            
            <div class="property-specs">
                <h3>Property Details</h3>
                <div class="specs-grid">
                    <div class="spec-item">
                        <i class="fas fa-bed"></i>
                        <span>Bedrooms</span>
                        <strong>${property.bedrooms}</strong>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-bath"></i>
                        <span>Bathrooms</span>
                        <strong>${property.bathrooms}</strong>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-expand-arrows-alt"></i>
                        <span>Area</span>
                        <strong>${property.area} sq ft</strong>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-tag"></i>
                        <span>Type</span>
                        <strong>${property.type === 'rent' ? 'Rental' : 'Sale'}</strong>
                    </div>
                </div>
            </div>
            
            <div class="property-features">
                <h3>Features & Amenities</h3>
                <div class="features-list">
                    ${property.features.map(feature => `<span class="feature-tag"><i class="fas fa-check"></i> ${feature}</span>`).join('')}
                </div>
            </div>
            
            <div class="agent-info">
                <h3>Contact Agent</h3>
                <div class="agent-card">
                    <div class="agent-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="agent-details">
                        <h4>${property.agent}</h4>
                        <p>Licensed Real Estate Agent</p>
                        <div class="agent-contact">
                            <a href="tel:${property.phone}" class="contact-btn">
                                <i class="fas fa-phone"></i> Call Now
                            </a>
                            <button class="contact-btn secondary" onclick="scheduleViewing(${property.id})">
                                <i class="fas fa-calendar"></i> Schedule Viewing
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function contactAgent(agentName, phone) {
    if (confirm(`Contact ${agentName} at ${phone}?`)) {
        window.location.href = `tel:${phone}`;
    }
}

function scheduleViewing(propertyId) {
    if (!currentUser) {
        showNotification('Please login to schedule a viewing.', 'warning');
        openModal('loginModal');
        return;
    }
    
    const property = properties.find(p => p.id === propertyId);
    showNotification(`Viewing request sent for ${property.title}. Agent will contact you soon.`, 'success');
    closeModal('propertyModal');
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function switchToRegister() {
    closeModal('loginModal');
    openModal('registerModal');
}

function switchToLogin() {
    closeModal('registerModal');
    openModal('loginModal');
}

function showForgotPassword() {
    showNotification('Password reset link sent to your email!', 'info');
    closeModal('loginModal');
}

// Authentication Functions
function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const password = formData.get('password') || event.target.querySelector('input[type="password"]').value;

    // Simulate login (in real app, this would be an API call)
    if (email && password) {
        currentUser = {
            email: email,
            name: email.split('@')[0],
            loginTime: new Date()
        };
        
        updateUserInterface();
        closeModal('loginModal');
        showNotification(`Welcome back, ${currentUser.name}!`, 'success');
    } else {
        showNotification('Please fill in all fields.', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const inputs = event.target.querySelectorAll('input');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const phone = inputs[2].value;
    const password = inputs[3].value;
    const confirmPassword = inputs[4].value;

    if (!name || !email || !phone || !password || !confirmPassword) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
    }

    // Simulate registration
    currentUser = {
        name: name,
        email: email,
        phone: phone,
        registerTime: new Date()
    };

    updateUserInterface();
    closeModal('registerModal');
    showNotification(`Welcome to PropertyHub, ${currentUser.name}!`, 'success');
}

function updateUserInterface() {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn && currentUser) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
        loginBtn.onclick = () => logout();
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            loginBtn.innerHTML = 'Login';
            loginBtn.onclick = () => openModal('loginModal');
        }
        showNotification('Logged out successfully.', 'info');
    }
}

// Contact Form Handler
function handleContactForm(event) {
    event.preventDefault();
    const inputs = event.target.querySelectorAll('input, textarea');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const message = inputs[2].value;

    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    // Simulate form submission
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    event.target.reset();
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Smooth Scrolling Setup
function setupSmoothScrolling() {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Update property type selector based on current selection
function updatePropertyTypeSelector() {
    const activeBtn = document.querySelector('.type-btn.active');
    if (activeBtn) {
        currentPropertyType = activeBtn.dataset.type;
    }
}

// Search functionality with Enter key
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.id === 'locationInput') {
        searchProperties();
    }
});

// Add loading animation for property cards
function addLoadingAnimation() {
    if (propertiesGrid) {
        propertiesGrid.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Loading properties...</p>
            </div>
        `;
    }
}

// Initialize tooltips for features
function initializeTooltips() {
    const featureTags = document.querySelectorAll('.feature-tag');
    featureTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Add tooltip functionality if needed
        });
    });
}

// Add CSS for notification system (to be included in CSS file)
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
}

.notification.success { border-left: 4px solid #10b981; }
.notification.error { border-left: 4px solid #ef4444; }
.notification.warning { border-left: 4px solid #f59e0b; }
.notification.info { border-left: 4px solid #3b82f6; }

.notification-content {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 8px;
}

.notification-close {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: auto;
    color: #666;
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Export functions for global access
window.searchProperties = searchProperties;
window.loadMoreProperties = loadMoreProperties;
window.viewProperty = viewProperty;
window.contactAgent = contactAgent;
window.scheduleViewing = scheduleViewing;
window.openModal = openModal;
window.closeModal = closeModal;
window.switchToRegister = switchToRegister;
window.switchToLogin = switchToLogin;
window.showForgotPassword = showForgotPassword;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleContactForm = handleContactForm;