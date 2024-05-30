// // SavedHouse.js
// import React, { useState } from 'react';
// import GenericList from '../GenericList';
// import Banner from '../../components/Banner';
// 
// const savedhouses = [];
// 
// for (let i = 1; i <= 18; i++) {
//   savedhouses.push({
//     id: i,
//     name: `${i}間房屋`,
//     description: '描述',
//     link: `/savedhouse/${i}`
//   });
// }
// 
// function SavedHouse() {
//   const [searchTerm, setSearchTerm] = useState('');
//   return (
//     <div>
//       <div>
//         <Banner title="收藏的房屋" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
//       </div>
//       <GenericList
//         title="我的收藏房屋"
//         items={savedhouses.map(savedhouse => ({
//           content: `${savedhouse.name}: ${savedhouse.description}`,
//           link: savedhouse.link  // 連接至原文
//         }))}
//       />
// 
//       
//     </div>
//   );
// }
// export default SavedHouse;


import React, { useState, useEffect, useContext } from 'react';
import GenericList from '../GenericList';
import Banner from '../../components/Banner';
import { UserContext } from '../../contexts/UserContext';

function SavedHouse() {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedHouses, setSavedHouses] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.userId) {
      fetch(`http://localhost:8081/users/${user.userId}/favhouses`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setSavedHouses(data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [user]);

  return (
    <div>
      <div>
        <Banner title="收藏的房屋" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      </div>
      <GenericList
        title="我的收藏房屋"
        items={savedHouses.map(savedHouse => ({
          content: `${savedHouse.name}: ${savedHouse.description}`,
          link: `/savedhouse/${savedHouse.id}` // 传递正确的链接路径
        }))}
      />
    </div>
  );
}

export default SavedHouse;
