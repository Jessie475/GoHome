import React, { useState } from 'react';
import GenericList from '../GenericList';
import Banner from '../../components/Banner';


function MyComment() {
  const comments = [];
  for (let i = 1; i <= 18; i++) {
    comments.push({
      id: i,
      name: `${i}條留言`,
      description: '描述',
      link: `/comment/${i}`
    });
  }

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div>
        <Banner title="我的留言" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      </div>
      <GenericList
        title="我的文章"
        items={comments.map(comment => ({
          content: `${comment.name}: ${comment.description}`,
          link: comment.link  // 連接至原文
        }))}
      />
    </div>
  );
}

export default MyComment;



