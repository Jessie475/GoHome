// import React, { useContext, useEffect, useState } from 'react';
// import Banner from '../../components/Banner';
// import { UserContext } from '../../contexts/UserContext';
// 
// function MyPost() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [posts, setPosts] = useState([]);
//   const { user } = useContext(UserContext);
// 
//   useEffect(() => {
//     if (user && user.userId) {
//       fetch(`http://localhost:8081/article/user/${user.userId}`)
//         .then(response => response.json())
//         .then(data => setPosts(data))
//         .catch(error => console.error('Error fetching data:', error));
//     }
//   }, [user]);
// 
//   const handleDelete = (id) => {
//     fetch(`http://localhost:8081/article/delete/${id}`, {
//       method: 'DELETE',
//     })
//     .then(response => {
//       if (response.ok) {
//         setPosts(posts.filter(post => post.id !== id));
//       } else {
//         console.error('Error deleting article');
//       }
//     })
//     .catch(error => console.error('Error deleting article:', error));
//   };
// 
//   const filteredPosts = posts
//     .filter(post => post.title && post.title.includes(searchTerm))
//     .map(post => ({
//       ...post,
//       content: `${post.title}: ${post.description}`,
//       link: `/mypost/${post.id}`
//     }));
// 
//   return (
//     <div>
//       <Banner title="我的文章" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
//       <div style={{ width: '97%', margin: '20px auto', padding: '0', listStyleType: 'none' }}>
//         <h2>我的文章</h2>
//         {filteredPosts.map((item, index) => (
//           <div key={index} style={{ backgroundColor: '#F6EEE0', border: '1px solid #ccc', marginBottom: '20px', padding: '10px', transition: 'background-color 0.3s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <a href={item.link} style={{ textDecoration: 'none', margin: '10px', color: 'black', flex: 1 }}>
//               {item.content}
//             </a>
//             <button style={{ padding: '5px 10px', backgroundColor: '#db6845', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }} onClick={() => handleDelete(item.id)}>
//               删除
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// 
// export default MyPost;
// 


import React, { useContext, useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import { UserContext } from '../../contexts/UserContext';

function MyPost() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.userId) {
      fetch(`http://localhost:8081/article/user/${user.userId}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [user]);

  const handleDelete = (id) => {
    fetch(`http://localhost:8081/article/delete/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== id));
        alert('該房屋已刪除');
      } else {
        console.error('Error deleting article');
      }
    })
    .catch(error => console.error('Error deleting article:', error));
  };

  const filteredPosts = posts
    .filter(post => post.title && post.title.includes(searchTerm))
    .map(post => ({
      ...post,
      content: `${post.title}: ${post.description}`,
      link: `/mypost/${post.id}`
    }));

  return (
    <div>
      <Banner title="我的文章" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      <div style={{ width: '97%', margin: '20px auto', padding: '0', listStyleType: 'none' }}>
        <h2>我的文章</h2>
        {filteredPosts.map((item, index) => (
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

export default MyPost;

