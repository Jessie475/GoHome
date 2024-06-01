import React, { useContext, useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import { UserContext } from '../../contexts/UserContext';
import GenericList from '../GenericList';

function MyPost() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user.userId) {
      console.log('Fetching data for user:', user);
      fetch(`http://localhost:8081/article/user/${user.userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched data:', data);
          setPosts(data);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [user]);

  const filteredPosts = posts
    .filter(post => post.title && post.title.includes(searchTerm))
    .map(post => ({
      content: `${post.title}: ${post.description}`,
      link: `/mypost/${post.id}`
    }));

  console.log('Filtered posts:', filteredPosts);

  return (
    <div>
      <Banner title="我的文章" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
      <GenericList
        title="我的文章"
        items={filteredPosts}
      />
    </div>
  );
}

export default MyPost;
