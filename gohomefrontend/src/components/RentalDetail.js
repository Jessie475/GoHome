import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import '../css/RentalDetail.css';
import Banner from './Banner';
import GenericList from './GenericList';
import dayjs from 'dayjs';  // 导入 Day.js
import { Link } from 'react-router-dom';


function RentalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  //const [listType, setListType] = useState('articles'); // 确保正确定义
  const [favorite, setFavorite] = useState(false);
  
  const [house, setHouse] = useState(null);
  const [articles, setArticles] = useState([]);
  
  //const [comments, setComments] = useState([]);
  
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
          console.log('Fetched articles:', data); // 确认数据结构
          setArticles(Array.isArray(data) ? data : []);
        })
        .catch(error => {
          console.error('Error fetching related articles:', error);
          setArticles([]);
        });
    }
  }, [id]);

  const showMap = () => {
    navigate(`/housemap/${id}`); // 跳转
  };

  const currentItems = articles;
  console.log(currentItems);
  const toggleFavorite = () => setFavorite(!favorite);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (!house) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <Banner title="租房詳情" />
      </div>
      <div className="rental-detail-container">
        <div className="rental-grid">
          <div className="rental-type">
            <p className='rental-title'><strong>標題：</strong>{house.title}</p>
            <StarRatings rating={house.rate} starDimension="20px" starSpacing="2px" starRatedColor="gold" />
            <div className="rental-control-buttons">
              <button className="toggle-favorite" onClick={toggleFavorite}>
                {favorite ? "取消收藏" : "收藏"}
              </button>
              <button className="show-map" onClick={showMap}>在地圖中顯示</button>
            </div>
          </div>
          <div className="contact-info">
            <p><strong>聯絡資訊：</strong>{house.contactInfo}</p>
            <p><strong>起租日：</strong>
            {dayjs(house.startDate).format('YYYY-MM-DD')}  {/* 使用 Day.js 格式化日期 */}
            </p>
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
            {/* <ImageCarousel images={rental.images} /> */}
            <p>我是圖片!!!</p>
          </div>
        </div>
        {/* <div className="switch-buttons">
          <button className="switch-articles" onClick={() => setListType('articles')}>相關文章</button>
          <button className="switch-messages" onClick={() => setListType('messages')}>相關留言</button>
        </div> */}
        

        <GenericList
          title="文章列表"
          items={currentItems.map(articles => ({
            content: `${articles.title}: ${articles.description}`,
            link: `/articles/${articles.id}` // 确保链接正确指向文章详细页面
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