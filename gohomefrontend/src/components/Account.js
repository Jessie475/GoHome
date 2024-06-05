
// 
// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../contexts/UserContext'; // 确保路径正确
// import '../css/Account.css';
// 
// function Account() {
//   const { user } = useContext(UserContext); // 获取上下文中的用户信息
// 
//   return (
//     <div className="account-container">
//       <header className="account-header">
//         <h1>我的帳號</h1>
//       </header>
//       <div className="account-info">
//         {user ? (
//           <>
//             <div>姓名: {user.name}</div>
//             <div>性別: {user.gender}</div>
//             <div>帳號: {user.username}</div>
//           </>
//         ) : (
//           <div>尚未登入</div>
//         )}
//       </div>
//       <div className="account-links">
//         <Link to="/savedhouse" className="account-link">收藏的房屋</Link>
//         <Link to="/mypost" className="account-link">我的文章</Link>
//         <Link to="/postrent" className="account-link">新增出租</Link>
//         <Link to="/savedarticle" className="account-link">收藏的文章</Link>
//         <Link to="/mycomment" className="account-link">我的留言</Link>
//         <Link to="/postedrent" className="account-link">已發布房屋</Link>
//       </div>
//     </div>
//   );
// }
// 
// export default Account;

// 
// import React, { useContext,useState } from 'react';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../contexts/UserContext';
// import '../css/Account.css';
// 
// function Account() {
//   const { user } = useContext(UserContext);
//   const [email, setEmail] = useState('XXXXXXXXXXXXXXXX');
//   const [phone, setPhone] = useState('09XXXXXXXX');
// 
//   // 處理修改的輸入
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };
// 
//   const handlePhoneChange = (e) => {
//     setPhone(e.target.value);
//   };
// 
// 
//   return (
//     <div className="account-container">
//       <header className="account-header">
//         <h1>我的帳號</h1>
//       </header>
//       <div className="account-info">
//         {user ? (
//           <>
//             <div>姓名: {user.name}</div>
//             <div>性別: {user.gender}</div>
//             <div>帳號: {user.email}</div>
//             <div>
//               <label>Email:</label>
//               <input type="email" value={email} onChange={handleEmailChange} />
//             </div>
//             <div>
//               <label>電話：</label>
//               <input type="text" value={phone} onChange={handlePhoneChange} />
//             </div>
//             <button type="submit">更新資訊</button>
//           </>
//         ) : (
//           <div>尚未登入</div>
//         )}
//       </div>
//       <div className="account-links">
//         <Link to="/savedhouse" className="account-link">收藏的房屋</Link>
//         <Link to="/mypost" className="account-link">我的文章</Link>
//         <Link to="/postrent" className="account-link">新增出租</Link>
//         <Link to="/savedarticle" className="account-link">收藏的文章</Link>
//         <Link to="/mycomment" className="account-link">我的留言</Link>
//         <Link to="/postedrent" className="account-link">已發布房屋</Link>
//       </div>
//     </div>
//   );
// }
// 
// export default Account;


import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../css/Account.css';

function Account() {
  const { user, setUser } = useContext(UserContext);  // 确保可以更新用户上下文
  const [email, setEmail] = useState(user ? user.email : 'XXXXXXXXXXXXXXXX');
  const [phone, setPhone] = useState(user ? user.phone : '09XXXXXXXX');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8081/users/${user.userId}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, phone }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // 更新用户上下文
          setUser({ ...user, email, phone });
          setMessage('更新成功');
        } else {
          setMessage('更新失敗');
        }
      })
      .catch(error => {
        console.error('更新時錯誤:', error);
        setMessage('更新時出錯');
      });
  };

  return (
    <div className="account-container">
      <header className="account-header">
        <h1>我的帳號</h1>
      </header>
      <div className="account-info">
        {user ? (
          <>
            <div>姓名: {user.name}</div>
            <div>性別: {user.gender}</div>
            <div>帳號: {user.email}</div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
              <label>電話：</label>
              <input type="text" value={phone} onChange={handlePhoneChange} />
            </div>
            <button type="submit" onClick={handleUpdate}>更新資訊</button>
            {message && <div>{message}</div>}
          </>
        ) : (
          <div>尚未登入</div>
        )}
      </div>
      <div className="account-links">
        <Link to="/savedhouse" className="account-link">收藏的房屋</Link>
        <Link to="/mypost" className="account-link">我的文章</Link>
        <div className="account-link-group">
          <Link to="/postrent" className="account-link" id="addrent">新增出租</Link>
          <Link to="/postarticle" className="account-link" id="addpost">新增文章</Link>
        </div>
        <Link to="/savedarticle" className="account-link">收藏的文章</Link>
        <Link to="/mycomment" className="account-link">我的留言</Link>
        <Link to="/postedrent" className="account-link">已發布房屋</Link>
      </div>
    </div>
  );
}

export default Account;

