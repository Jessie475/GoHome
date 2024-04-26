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
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [houses, setStudents] = useState([]);

    const handleClick = async (e) => {
        e.preventDefault();
        const house = { name, address };
        console.log(house);
        fetch('http://localhost:8080/house/addHouse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(house),
        }).then((response) => {
            if (response.ok) {
                // 請求成功的邏輯
            } else {
                // 處理服務器返回的錯誤狀態碼
                console.error('Server error:', response.status);
            }
        }).catch((error) => {
            console.error('Fetch error:', error);
        });
    };

    useEffect(() => {
        fetch('http://localhost:8080/house/getAllHouses')
            .then((res) => res.json())
            .then((result) => {
                setStudents(result);
            });
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <div style={paperStyle}>
                <h1 style={{ color: 'blue' }}>
                    <u>Add House</u>
                </h1>
                <form onSubmit={handleClick}>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="House Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="House Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', borderRadius: '5px' }}>
                        Submit
                    </button>
                </form>
            </div>
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
