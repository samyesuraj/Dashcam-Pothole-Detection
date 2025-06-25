// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Only initialize map if we're on the index page
    if (document.getElementById('map')) {
        // Map initialization code
        var map = L.map('map', {
            zoomControl: false  // Disable default zoom control
        }).setView([9.4835, 76.3454], 13);

        let ipad = "192.168.95.209"
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add zoom control to a custom position
        L.control.zoom().addTo(map);
        L.control.zoom().setPosition('bottomright');

        // Function to get marker color based on pothole intensity
        function getMarkerColor(intensity) {
            if (intensity > 8) return "red";      // High severity
            if (intensity > 5) return "orange";   // Medium severity
            return "green";                       // Low severity
        }

        // Add this function after getMarkerColor()
        function createCustomIcon(intensity) {
            const color = getMarkerColor(intensity);
            return L.divIcon({
                className: 'custom-marker',
                html: `
                    <div class="marker-container" style="background: ${color}">
                        <span class="marker-intensity">${intensity}</span>
                    </div>
                `,
                iconSize: [24, 24],    // Fixed size
                iconAnchor: [12, 24],  // Anchor point adjusted for new size
                popupAnchor: [0, -24]  // Popup position adjusted for new size
            });
        }

        // map.locate({setView: true, maxZoom: 16});

        // function onLocationFound(e) {
        //     var radius = e.accuracy;

        //     L.marker(e.latlng).addTo(map)
        //         .bindPopup("You are within " + radius + " meters from this point").openPopup();

        //     L.circle(e.latlng, radius).addTo(map);
        // }

        

        // Right-click to create a marker
        map.on('contextmenu', function(e) {
            // Prevent the default context menu from appearing
            e.originalEvent.preventDefault();

            console.log("Right-click detected at:", e.latlng); // Debugging line

            var lat = e.latlng.lat;
            var lng = e.latlng.lng;

            // Create a marker at the clicked location
            L.marker([lat, lng]).addTo(map)
                .bindPopup(`Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`)
                .openPopup();
        });

        // Sample pothole data (Replace with API data for real implementation)
        const potholeData = [
            {
                name: "Pazhaveedu",
                lat:  9.4835,
                lng: 76.3454,
                intensity: 9, // High intensity
                images: [
                    `http://${ipad}:5500/images/pothole1.png`,
                    `http://${ipad}:5500/images/pothole2.png`
                ]
            },
            {
                name: "Location B",
                lat: 9.4320,
                lng: 76.4953,
                intensity: 6, // Medium intensity
                images: [
                    "https://source.unsplash.com/200x150/?pothole3",
                    "https://source.unsplash.com/200x150/?pothole4"
                ]
            },
            {
                name: "Location C",
                lat: 12.9507,
                lng: 77.5848,
                intensity: 3, // Low intensity
                images: [
                    "https://source.unsplash.com/200x150/?pothole5",
                    "https://source.unsplash.com/200x150/?pothole6"
                ]
            }
        ];

        // Add markers with fixed-size circles for pothole intensity
        potholeData.forEach(loc => {
            let marker = L.marker([loc.lat, loc.lng], {
                icon: createCustomIcon(loc.intensity)
            }).addTo(map);

            let popupContent = `
                <div class="popup-header">
                    <h3>${loc.name}</h3>
                </div>
                <div class="popup-content">
                    <span class="intensity-badge" style="background: ${getMarkerColor(loc.intensity)}">
                        Severity: ${loc.intensity}/10
                    </span>
                    <div class="popup-images">
                        ${loc.images.map(img => `
                            <img src="${img}" alt="Pothole image">
                        `).join('')}
                    </div>
                </div>
            `;
            
            marker.bindPopup(popupContent, {
                maxWidth: 300,
                className: 'modern-popup'
            });
        });
    }

    // Menu functionality (shared between pages)
    const menuBtn = document.getElementById("menu-btn");
    const menuOptions = document.getElementById("menu-options");

    if (menuBtn && menuOptions) {
        menuBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            menuOptions.style.display = menuOptions.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", function(e) {
            if (!menuOptions.contains(e.target) && e.target !== menuBtn) {
                menuOptions.style.display = "none";
            }
        });
    }
});

