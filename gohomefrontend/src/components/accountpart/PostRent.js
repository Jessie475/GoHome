import React, { useState } from 'react';
import Banner from '../../components/Banner';
import '../../css/PostPageStyles.css';

function PostRent() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [rent, setRent] = useState('');
  const [subsidy, setSubsidy] = useState('');
  const [leaseTerm, setLeaseTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, type, size, rent, subsidy, leaseTerm, startDate, address, contactInfo, content, image });
    // 添加提交到服务器的代码
  };

  return (
    <div>
      <Banner title="新增出租" />
      <div className="post-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">標題</label>
            <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" />
          </div>
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="type">類型</label>
              <select id="type" value={type} onChange={e => setType(e.target.value)} className="form-control">
                <option value="">選擇類型</option>
                <option value="apartment">公寓</option>
                <option value="house">獨棟房屋</option>
                <option value="studio">工作室</option>
              </select>
            </div>
            <div className="form-group half-width">
              <label htmlFor="rent">租金</label>
              <input id="rent" type="text" value={rent} onChange={e => setRent(e.target.value)} className="form-control" />
            </div>


          </div>
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="subsidy">租屋補助</label>
              <select id="subsidy" value={subsidy} onChange={e => setSubsidy(e.target.value)} className="form-control">
                <option value="">選擇租屋補助</option>
                <option value="none">無補助</option>
                <option value="government">政府補助</option>
                <option value="private">私人補助</option>
              </select>
            </div>
            <div className="form-group half-width">
              <label htmlFor="size">坪數</label>
              <input id="size" type="text" value={size} onChange={e => setSize(e.target.value)} className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="startDate">起租日</label>
              <input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="date-input" />
            </div>
            <div className="form-group half-width">
              <label htmlFor="leaseTerm">租期</label>
              <input id="leaseTerm" type="text" value={leaseTerm} onChange={e => setLeaseTerm(e.target.value)} className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">地址</label>
            <input id="address" type="text" value={address} onChange={e => setAddress(e.target.value)} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="contactInfo">聯絡資訊</label>
            <input id="contactInfo" type="text" value={contactInfo} onChange={e => setContactInfo(e.target.value)} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="content">更多資訊</label>
            <textarea id="content" value={content} onChange={e => setContent(e.target.value)} className="form-textarea" />
          </div>
          <div className="form-group">
            <label htmlFor="image-upload" className="addimg-label">新增圖片</label>
            <input id="image-upload" type="file" onChange={e => setImage(e.target.files[0])} className="form-control" />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">發佈</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostRent;