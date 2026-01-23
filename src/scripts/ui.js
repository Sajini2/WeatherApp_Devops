/**
 * UI Management Module
 * Handles all UI updates and interactions
 * Role: Frontend Developer
 */

class UIManager {
    constructor() {
        this.elements = {
            // Search elements
            searchInput: document.getElementById('citySearch'),
            searchBtn: document.getElementById('searchBtn'),
            suggestions: document.getElementById('suggestions'),
            recentSearches: document.getElementById('recentSearches'),

            // Weather display
            weatherDisplay: document.getElementById('weatherDisplay'),
            loadingState: document.getElementById('loadingState'),
            errorState: document.getElementById('errorState'),

            // Current weather
            cityName: document.getElementById('cityName'),
            currentDate: document.getElementById('currentDate'),
            temperature: document.getElementById('temperature'),
            weatherDescription: document.getElementById('weatherDescription'),
            weatherIcon: document.getElementById('weatherIcon'),
            feelsLike: document.getElementById('feelsLike'),
            humidity: document.getElementById('humidity'),
            windSpeed: document.getElementById('windSpeed'),
            uvIndex: document.getElementById('uvIndex'),

            // Forecast
            forecast: document.getElementById('forecast'),

            // Error elements
            errorTitle: document.getElementById('errorTitle'),
            errorMessage: document.getElementById('errorMessage'),
            retryBtn: document.getElementById('retryBtn'),

            // Other
            currentTime: document.getElementById('currentTime'),
            favoriteBtn: document.getElementById('favoriteBtn')
        };

        this.initializeClock();
    }

    /**
     * Initialize the clock in header
     */
    initializeClock() {
        const updateTime = () => {
            const now = new Date();
            const options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            this.elements.currentTime.textContent = now.toLocaleDateString('en-US', options);
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.elements.weatherDisplay.classList.add('hidden');
        this.elements.errorState.classList.add('hidden');
        this.elements.loadingState.classList.remove('hidden');
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        this.elements.loadingState.classList.add('hidden');
    }

    /**
     * Display current weather
     * @param {Object} weather - Weather data
     */
    displayCurrentWeather(weather) {
        // Update city and date
        this.elements.cityName.textContent = `${weather.city}, ${weather.country}`;

        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.elements.currentDate.textContent = now.toLocaleDateString('en-US', options);

        // Update main weather info
        this.elements.temperature.textContent = `${weather.temperature}°C`;
        this.elements.weatherDescription.textContent = weather.description;
        this.elements.weatherIcon.src = weather.iconUrl;
        this.elements.weatherIcon.alt = weather.description;

        // Update weather details
        this.elements.feelsLike.textContent = `${weather.feelsLike}°C`;
        this.elements.humidity.textContent = `${weather.humidity}%`;
        this.elements.windSpeed.textContent = `${weather.windSpeed} m/s`;
        this.elements.uvIndex.textContent = weather.uvIndex || 'N/A';

        // Show weather display
        this.hideLoading();
        this.elements.errorState.classList.add('hidden');
        this.elements.weatherDisplay.classList.remove('hidden');

        // Animate in
        this.elements.weatherDisplay.style.animation = 'none';
        setTimeout(() => {
            this.elements.weatherDisplay.style.animation = '';
        }, 10);
    }

    /**
     * Display 5-day forecast
     * @param {Array} forecasts - Forecast data
     */
    displayForecast(forecasts) {
        this.elements.forecast.innerHTML = '';

        forecasts.forEach((forecast, index) => {
            const card = this.createForecastCard(forecast, index);
            this.elements.forecast.appendChild(card);
        });
    }

    /**
     * Create forecast card element
     * @param {Object} forecast - Forecast data
     * @param {number} index - Card index
     * @returns {HTMLElement} Forecast card
     */
    createForecastCard(forecast, index) {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.style.animationDelay = `${index * 0.1}s`;

        const date = new Date(forecast.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        card.innerHTML = `
            <div class="forecast-date">${dayName}</div>
            <img class="forecast-icon" src="${forecast.iconUrl}" alt="${forecast.description}">
            <div class="forecast-temp">${forecast.temperature}°C</div>
            <div class="forecast-description">${forecast.description}</div>
        `;

        return card;
    }

    /**
     * Display city suggestions
     * @param {Array} cities - List of cities
     */
    displaySuggestions(cities) {
        if (cities.length === 0) {
            this.elements.suggestions.innerHTML = '';
            return;
        }

        this.elements.suggestions.innerHTML = cities
            .map(city => {
                const displayName = city.state
                    ? `${city.name}, ${city.state}, ${city.country}`
                    : `${city.name}, ${city.country}`;

                return `
                    <div class="suggestion-item" data-city="${city.name}">
                        ${displayName}
                    </div>
                `;
            })
            .join('');
    }

    /**
     * Clear suggestions
     */
    clearSuggestions() {
        this.elements.suggestions.innerHTML = '';
    }

    /**
     * Display recent searches
     * @param {Array} searches - Recent search cities
     */
    displayRecentSearches(searches) {
        if (searches.length === 0) {
            this.elements.recentSearches.innerHTML = '';
            return;
        }

        this.elements.recentSearches.innerHTML = searches
            .map(city => `
                <div class="recent-search-chip" data-city="${city}">
                    <span class="chip-text">${city}</span>
                    <button class="chip-remove" data-remove="${city}" title="Remove">×</button>
                </div>
            `)
            .join('');
    }

    /**
     * Show error message
     * @param {string} title - Error title
     * @param {string} message - Error message
     */
    showError(title, message) {
        this.hideLoading();
        this.elements.weatherDisplay.classList.add('hidden');

        this.elements.errorTitle.textContent = title;
        this.elements.errorMessage.textContent = message;
        this.elements.errorState.classList.remove('hidden');
    }

    /**
     * Hide error state
     */
    hideError() {
        this.elements.errorState.classList.add('hidden');
    }

    /**
     * Get search input value
     * @returns {string} Search query
     */
    getSearchValue() {
        return this.elements.searchInput.value.trim();
    }

    /**
     * Clear search input
     */
    clearSearch() {
        this.elements.searchInput.value = '';
    }

    /**
     * Set search input value
     * @param {string} value - Value to set
     */
    setSearchValue(value) {
        this.elements.searchInput.value = value;
    }

    /**
     * Focus search input
     */
    focusSearch() {
        this.elements.searchInput.focus();
    }

    /**
     * Show notification
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, info)
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            padding: var(--spacing-md);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Add demo mode badge
     */
    addDemoModeBadge() {
        const badge = document.createElement('div');
        badge.className = 'demo-badge';
        badge.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: var(--secondary-gradient);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: var(--radius-md);
            font-size: 0.85rem;
            font-weight: 600;
            z-index: 1000;
            box-shadow: var(--shadow-md);
        `;
        badge.textContent = '🎭 Demo Mode - Using sample data';

        if (!document.querySelector('.demo-badge')) {
            document.body.appendChild(badge);
        }
    }
}

// Export for use in other modules
window.UIManager = UIManager;
