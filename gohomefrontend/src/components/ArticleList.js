import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/ArticleList.css'; 

function ArticleList() {  

  const articles = [];
  for (let i = 1; i <= 18; i++) {
    articles.push({
      id: i,
      name: `${i}號文章`,
      img: `/images/room${i}.jpg`,
      description: '環境安靜。'
    });
  }

  // 狀態管理
  const [currentPage, setCurrentPage] = useState(1); //當前頁數
  const [itemsPerPage] = useState(10); //每頁項目數

  // 分頁計算
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);

  // 換頁
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <ul className="article-list">
        {currentItems.map((article) => ( 
          <li key={article.id} className="article-item">
            <img src={article.img} alt={`Image of ${article.name}`} className="article-image" />
            <div className="article-info">
              <h3>{article.name}</h3>
              <p>{article.description}</p>
              <Link to={`/article/${article.id}`} className="article-link">查看更多</Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {[...Array(Math.ceil(articles.length / itemsPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)} className="page-link">
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
