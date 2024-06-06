/* global google */
import { Wrapper } from '@googlemaps/react-wrapper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Home.css';
import Banner from './Banner';

const GoogleMap = React.forwardRef(({ zoom, data}, ref) => {
    const { id } = useParams();
    const [location, setLocation] = useState();
    const mapRef = useRef(null);
    const map = useRef(null);
    const geocoder = useRef(null);
    const [mapCenter, setMapCenter] = useState();
    const [previousAddress, setPreviousAddress] = useState('');


    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8081/house/getHouse/${id}`)
                .then(response => response.json())
                .then(data => {
                    setLocation(data);
                    setPreviousAddress(`${data.name} ${data.address}`);
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error fetching house:', error);
                });
        }
    }, [id]);
    
    const Marker = ({ map, position, title }) => {
        const [marker, setMarker] = useState(null);

        useEffect(() => {
            if (!marker && map && position && typeof position.lat === 'number' && typeof position.lng === 'number') {
                const newMarker = new google.maps.Marker({
                    position,
                    map,
                    title,
                });
                setMarker(newMarker);
            }
            return () => {
                if (marker) {
                    marker.setMap(null);
                }
            };
        }, [map, marker, position, title]);

        return null;
    };

    const loadMap = useCallback(() => {
        if (mapRef.current) {
            map.current = new google.maps.Map(mapRef.current, {
                zoom,
                center: mapCenter,
            });
            if (location) {
                geocoder.current = new google.maps.Geocoder();
                <Marker
                    map={map.current}
                    position={{ lat: location.lat, lng: location.lng }}
                    title={location.name}
                />;
                geocodeData(geocoder.current, location);
                showAllLocations(map.current, location);
            }
        }
    }, [zoom, data, location]);

    useEffect(() => {
        loadMap();
    }, [loadMap, zoom, data, location]);

    const geocodeData = (geocoder, data) => {
        if (!Array.isArray(data)) {
            data = [data];
        }
        data.forEach((location) => {
            const currentAddress = `${location.name} ${location.address}`;
            if (location.lat == null || location.lng == null || currentAddress !== previousAddress) {
                const address = `${location.name} ${location.address}`;
                geocoder.geocode({ address }, (results, status) => {
                    if (status === 'OK') {
                        const lat = results[0].geometry.location.lat();
                        const lng = results[0].geometry.location.lng();
                        updateMarkerWithLatLng(location.id, lat, lng, location.type);
                        setMapCenter({ lat, lng });
                        setPreviousAddress(currentAddress); // Update previous address
                    } else {
                        console.error('Geocode was not successful for the following reason:', status);
                    }
                });
            }else {
                setMapCenter({ lat: location.lat, lng: location.lng }); // Set center if lat/lng already exists
            }
        });
    };

    const showAllLocations = (map, data) => {
        const infoWind = new google.maps.InfoWindow();
        const title = data.title;
        const content = `
            <strong>${title}</strong><br>
            ${data.description}<br>
            ${data.price ? `Price: ${data.price}<br>` : ''}
            <a href="/rental/${data.id}" target="_blank" rel="noopener" style="cursor: pointer; color: rgb(66, 127, 237); text-decoration: none;">View details</a>
        `;
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(data.lat, data.lng),
            map,
        });

        marker.addListener('click', () => {
            infoWind.setContent(content);
            infoWind.open(map, marker);
        });
    };
    const updateMarkerWithLatLng = async (id, lat, lng, type) => {
        try {
            let url;
                url = `http://localhost:8081/house/updateLatLng/${id}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lat, lng }),
            });
            setMapCenter({ lat, lng });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error updating location with lat/lng:', error);
        }
    };

    return (
        <>
            <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />
        </>
    );
});

const HouseMap = () => {
    const googleMapRef = useRef(null);
    const zoom = 16;
    const googleApiKey = 'AIzaSyAyqdIvF6Rk1UROBq9cuieBahgD7adDb0k'; // replace with your actual API key
    return (
        <div>
            <Banner title="尋找房屋 "/>
            <Wrapper apiKey={googleApiKey} render={(status) => <h1>{status}</h1>}>
                <GoogleMap
                    zoom={zoom}
                    ref={googleMapRef}
                />
            </Wrapper>
        </div>
    );
};

export default HouseMap;
