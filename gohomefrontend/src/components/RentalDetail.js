import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { UserContext } from '../contexts/UserContext';
import '../css/RentalDetail.css';
import Banner from './Banner';
import GenericList from './GenericList';
<<<<<<< HEAD
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
  
=======
function RentalDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [listType, setListType] = useState('articles'); // 确保正确定义
    const { user } = useContext(UserContext);
    const [house, setHouse] = useState(null);
    const [articles, setArticles] = useState([]);
    const [comments, setComments] = useState([]);

>>>>>>> 27b65e5515ed1b91f393077a939556fdcee3bbe9
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
<<<<<<< HEAD

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
=======
// fetch(`http://localhost:8081/getHouseArticle/${id}`)
      //   .then(response => response.json())
      //   .then(data => {
      //     setArticles(data.articles || []);
      //     // setComments(data.comments || []);
      //   })
      //   .catch(error => {
      //     console.error('Error fetching related articles:', error);
      //   });
>>>>>>> 27b65e5515ed1b91f393077a939556fdcee3bbe9
    }
}, [id]);

<<<<<<< HEAD
  const showMap = () => {
    navigate(`/housemap/${id}`); // 跳转
  };

  const currentItems = articles;
  console.log(currentItems);
  const toggleFavorite = () => setFavorite(!favorite);

  const indexOfLastItem = currentPage * itemsPerPage;
=======
const showMap = () => {
  navigate(`/housemap/${id}`); // 跳转
};
const indexOfLastItem = currentPage * itemsPerPage;
>>>>>>> 27b65e5515ed1b91f393077a939556fdcee3bbe9
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (!house) return <div>Loading...</div>;

  const handleFavorite = async () => {
    if (!user || !user.userId || !id) return;
    try {
      const response = await fetch(`http://localhost:8081/house/favorite/${id}?userId=${user.userId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('文章已成功收藏');
    } catch (error) {
      console.error('Error favoriting article:', error);
      alert('文章收藏失敗，請重試');
    }
  };
  return (
    <div>
    <div>
        <Banner title="租房詳情" />
    </div>
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
            {/* <ImageCarousel images={rental.images} /> */}
            <p>我是圖片!!!</p>
        </div>
<<<<<<< HEAD
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

        
=======
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
          <div className="comments-list">
            {articles.map(({ id, title, description, likes }) => (
              <div key={id} className="comment">
                <div className="comment-header">
                  <span className="commenter-id">ID: {id}</span>
                  <span className="comment-time">Title: {title}</span>
                  <span className="comment-time">Description: {description}</span>
                </div>
                {/* <p>{content}</p> */}
                {/* <div className="comment-actions">
                  <button className="comment-like-button" onClick={() => likeComment(id)}>讚 {likes}</button>
                </div> */}
              </div>
            ))}
          </div>
>>>>>>> 27b65e5515ed1b91f393077a939556fdcee3bbe9
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