/* global google */
import { Wrapper } from '@googlemaps/react-wrapper';
import React, { useEffect, useRef, useState } from 'react';

const googleApiKey = 'AIzaSyAyqdIvF6Rk1UROBq9cuieBahgD7adDb0k';

const Map = ({ center, zoom, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (ref.current && !map) {
      //eslint-disable-next-line
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  // 將地圖作為 props 傳遞給子組件
  return (
    <>
      <div ref={ref} style={{ height: '500px', width: '100%' }} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = ({ map, position, title }) => {
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!marker && map&& position && typeof position.lat === 'number' && typeof position.lng === 'number') {
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

  return null;
};

const App = () => {
  const [locations, setLocations] = useState([]);
  const center = { lat: 25.0330, lng: 121.5645 };
  const zoom = 12;

  useEffect(() => {
    fetch('http://localhost/kokonut/location/api.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched locations:', data); 
        setLocations(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Access Google Maps API in PHP</h1>
      <Wrapper apiKey={googleApiKey} render={(status) => <h1>{status}</h1>}>
        <Map center={center} zoom={zoom}>
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
            />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};

export default App;