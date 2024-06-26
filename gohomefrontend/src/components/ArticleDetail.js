import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { UserContext } from '../contexts/UserContext';
import '../css/DetailPage.css';
import Banner from './Banner';

function ArticleDetail() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (id && id !== 'undefined') {
      console.log(`Fetching article with id: ${id}`);
      
      fetch(`http://localhost:8081/article/getArticle/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched article:', data);
          setArticle(data);
          setLikes(data.likes || 0);
        })
        .catch(error => {
          console.error('Error fetching article:', error);
        });

      fetch(`http://localhost:8081/A_comments/article/${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched comments:', data);
          setComments(Array.isArray(data) ? data : []);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
          setComments([]);
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
      alert('評論已成功發佈');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('評論發佈失敗，請重試');
    }
  };

  const handleFavorite = async () => {
    if (!user || !user.userId || !id) {
      alert('未登入！請先登入！');
      return;
    }
  
    try {
      // Fetch the current favorite articles
      const checkResponse = await fetch(`http://localhost:8081/users/${user.userId}/favarticles`);
      let favoriteArticles = [];
      if (checkResponse.ok) {
        favoriteArticles = await checkResponse.json();
      }

      const isFavorited = favoriteArticles.some(article => article.id === parseInt(id));
  
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

  const likeComment = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Banner title="文章詳情" />
      <div className="detail-page">
        <div className="content">
          <div className="title-row">
            <h1>{article.title}</h1>
            <StarRatings
              rating={article.rate || 0}
              starDimension="20px"
              starSpacing="2px"
              starRatedColor="gold"
            />
          </div>
          {article.imagePath && (
            <img src={`http://localhost:8081/images/${article.imagePath.split('/').pop()}`} alt="Article" width="300" height="300" />
          )}
          <p>{article.description}</p>
          <p><strong>地址:</strong> {article.address}</p>
          {/* <p>聯絡電話：{user.phone}</p> */}
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
            <button className="comment-submit-button" onClick={handleCommentSubmit}>發佈</button>
          </div>
        </div>
        <div className="comments-list">
          {comments.map(({ id, content, commentTime, userId }) => (
            <div key={id} className="comment">
              <div className="comment-header">
                <span className="commenter-id">User ID: {userId.userId}</span>
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

export default ArticleDetail;
