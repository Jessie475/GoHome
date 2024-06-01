// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../css/Account.css';
// 
// 
// function Account() {
//   return (
//     <div className="account-container">
//       <header className="account-header">
//         <h1>我的帳號</h1>
//       </header>
//       <div className="account-info">
//         <div>姓名: XXX</div>
//         <div>性別: 男/女</div>
//         <div>帳號: XXXXXXXXXXXXXXXX</div>
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
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../css/Account.css';

function Account() {
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState('XXXXXXXXXXXXXXXX');
  const [phone, setPhone] = useState('09XXXXXXXX');

  // 處理修改的輸入
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
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
            <button type="submit">更新資訊</button>
          </>
        ) : (
          <div>尚未登入</div>
        )}
      </div>
      <div className="account-links">
        <Link to="/savedhouse" className="account-link">收藏的房屋</Link>
        <Link to="/mypost" className="account-link">我的文章</Link>
        <Link to="/postrent" className="account-link">新增出租</Link>
        <Link to="/savedarticle" className="account-link">收藏的文章</Link>
        <Link to="/mycomment" className="account-link">我的留言</Link>
        <Link to="/postedrent" className="account-link">已發布房屋</Link>
      </div>
    </div>
  );
}

export default Account;
