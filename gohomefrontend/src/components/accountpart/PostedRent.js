import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../components/Banner';
import { UserContext } from '../../contexts/UserContext';

function PostedRent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posted, setPosted] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.userId) {
      fetch(`http://localhost:8081/users/${user.userId}/myhouse`)
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

  const handleDelete = (id) => {
    console.log('Deleting house with id:', id); // 确保函数被调用
    fetch(`http://localhost:8081/house/delete/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        console.log('House deleted successfully:', id); 
        alert('該房屋已刪除');
        // 确保服务器返回正确响应
        setPosted(posted.filter(post => post.id !== id));
      } else {
        console.error('Error deleting house'); // 处理错误情况
      }
    })
    .catch(error => console.error('Error deleting house:', error)); // 处理错误情况
  };

  const filteredPosts = posted
    .filter(post => post.title && post.title.includes(searchTerm))
    .map(post => ({
      ...post,
      content: `${post.title}`,
      link: `/rental/${post.id}`
    }));

  return (
    <div>
      <Banner title="我的房屋" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      <div style={{ width: '97%', margin: '20px auto', padding: '0', listStyleType: 'none' }}>
        <h2>我的房屋</h2>
        {filteredPosts.map((item, index) => (
          <div key={index} style={{ backgroundColor: '#F6EEE0', border: '1px solid #ccc', marginBottom: '20px', padding: '10px', transition: 'background-color 0.3s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href={item.link} style={{ textDecoration: 'none', margin: '10px', color: 'black', flex: 1 }}>
              {item.content}
            </a>
            <Link to={`/modifyrent/${item.id}`} style={{ textDecoration: 'none', marginRight: '10px' }}> {/* 在这里传递房屋ID */}
              <button style={{ padding: '5px 10px', backgroundColor: '#db6845', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
                修改
              </button>
            </Link>
            <button style={{ padding: '5px 10px', backgroundColor: '#db6845', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }} onClick={() => handleDelete(item.id)}>
              删除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostedRent;
