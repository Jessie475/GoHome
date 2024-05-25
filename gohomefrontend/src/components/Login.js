import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/Login.css'; // Import the CSS file

const login = async ({ username, password }) => {
  try {
    const response = await fetch('http://localhost:8081/users/login', { // 修改此處為你的後端 API 路徑
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, password: password }),
    });

    if (response.ok) {
      return 'success';
    } else {
      throw new Error('error');
    }
  } catch (error) {
    throw error;
  }
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
      setError('incorrect username or password');
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                className="form-control"
                id="password"
              />
            </div>
            <div className='sign_up'> 
              <Link className="link-style sign_up" to="/signup">註冊帳號</Link>              
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
