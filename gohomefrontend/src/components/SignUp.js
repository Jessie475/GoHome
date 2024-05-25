import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/SignUp.css'; // 確保導入 CSS 檔案

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [nationality, setNationality] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 此處將資料發送至伺服器
    console.log({ email, password, name, phone, gender, role, nationality });
    // 提交後處理
  };

  return (
    <div className="signup-container">
      <h1>註冊新帳號</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div class = "text1">
            <label >
                電子郵件:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                密碼:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label>
                姓名:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
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
        <button type="submit">註冊</button>
      </form>
    </div>
  );
}

export default SignUp;
