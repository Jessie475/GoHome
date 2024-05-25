import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/RentalList.css'; 

function RentalList() {  

  const rentals = [];
  for (let i = 1; i <= 18; i++) {
    rentals.push({
      id: i,
      name: `${i}號房`,
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
  const currentItems = rentals.slice(indexOfFirstItem, indexOfLastItem);

  // 換頁
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <ul className="rental-list">
        {currentItems.map((rental) => ( 
          <li key={rental.id} className="rental-item">
            <img src={rental.img} alt={`Image of ${rental.name}`} className="rental-image" />
            <div className="rental-info">
              <h3>{rental.name}</h3>
              <p>{rental.description}</p>
              <Link to={`/rental/${rental.id}`} className="rental-link">查看更多</Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {[...Array(Math.ceil(rentals.length / itemsPerPage)).keys()].map(number => (
          <button key={number + 1} onClick={() => paginate(number + 1)} className="page-link">
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RentalList;
