import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import GenericList from './GenericList';

function FindRoommate() {
  const [roommates, setRoommates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRoommates();
  }, []);

  const fetchRoommates = async () => {
    try {
      const response = await axios.get('http://localhost:8081/article/filterType/ROOMMATE_SEARCH');
      console.log('API Response Status:', response.status); 
      console.log('API Response Data:', response.data); 
      if (Array.isArray(response.data)) {
        const cleanedData = response.data.map(roommate => ({
          articleId: roommate.id,
          title: roommate.title,
          address: roommate.address,
          rate: roommate.rate,
          description: roommate.description,
          type: roommate.type,
          createdAt: roommate.createdAt,
          comments: roommate.comments ? roommate.comments.length : 0,
        }));
        setRoommates(cleanedData);
      } else {
        console.error('Fetched data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching roommates:', error);
    }
  };

  const filteredRoommates = Array.isArray(roommates) ? roommates.filter(roommate => {
    return roommate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roommate.description.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRoommates.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log('Filtered Roommates:', filteredRoommates);
  console.log('Current Items:', currentItems);

  return (
    <div>
      <Banner title="尋找室友" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      <GenericList
        items={currentItems.map(roommate => ({
          content: `${roommate.title}: ${roommate.description}`,
          link: `/roommate/${roommate.articleId}`
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
