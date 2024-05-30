import axios from 'axios';
import React, { useState } from 'react';
import Banner from '../../components/Banner';
import '../../css/PostPageStyles.css';

function PostRent() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [rent, setRent] = useState('');
  const [subsidy, setSubsidy] = useState('');
  const [lease, setLease] = useState('');
  const [startDate, setStartDate] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [description, setDescription] = useState('');
  const [restriction, setRestriction] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const houseData = {
      title,
      type,
      size,
      rent,
      subsidy,
      lease,
      startdate: startDate, // 确保字段名称与后端匹配
      address,
      contactInfo,
      description,
      restriction,
      // 您可以根据需要处理 image 字段
    };
    
    console.log(houseData);
    
    try {
      const response = await axios.post('http://localhost:8081/house/addHouse', houseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('House added successfully:', response.data);
      // 清空表单或者进行其他操作
    } catch (error) {
      console.error('Error adding house:', error);
    }
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
                <option value="apartment">雅房</option>
                <option value="house">套房</option>
                {/* <option value="studio">工作室</option> */}
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
                {/* <option value="private">私人補助</option> */}
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
              <label htmlFor="lease">租期</label>
              <input id="lease" type="text" value={lease} onChange={e => setLease(e.target.value)} className="form-control" />
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
            <label htmlFor="description">描述</label>
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="form-textarea" />
          </div>
          <div className="form-group">
            <label htmlFor="restriction">限制</label>
            <textarea id="restriction" value={restriction} onChange={e => setRestriction(e.target.value)} className="form-textarea" />
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