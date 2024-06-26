import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import GenericList from './GenericList';

function RentalList() {

  // const rentals = [];
  // for (let i = 1; i <= 18; i++) {
  //   rentals.push({
  //     id: i,
  //     name: `${i}號房`,
  //     address: `SomeAddress ${i}`,
  //     img: `/images/room${i}.jpg`,
  //     description: `描述 ${i}`,
  //     link: `/rental/${i}`,
  //     rent: i * 1000,
  //     type: i % 2 === 0 ? "單人" : "雙人",
  //     subsidy: i % 3 === 0 ? "有" : "無",
  //     size: 3 + i,
  //     rating: 4 + (i % 2)
  //   });
  //}
  const [houses, setHouses] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [addressSearch, setAddressSearch] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/house/getAllHouses');
      console.log('API Response Status:', response.status);
      console.log('API Response Data:', response.data);
      if (Array.isArray(response.data)) {
      
        const cleanedData = response.data.map(house => ({
          house_Id: house.id,
          contactInfo: house.contactInfo,
          address: house.address,
          title: house.title,
          lat: house.lat,
          lng: house.lng,
          rate: house.rate,
          type: house.type,
          roomType: house.roomType,
          price: house.price,
          restriction: house.restriction,
          size: house.size,
          subsidy: house.subsidy,
          startdate: house.startdate,
          lease: house.lease,
          description: house.description,
        }));
        setHouses(cleanedData);
      } else {
        console.error('Fetched data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  const handleClearFilters = () => {
    setFilters({});
    setAddressSearch('');
    setSortField('');
    setSortDirection('');
    setCurrentPage(1); // Optionally reset to the first page
  };

  const sortedFilteredItems = Array.isArray(houses) ? houses.filter(house => {
    return (
      (filters.price === '0-5000' ? house.price <= 5000 : true) &&
      (filters.price === '5000-10000' ? house.price > 5000 && house.price <= 10000 : true) &&
      (filters.price === '10000-20000' ? house.price > 10000 && house.price <= 20000 : true) &&
      (filters.subsidy !== undefined ? house.subsidy === (filters.subsidy === '1') : true) &&
      (filters.size === '0-5' ? house.size <= 5 : true) &&
      (filters.size === '5-10' ? house.size > 5 && house.size <= 10 : true) &&
      (filters.size === '10+' ? house.size > 10 : true) &&
      (filters.rate === '4-5' ? house.rate >= 4 && house.rate <= 5 : true) &&
      (filters.rate === '3-4' ? house.rate >= 3 && house.rate < 4 : true) &&
      (filters.rate === 'below-3' ? house.rate < 3 : true) &&
      (filters.roomType ? house.roomType === filters.roomType : true) &&
      (addressSearch ? house.address.toLowerCase().includes(addressSearch.toLowerCase()) : true)
    );
  }).sort((a, b) => {
    if (!sortField) return 0;
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'ascending' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'ascending' ? 1 : -1;
    }
    return 0;
  }) : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFilteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddressSearchChange = (e) => {
    setAddressSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    const [field, direction] = e.target.value.split('|');
    setSortField(field);
    setSortDirection(direction);
  };

  return (
    <div>
      <Banner title="尋找房屋 " /> {/* 橫幅顯示 */}
      <div className="filter-form">
        <input
          type="text"
          placeholder="搜尋地址..."
          value={addressSearch}
          onChange={handleAddressSearchChange}
        />
        <select name="price" onChange={handleFilterChange}>
          <option value="">房租區間</option>
          <option value="0-5000">0~5000</option>
          <option value="5000-10000">5000~10000</option>
          <option value="10000-20000">10000~20000</option>
        </select>
        <select name="roomType" onChange={handleFilterChange}>
          <option value="">所有類型</option>
          <option value="ROOM">雅房</option>
          <option value="STUDIO">套房</option>
        </select>
        <select name="subsidy" onChange={handleFilterChange}>
          <option value="">租房補助</option>
          <option value="1">有</option>
          <option value="0">無</option>
        </select>
        <select name="size" onChange={handleFilterChange}>
          <option value="">坪數區間</option>
          <option value="0-5">0~5</option>
          <option value="5-10">5~10</option>
          <option value="10+">10以上</option>
        </select>
        <select name="rate" onChange={handleFilterChange}>
          <option value="">評價區間</option>
          <option value="4-5">4~5顆星</option>
          <option value="3-4">3~4顆星</option>
          <option value="below-3">3顆星以下</option>
        </select>
        <select onChange={handleSortChange}>
          <option value="">排序方式</option>
          <option value="price|ascending">租金升序</option>
          <option value="price|descending">租金降序</option>
          <option value="roomType|ascending">房型升序</option>
          <option value="roomType|descending">房型降序</option>
          <option value="rate|ascending">評價升序</option>
          <option value="rate|descending">評價降序</option>
        </select>
        <button onClick={handleClearFilters}>清除設定</button>
      </div>
      <GenericList
        items={currentItems.map(house => ({
          content: `${house.title}: ${house.description}`,
          link: `/rental/${house.house_Id}`
        }))}
      />
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedFilteredItems.length / itemsPerPage) }, (_, i) => (
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
        <Link to="/postrent" className="add-button">+</Link>
      </div>
    </div>
  );
}

export default RentalList;
