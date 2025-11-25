// Import ArcGIS modules
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Basemap",
    "esri/widgets/Zoom",
    "esri/widgets/Search",
    "esri/widgets/Home",
    "esri/layers/FeatureLayer"
], function(Map, MapView, Basemap, Zoom, Search, Home, FeatureLayer) {
    
    // Create the map
    let map = new Map({
        basemap: "streets"
    });

    // Create the map view
    let view = new MapView({
        container: "mapContainer",
        map: map,
        zoom: 4,
        center: [78.9629, 20.5937], // Center of India
        popup: {
            dockOptions: {
                buttonAlignment: "top-right",
                breakpoint: false,
                position: "top-right"
            }
        }
    });

    // Store initial view state for reset
    const initialExtent = view.extent.clone();

    // Add Home widget
    const homeBtn = new Home({
        view: view
    });
    view.ui.add(homeBtn, "top-left");

    // Add Zoom widget
    const zoomWidget = new Zoom({
        view: view
    });
    view.ui.add(zoomWidget, "top-left");

    // Add Search widget
    const search = new Search({
        view: view
    });
    view.ui.add(search, "top-right");

    // DOM Elements
    const basemapSelector = document.getElementById("basemapSelector");
    const locationSearch = document.getElementById("locationSearch");
    const searchBtn = document.getElementById("searchBtn");
    const opacitySlider = document.getElementById("opacitySlider");
    const opacityValue = document.getElementById("opacityValue");
    const zoomInBtn = document.getElementById("zoomIn");
    const zoomOutBtn = document.getElementById("zoomOut");
    const resetBtn = document.getElementById("resetBtn");
    const zoomLevelDisplay = document.getElementById("zoomLevel");
    const mapInfo = document.getElementById("mapInfo");

    // Basemap options mapping
    const basemaps = {
        "streets": "streets",
        "satellite": "satellite",
        "hybrid": "hybrid",
        "topo": "topo",
        "gray": "gray-vector"
    };

    // Basemap selector event
    basemapSelector.addEventListener("change", function() {
        const selectedBasemap = basemaps[this.value];
        map.basemap = selectedBasemap;
        logAction(`Changed basemap to: ${this.value}`);
    });

    // Opacity slider
    opacitySlider.addEventListener("input", function() {
        const opacity = this.value / 100;
        view.scale = 100 / opacity * view.scale;
        opacityValue.textContent = this.value + "%";
        
        // Adjust view opacity
        map.layers.forEach(layer => {
            layer.opacity = opacity;
        });
        logAction(`Map opacity: ${this.value}%`);
    });

    // Zoom controls
    zoomInBtn.addEventListener("click", function() {
        view.zoom += 1;
    });

    zoomOutBtn.addEventListener("click", function() {
        view.zoom -= 1;
    });

    // Reset view
    resetBtn.addEventListener("click", function() {
        view.extent = initialExtent;
        view.zoom = 4;
        opacitySlider.value = 100;
        opacityValue.textContent = "100%";
        logAction("Map view reset to initial state");
    });

    // Location search
    searchBtn.addEventListener("click", performSearch);
    locationSearch.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            performSearch();
        }
    });

    function performSearch() {
        const query = locationSearch.value.trim();
        if (query) {
            search.search(query);
            logAction(`Searched for: ${query}`);
        }
    }

    // Update zoom level display
    view.watch("zoom", function(newZoom) {
        zoomLevelDisplay.textContent = `Zoom: ${Math.round(newZoom)}`;
    });

    // Click on map to show coordinates
    view.on("click", function(event) {
        const lat = event.mapPoint.latitude.toFixed(4);
        const lon = event.mapPoint.longitude.toFixed(4);
        mapInfo.innerHTML = `
            <p><strong>Coordinates:</strong></p>
            <p>Latitude: ${lat}</p>
            <p>Longitude: ${lon}</p>
            <p><strong>Zoom Level:</strong> ${Math.round(view.zoom)}</p>
        `;
        logAction(`Clicked at: ${lat}, ${lon}`);
    });

    // Mouse move - show coordinates
    view.on("pointer-move", function(event) {
        const lat = event.mapPoint.latitude.toFixed(4);
        const lon = event.mapPoint.longitude.toFixed(4);
        
        // Optional: Update status quietly without logging each move
        // mapInfo.querySelector("p:first-of-type")?.nextSibling?.update(`Lat: ${lat}, Lon: ${lon}`);
    });

    // View loaded event
    view.when(function() {
        console.log("Map view loaded successfully");
        mapInfo.innerHTML = `
            <p><strong>Map Loaded!</strong></p>
            <p>Click anywhere on the map to see coordinates.</p>
            <p><strong>Current Zoom:</strong> ${Math.round(view.zoom)}</p>
        `;
    });

    // Error handling
    view.on("error", function(error) {
        console.error("Map error:", error);
        mapInfo.innerHTML = `<p style="color: red;"><strong>Error:</strong> ${error.message}</p>`;
    });

    // Utility function to log actions
    function logAction(message) {
        console.log("[Map Action] " + message);
        
        // Update status in console (optional visual feedback)
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] ${message}`);
    }

    // Add keyboard shortcuts
    document.addEventListener("keydown", function(e) {
        if (e.key === "+") {
            view.zoom += 1;
        } else if (e.key === "-") {
            view.zoom -= 1;
        } else if (e.key === "r" || e.key === "R") {
            resetBtn.click();
        }
    });

    // Add feature layer example (optional - US States)
    const statesLayer = new FeatureLayer({
        url: "https://services.arcgisonline.com/arcgis/rest/services/USA_Maps/USA_States/MapServer/0",
        opacity: 0.5,
        definitionExpression: "1=1" // Show all features
    });

    // Optional: Uncomment to add states layer
    map.add(statesLayer);

    console.log("✓ ArcGIS Map application initialized successfully!");
    console.log("Keyboard shortcuts: + (zoom in), - (zoom out), R (reset)");
});
