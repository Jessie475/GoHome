/* global google */
import React, { useEffect, useRef } from 'react';

const GoogleMap = ({ center, zoom, children, data, allData }) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const geocoder = useRef(null);

    // Load the map and geocoder
    useEffect(() => {
        const loadMap = () => {
            map.current = new google.maps.Map(mapRef.current, {
                zoom,
                center,
            });
            geocoder.current = new google.maps.Geocoder();

            // Add the default marker
            new google.maps.Marker({
                position: center,
                map: map.current,
            });

            // Geocode the provided data and show all house locations
            if (data) {
                useGeocode(geocoder.current, map.current, data);
            }

            if (allData) {
                showAllHouses(map.current, allData);
            }
        };

        loadMap();
    }, [center, zoom, data, allData]);

    // Custom hook for geocoding
    const useGeocode = (geocoder, map, cdata) => {
        cdata.forEach((data) => {
            const address = `${data.name} ${data.address}`;
            geocoder.geocode({ address }, (results, status) => {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    const points = {
                        id: data.id,
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    };

                    updateCollegeWithLatLng(points);
                } else {
                    console.error('Geocode was not successful for the following reason:', status);
                }
            });
        });
    };

    // Function to display markers for all house locations
    const showAllHouses = (map, allData) => {
        const infoWind = new google.maps.InfoWindow();

        allData.forEach((data) => {
            const content = document.createElement('div');
            const strong = document.createElement('strong');
            strong.textContent = data.name;
            content.appendChild(strong);

            const img = document.createElement('img');
            img.src = 'img/Leopard.jpg';
            img.style.width = '100px';
            content.appendChild(img);

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

    // Function to update college information with latitude and longitude
    const updateCollegeWithLatLng = async (points) => {
        try {
            const response = await fetch('http://localhost:8080/house', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(points),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error updating college with lat/lng:', error);
        }
    };

    return (
        <>
            <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
            {children}
        </>
    );
};

export default GoogleMap;
