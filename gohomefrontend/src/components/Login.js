import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/Login.css';

const login = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === '1' && password === '1') {  // 帳號密碼
        console.log(username, password);
        resolve('success');
      } else {
        console.log(username, password);
        reject('error');
      }
    }, 1000); //過1秒返回結果
  });
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login({ username, password });
      setIsSubmitting(false);
      navigate('/home');  // 登錄成功後進入 Home 頁面
    } catch (error) {
      setError('錯誤的用戶名或密碼');
      setUsername('');
      setPassword('');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          {error && <h1 className="text-danger">{error}</h1>}
          <form onSubmit={handleSumbit}>
            <div className="form-group">
              <label htmlFor="username">用戶名</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">密碼</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                className="form-control"
                id="password"
              />
            </div>
            <div className='sign_up'>
              <Link className="link-style-sign_up" to="/signup">註冊帳號</Link>
            </div>
            <button type="submit" className="btn-block" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
