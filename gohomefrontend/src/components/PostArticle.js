import axios from 'axios';
import React, { useContext, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { v4 as uuidv4 } from 'uuid';
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const uniqueFileName = uuidv4() + '.' + file.name.split('.').pop();
      const uniqueFile = new File([file], uniqueFileName, { type: file.type });
      setImage(uniqueFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.userId) {
      alert('請先登錄再發布文章');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('address', address);
    formData.append('description', content);
    formData.append('type', 'HOUSE_REVIEW');
    formData.append('userId', user.userId);
    formData.append('rate', rating);

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
      alert('已成功上傳');
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('失敗，請重試');
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
              onChange={handleFileChange}
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
