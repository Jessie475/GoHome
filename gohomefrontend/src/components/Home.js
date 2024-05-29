/* global google */
import { Wrapper } from '@googlemaps/react-wrapper';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../css/Home.css';

const GoogleMap = React.forwardRef(({ center, zoom, children, data }, ref) => {

    const [locations, setLocations] = useState([]);
    const mapRef = useRef(null);
    const map = useRef(null);
    const geocoder = useRef(null);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        const house = { name, address };
        console.log(house);
        fetch('http://localhost:8081/house/addHouse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(house),
        }).then((response) => {
            if (response.ok) {
                geocodeData(geocoder.current, locations);
                showAllLocations(map.current, locations);
            } else {
                console.error('Server error:', response.status);
            }
        }).catch((error) => {
            console.error('Fetch error:', error);
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const houseResponse = await fetch('http://localhost:8081/house/getAllHouses');
                if (!houseResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const houseData = await houseResponse.json();
                houseData.forEach(house => house.type = 'house');

                const articleResponse = await fetch('http://localhost:8081/articles/getAllArticle');
                if (!articleResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const articleData = await articleResponse.json();
                articleData.forEach(article => article.type = 'article');

                const combinedData = [...houseData, ...articleData];

                console.log('Fetched allData:', combinedData);
                setLocations(combinedData);
            } catch (error) {
                console.error('Error fetching allData:', error);
            }
        };

        fetchData();
    }, []);

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
    };

    const loadMap = useCallback(() => {
        if (mapRef.current) {
            map.current = new google.maps.Map(mapRef.current, {
                zoom,
                center,
            });

            geocoder.current = new google.maps.Geocoder();
            locations.forEach((location) => {
                <Marker
                    map={map.current}
                    position={{ lat: location.lat, lng: location.lng }}
                    title={location.name}
                />;
            });

            geocodeData(geocoder.current, locations);
            showAllLocations(map.current, locations);
        }
    }, [center, zoom, data, locations]);

    useEffect(() => {
        loadMap();
    }, [loadMap, center, zoom, data, locations]);

    const geocodeData = (geocoder, data) => {
        if (!Array.isArray(data)) {
            console.error('Error: locations is not an array');
            return;
        }

        data.forEach((location) => {
            if (location.lat == null || location.lng == null) {
                const address = `${location.name} ${location.address}`;
                geocoder.geocode({ address }, (results, status) => {
                    if (status === 'OK') {
                        const lat = results[0].geometry.location.lat();
                        const lng = results[0].geometry.location.lng();
                        updateMarkerWithLatLng(location.id, lat, lng, location.type);
                    } else {
                        console.error('Geocode was not successful for the following reason:', status);
                    }
                });
            }
        });
    };

    const showAllLocations = (map, data) => {
        const infoWind = new google.maps.InfoWindow();

        data.forEach((data) => {
          const title = data.type === 'house' ? data.name : data.title;
          const route = data.type === 'house' ? 'rental' : data.title;
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
        });
    };

    const updateMarkerWithLatLng = async (id, lat, lng, type) => {
        try {
            let url;
            if (type === 'house') {
                url = `http://localhost:8081/house/updateLatLng/${id}`;
            } else if (type === 'article') {
                url = `http://localhost:8081/article/updateLatLng/${id}`;
            }

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lat, lng }),
            });

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

const Home = () => {
    const googleMapRef = useRef(null);
    const center = { lat: 24.982, lng: 121.565 };
    const zoom = 15;
    const googleApiKey = 'AIzaSyAyqdIvF6Rk1UROBq9cuieBahgD7adDb0k';

    return (
        <div>
            <Wrapper apiKey={googleApiKey} render={(status) => <h1>{status}</h1>}>
                <GoogleMap
                    center={center}
                    zoom={zoom}
                    ref={googleMapRef}
                />
            </Wrapper>
        </div>
    );
};

export default Home;
