import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GenericList from './GenericList';
import Banner from './Banner';

function ArticleList() {
  const articles = [];
  for (let i = 1; i <= 18; i++) {
    articles.push({
      id: i,
      name: `文章 ${i}`,
      description: `描述 ${i}`,
      link: `/article/${i}`
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(article =>
    article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Banner title="文章列表" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      <GenericList
        items={currentItems.map(article => ({
          content: `${article.name}: ${article.description}`,
          link: article.link
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
