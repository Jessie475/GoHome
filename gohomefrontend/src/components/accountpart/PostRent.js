import React, { useState } from 'react';
import '../../css/PostPageStyles.css';
import Banner from '../../components/Banner';

function PostRent() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [rent, setRent] = useState('');
  const [size, setSize] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content });
    // 添加提交到服務器的code
  };

  return (
    <div>
      <div>
        <Banner title="新增出租 " /> {/* 橫幅顯示 */}
      </div>
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
            <label htmlFor="rent">租金</label>
            <input
              id="rent"
              value={rent}
              onChange={e => setRent(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="size">房屋大小</label>
            <input
              id="size"
              value={size}
              onChange={e => setSize(e.target.value)}
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
          <div>
            <label htmlFor="image-upload" className="addimg-label">新增圖片</label>
            <div className="button-container">
              <input
                id="image-upload"
                type="file"
                onChange={e => setImage(e.target.files[0])}
                className="form-control"
              />              <button type="submit" className="submit-button">發佈</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostRent;
