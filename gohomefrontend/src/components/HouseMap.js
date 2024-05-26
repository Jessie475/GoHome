import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';
import Banner from './Banner';

function Home() {
    return (
        <div>
            <Banner title="尋找房屋 " />
            <h1>地圖</h1>
        </div>
    );
}

export default Home;