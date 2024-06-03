// // PostedRent.js
// import React, { useState } from 'react';
// import GenericList from '../GenericList';
// import Banner from '../../components/Banner';
// 
// function PostedRent() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const posted = [];
//   for (let i = 1; i <= 18; i++) {
//     posted.push({
//       id: i,
//       name: `${i}間房屋`,
//       description: '描述',
//       link: `/post/${i}`
//     });
//   }
// 
//   return (
//     <div>
//       <Banner title="我的房屋" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
//       <GenericList
//         title="我的房屋"
//         items={posted.filter(posted => posted.name.includes(searchTerm)).map(posted => ({
//           content: `${posted.name}: ${posted.description}`,
//           link: posted.link  // 連接至原文
//         }))}
//       />
//     </div>
//   );
// }
// 
// export default PostedRent;


import React, { useState, useEffect, useContext } from 'react';
import GenericList from '../GenericList';
import Banner from '../../components/Banner';
import { UserContext } from '../../contexts/UserContext';

function PostedRent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posted, setPosted] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.userId) {
      fetch(`http://localhost:8081/users/${user.userId}/myhouses`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setPosted(data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [user]);

  return (
    <div>
      <Banner title="我的房屋" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      <GenericList
        title="我的房屋"
        items={posted.filter(post => post.title && post.title.includes(searchTerm)).map(post => ({
          content: `${post.title}: ${post.description}`,
          link: `/postedrent/${post.id}`  // 連接至原文
        }))}
      />
    </div>
  );
}

export default PostedRent;
