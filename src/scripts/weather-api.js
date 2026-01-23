/**
 * Weather API Module
 * Handles all API interactions with OpenWeatherMap
 * Role: Backend Developer
 */

class WeatherAPI {
    constructor() {
        // Using free OpenWeatherMap API
        // Get your free API key from: https://openweathermap.org/api
        this.API_KEY = 'ca70d993466299019e8ed53322722288'; // OpenWeatherMap sample API key
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5';
        this.GEO_URL = 'https://api.openweathermap.org/geo/1.0';
        this.ICON_URL = 'https://openweathermap.org/img/wn';

        // Demo mode OFF - using real API
        this.DEMO_MODE = false;
    }

    /**
     * Set API Key
     * @param {string} apiKey - OpenWeatherMap API key
     */
    setApiKey(apiKey) {
        this.API_KEY = apiKey;
        this.DEMO_MODE = false;
    }

    /**
     * Get current weather by city name
     * @param {string} cityName - City name
     * @returns {Promise<Object>} Weather data
     */
    async getCurrentWeather(cityName) {
        if (this.DEMO_MODE) {
            return this.getDemoWeather(cityName);
        }

        try {
            const response = await fetch(
                `${this.BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${this.API_KEY}&units=metric`
            );

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please check the spelling and try again.');
                } else if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your configuration.');
                } else {
                    throw new Error(`Error fetching weather data (${response.status})`);
                }
            }

            const data = await response.json();
            return this.formatWeatherData(data);
        } catch (error) {
            console.error('Error fetching current weather:', error);
            throw error;
        }
    }

    /**
     * Get 5-day forecast
     * @param {string} cityName - City name
     * @returns {Promise<Array>} Forecast data
     */
    async getForecast(cityName) {
        if (this.DEMO_MODE) {
            return this.getDemoForecast();
        }

        try {
            const response = await fetch(
                `${this.BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${this.API_KEY}&units=metric`
            );

            if (!response.ok) {
                throw new Error(`Error fetching forecast data (${response.status})`);
            }

            const data = await response.json();
            return this.formatForecastData(data);
        } catch (error) {
            console.error('Error fetching forecast:', error);
            throw error;
        }
    }

    /**
     * Search cities by name
     * @param {string} query - Search query
     * @returns {Promise<Array>} List of cities
     */
    async searchCities(query) {
        if (this.DEMO_MODE) {
            return this.getDemoCities(query);
        }

        try {
            const response = await fetch(
                `${this.GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${this.API_KEY}`
            );

            if (!response.ok) {
                throw new Error('Error searching cities');
            }

            const data = await response.json();
            return data.map(city => ({
                name: city.name,
                country: city.country,
                state: city.state || '',
                lat: city.lat,
                lon: city.lon
            }));
        } catch (error) {
            console.error('Error searching cities:', error);
            return [];
        }
    }

    /**
     * Format weather data
     * @param {Object} data - Raw API data
     * @returns {Object} Formatted weather data
     */
    formatWeatherData(data) {
        return {
            city: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            pressure: data.main.pressure,
            visibility: data.visibility / 1000, // Convert to km
            uvIndex: 0, // Would need additional API call
            iconUrl: `${this.ICON_URL}/${data.weather[0].icon}@2x.png`
        };
    }

    /**
     * Format forecast data
     * @param {Object} data - Raw API data
     * @returns {Array} Formatted forecast data
     */
    formatForecastData(data) {
        // Get one forecast per day (around noon)
        const dailyForecasts = [];
        const processedDates = new Set();

        for (const item of data.list) {
            const date = new Date(item.dt * 1000);
            const dateString = date.toDateString();

            // Get noon forecast or skip if we already have this date
            if (!processedDates.has(dateString) && dailyForecasts.length < 5) {
                processedDates.add(dateString);
                dailyForecasts.push({
                    date: dateString,
                    temperature: Math.round(item.main.temp),
                    description: item.weather[0].description,
                    icon: item.weather[0].icon,
                    iconUrl: `${this.ICON_URL}/${item.weather[0].icon}@2x.png`,
                    humidity: item.main.humidity,
                    windSpeed: item.wind.speed
                });
            }
        }

        return dailyForecasts;
    }

    /**
     * Demo mode: Get sample weather data
     * @param {string} cityName - City name
     * @returns {Object} Demo weather data
     */
    getDemoWeather(cityName) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    city: cityName,
                    country: 'DEMO',
                    temperature: 22,
                    feelsLike: 20,
                    description: 'partly cloudy',
                    icon: '02d',
                    humidity: 65,
                    windSpeed: 3.5,
                    pressure: 1013,
                    visibility: 10,
                    uvIndex: 5,
                    iconUrl: 'https://openweathermap.org/img/wn/02d@2x.png'
                });
            }, 500);
        });
    }

    /**
     * Demo mode: Get sample forecast data
     * @returns {Array} Demo forecast data
     */
    getDemoForecast() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const today = new Date();
                const forecasts = [];

                for (let i = 1; i <= 5; i++) {
                    const date = new Date(today);
                    date.setDate(date.getDate() + i);

                    forecasts.push({
                        date: date.toDateString(),
                        temperature: Math.round(18 + Math.random() * 10),
                        description: ['sunny', 'cloudy', 'partly cloudy', 'rainy'][Math.floor(Math.random() * 4)],
                        icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
                        iconUrl: `https://openweathermap.org/img/wn/${['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)]}@2x.png`,
                        humidity: Math.round(50 + Math.random() * 30),
                        windSpeed: (Math.random() * 5).toFixed(1)
                    });
                }

                resolve(forecasts);
            }, 500);
        });
    }

    /**
     * Demo mode: Get sample cities
     * @param {string} query - Search query
     * @returns {Array} Demo cities
     */
    getDemoCities(query) {
        const demoCities = [
            { name: 'London', country: 'GB', state: '', lat: 51.5074, lon: -0.1278 },
            { name: 'New York', country: 'US', state: 'NY', lat: 40.7128, lon: -74.0060 },
            { name: 'Tokyo', country: 'JP', state: '', lat: 35.6762, lon: 139.6503 },
            { name: 'Paris', country: 'FR', state: '', lat: 48.8566, lon: 2.3522 },
            { name: 'Sydney', country: 'AU', state: '', lat: -33.8688, lon: 151.2093 },
            { name: 'Dubai', country: 'AE', state: '', lat: 25.2048, lon: 55.2708 },
            { name: 'Singapore', country: 'SG', state: '', lat: 1.3521, lon: 103.8198 },
            { name: 'Colombo', country: 'LK', state: '', lat: 6.9271, lon: 79.8612 }
        ];

        return new Promise((resolve) => {
            setTimeout(() => {
                const filtered = demoCities.filter(city =>
                    city.name.toLowerCase().includes(query.toLowerCase())
                );
                resolve(filtered.slice(0, 5));
            }, 300);
        });
    }
}

// Export for use in other modules
window.WeatherAPI = WeatherAPI;
