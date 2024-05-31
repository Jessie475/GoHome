import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../css/Login.css';



const login = async ({ email, password }) => {
  try {
    const response = await fetch('http://localhost:8081/users/login', { // 修改此處為你的後端 API 路徑
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data; // 返回完整的用户信息
  } catch (error) {
    throw error;
  }

};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = await login({ email, password });
      setUser(user);
      setIsSubmitting(false);
      navigate('/home');  // 登錄成功後進入 Home 頁面
    } catch (error) {
      setError('錯誤的郵箱或密碼');
      setEmail('');
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
            <div className="login-form-group">
              <label htmlFor="email">郵箱</label>
              <input
                type="text"
                className="login-form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">密碼</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                className="login-form-control"
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

// 
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import '../css/Login.css';
// 
// const login = ({ username, password }) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (username === '1' && password === '1') {  // 帳號密碼
//         console.log(username, password);
//         resolve('success');
//       } else {
//         console.log(username, password);
//         reject('error');
//       }
//     }, 1000); //過1秒返回結果
//   });
// }
// 
// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
// 
//   const handleSumbit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await login({ username, password });
//       setIsSubmitting(false);
//       navigate('/home');  // 登錄成功後進入 Home 頁面
//     } catch (error) {
//       setError('錯誤的用戶名或密碼');
//       setUsername('');
//       setPassword('');
//       setIsSubmitting(false);
//     }
//   };
// 
//   return (
//     <div className="container">
//       <div className="card">
//         <div className="card-body">
//           {error && <h1 className="text-danger">{error}</h1>}
//           <form onSubmit={handleSumbit}>
//             <div className="login-form-group">
//               <label htmlFor="username">用戶名</label>
//               <input
//                 type="text"
//                 className="login-form-control"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.currentTarget.value)}
//               />
//             </div>
//             <div className="login-form-group">
//               <label htmlFor="password">密碼</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.currentTarget.value)}
//                 className="login-form-control"
//                 id="password"
//               />
//             </div>
//             <div className='sign_up'>
//               <Link className="link-style-sign_up" to="/signup">註冊帳號</Link>
//             </div>
//             <button type="submit" className="btn-block" disabled={isSubmitting}>
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// 
// export default Login;