import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/DetailPage.css';
import Banner from './Banner';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, text: '這是一個很好的房子！', time: '2024-05-25 12:00', likes: 2 },
    { id: 2, text: '非常喜歡這個地點！', time: '2024-05-24 15:30', likes: 5 }
  ]);
  const [likes, setLikes] = useState(0); // 新增一个状态来跟踪点赞数量

  useEffect(() => {
    if (id) {
      console.log(`Fetching article with ID: ${id}`); // 调试输出
      fetch(`http://localhost:8081/article/getArticle/${id}`)
        .then(response => {
          console.log('Response:', response); // 调试输出
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data:', data); // 调试输出
          setArticle(data);
          setLikes(data.likes || 0); // 初始化点赞数量
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [id]);

  const handleCommentSubmit = () => {
    const newComment = {
      id: comments.length + 1,
      text: comment,
      time: new Date().toISOString(),
      likes: 0
    };
    setComments([...comments, newComment]);
    setComment('');
  };

  const likeComment = (id) => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  const handleLike = () => {
    setLikes(likes + 1); // 点赞数量加1
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
          <div className='action-buttons'>
            <button className="like-button" onClick={handleLike}>讚 {likes}</button>
            <button className="favorite-button">收藏</button>
            <button className="contact-button">聯絡發文者</button>
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
          {comments.map(({ id, text, time, likes }) => (
            <div key={id} className="comment">
              <div className="comment-header">
                <span className="commenter-id">ID: {id}</span>
                <span className="comment-time">{time}</span>
              </div>
              <p>{text}</p>
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
