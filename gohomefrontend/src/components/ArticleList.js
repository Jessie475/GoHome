import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from './Banner';
import GenericList from './GenericList';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:8081/article/filterType/HOUSE_REVIEW');
      console.log('API Response Status:', response.status); 
      console.log('API Response Data:', response.data); 
      if (Array.isArray(response.data)) {
        const cleanedData = response.data.map(article => ({
          articleId: article.id,
          title: article.title,
          address: article.address,
          rate: article.rate,
          description: article.description,
          type: article.type,
          createdAt: article.createdAt,
          comments: article.comments ? article.comments.length : 0, 
        }));
        setArticles(cleanedData);
      } else {
        console.error('Fetched data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setRatingFilter('');
    setSortField('');
    setSortDirection('');
    setCurrentPage(1);
  };

  const filteredArticles = Array.isArray(articles) ? articles.filter(article => {
    const matchesSearchTerm = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRatingFilter = ratingFilter ? article.rate >= parseInt(ratingFilter, 10) : true;
    return matchesSearchTerm && matchesRatingFilter;
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
  const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log('Filtered Articles:', filteredArticles); // 打印过滤后的文章
  console.log('Current Items:', currentItems); // 打印当前页的数据

  return (
    <div>
      <Banner title="文章列表" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      <div className="filter-form">
        <select name="rating" onChange={(e) => setRatingFilter(e.target.value)}>
          <option value="">評分</option>
          <option value="4">4颗星以上</option>
          <option value="3">3颗星以上</option>
          <option value="2">2颗星以上</option>
          <option value="1">1颗星以上</option>
        </select>
        <select onChange={(e) => {
          const [field, direction] = e.target.value.split('|');
          setSortField(field);
          setSortDirection(direction);
        }}>
          <option value="">排序方式</option>
          <option value="rate|ascending">评估升序</option>
          <option value="rate|descending">评估降序</option>
          <option value="createdAt|ascending">时间升序</option>
          <option value="createdAt|descending">时间降序</option>
        </select>
        <button onClick={handleClearFilters}>清除设置</button>
      </div>
      <GenericList
        title="文章列表"
        items={currentItems.map(article => ({
          content: `${article.title}: ${article.description}`,
          link: `/articles/${article.articleId}` // 确保链接正确指向文章详细页面
        }))}
      />
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredArticles.length / itemsPerPage) }, (_, i) => (
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
        <Link to="/postarticle" className="add-button">+</Link>
      </div>
    </div>
  );
}

export default ArticleList;

// 陳麗星最新的
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import GenericList from './GenericList';
// import Banner from './Banner';
// 
// function ArticleList() {
//   const articles = [];
//   for (let i = 1; i <= 18; i++) {
//     articles.push({
//       id: i,
//       name: `文章 ${i}`,
//       description: `描述 ${i}`,
//       link: `/article/${i}`,
//       rating: 4 + (i % 2)
//     });
//   }
// 
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [ratingFilter, setRatingFilter] = useState('');
//   const [sortField, setSortField] = useState('');
//   const [sortDirection, setSortDirection] = useState('');
// 
//   const handleClearFilters = () => {
//     setSearchTerm('');
//     setRatingFilter('');
//     setSortField('');
//     setSortDirection('');
//     setCurrentPage(1);
//   };
// 
//   const filteredArticles = articles.filter(article =>
//     (article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       article.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
//     (ratingFilter ? article.rating >= parseInt(ratingFilter, 10) : true)
//   ).sort((a, b) => {
//     if (!sortField) return 0;
//     if (a[sortField] < b[sortField]) {
//       return sortDirection === 'ascending' ? -1 : 1;
//     }
//     if (a[sortField] > b[sortField]) {
//       return sortDirection === 'ascending' ? 1 : -1;
//     }
//     return 0;
//   });
// 
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);
// 
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
// 
//   return (
//     <div>
//       <Banner title="文章列表" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
//       <div className="filter-form">
//         <select name="rating" onChange={(e) => setRatingFilter(e.target.value)}>
//           <option value="">評價區間</option>
//           <option value="4~5">4~5顆星</option>
//           <option value="3~4">3~4顆星</option>
//           <option value="0~3">3顆星以下</option>
//         </select>
//         <select onChange={(e) => {
//           const [field, direction] = e.target.value.split('|');
//           setSortField(field);
//           setSortDirection(direction);
//         }}>
//           <option value="">排序方式</option>
//           <option value="rating|ascending">評價升序</option>
//           <option value="rating|descending">評價降序</option>
//         </select>
//         <button onClick={handleClearFilters}>清除設定</button>
//       </div>
//       <GenericList
//         items={currentItems.map(article => ({
//           content: `${article.name}: ${article.description}`,
//           link: article.link
//         }))}
//       />
//       <div className="pagination">
//         {Array.from({ length: Math.ceil(filteredArticles.length / itemsPerPage) }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => paginate(i + 1)}
//             disabled={currentPage === i + 1}
//             className="page-link"
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//       <div>
//         <Link to="/postarticle" className="add-button">+</Link>
//       </div>
//     </div>
//   );
// }
// 
// export default ArticleList;