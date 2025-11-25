# 🗺️ Interactive ArcGIS Map Viewer

A modern, responsive web application built with **ArcGIS SDK for JavaScript** that provides interactive map viewing with various controls and features.

## ✨ Features

- **Interactive Map Display**: View maps with multiple basemap options (Streets, Satellite, Hybrid, Topographic, Gray)
- **Search Functionality**: Search for locations on the map
- **Zoom Controls**: Manual zoom in/out buttons and keyboard shortcuts
- **Opacity Control**: Adjust map transparency with a slider
- **Coordinate Display**: Click on the map to see exact latitude/longitude coordinates
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Styling**: Modern UI with smooth animations and hover effects
- **Multiple Widgets**: Home button, Zoom widget, and Search widget from ArcGIS SDK

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (any of the options below)

### Installation & Setup

**Option 1: Python (Built-in)**
```bash
cd /workspaces/webapp
python3 -m http.server 8080
```
Then open: `http://localhost:8080`

**Option 2: VS Code Live Server Extension**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

**Option 3: Direct File Opening**
- Simply open `index.html` in your browser (some features may be limited)

**Option 4: Any HTTP Server**
- Use Node.js: `npx http-server -p 8080`
- Or any other local web server

## 📋 Project Structure

```
webapp/
├── index.html       # Main HTML file with map container
├── styles.css       # Interactive styling and animations
├── main.js          # ArcGIS SDK initialization and controls
├── package.json     # Project dependencies and scripts
└── README.md        # This file
```

## 🎮 How to Use

### Map Controls (Sidebar)

1. **Base Map Selector**: Choose different map styles
   - Streets
   - Satellite
   - Hybrid
   - Topographic
   - Gray

2. **Location Search**: 
   - Type a location name
   - Press Enter or click "Search"
   - Map will navigate to that location

3. **Map Opacity**: 
   - Use the slider to adjust transparency
   - Range: 0% (transparent) to 100% (opaque)

4. **Zoom Level**:
   - Use +/- buttons to zoom in/out
   - Display shows current zoom level

5. **Reset View**: 
   - Returns map to initial state
   - Resets opacity to 100%

### Interactive Features

- **Click on Map**: Shows latitude/longitude coordinates
- **Keyboard Shortcuts**:
  - `+` : Zoom in
  - `-` : Zoom out
  - `R` : Reset view
- **Hover Effects**: UI elements highlight on hover
- **Real-time Zoom Display**: Updates as you zoom

## 🎨 Interactive Styling

The application features:
- Gradient backgrounds and buttons
- Smooth animations and transitions
- Shadow effects that enhance on hover
- Custom scrollbar styling
- Responsive grid layout
- Color-coded information displays

## 🔧 Technology Stack

- **Frontend Framework**: ArcGIS SDK for JavaScript 4.28
- **Styling**: Pure CSS3 with animations
- **JavaScript**: ES6+
- **Server**: http-server (for local development)

## 📡 ArcGIS Modules Used

- `esri/Map` - Map creation and configuration
- `esri/views/MapView` - 2D map view
- `esri/Basemap` - Basemap management
- `esri/widgets/Zoom` - Zoom widget
- `esri/widgets/Search` - Location search
- `esri/widgets/Home` - Home/reset button
- `esri/layers/FeatureLayer` - Feature layer support

## 🌐 Available Basemaps

- **streets-v3**: Street map view
- **satellite**: Satellite imagery
- **hybrid**: Satellite with labels
- **topo-map**: Topographic map
- **gray-vector**: Grayscale map

## 💡 Advanced Features

### Optional Enhancements

1. **Add Feature Layer** (in main.js):
```javascript
const statesLayer = new FeatureLayer({
    url: "https://services.arcgisonline.com/arcgis/rest/services/USA_Maps/USA_States/MapServer/0"
});
map.add(statesLayer);
```

2. **Custom Styling**: Modify `styles.css` to customize colors and animations

3. **More Widgets**: Add drawing tools, measurement tools, or custom widgets from ArcGIS SDK

## 🐛 Troubleshooting

**Map not displaying?**
- Check browser console (F12) for errors
- Ensure internet connection (CDN resources needed)
- Try refreshing the page

**Search not working?**
- Verify location name spelling
- Try searching by coordinates
- Check browser console for API errors

**Performance issues?**
- Reduce opacity slider
- Zoom to specific regions instead of full world view
- Disable feature layers if added

## 📚 Resources

- [ArcGIS SDK for JavaScript Documentation](https://developers.arcgis.com/javascript/)
- [ArcGIS Basemap Gallery](https://www.arcgis.com/home/gallery.html)
- [ArcGIS REST Services](https://services.arcgisonline.com/)

## 📝 License

MIT License - Feel free to use and modify

## 🤝 Contributing

Feel free to fork, modify, and submit improvements!

---

**Built with ❤️ using ArcGIS SDK for JavaScript**
