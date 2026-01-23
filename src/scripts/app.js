/**
 * Main Application Controller
 * Coordinates all modules and handles user interactions
 * Integrates: Backend (Weather API) + Frontend (UI)
 */

class WeatherApp {
    constructor() {
        // Initialize modules
        this.api = new WeatherAPI();
        this.ui = new UIManager();

        // Storage key
        this.STORAGE_KEY = 'weather_recent_searches';

        // Debounce timer
        this.searchDebounceTimer = null;

        // Initialize app
        this.init();
    }

    /**
     * Initialize application
     */
    init() {
        this.setupEventListeners();
        this.loadRecentSearches();
        this.showWelcomeMessage();

        // Show demo mode badge if in demo mode
        if (this.api.DEMO_MODE) {
            this.ui.addDemoModeBadge();
        }
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Search button click
        this.ui.elements.searchBtn.addEventListener('click', () => {
            this.handleSearch();
        });

        // Enter key in search input
        this.ui.elements.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Search input for autocomplete
        this.ui.elements.searchInput.addEventListener('input', (e) => {
            this.handleSearchInput(e.target.value);
        });

        // Click outside to close suggestions
        document.addEventListener('click', (e) => {
            if (!this.ui.elements.searchInput.contains(e.target) &&
                !this.ui.elements.suggestions.contains(e.target)) {
                this.ui.clearSuggestions();
            }
        });

        // Suggestion item clicks (delegated)
        this.ui.elements.suggestions.addEventListener('click', (e) => {
            const item = e.target.closest('.suggestion-item');
            if (item) {
                const city = item.dataset.city;
                this.ui.setSearchValue(city);
                this.ui.clearSuggestions();
                this.handleSearch();
            }
        });

        // Recent search clicks (delegated)
        this.ui.elements.recentSearches.addEventListener('click', (e) => {
            // Check if remove button was clicked
            const removeBtn = e.target.closest('.chip-remove');
            if (removeBtn) {
                e.stopPropagation();
                const cityToRemove = removeBtn.dataset.remove;
                this.removeRecentSearch(cityToRemove);
                return;
            }

            // Otherwise, search for the city
            const chip = e.target.closest('.recent-search-chip');
            if (chip) {
                const city = chip.dataset.city;
                this.ui.setSearchValue(city);
                this.handleSearch();
            }
        });

        // Retry button
        this.ui.elements.retryBtn.addEventListener('click', () => {
            this.ui.hideError();
            this.ui.focusSearch();
        });

        // Favorite button
        this.ui.elements.favoriteBtn.addEventListener('click', () => {
            this.handleFavorite();
        });
    }

    /**
     * Handle search input with debouncing for autocomplete
     * @param {string} query - Search query
     */
    handleSearchInput(query) {
        // Clear previous timer
        clearTimeout(this.searchDebounceTimer);

        // If query is empty, clear suggestions
        if (query.trim().length === 0) {
            this.ui.clearSuggestions();
            return;
        }

        // Debounce search
        this.searchDebounceTimer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                try {
                    const cities = await this.api.searchCities(query);
                    this.ui.displaySuggestions(cities);
                } catch (error) {
                    console.error('Error fetching city suggestions:', error);
                }
            }
        }, 300);
    }

    /**
     * Handle search action
     */
    async handleSearch() {
        const city = this.ui.getSearchValue();

        if (!city) {
            this.ui.showNotification('Please enter a city name', 'error');
            this.ui.focusSearch();
            return;
        }

        // Clear suggestions
        this.ui.clearSuggestions();

        // Show loading state
        this.ui.showLoading();

        try {
            // Fetch weather data
            const [currentWeather, forecast] = await Promise.all([
                this.api.getCurrentWeather(city),
                this.api.getForecast(city)
            ]);

            // Display data
            this.ui.displayCurrentWeather(currentWeather);
            this.ui.displayForecast(forecast);

            // Save to recent searches
            this.saveRecentSearch(currentWeather.city);

            // Show success notification
            this.ui.showNotification(`Weather loaded for ${currentWeather.city}`, 'success');

        } catch (error) {
            // Handle errors
            this.ui.showError(
                'Unable to fetch weather data',
                error.message || 'Please check your internet connection and try again.'
            );

            console.error('Error fetching weather:', error);
        }
    }

    /**
     * Show welcome message on first load
     */
    showWelcomeMessage() {
        // Check if it's the first visit
        const hasVisited = localStorage.getItem('weather_app_visited');

        if (!hasVisited) {
            setTimeout(() => {
                this.ui.showNotification(
                    '👋 Welcome! Search for a city to get started.',
                    'info'
                );
                localStorage.setItem('weather_app_visited', 'true');
            }, 1000);
        }

        // Focus search input
        this.ui.focusSearch();
    }

    /**
     * Save city to recent searches
     * @param {string} city - City name
     */
    saveRecentSearch(city) {
        let searches = this.getRecentSearches();

        // Remove duplicates
        searches = searches.filter(s => s.toLowerCase() !== city.toLowerCase());

        // Add to beginning
        searches.unshift(city);

        // Keep only last 5
        searches = searches.slice(0, 5);

        // Save to localStorage
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(searches));

        // Update UI
        this.ui.displayRecentSearches(searches);
    }

    /**
     * Get recent searches from localStorage
     * @returns {Array} Recent searches
     */
    getRecentSearches() {
        try {
            const searches = localStorage.getItem(this.STORAGE_KEY);
            return searches ? JSON.parse(searches) : [];
        } catch (error) {
            console.error('Error loading recent searches:', error);
            return [];
        }
    }

    /**
     * Load and display recent searches
     */
    loadRecentSearches() {
        const searches = this.getRecentSearches();
        this.ui.displayRecentSearches(searches);
    }

    /**
     * Remove a city from recent searches
     * @param {string} city - City to remove
     */
    removeRecentSearch(city) {
        let searches = this.getRecentSearches();
        searches = searches.filter(s => s.toLowerCase() !== city.toLowerCase());
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(searches));
        this.ui.displayRecentSearches(searches);
        this.ui.showNotification(`Removed "${city}" from recent searches`, 'info');
    }

    /**
     * Handle favorite button click
     */
    handleFavorite() {
        const city = this.ui.elements.cityName.textContent;

        if (city) {
            // Toggle favorite style
            const btn = this.ui.elements.favoriteBtn;
            const svg = btn.querySelector('svg');

            if (svg.style.fill === 'white') {
                svg.style.fill = '';
                this.ui.showNotification(`Removed ${city} from favorites`, 'info');
            } else {
                svg.style.fill = 'white';
                this.ui.showNotification(`Added ${city} to favorites`, 'success');
            }
        }
    }

    /**
     * Set API key (for production use)
     * @param {string} apiKey - OpenWeatherMap API key
     */
    setApiKey(apiKey) {
        this.api.setApiKey(apiKey);
        this.ui.showNotification('API key configured successfully', 'success');

        // Remove demo badge if exists
        const demoBadge = document.querySelector('.demo-badge');
        if (demoBadge) {
            demoBadge.remove();
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.weatherApp = new WeatherApp();

    // Log initialization
    console.log('🌤️ Weather Dashboard initialized');
    console.log('📍 Current mode:', window.weatherApp.api.DEMO_MODE ? 'DEMO' : 'LIVE');

    if (window.weatherApp.api.DEMO_MODE) {
        console.log('ℹ️ To use live data, get a free API key from https://openweathermap.org/api');
        console.log('ℹ️ Then run: weatherApp.setApiKey("YOUR_API_KEY")');
    }
});

// Add notification animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
