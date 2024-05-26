import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DetailPage.css';
import Banner from './Banner';

function ArticleDetail() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, text: '這是一個很好的房子！', time: '2024-05-25 12:00', likes: 2 },
    { id: 2, text: '非常喜歡這個地點！', time: '2024-05-24 15:30', likes: 5 }
  ]);

  const handleBack = () => navigate(-1);
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

  return (
    <div>
      <div><Banner title="我的文章" /></div>
      <div className="detail-page">
        <div className="content">
          <h1>房屋title</h1>
          <p>這是關於房屋的詳細介紹...</p>
          <div className='action-buttons'>
            <button className="like-button">按讚</button>
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
