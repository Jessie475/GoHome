/* global google */
import { Wrapper } from '@googlemaps/react-wrapper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Home.css';
import Banner from './Banner';

const GoogleMap = React.forwardRef(({ zoom }, ref) => {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);
    const map = useRef(null);
    // const geocoder = useRef(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8081/house/getHouse/${id}`)
                .then(response => response.json())
                .then(data => {
                    setLocation(data);
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
                center: location ? { lat: location.lat, lng: location.lng } : { lat: 0, lng: 0 },
            });
            if (location) {
                <Marker
                    map={map.current}
                    position={{ lat: location.lat, lng: location.lng }}
                    title={location.name}
                />;
                showAllLocations(map.current, location);
            }
        }
    }, [zoom, location]);

    useEffect(() => {
        loadMap();
    }, [loadMap]);

    const showAllLocations = (map, data) => {
        const infoWind = new google.maps.InfoWindow();
        const title = data.title;
        const route = data.type === 'house' ? 'rental' : 'article';
        const content = `
            <strong>${title}</strong><br>
            ${data.description}<br>
            ${data.price ? `Price: ${data.price}<br>` : ''}
            <a href="/${route}/${data.id}" target="_blank" rel="noopener" style="cursor: pointer; color: rgb(66, 127, 237); text-decoration: none;">View details</a>
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
