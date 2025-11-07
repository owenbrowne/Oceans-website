/**
 * Coral Reefs & Ocean Warming - Main JavaScript
 * Handles data visualization using Chart.js and Leaflet
 */

// Wait for window to fully load (including external scripts)
window.addEventListener('load', function() {
    console.log('Window loaded, checking for libraries...');
    console.log('Chart.js available:', typeof Chart !== 'undefined');
    console.log('Leaflet available:', typeof L !== 'undefined');
    
    // Verify libraries are loaded before initializing
    if (typeof Chart === 'undefined') {
        console.error('Chart.js failed to load!');
        return;
    }
    if (typeof L === 'undefined') {
        console.error('Leaflet failed to load!');
        return;
    }
    
    console.log('Initializing visualizations...');
    initializeChart();
    initializeMap();
});

/**
 * Initialize the SST Anomalies Chart
 */
async function initializeChart() {
    try {
        console.log('Starting chart initialization...');
        
        // Fetch SST anomaly data - use relative path that works on GitHub Pages
        const response = await fetch('./data/sst_anomalies.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data loaded:', data.length, 'records');

        // Prepare chart data
        const labels = data.map(item => item.date);
        const anomalies = data.map(item => item.anomaly);
        console.log('Labels:', labels.length, 'Anomalies:', anomalies.length);

        // Get canvas context
        const ctx = document.getElementById('sstChart');
        if (!ctx) {
            console.error('Chart canvas not found');
            return;
        }
        console.log('Canvas found:', ctx);

        // Create chart
        const chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'SST Anomaly (°C)',
                    data: anomalies,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0, // No point markers for dense data
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#3b82f6',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#e4e9f2',
                            font: {
                                size: 14,
                                family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            },
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 35, 50, 0.95)',
                        titleColor: '#e4e9f2',
                        bodyColor: '#e4e9f2',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += context.parsed.y.toFixed(2) + '°C';
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date',
                            color: '#9ca3af',
                            font: {
                                size: 13,
                                weight: '600'
                            }
                        },
                        ticks: {
                            color: '#9ca3af',
                            maxRotation: 45,
                            minRotation: 45,
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: 'rgba(45, 55, 72, 0.5)',
                            drawBorder: false
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Temperature Anomaly (°C)',
                            color: '#9ca3af',
                            font: {
                                size: 13,
                                weight: '600'
                            }
                        },
                        ticks: {
                            color: '#9ca3af',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return value.toFixed(1) + '°C';
                            }
                        },
                        grid: {
                            color: 'rgba(45, 55, 72, 0.5)',
                            drawBorder: false
                        }
                    }
                }
            }
        });

        console.log('Chart created successfully:', chartInstance);
        console.log('Chart has data:', chartInstance.data.datasets[0].data.length, 'points');
    } catch (error) {
        console.error('Error initializing chart:', error);
        const container = document.querySelector('.chart-container');
        if (container) {
            container.innerHTML = '<p style="color: #ef4444; padding: 2rem; text-align: center;">Failed to load chart data. Please check that data/sst_anomalies.json exists.</p>';
        }
    }
}

/**
 * Initialize the Reef Locations Map
 */
async function initializeMap() {
    try {
        // Initialize map
        const map = L.map('reefMap', {
            center: [0, 0],
            zoom: 2,
            scrollWheelZoom: false, // Disable scroll-wheel zoom by default
            zoomControl: true
        });

        // Add zoom control hint
        map.on('click', function() {
            if (!map.scrollWheelZoom.enabled()) {
                map.scrollWheelZoom.enable();
            }
        });

        // Add base layer - OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Fetch reef location data - use relative path that works on GitHub Pages
        const response = await fetch('./data/reefs.geojson');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reefData = await response.json();

        // Define marker colors based on bleaching risk
        const riskColors = {
            'low': '#3b82f6',
            'moderate': '#f59e0b',
            'high': '#ef4444'
        };

        // Custom icon function
        function createCustomIcon(risk) {
            const color = riskColors[risk] || '#6b7280';
            return L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                    background-color: ${color};
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 3px solid rgba(255, 255, 255, 0.5);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
                "></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
                popupAnchor: [0, -10]
            });
        }

        // Add markers to map
        const geoJsonLayer = L.geoJSON(reefData, {
            pointToLayer: function(feature, latlng) {
                const risk = feature.properties.bleaching_risk;
                return L.marker(latlng, {
                    icon: createCustomIcon(risk)
                });
            },
            onEachFeature: function(feature, layer) {
                const props = feature.properties;
                const risk = props.bleaching_risk;
                const riskColor = riskColors[risk] || '#6b7280';
                const riskLabel = risk.charAt(0).toUpperCase() + risk.slice(1);

                // Create popup content
                const popupContent = `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                        <h3 style="margin: 0 0 0.5rem 0; color: #1a2332; font-size: 1rem;">${props.name}</h3>
                        <p style="margin: 0.25rem 0; color: #4b5563; font-size: 0.875rem;">
                            <strong>Country:</strong> ${props.country}
                        </p>
                        <p style="margin: 0.25rem 0; font-size: 0.875rem;">
                            <strong>Bleaching Risk:</strong> 
                            <span style="color: ${riskColor}; font-weight: 600;">${riskLabel}</span>
                        </p>
                    </div>
                `;

                layer.bindPopup(popupContent, {
                    maxWidth: 250,
                    className: 'reef-popup'
                });
            }
        }).addTo(map);

        // Fit map to show all markers
        if (reefData.features.length > 0) {
            const bounds = geoJsonLayer.getBounds();
            map.fitBounds(bounds, {
                padding: [50, 50],
                maxZoom: 5
            });
        }

        // Add custom styles for popups
        addPopupStyles();

        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
        const container = document.getElementById('reefMap');
        if (container) {
            container.innerHTML = '<p style="color: #ef4444; padding: 2rem; text-align: center;">Failed to load map data. Please check that data/reefs.geojson exists.</p>';
        }
    }
}

/**
 * Add custom styles for Leaflet popups
 */
function addPopupStyles() {
    // Check if styles already exist
    if (document.getElementById('custom-popup-styles')) {
        return;
    }

    const style = document.createElement('style');
    style.id = 'custom-popup-styles';
    style.textContent = `
        .leaflet-popup-content-wrapper {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .leaflet-popup-content {
            margin: 1rem;
            font-size: 0.9rem;
            line-height: 1.5;
        }
        .leaflet-popup-tip {
            background-color: #ffffff;
        }
        .reef-popup .leaflet-popup-close-button {
            color: #4b5563;
            font-size: 1.25rem;
        }
        .reef-popup .leaflet-popup-close-button:hover {
            color: #1f2937;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/**
 * Add loading states for visualizations
 */
window.addEventListener('load', function() {
    // Remove any loading indicators once everything is loaded
    document.body.classList.add('loaded');
});

