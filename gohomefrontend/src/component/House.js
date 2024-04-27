import React, { useEffect, useState } from 'react';

export default function House() {
    const paperStyle = {
        padding: '50px 20px',
        width: '600px',
        margin: '20px auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };
    
    
    const [houses, setStudents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/house/getAllHouses')
            .then((res) => res.json())
            .then((result) => {
                setStudents(result);
            });
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>House</h1>
            <div style={paperStyle}>
                {houses.map((house) => (
                    <div key={house.id} style={{ margin: '10px', padding: '15px', textAlign: 'left', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <p>Id: {house.id}</p>
                        <p>Name: {house.name}</p>
                        <p>Address: {house.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
