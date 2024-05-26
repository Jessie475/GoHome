import React, { useState } from 'react';
import '../css/PostPageStyles.css';
import Banner from './Banner';
import StarRatings from 'react-star-ratings';

function PostArticle() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0); // 新增一個狀態來儲存評分
  const [image, setImage] = useState(null);

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, address, content, rating }); // 將評分添加到日誌輸出中
    // 添加提交到服務器的code
  };

  return (
    <div>
      <div><Banner title="分享文章" /></div>
      <div className="post-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">標題</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">地址</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">內容</label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="form-textarea"
            />
          </div>
          <div className="form-group">
            <label>評分</label>
            <StarRatings
              rating={rating}
              starRatedColor="gold"
              changeRating={changeRating}
              numberOfStars={5}
              name='rating'
            />
          </div>
          <label htmlFor="image-upload" className="addimg-label">新增圖片</label>
          <div className="button-container">
            <input
              id="image-upload"
              type="file"
              onChange={e => setImage(e.target.files[0])}
              className="form-control"
            />
            <button type="submit" className="submit-button">發佈</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostArticle;
