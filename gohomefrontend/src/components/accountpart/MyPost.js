// MyPost.js
import React, { useState } from 'react';
import GenericList from '../GenericList';
import Banner from '../../components/Banner';

function MyPost() {
  const [searchTerm, setSearchTerm] = useState('');
  const posts = [];
  for (let i = 1; i <= 18; i++) {
    posts.push({
      id: i,
      name: `${i}篇文章`,
      description: '描述',
      link: `/post/${i}`
    });
  }

  return (
    <div>
      <Banner title="我的文章" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      <GenericList
        title="我的文章"
        items={posts.filter(post => post.name.includes(searchTerm)).map(post => ({
          content: `${post.name}: ${post.description}`,
          link: post.link  // 連接至原文
        }))}
      />
    </div>
  );
}

export default MyPost;
