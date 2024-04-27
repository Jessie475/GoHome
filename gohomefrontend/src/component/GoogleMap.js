/* global google */
import React, { useCallback, useEffect, useRef, useState } from 'react';

const GoogleMap = ({ center, zoom, children, data }, ref) => {
    
    const [locations, setLocations] = useState([]);
    const mapRef = useRef(null);
    const map = useRef(null);
    const geocoder = useRef(null);

    useEffect(() => {
        // Fetch all data (allData) to be used with markers on the map
        fetch('http://localhost:8080/house/getAllHouses')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (!Array.isArray(data)) {
                    // 如果 data 不是陣列，嘗試將其轉換為陣列
                    data = [data];
                    console.log('data is no array')
                }
                console.log('Fetched allData:', data);
                setLocations(data);
            })
            .catch((error) => {
                console.error('Error fetching allData:', error);
            });
    }, []);

    const Marker = ({ map, position, title }) => {
        const [marker, setMarker] = useState(null);

        useEffect(() => {
            console.log('in');
            if (!marker && map && position && typeof position.lat === 'number' && typeof position.lng === 'number') {
                console.log('in if');
                const newMarker = new google.maps.Marker({
            position,
            map,
            title,
            });
            console.log('Marker position:', position);
            setMarker(newMarker);
            }
          // 卸载时移除標記
        return () => {
            if (marker) {
            marker.setMap(null);
            }
        };
        }, [map, marker, position, title]);
    };

    // Function to load the map and geocoder
    const loadMap = useCallback(() => {
        
        if (mapRef.current) {
            map.current = new google.maps.Map(mapRef.current, {
                zoom,
                center,
            });

            geocoder.current = new google.maps.Geocoder(); // 使用 'Geocoder' 而不是 'geocode'
            locations.forEach((location) => {
                console.log('marker:', location);
                <Marker
                    map={map.current}
                    position={{ lat: location.lat, lng: location.lng }}
                    title={location.name}
                />;
            });
            
            // Geocode the provided data and show all house locations
            
            // console.log('Locations before geocodeData:', locations);
            // geocodeData(geocoder.current, locations);            
            showAllHouses(map.current, locations);
            
        }
    }, [center, zoom, data, locations]);

    useEffect(() => {
        loadMap();// Load map when component mounts
    }, [loadMap, center, zoom, data, locations]);

    // Function for geocoding
    const geocodeData = (geocoder, data) => {
        if (!Array.isArray(data)) {
            console.error('Error: locations is not an array');
            
            return;
        }
    
        data.forEach((location) => {
            const address = `${location.name} ${location.address}`;
            geocoder.geocode({ address }, (results, status) => {
                if (status === 'OK') {
                    const points = {
                        id: location.id,
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    };

                    updateMarkerWithLatLng(points);
                } else {
                    console.error('Geocode was not successful for the following reason:', status);
                }
            });
        });
    };

    // Function to display markers for all house locations
    const showAllHouses = (map, data) => {
        const infoWind = new google.maps.InfoWindow();

        data.forEach((data) => {
            const content = document.createElement('div');
            const strong = document.createElement('strong');
            strong.textContent = data.name;
            content.appendChild(strong);

            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(data.lat, data.lng),
                map,
            });

            marker.addListener('mouseover', () => {
                infoWind.setContent(content);
                infoWind.open(map, marker);
            });
        });
    };

    // Function to update house information with latitude and longitude
    const updateMarkerWithLatLng = async (points) => {
        try {
            const response = await fetch(`http://localhost:8080/house/${points.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(points),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error updating house with lat/lng:', error);
        }
    };

    return (
        <>
            <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
            {children}
        </>
    );
};

// Exporting the component with forwardRef to pass ref from parent component
export default React.forwardRef(GoogleMap);
