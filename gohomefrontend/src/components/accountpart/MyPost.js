// // MyPost.js
// import React, { useState } from 'react';
// import GenericList from '../GenericList';
// import Banner from '../../components/Banner';
// 
// function MyPost() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const posts = [];
//   for (let i = 1; i <= 18; i++) {
//     posts.push({
//       id: i,
//       name: `${i}篇文章`,
//       description: '描述',
//       link: `/post/${i}`
//     });
//   }
// 
//   return (
//     <div>
//       <Banner title="我的文章" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
//       <GenericList
//         title="我的文章"
//         items={posts.filter(post => post.name.includes(searchTerm)).map(post => ({
//           content: `${post.name}: ${post.description}`,
//           link: post.link  // 連接至原文
//         }))}
//       />
//     </div>
//   );
// }
// 
// export default MyPost;


import React, { useState, useEffect, useContext } from 'react';
import GenericList from '../GenericList';
import Banner from '../../components/Banner';
import { UserContext } from '../../contexts/UserContext';

function MyPost() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
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
          setPosts(data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [user]);

  return (
    <div>
      <Banner title="我的文章" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      <GenericList
        title="我的文章"
        items={posts.filter(post => post.name.includes(searchTerm)).map(post => ({
          content: `${post.name}: ${post.description}`,
          link: `/mypost/${post.id}`  // 連接至原文
        }))}
      />
    </div>
  );
}

export default MyPost;

