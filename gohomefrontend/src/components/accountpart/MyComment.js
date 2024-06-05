// import React, { useState } from 'react';
// import GenericList from '../GenericList';
// import Banner from '../../components/Banner';
// 
// 
// function MyComment() {
//   const comments = [];
//   for (let i = 1; i <= 18; i++) {
//     comments.push({
//       id: i,
//       name: `${i}條留言`,
//       description: '描述',
//       link: `/comment/${i}`
//     });
//   }
// 
//   const [searchTerm, setSearchTerm] = useState('');
// 
//   return (
//     <div>
//       <div>
//         <Banner title="我的留言" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
//       </div>
//       <GenericList
//         title="我的文章"
//         items={comments.map(comment => ({
//           content: `${comment.name}: ${comment.description}`,
//           link: comment.link  // 連接至原文
//         }))}
//       />
//     </div>
//   );
// }
// 
// export default MyComment;
// 
// 
// 

import React, { useContext, useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import { UserContext } from '../../contexts/UserContext';

function MyComment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.userId) {
      fetch(`http://localhost:8081/users/${user.userId}/mycomment`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setComments(data);
          console.log(data)
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    console.log('Deleting comment with id:', id); // 確保函數被調用
    fetch(`http://localhost:8081/A_comment/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log('Comment deleted successfully:', id); // 確保服務器返回正確響應
        setComments(comments.filter(comment => comment.id !== id));
      } else {
        console.error('Error deleting comment'); // 處理錯誤情況
      }
    })
    .catch(error => console.error('Error deleting comment:', error)); // 處理錯誤情況
  };

  const filteredComments = comments
    .filter(comment => comment.content && comment.content.includes(searchTerm))
    .map(comment => ({
      ...comment,
      id: comment.id,
      content: `${comment.content}`,
      link: `/articles/${comment.article_id}` 
      // 確保鏈接指向文章頁面
    }));

  return (
    <div>
      <Banner title="我的留言" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      <div style={{ width: '97%', margin: '20px auto', padding: '0', listStyleType: 'none' }}>
        <h2>我的留言</h2>
        {filteredComments.map((item, index) => (
          <div key={index} style={{ backgroundColor: '#F6EEE0', border: '1px solid #ccc', marginBottom: '20px', padding: '10px', transition: 'background-color 0.3s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href={item.link} style={{ textDecoration: 'none', margin: '10px', color: 'black', flex: 1 }}>
              {item.content}
            </a>
            <button style={{ padding: '5px 10px', backgroundColor: '#db6845', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }} onClick={() => handleDelete(item.id)}>
              删除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyComment;
