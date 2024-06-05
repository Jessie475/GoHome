// // // SavedArticle.js
// // import React, { useState } from 'react';
// // import GenericList from '../GenericList';
// // import Banner from '../../components/Banner';
// // 
// // const savedarticles = [];
// // for (let i = 1; i <= 18; i++) {
// //   savedarticles.push({
// //     id: i,
// //     name: `${i}篇文章`,
// //     description: '描述',
// //     link: `/savedarticle/${i}`
// //   });
// // }
// // 
// // function SavedArticle() {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   return (
// //     <div>
// //       <div>
// //         <Banner title="收藏的文章" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
// //       </div>
// //       <GenericList
// //         title="我的收藏文章"
// //         items={savedarticles.map(savedarticle => ({
// //           content: `${savedarticle.name}: ${savedarticle.description}`,
// //           link: savedarticle.link  // 連接至原文
// //         }))}
// //       />
// //     </div>
// //   );
// // }
// // 
// // export default SavedArticle;
// import React, { useState, useEffect, useContext } from 'react';
// import GenericList from '../GenericList';
// import Banner from '../../components/Banner';
// import { UserContext } from '../../contexts/UserContext';
// 
// function SavedArticle() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [savedArticles, setSavedArticles] = useState([]);
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
// 
//   useEffect(() => {
//     if (user && user.userId) {
//       fetch(`http://localhost:8081/users/${user.userId}/favarticles`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then(data => {
//           setSavedArticles(data);
//         })
//         .catch(error => {
//           console.error('There was a problem with the fetch operation:', error);
//         });
//     }
//   }, [user]);
// 
//   const handleItemClick = (id) => {
//     navigate(`/savedarticle/${id}`);
//   };
// 
//   return (
//     <div>
//       <div>
//         <Banner title="收藏的文章" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
//       </div>
//       <GenericList
//         title="我的收藏文章"
//         items={savedArticles.map(savedArticle => ({
//           content: `${savedArticle.title}: ${savedArticle.description}`,
//           link: savedArticle.link, // 假设后端返回的文章数据包含链接
//           onClick: () => handleItemClick(savedArticle.id)
//         }))}
//       />
//     </div>
//   );
// }
// 
// export default SavedArticle;

// 
// //ver2
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import GenericList from '../GenericList';
// import Banner from '../../components/Banner';
// import { UserContext } from '../../contexts/UserContext';
// 
// function SavedArticle() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [savedArticles, setSavedArticles] = useState([]);
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
// 
//   useEffect(() => {
//     if (user && user.userId) {
//       fetch(`http://localhost:8081/users/${user.userId}/favarticles`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then(data => {
//           setSavedArticles(data);
//         })
//         .catch(error => {
//           console.error('There was a problem with the fetch operation:', error);
//         });
//     }
//   }, [user]);
// 
//   const handleItemClick = (id) => {
//     navigate(`/savedarticle/${savedArticles.articleId}`);
//   };
// 
//   return (
//     <div>
//       <div>
//         <Banner title="收藏的文章" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
//       </div>
//       <GenericList
//         title="我的收藏文章"
//         items={savedArticles.map(savedArticle => ({
//           content: `${savedArticle.title}: ${savedArticle.description}`,
//           link: savedArticle.link,
//           onClick: () => handleItemClick(savedArticle.articleId) // 添加点击事件处理
//         }))}
//       />
//     </div>
//   );
// }
// 
// export default SavedArticle;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericList from '../GenericList';
import Banner from '../../components/Banner';
import { UserContext } from '../../contexts/UserContext';

function SavedArticle() {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedArticles, setSavedArticles] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.userId) {
      fetch(`http://localhost:8081/users/${user.userId}/favarticles`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setSavedArticles(data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [user]);


  return (
    <div>
      <div>
        <Banner title="收藏的文章" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      </div>
      <GenericList
        title="我的收藏文章"
        items={savedArticles.map(savedArticle => ({
          content: `${savedArticle.title}: ${savedArticle.description}`,
          link: `/savedarticle/${savedArticle.id}` // 傳遞正確的id
        }))}
      />
    </div>
  );
}

export default SavedArticle;
