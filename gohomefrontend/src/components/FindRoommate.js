import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GenericList from './GenericList';
import Banner from './Banner';

function FindRoommate() {
  const roommates = [];
  for (let i = 1; i <= 18; i++) {
    roommates.push({
      id: i,
      name: `室友 ${i}`,
      description: `信息 ${i}`,
      link: `/roommate/${i}`
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoommates = roommates.filter(roommate =>
    roommate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roommate.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRoommates.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Banner title="尋找室友" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      <GenericList
        items={currentItems.map(roommate => ({
          content: `${roommate.name}: ${roommate.description}`,
          link: roommate.link
        }))}
      />
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredRoommates.length / itemsPerPage) }, (_, i) => (
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
      <div>
        <Link to="/postfindroommate" className="add-button">+</Link>
      </div>

    </div>
  );
}

export default FindRoommate;
