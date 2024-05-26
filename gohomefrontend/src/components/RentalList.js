import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import GenericList from './GenericList';



function RentalList() {
  const rentals = [];
  for (let i = 1; i <= 18; i++) {
    rentals.push({
      id: i,
      name: `${i}號房`,
      address: `SomeAddress ${i}`,
      img: `/images/room${i}.jpg`,
      description: `描述 ${i}`,
      link: `/rental/${i}`,
      rent: i * 1000,
      type: i % 2 === 0 ? "單人" : "雙人",
      subsidy: i % 3 === 0 ? "有" : "無",
      size: 3 + i,
      rating: 4 + (i % 2)
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [addressSearch, setAddressSearch] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const handleClearFilters = () => {
    setFilters({});
    setAddressSearch('');
    setSortField('');
    setSortDirection('');
    setCurrentPage(1); // Optionally reset to the first page
  };

  const sortedFilteredItems = rentals.filter(rental => {
    return (filters.rent ? rental.rent <= parseInt(filters.rent, 10) : true) &&
      (filters.type ? rental.type === filters.type : true) &&
      (filters.subsidy ? rental.subsidy === filters.subsidy : true) &&
      (filters.size ? rental.size <= parseInt(filters.size, 10) : true) &&
      (filters.rating ? rental.rating >= parseInt(filters.rating, 10) : true) &&
      (addressSearch ? rental.address.toLowerCase().includes(addressSearch.toLowerCase()) : true);
  }).sort((a, b) => {
    if (!sortField) return 0;
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'ascending' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'ascending' ? 1 : -1;
    }
    return 0;
  });

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
        <select name="rent" onChange={handleFilterChange}>
          <option value="">房租區間</option>
          <option value="0~5000">0~5000</option>
          <option value="5001~10000">5001~10000</option>
        </select>
        <select name="type" onChange={handleFilterChange}>
          <option value="">所有類型</option>
          <option value="單人">單人</option>
          <option value="雙人">雙人</option>
        </select>
        <select name="subsidy" onChange={handleFilterChange}>
          <option value="">租房補助</option>
          <option value="有">有</option>
          <option value="無">無</option>
        </select>
        <select name="size" onChange={handleFilterChange}>
          <option value="">坪數區間</option>
          <option value="0~5">0~5</option>
          <option value="5~10">5~10</option>
        </select>
        <select name="rating" onChange={handleFilterChange}>
          <option value="">評價區間</option>
          <option value="4~5">4~5顆星</option>
          <option value="3~4">3~4顆星</option>
          <option value="0~3">3顆星以下</option>
        </select>
        <select onChange={handleSortChange}>
          <option value="">排序方式</option>
          <option value="rent|ascending">租金升序</option>
          <option value="rent|descending">租金降序</option>
          <option value="type|ascending">房型升序</option>
          <option value="type|descending">房型降序</option>
          <option value="rating|ascending">評價升序</option>
          <option value="rating|descending">評價降序</option>
        </select>
        <button onClick={handleClearFilters}>清除設定</button>
      </div>
      <GenericList
        items={currentItems.map(rental => ({
          content: `${rental.img}: ${rental.name}: ${rental.description}`,
          link: rental.link
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
    </div>
  );
}

export default RentalList;
