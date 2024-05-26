import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GenericList from './GenericList';
import Banner from './Banner';
import '../css/RentalDetail.css';
import StarRatings from 'react-star-ratings';
import ImageCarousel from './ImageCarousel';

function RentalDetail() {
  const { rentalId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [listType, setListType] = useState('articles'); // 狀態

  const showMap = () => {
    navigate(`/housemap/${rentalId}`);  // 跳轉
  };

  const [favorite, setFavorite] = useState(false);
  const toggleFavorite = () => setFavorite(!favorite);

  const rental = {
    title: '新光路精製雙人套房',
    id: rentalId,
    type: '單人房',
    rent: '15000元/月',
    description: '這是一間非常適合單身人士的單人房，配有現代化的設施。',
    contact: {
      name: '黃小姐',
      phone: '0918883333',
      lineId: '0918883333'
    },
    address: '台北市大安區和平東路二段2號2樓'
  };

  // 相關的租房文章
  const relatedRentals = [];
  for (let i = 1; i <= 18; i++) {
    relatedRentals.push({
      id: i,
      name: `相關租房 ${i}`,
      description: `描述 ${i}`,
      link: `/rental/${i}`
    });
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 模擬文章和留言的數據
  const articles = [
    { id: 1, name: 'Article 1', description: 'Description 1', link: '/article/1' },
    { id: 2, name: 'Article 2', description: 'Description 2', link: '/article/2' },
  ];

  const messages = [
    { id: 1, name: 'Message 1', description: 'Message Content 1', link: '/message/1' },
    { id: 2, name: 'Message 2', description: 'Message Content 2', link: '/message/2' },
  ];

  const currentItems = listType === 'articles' ? articles : messages; // 條件渲染


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <Banner title="租房詳情" />
      </div>
      <div className="rental-detail-container">
        <div className="rental-grid">
          <div className="rental-type">
            <p className='rental-title'><strong>房型：</strong>{rental.title}</p>
            <StarRatings rating={3.5} starDimension="20px" starSpacing="2px" starRatedColor="gold" />
            <div className="rental-control-buttons">
              <button className="toggle-favorite" onClick={toggleFavorite}>
                {favorite ? "取消收藏" : "收藏"}
              </button>
              <button className="show-map" onClick={showMap}>在地圖中顯示</button>
            </div>
          </div>
          <div className="contact-info">
            <p><strong>聯絡人：</strong>{rental.contact.name}</p>
            <p><strong>電話：</strong>{rental.contact.phone}</p>
            <p><strong>Line ID：</strong>{rental.contact.lineId}</p>
          </div>
          <div className="rental-info">
            <p><strong>地址：</strong>{rental.address}</p>
            <p><strong>房型：</strong>{rental.type}</p>
            <p><strong>租金：</strong>{rental.rent}</p>
            <p><strong>詳細描述：</strong>{rental.description}</p>
          </div>
          <div className="rental-images">
            {/* <ImageCarousel images={rental.images} /> */}
            <p>我是圖片!!!</p>
          </div>
        </div>
        <div className="switch-buttons">
          <button className="switch-articles" onClick={() => setListType('articles')}>相關文章</button>
          <button className="switch-messages" onClick={() => setListType('messages')}>相關留言</button>
        </div>
        <GenericList
          items={currentItems.map(item => ({
            content: `${item.name}: ${item.description}`,
            link: item.link
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
