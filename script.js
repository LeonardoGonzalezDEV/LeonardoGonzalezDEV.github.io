// Datos de ejemplo de puntos de recolección en Tepic
        const wasteCollectionPoints = [
            {
                id: 1,
                name: "Colonia Centro",
                coordinates: [-104.8936, 21.5041],
                schedule: [
                    { day: "Lun", time: "7:00 AM", type: "Orgánica" },
                    { day: "Mié", time: "7:30 AM", type: "Inorgánica" },
                    { day: "Vie", time: "8:00 AM", type: "Reciclable" }
                ]
            },
            {
                id: 2,
                name: "Colonia Tierra y Libertad",
                coordinates: [-104.8856, 21.4981],
                schedule: [
                    { day: "Mar", time: "6:30 AM", type: "Orgánica" },
                    { day: "Jue", time: "7:00 AM", type: "Inorgánica" },
                    { day: "Sab", time: "8:30 AM", type: "Reciclable" }
                ]
            },
            {
                id: 3,
                name: "Colonia Insurgentes",
                coordinates: [-104.8996, 21.5101],
                schedule: [
                    { day: "Lun", time: "8:00 AM", type: "Orgánica" },
                    { day: "Mié", time: "8:30 AM", type: "Inorgánica" },
                    { day: "Vie", time: "9:00 AM", type: "Reciclable" }
                ]
            },
            {
                id: 4,
                name: "Colonia Buenos Aires",
                coordinates: [-104.8776, 21.5161],
                schedule: [
                    { day: "Mar", time: "7:00 AM", type: "Orgánica" },
                    { day: "Jue", time: "7:30 AM", type: "Inorgánica" },
                    { day: "Sab", time: "9:00 AM", type: "Reciclable" }
                ]
            },
            {
                id: 5,
                name: "Colonia Las Flores",
                coordinates: [-104.9056, 21.4921],
                schedule: [
                    { day: "Lun", time: "6:00 AM", type: "Orgánica" },
                    { day: "Mié", time: "6:30 AM", type: "Inorgánica" },
                    { day: "Vie", time: "7:00 AM", type: "Reciclable" }
                ]
            },
            {
                id: 6,
                name: "Colonia Morelos",
                coordinates: [-104.8896, 21.5201],
                schedule: [
                    { day: "Mar", time: "8:30 AM", type: "Orgánica" },
                    { day: "Jue", time: "9:00 AM", type: "Inorgánica" },
                    { day: "Sab", time: "8:00 AM", type: "Reciclable" }
                ]
            },
            {
                id: 7,
                name: "Colonia Revolución",
                coordinates: [-104.8816, 21.4861],
                schedule: [
                    { day: "Lun", time: "7:30 AM", type: "Orgánica" },
                    { day: "Mié", time: "8:00 AM", type: "Inorgánica" },
                    { day: "Vie", time: "8:30 AM", type: "Reciclable" }
                ]
            },
            {
                id: 8,
                name: "Colonia San Juan",
                coordinates: [-104.9116, 21.5081],
                schedule: [
                    { day: "Mar", time: "6:00 AM", type: "Orgánica" },
                    { day: "Jue", time: "6:30 AM", type: "Inorgánica" },
                    { day: "Sab", time: "7:30 AM", type: "Reciclable" }
                ]
            },
            {
                id: 9,
                name: "Colonia Juárez",
                coordinates: [-104.8736, 21.5001],
                schedule: [
                    { day: "Lun", time: "9:00 AM", type: "Orgánica" },
                    { day: "Mié", time: "9:30 AM", type: "Inorgánica" },
                    { day: "Vie", time: "10:00 AM", type: "Reciclable" }
                ]
            },
            {
                id: 10,
                name: "Colonia Azteca",
                coordinates: [-104.8976, 21.4801],
                schedule: [
                    { day: "Mar", time: "7:30 AM", type: "Orgánica" },
                    { day: "Jue", time: "8:00 AM", type: "Inorgánica" },
                    { day: "Sab", time: "9:30 AM", type: "Reciclable" }
                ]
            }
        ];

        // Configuración de Mapbox
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VpZ281NjciLCJhIjoiY20xcGhzMHBqMDQwazJpcTczY293cW05aCJ9.kKKkIJk1mbeaHftzy6XCcw';

        // Inicializar el mapa
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-104.8936, 21.5041], // Centro de Tepic
            zoom: 13,
            attributionControl: false
        });

        // Función para crear el contenido del popup
        function createPopupContent(point) {
            let scheduleHTML = point.schedule.map(item => `
                <div class="schedule-item">
                    <div class="day-badge">${item.day}</div>
                    <div class="time-info">
                        <strong>${item.time}</strong><br>
                        <small>${item.type}</small>
                    </div>
                    <div class="waste-icon">♻️</div>
                </div>
            `).join('');

            return `
                <div class="popup-header">
                    <h3>${point.name}</h3>
                </div>
                <div class="popup-body">
                    ${scheduleHTML}
                </div>
            `;
        }

        // Variable para rastrear el popup actualmente abierto
        let currentPopup = null;

        // Evento cuando el mapa se carga
        map.on('load', () => {
            document.getElementById('loading').style.display = 'none';
            
            // Agregar marcadores para cada punto de recolección
            wasteCollectionPoints.forEach(point => {
                // Crear elemento del marcador
                const markerEl = document.createElement('div');
                markerEl.className = 'marker';
                
                // Crear popup
                const popup = new mapboxgl.Popup({
                    offset: 25,
                    closeButton: true,
                    closeOnClick: false
                }).setHTML(createPopupContent(point));

                // Crear y agregar marcador al mapa
                const marker = new mapboxgl.Marker(markerEl)
                    .setLngLat(point.coordinates)
                    .setPopup(popup)
                    .addTo(map);

                // Agregar evento click al marcador para controlar popups
                markerEl.addEventListener('click', () => {
                    // Cerrar popup actual si existe
                    if (currentPopup && currentPopup !== popup) {
                        currentPopup.remove();
                    }
                    // Actualizar referencia del popup actual
                    currentPopup = popup;
                });

                // Evento cuando se cierra el popup
                popup.on('close', () => {
                    if (currentPopup === popup) {
                        currentPopup = null;
                    }
                });
            });

            // Agregar controles de navegación
            map.addControl(new mapboxgl.NavigationControl(), 'top-right');
            
            // Control de geolocalización
            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            }), 'top-right');
        });

        // Ajustar el mapa al cambiar el tamaño de la ventana
        window.addEventListener('resize', () => {
            map.resize();
        });

        // Error handling para el mapa
        map.on('error', (e) => {
            console.error('Error en el mapa:', e);
            document.getElementById('loading').innerHTML = `
                <div class="spinner"></div>
                <p>Error al cargar el mapa. Verifique su conexión.</p>
            `;
        });
