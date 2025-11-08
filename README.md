# Coral Reefs & Ocean Warming

A static educational website explaining and visualizing how ocean warming impacts coral reefs. This site uses interactive charts and maps to help people understand the science behind coral bleaching and what they can do to help.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🌊 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Visualizations**: 
  - Time-series chart showing sea surface temperature anomalies
  - Interactive map of coral reef locations with bleaching risk indicators
- **Accessible**: Built with semantic HTML and ARIA labels
- **Dark Theme**: Easy-on-the-eyes dark color scheme with excellent contrast
- **No Build Step**: Pure HTML, CSS, and JavaScript - just open and view
- **GitHub Pages Ready**: Optimized for deployment from repository root

## 🚀 Quick Start

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/coral-reef-heat-site.git
   cd coral-reef-heat-site
   ```

2. **Serve locally** (choose one method):
   
   **Option A: Python 3**
   ```bash
   python3 -m http.server 8000
   ```
   
   **Option B: Python 2**
   ```bash
   python -m SimpleHTTPServer 8000
   ```
   
   **Option C: Node.js (with npx)**
   ```bash
   npx http-server -p 8000
   ```
   
   **Option D: VS Code Live Server**
   - Install the "Live Server" extension
   - Right-click `index.html` and select "Open with Live Server"

3. **Open in browser**:
   - Navigate to `http://localhost:8000`

### GitHub Pages Deployment

1. **Create a new repository on GitHub**:
   - Name it `coral-reef-heat-site`
   - Don't initialize with README, .gitignore, or license

2. **Push your code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Coral reef heat site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/coral-reef-heat-site.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (in sidebar)
   - Under "Build and deployment":
     - Source: **Deploy from a branch**
     - Branch: **main**
     - Folder: **/ (root)**
   - Click **Save**

4. **Access your site**:
   - Your site will be live at: `https://YOUR_USERNAME.github.io/coral-reef-heat-site/`
   - It may take 1-2 minutes for the first deployment

## 📁 Project Structure

```
coral-reef-heat-site/
├── index.html              # Main HTML file with semantic structure
├── styles.css              # Dark theme with responsive design
├── script.js               # Chart and map initialization
├── data/
│   ├── sst_anomalies.json # Sea surface temperature anomaly data
│   └── reefs.geojson      # Coral reef location and risk data
├── assets/
│   ├── hero.jpg           # Hero section banner image (placeholder SVG)
│   └── icons.svg          # Optional icon library
└── README.md              # This file
```

## Technologies Used

### Core
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties (variables), Grid, Flexbox
- **JavaScript (ES6+)**: Async/await, Fetch API

### Libraries (via CDN)
- **[Chart.js](https://www.chartjs.org/) v4.4.0**: Time-series temperature chart
- **[Leaflet](https://leafletjs.com/) v1.9.4**: Interactive reef location map
- **OpenStreetMap**: Map tile provider

## Data Sources

### Current Status
The site currently uses **placeholder data** for demonstration purposes:
- `sst_anomalies.json`: Sample monthly temperature anomalies (2020-2024)
- `reefs.geojson`: 8 example coral reef locations with risk levels

### Production Data Sources
For a production deployment, replace placeholder data with vetted sources:

- **NOAA Coral Reef Watch**: [https://coralreefwatch.noaa.gov/](https://coralreefwatch.noaa.gov/)
  - Satellite-derived SST data
  - Degree Heating Week (DHW) products
  - Bleaching alert levels

- **NOAA NCEI**: [https://www.ncei.noaa.gov/](https://www.ncei.noaa.gov/)
  - Extended Reconstructed SST (ERSSTv5)
  - Historical climate data

- **Copernicus Marine Service**: [https://marine.copernicus.eu/](https://marine.copernicus.eu/)
  - Global ocean reanalysis products

- **ReefBase**: [http://www.reefbase.org/](http://www.reefbase.org/)
  - Global coral reef database

### Color Theme
Edit CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #0a0e1a;
    --bg-secondary: #121829;
    --card-bg: #1a2332;
    --text-primary: #e4e9f2;
    --text-muted: #9ca3af;
    --accent-primary: #3b82f6;
    --accent-secondary: #10b981;
    --accent-warning: #f59e0b;
    --accent-danger: #ef4444;
}
```


### Chart Styling
Modify chart configuration in `script.js` (starting around line 30):
- Colors
- Line styles
- Tooltip formats
- Axis labels

### Map Settings
Adjust map behavior in `script.js` (starting around line 95):
- Initial view coordinates
- Zoom levels
- Marker styles
- Popup content




