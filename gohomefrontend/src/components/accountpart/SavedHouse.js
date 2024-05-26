// SavedHouse.js
import React, { useState } from 'react';
import GenericList from '../GenericList';
import Banner from '../../components/Banner';

const savedhouses = [];

for (let i = 1; i <= 18; i++) {
  savedhouses.push({
    id: i,
    name: `${i}間房屋`,
    description: '描述',
    link: `/savedhouse/${i}`
  });
}

function SavedHouse() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
      <div>
        <Banner title="收藏的房屋" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      </div>
      <GenericList
        title="我的收藏房屋"
        items={savedhouses.map(savedhouse => ({
          content: `${savedhouse.name}: ${savedhouse.description}`,
          link: savedhouse.link  // 連接至原文
        }))}
      />
    </div>
  );
}
export default SavedHouse;