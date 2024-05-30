import axios from 'axios';
import React, { useContext, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { UserContext } from '../contexts/UserContext';
import '../css/PostPageStyles.css';
import Banner from './Banner';

function PostArticle() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const { user } = useContext(UserContext);

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('address', address);
    formData.append('description', content);
    formData.append('type', 'HOUSE_REVIEW'); // 默认类型为 HOUSE_REVIEW
    formData.append('userId', user.userId);
    formData.append('rate', rating); // 始终包含评分字段
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const response = await axios.post('http://localhost:8081/article/addArticle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('已成功上傳');  // 显示成功消息
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('失敗，請重試');  // 显示失败消息
    }
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
