import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/SignUp.css'; // 確保導入 CSS 檔案

function SignUp() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [nationality, setNationality] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 控制密碼是否顯示


  const handleSubmit = (e) => {
    e.preventDefault();
    // 這裏將資料發送
    console.log({ name, email, password, phone, gender, role, nationality, username });
    // 提交後處理
  };

  return (
    <div>
      <h1 className='signup-title'>註冊新帳號</h1>
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <div class="text1">
            <label>
              真實姓名:
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
              用戶名:
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label >
              電子郵件:
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
              密碼:
              <div className="password-container">
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} />
                <button className='show-password-button' type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "隱藏" : "顯示"}
                </button>
              </div>
            </label>

            <label>
              電話:
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
            </label>
            <label>
              國籍:
              <input type="text" value={nationality} onChange={e => setNationality(e.target.value)} />
            </label>
          </div>
          <label>
            性別:
            <select value={gender} onChange={e => setGender(e.target.value)}>
              <option value="">請選擇</option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="unspecified">不告知</option>
            </select>
          </label>
          <label>
            身份:
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="">請選擇</option>
              <option value="landlord">房東</option>
              <option value="tenant">房客</option>
            </select>
          </label>
          <button className='signup-button' type="submit">註冊</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
