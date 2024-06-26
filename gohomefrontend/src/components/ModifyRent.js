import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Banner from '../components/Banner';
import { UserContext } from '../contexts/UserContext';
import '../css/PostPageStyles.css';

function ModifyRent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [subsidy, setSubsidy] = useState('');
  const [lease, setLease] = useState('');
  const [startDate, setStartDate] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [description, setDescription] = useState('');
  const [restriction, setRestriction] = useState('');
  const [image, setImage] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8081/house/getHouse/${id}`)
        .then(response => {
          const house = response.data;
          setTitle(house.title);
          setType(house.roomType);
          setSize(house.size);
          setPrice(house.price);
          setSubsidy(house.subsidy ? 'true' : 'false');
          setLease(house.lease);
          setStartDate(new Date(house.startdate).toISOString().split('T')[0]);
          setAddress(house.address);
          setContactInfo(house.contactInfo);
          setDescription(house.description);
          setRestriction(house.restriction);
        })
        .catch(error => {
          console.error('Error fetching house data:', error);
        });
    }
  }, [id]);

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
      alert('請先登入再修改訊息');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('size', size);
    formData.append('price', price);
    formData.append('subsidy', subsidy === 'true');
    formData.append('lease', lease);
    formData.append('startdate', startDate);
    formData.append('address', address);
    formData.append('contactInfo', contactInfo);
    formData.append('description', description);
    formData.append('restriction', restriction);
    formData.append('userId', user.userId);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`http://localhost:8081/house/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('House updated successfully:', response.data);
      alert('已成功修改出租資訊');
      navigate('/postedrent'); // 更新成功后导航到我的房屋页面
    } catch (error) {
      console.error('Error updating house:', error);
      alert('修改失敗，請重試');
    }
  };

  return (
    <div>
      <Banner title="修改出租" />
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
                <option value="STUDIO">套房</option>
                <option value="ROOM">雅房</option>
              </select>
            </div>
            <div className="form-group half-width">
              <label htmlFor="price">租金</label>
              <input id="price" type="text" value={price} onChange={e => setPrice(e.target.value)} className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="subsidy">租屋補助</label>
              <select id="subsidy" value={subsidy} onChange={e => setSubsidy(e.target.value)} className="form-control">
                <option value="">選擇租屋補助</option>
                <option value="false">無補助</option>
                <option value="true">政府補助</option>
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
            <input id="image-upload" type="file" onChange={handleFileChange} className="form-control" />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button">修改</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifyRent;
