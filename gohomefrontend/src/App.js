import { Wrapper } from '@googlemaps/react-wrapper';
import React, { useRef } from 'react';
import GoogleMap from './component/GoogleMap';
import House from './component/House';

const googleApiKey = 'AIzaSyAyqdIvF6Rk1UROBq9cuieBahgD7adDb0k';

const App = () => {
    const googleMapRef = useRef(null); // Reference for the GoogleMap component
    const center = { lat: 25.0330, lng: 121.5645 };
    const zoom = 12;

    return (
        <div className="container">
            <h1>Access Google Maps API in PHP</h1>
            <Wrapper apiKey={googleApiKey} render={(status) => <h1>{status}</h1>}>
                <GoogleMap
                    center={center}
                    zoom={zoom}
                    ref={googleMapRef} // Assigning the ref to the GoogleMap component
                >
                </GoogleMap>
            </Wrapper>
            <House />
        </div>
    );
};

export default App;
