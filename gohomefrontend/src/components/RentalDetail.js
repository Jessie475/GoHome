import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { UserContext } from '../contexts/UserContext';
import '../css/RentalDetail.css';
import Banner from './Banner';
import GenericList from './GenericList';

function RentalDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const { user } = useContext(UserContext);
    const [house, setHouse] = useState(null);
    const [articles, setArticles] = useState([]);
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        if (id && id !== 'undefined') {
            console.log(`Fetching house with id: ${id}`);
            fetch(`http://localhost:8081/house/getHouse/${id}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched house:', data);
                    setHouse(data);
                })
                .catch(error => {
                    console.error('Error fetching house:', error);
                });

            fetch(`http://localhost:8081/house/getHouseArticle/${id}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched articles:', data);
                    setArticles(Array.isArray(data) ? data : []);
                })
                .catch(error => {
                    console.error('Error fetching related articles:', error);
                    setArticles([]);
                });
        }
    }, [id]);

    const showMap = () => {
        navigate(`/housemap/${id}`);
    };

    const currentItems = articles;
    const toggleFavorite = () => setFavorite(!favorite);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    if (!house) return <div>Loading...</div>;

    const handleFavorite = async () => {
        if (!user || !user.userId || !id) {
            alert('未登入！請先登入！');
            return;
        }

        try {
            const checkResponse = await fetch(`http://localhost:8081/users/${user.userId}/favhouses`);
            const favoriteHouses = await checkResponse.json();
            const isFavorited = favoriteHouses.some(house => house.id === parseInt(id));

            if (isFavorited) {
                const confirmUnfavorite = window.confirm('已收藏，要取消收藏嗎？');
                if (!confirmUnfavorite) {
                    return;
                }
                const unfavoriteResponse = await fetch(`http://localhost:8081/users/${user.userId}/favorite-houses/${id}`, {
                    method: 'DELETE',
                });

                if (!unfavoriteResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                alert('收藏已取消');
                setFavorite(false);
            } else {
                const favoriteResponse = await fetch(`http://localhost:8081/users/${user.userId}/favorite-houses/${id}`, {
                    method: 'POST',
                });

                if (!favoriteResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                alert('文章已成功收藏');
                setFavorite(true);
            }
        } catch (error) {
            console.error('Error handling favorite:', error);
            alert('文章收藏失敗，請重試');
        }
    };

    return (
        <div>
            <Banner title="租房詳情" />
            <div className="rental-detail-container">
                <div className="rental-grid">
                    <div className="rental-type">
                        <p className='rental-title'><strong>{house.title}</strong></p>
                        <StarRatings rating={house.rate} starDimension="20px" starSpacing="2px" starRatedColor="gold" />
                        <div className="rental-control-buttons"></div>
                        <button className="toggle-favorite" onClick={handleFavorite}>收藏</button>
                        <button className="show-map" onClick={showMap}>在地圖中顯示</button>
                    </div>
                </div>
                <div className="contact-info">
                    <p><strong>聯絡資訊：</strong>{house.contactInfo}</p>
                    <p><strong>起租日：</strong>{new Date(house.startdate).toLocaleDateString()}</p>
                    <p><strong>租期：</strong>{house.lease}<strong>年</strong></p>
                </div>
                <div className="rental-info">
                    <p><strong>地址：</strong>{house.address}</p>
                    <p><strong>房型：</strong>{house.roomType}</p>
                    <p><strong>房屋大小：</strong>{house.size}</p>
                    <p><strong>租金：</strong>{house.price}</p>
                    <p><strong>租屋補助：</strong>{house.subsidy ? '是' : '否'}</p>
                    <p><strong>詳細描述：</strong>{house.description}</p>
                    <p><strong>限制：</strong>{house.restriction}</p>
                </div>
                <div className="rental-images">
                    {house.imagePath && (
                        <img src={`http://localhost:8081/images/${house.imagePath.split('/').pop()}`} alt="House" width="300" height="300" />
                    )}
                </div>
                <GenericList
                    title="相關文章"
                    items={currentItems.map(article => ({
                        content: `${article.title}: ${article.description}`,
                        link: `/articles/${article.id}`
                    }))}
                />
                <div className="pagination">
                    {Array.from({ length: Math.ceil(currentItems.length / itemsPerPage) }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            disabled={currentPage === i + 1}
                            className="page-link"
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RentalDetail;
