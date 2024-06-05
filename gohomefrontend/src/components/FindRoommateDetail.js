import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../css/DetailPage.css';
import Banner from './Banner';

function FindRoommateDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const { user } = useContext(UserContext);
  const [favorite, setFavorite] = useState([]);


  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8081/article/getArticle/${id}`)
        .then(response => response.json())
        .then(data => {
          setArticle(data);
          setLikes(data.likes || 0);
        })
        .catch(error => {
          console.error('Error fetching article:', error);
        });

      fetch(`http://localhost:8081/A_comments/article/${id}`)
        .then(response => response.json())
        .then(data => {
          setComments(data);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!comment || !user || !user.userId) return;
    try {
      const response = await fetch(`http://localhost:8081/A_comments/addComment?userId=${user.userId}&articleId=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: comment
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newComment = await response.json();
      setComments([...comments, newComment]);
      setComment('');
      alert('評論已成功發布');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('評論已成功發布，請重試');
    }
  };

  const likeComment = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };
  const handleFavorite = async () => {
    if (!user || !user.userId || !id) {
      alert('未登入！請先登入！');
      return;
    }
  
    try {
      // Fetch the current favorite houses
      const checkResponse = await fetch(`http://localhost:8081/users/${user.userId}/favarticles`);
      const favoriteHouses = await checkResponse.json();
      const isFavorited = favoriteHouses.some(house => house.id === parseInt(id));
  
      if (isFavorited) {
        const confirmUnfavorite = window.confirm('已收藏，要取消收藏嗎？');
        if (!confirmUnfavorite) {
          return;
        }
        // Cancel the favorite
        const unfavoriteResponse = await fetch(`http://localhost:8081/users/${user.userId}/favorite-articles/${id}`, {
          method: 'DELETE',
        });
  
        if (!unfavoriteResponse.ok) {
          throw new Error('Network response was not ok');
        }
  
        alert('收藏已取消');
        setFavorite(false);
      } else {
        // Add the favorite
        const favoriteResponse = await fetch(`http://localhost:8081/users/${user.userId}/favorite-articles/${id}`, {
          method: 'POST',
        });
  
        if (!favoriteResponse.ok) {
          throw new Error('Network response was not ok');
        }
  
        alert('文章已成功收藏');
        setFavorite(true);
      }
    } catch (error) {
      console.error('Error handling favorite:', error);
      alert('文章收藏失敗，請重試');
    }
  };
  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div><Banner title="文章詳情" /></div>
      <div className="detail-page">
        <div className="content">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <p>{user.contactInfo}</p>
          <div className='action-buttons'>
            <button className="like-button" onClick={handleLike}>讚 {likes}</button>
            <button className="favorite-button" onClick={handleFavorite}>收藏</button>
            {/* <button className="contact-button">聯絡發文者</button> */}
          </div>
        </div>
        <div className="comment-section">
          <input
            className='comment-input-text'
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="新增留言..."
          />
          <div className="comment-actions">
            <button className="comment-submit-button" onClick={handleCommentSubmit}>發布</button>
          </div>
        </div>
        <div className="comments-list">
          {comments.map(({ id, content, commentTime, likes }) => (
            <div key={id} className="comment">
              <div className="comment-header">
                <span className="commenter-id">ID: {id}</span>
                <span className="comment-time">{new Date(commentTime).toLocaleString()}</span>
              </div>
              <p>{content}</p>
              <div className="comment-actions">
                <button className="comment-like-button" onClick={() => likeComment(id)}>讚 {likes}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindRoommateDetail;