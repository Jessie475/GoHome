import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Banner.css';

function Banner({ title, showSearch, onSearch }) {
    const navigate = useNavigate();

    return (
        <div className="banner">
            <button className="back-button" onClick={() => navigate(-1)}>上一頁</button>
            <p>{title}</p>
            {showSearch ? (
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="搜尋..."
                        onChange={e => onSearch(e.target.value)}
                    />
                    <button onClick={() => onSearch()}>搜尋</button>
                </div>
            ) : (
                <div className="placeholder"></div>  // 添加看不見的佔位組件
            )}
        </div>
    );
}

export default Banner;
