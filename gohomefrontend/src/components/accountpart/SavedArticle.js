// SavedArticle.js
import React, { useState } from 'react';
import GenericList from '../GenericList';
import Banner from '../../components/Banner';

const savedarticles = [];
for (let i = 1; i <= 18; i++) {
  savedarticles.push({
    id: i,
    name: `${i}篇文章`,
    description: '描述',
    link: `/savedarticle/${i}`
  });
}

function SavedArticle() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
      <div>
        <Banner title="收藏的文章" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      </div>
      <GenericList
        title="我的收藏文章"
        items={savedarticles.map(savedarticle => ({
          content: `${savedarticle.name}: ${savedarticle.description}`,
          link: savedarticle.link  // 連接至原文
        }))}
      />
    </div>
  );
}

export default SavedArticle;
